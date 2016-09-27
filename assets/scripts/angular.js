angular.module("meu_fretado",[])
  .controller("LinhasController", LinhasController);

  // controller linhas
  function LinhasController() {
    var vm = this;
    vm.titulo = "Carro 02 - Ida";
    vm.ruas = [
      { nome: "AV. JAPÃO X R. BRÁS DE PINA - POSTO DE GASOLINA" }
    , { nome: "AV. JAPÃO - COND. NOTRE DAME" }
    , { nome: "AV. JAPÃO - PADARIA VILA CLÉO" }
    , { nome: "R. DOM LUIZ DE SOUZA - COND. AQUARIUS" }
    , { nome: "R. DOM LUIZ DE SOUZA - POSTO DE SAÚDE" }
    , { nome: "R. SANTA EFIGÊNIA X R. SANTA BARBARA" }
    , { nome: "R.THULLER - INICIO DA RUA" }
    , { nome: "R. THULLER - PÇ. IGREJA IMACULADA CONCEIÇÃO" }
    , { nome: "R. THULLER - SUPERMERCADO PANDA" }
    , { nome: "R. THULLER - PADARIA BAIRRO ALTO" }
    , { nome: "R. GERALDO GOMES LOUREIRO - ANTIGA UNICOR" }
    , { nome: "R. ONÓFRICO DERÊNCIO" }
    , { nome: "AV. JAPÃO X AV. HENRIQUE PERES - POSTO BR (PERIMETRAL)" }
    , { nome: "AV. HENRIQUE EROLES - ALTURA DO Nº 2075" }
    , { nome: "AV. HENRIQUE EROLES - CONDOMINIO HELBOR PARK" }
    , { nome: "R. MARIA O. VALE X R. RAULINDO PAIVA - PÇ. ANTONIO C. FILHO" }
    , { nome: "R. MARIA OSORIO DO VALLE - GINÁSIO PEDRO MALOZZI" }
    , { nome: "R. MARIA OSORIO VALE X R. IPIRANGA" }
    , { nome: "R. CAMPOS SALES - PADARIA NAVAL" }
    , { nome: "R. CASAREJOS X R. CABO D. OLIVER" }
    , { nome: "R. CABO D. OLIVER X R. JOSÉ B. BRAGA - COLÉGIO GÊNESIS" }
    , { nome: "BALDEAÇÃO - SUS / MOGILAR - CARROS 2, 5, 7, 12, 13, 16, 17 E 22." }
    ];
  }
