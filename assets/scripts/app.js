function initMap() {
    var map = new window.google.maps.Map(document.getElementById("map"));

    var stopsCollection = [
    [
    {"Geometry":{"Latitude":-23.53111,"Longitude":-46.20499}},
    {"Geometry":{"Latitude":-23.53541,"Longitude":-46.20402}},
    {"Geometry":{"Latitude":-23.54505,"Longitude":-46.20294}},
    {"Geometry":{"Latitude":-23.54837,"Longitude":-46.20783}},
    {"Geometry":{"Latitude":-23.54927,"Longitude":-46.20858}},
    {"Geometry":{"Latitude":-23.54471,"Longitude":-46.21511}},
    {"Geometry":{"Latitude":-23.54461,"Longitude":-46.21639}},
    {"Geometry":{"Latitude":-23.54702,"Longitude":-46.21385}},
    {"Geometry":{"Latitude":-23.54825,"Longitude":-46.21221}},
    {"Geometry":{"Latitude":-23.55176,"Longitude":-46.20666}},
    {"Geometry":{"Latitude":-23.55350,"Longitude":-46.20417}},
    {"Geometry":{"Latitude":-23.55305,"Longitude":-46.20211}},
    {"Geometry":{"Latitude":-23.54848,"Longitude":-46.20398}},
    {"Geometry":{"Latitude":-23.53760,"Longitude":-46.20139}},
    {"Geometry":{"Latitude":-23.53240,"Longitude":-46.20254}},
    {"Geometry":{"Latitude":-23.52896,"Longitude":-46.19995}},
    {"Geometry":{"Latitude":-23.52672,"Longitude":-46.20031}},
    {"Geometry":{"Latitude":-23.51892,"Longitude":-46.20043}},
    {"Geometry":{"Latitude":-23.51761,"Longitude":-46.20128}},
    {"Geometry":{"Latitude":-23.51123,"Longitude":-46.19585}}
    ]
    ];

    // new up complex objects before passing them around
    var directionsDisplay = new window.google.maps.DirectionsRenderer();
    var directionsService = new window.google.maps.DirectionsService();

    Tour_startUp(stopsCollection);
    window.tour.loadMap(map, directionsDisplay);

    if (stopsCollection.length > 0){
        jQuery.each(stopsCollection, function (key, val){
            if (val.length > 1){
                directionsDisplay = new window.google.maps.DirectionsRenderer();
                window.tour.calcRoute(directionsService, directionsDisplay, val);
                directionsDisplay.setMap(map);
                // show pins on the map
                directionsDisplay.setOptions( { suppressMarkers: true } );
            }
        });
    }
    window.tour.fitBounds(map);
}

function Tour_startUp(stopsCollection) {
    if (!window.tour) window.tour = {
        updateStops: function (newStops) {
            stopsCollection = newStops;
        },
        // map: google map object
        // directionsDisplay: google directionsDisplay object (comes in empty)
        loadMap: function (map, directionsDisplay) {
            var myOptions = {
                zoom: 13,
                center: new window.google.maps.LatLng(51.507937, -0.076188), // default to London
                mapTypeId: window.google.maps.MapTypeId.ROADMAP
            };
            map.setOptions(myOptions);
            directionsDisplay.setMap(map);
        },
        fitBounds: function (map) {
            var bounds = new window.google.maps.LatLngBounds();

            // extend bounds for each record
            jQuery.each(stopsCollection, function (key, val) {
                jQuery.each(val, function(key2, val2){
                    var myLatlng = new window.google.maps.LatLng(val2.Geometry.Latitude, val2.Geometry.Longitude);
                    bounds.extend(myLatlng);
                });
            });
            map.fitBounds(bounds);
        },
        calcRoute: function (directionsService, directionsDisplay, stops) {
            var batches = [];
            var itemsPerBatch = 10; // google API max = 10 - 1 start, 1 stop, and 8 waypoints
            var itemsCounter = 0;
            var wayptsExist = stops.length > 0;

            while (wayptsExist) {
                var subBatch = [];
                var subitemsCounter = 0;

                for (var j = itemsCounter; j < stops.length; j++) {
                    subitemsCounter++;
                    subBatch.push({
                        location: new window.google.maps.LatLng(stops[j].Geometry.Latitude, stops[j].Geometry.Longitude),
                        stopover: true
                    });
                    if (subitemsCounter == itemsPerBatch)
                        break;
                }

                itemsCounter += subitemsCounter;
                batches.push(subBatch);
                wayptsExist = itemsCounter < stops.length;
                // If it runs again there are still points. Minus 1 before continuing to 
                // start up with end of previous tour leg
                itemsCounter--;
            }

            // now we should have a 2 dimensional array with a list of a list of waypoints
            var combinedResults;
            var unsortedResults = [{}]; // to hold the counter and the results themselves as they come back, to later sort
            var directionsResultsReturned = 0;

            for (var k = 0; k < batches.length; k++) {
                var lastIndex = batches[k].length - 1;
                var start = batches[k][0].location;
                var end = batches[k][lastIndex].location;

                // trim first and last entry from array
                var waypts = [];
                waypts = batches[k];
                waypts.splice(0, 1);
                waypts.splice(waypts.length - 1, 1);

                var request = {
                    origin: start,
                    destination: end,
                    waypoints: waypts,
                    travelMode: window.google.maps.TravelMode.DRIVING
                };
                (function (kk) {
                    directionsService.route(request, function (result, status) {
                        if (status == window.google.maps.DirectionsStatus.OK) {

                            var unsortedResult = { order: kk, result: result };
                            unsortedResults.push(unsortedResult);
                            
                            directionsResultsReturned++;

                            if (directionsResultsReturned == batches.length) // we've received all the results. put to map
                            {
                                // sort the returned values into their correct order
                                unsortedResults.sort(function (a, b) { return parseFloat(a.order) - parseFloat(b.order); });
                                var count = 0;
                                for (var key in unsortedResults) {
                                    if (unsortedResults[key].result != null) {
                                        if (unsortedResults.hasOwnProperty(key)) {
                                            if (count == 0) // first results. new up the combinedResults object
                                                combinedResults = unsortedResults[key].result;
                                            else {
                                                // only building up legs, overview_path, and bounds in my consolidated object. This is not a complete 
                                                // directionResults object, but enough to draw a path on the map, which is all I need
                                                combinedResults.routes[0].legs = combinedResults.routes[0].legs.concat(unsortedResults[key].result.routes[0].legs);
                                                combinedResults.routes[0].overview_path = combinedResults.routes[0].overview_path.concat(unsortedResults[key].result.routes[0].overview_path);

                                                combinedResults.routes[0].bounds = combinedResults.routes[0].bounds.extend(unsortedResults[key].result.routes[0].bounds.getNorthEast());
                                                combinedResults.routes[0].bounds = combinedResults.routes[0].bounds.extend(unsortedResults[key].result.routes[0].bounds.getSouthWest());
                                            }
                                            count++;
                                        }
                                    }
                                }
                                directionsDisplay.setDirections(combinedResults);
                            }
                        }
                    });
                })(k);
            }
        }
    };
}