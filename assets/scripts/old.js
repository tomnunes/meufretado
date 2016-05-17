function initMap() {
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 7,
        center: {lat: -23.53, lng: -46.62}
    });
    directionsDisplay.setMap(map);
    calculateAndDisplayRoute(directionsService, directionsDisplay);
    
}

function calculateAndDisplayRoute(directionsService, directionsDisplay) {
    directionsService.route({
        origin: "avenida japão, 250, mogi das cruzes, sp",
        waypoints: [
        {
            location:"rua dom luiz de souza, mogi das cruzes, sp",
            stopover:false
        },{
            location:"rua santa efigênia, mogi das cruzes, sp",
            stopover:false
        },{
            location:"rua santa bárbara 300, mogi das cruzes, sp",
            stopover:false
        },{
            location:"rua thuller 10, mogi das cruzes, sp",
            stopover:false
        },{
            location:"rua geraldo gomes loureiro 170, mogi das cruzes, sp",
            stopover:false
        },{
            location:"rua onófrico derêncio, mogi das cruzes, sp",
            stopover:false
        },{
            location:"avenida henrique eroles, mogi das cruzes, sp",
            stopover:false
        },{
            location:"rua maria osório do valle, mogi das cruzes, sp",
            stopover:false
        }],
        destination: "avenida henrique peres, mogi das cruzes, sp",
        travelMode: google.maps.TravelMode.DRIVING
    }, function(response, status) {
        if (status === google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });
}