// ************************************* RECHERCHE *************************************

new Vue({
  el: '#menuSecondaire',

  data: {
      searchInput: undefined,
      visible: false,
      searchTab: [],
      indexTab: [
        {name: "Structures Simples : TOF", link: "#structuresSimples-TOFContenu", num: 1,},
        {name: "Structures Simples : TOF avec ZD", link: "#structuresSimples-TOFzdContenu", num: 1,},
        {name: "Structures Simples : TnOF", link: "#structuresSimples-TnOFContenu", num: 1,},
        {name: "Structures Simples : LnOF", link: "#structuresSimples-LnOFContenu", num: 1,},
        {name: "Structures Simples : LOVC", link: "#structuresSimples-LOVCContenu", num: 1,},
        {name: "Méthodes d'Index : Index Dense", link: "#methodesIndex-IndexDenseContenu", num: 2,},
        {name: "Méthodes d'Index : Index Non Dense", link: "#methodesIndex-IndexNonDenseContenu", num: 2,},
        {name: "Arbres en MS : Arbre m-Aire", link: "#arbres-mAireContenu", num: 3,},
        {name: "Fichiers avec Hachage : Hachage Statique", link: "#fichiersHachage-HachageStatiqueContenu", num: 4,},
        {name: "Fichiers avec Hachage : Hachage Dynamique", link: "#fichiersHachage-HachageStatiqueContenu", num: 4,},
        {name: "Opérations de Haut Niveau : Fusion", link: "#operHautNiv-FusionContenu", num: 5,},
        {name: "Opérations de Haut Niveau : Jointure", link: "#operHautNiv-JointureContenu", num: 5,},
      ],

  },

  watch:{
    searchInput: function(){
      if((this.searchInput == undefined)||(this.searchInput == "")) this.visible = false;
      else{
        this.visible = true;
        this.searchTab = [];
        this.filtre(this.searchInput);
      }
    }
  },

  methods: {
    filtre: function(input){
      for(let i = 0; i < this.indexTab.length; i++){
        let str1 = input.toUpperCase();
        let str2 = this.indexTab[i].name.toUpperCase();
        if(str2.indexOf(str1) != -1) this.searchTab.push(this.indexTab[i]);
      }
    },

    init: function(lien, num){
      let chapMenuElem = $("#menuChapitres").children().eq(num);
      this.chapSet(chapMenuElem, lien);

      this.searchInput = undefined;
      this.visible = true;
      this.searchTab = [];
    },

    chapSet: function(chap, id){
      this.appReset();

      $("#visuPic").width(0);
      // Désélection de tous les champs cliqués
      if($(chap).css("animation-name") == "none"){
        $(".conteneurChapitre").css({
          "animation": "bubbleOut",  
        });
      }
      else{
        $(".conteneurChapitre").css({
          "animation": "bubbleOut 0.25s linear",  
        });
      }

      // Disparition de tous les contenus
      $(".chapitreContenu").hide();

      // Sélection du nouveau champs cliqué
      $(chap).css({
        "animation": "bubbleIn 0.5s 0.25s linear forwards",  
      });
    
      // Apparition du Contenu 
      $("#conteneurContenu").css({
        "visibility": "visible", 
      });
  
      $(id).fadeIn(750);
      
    },

    appReset: function(){
      appTOF.init();
      appTOFzd.init();
      appTnOF.init();
      appLnOF.init();
      appLOVC.init();
      appIndexDense.init();
      appIndexNonDense.init();
      appArbre.init();
      appHachStat.init();
      appHachDyn.init();
      appFusion.init();
      appJointure.init();
    },

  }
});



$(document).ready(function(){

  // ************************************* SELECTION CHAPITRE *************************************

  $(".selectChapitre").click(
    function(){
      chapReset(this);
    }
  );

  function chapReset(chap){
    appReset();

    $("#visuPic").width(0);
    // Désélection de tous les champs cliqués
    if($(chap).parent().css("animation-name") == "none"){
      $(".conteneurChapitre").css({
        "animation": "bubbleOut",  
      });
    }
    else{
      $(".conteneurChapitre").css({
        "animation": "bubbleOut 0.25s linear",  
      });
    }

    // Disparition de tous les contenus
    $(".chapitreContenu").hide();

    // Sélection du nouveau champs cliqué
    $(chap).parent().css({
      "animation": "bubbleIn 0.5s 0.25s linear forwards",  
    });
  
    // Apparition du Contenu 
    $("#conteneurContenu").css({
      "visibility": "visible", 
    });
    var id = $(chap).attr("href");
    $(id).fadeIn(750);
  
  }

  function appReset(){
    appTOF.init();
    appTOFzd.init();
    appTnOF.init();
    appLnOF.init();
    appLOVC.init();
    appIndexDense.init();
    appIndexNonDense.init();
    appArbre.init();
    appHachStat.init();
    appHachDyn.init();
    appFusion.init();
    appJointure.init();
  }

  // ******************************* SELECTION STRUCTURE/OPERATION ********************************

  // Selection

  $(".choixStructOper li a").click(function(){
    $(this).css({
      "color" : "rgba(255,255,255,0.87)",
      "border" : "none",
      "backgroundColor" : "transparent",
    });
    $(".chapitreContenu").hide();
    var id = $(this).attr("href");
      $(id).fadeIn(750);
  });

  // Retour
  $(".retourChapitreBtn").click(function(){
    $(this).css({
      "border" : "none",
      "backgroundColor" : "transparent",
    });
    $(".chapitreContenu").hide();
    var id = $(this).attr("href");
      $(id).fadeIn(750);
  });
  
});

  // ******************************* BARRE VITESSE ********************************
  $(".chapitreContenu .barreTemps-vitesseBtn input").hide();
  function vitesseBarreShow(){
    $(".chapitreContenu .barreTemps-vitesseBtn input").show();
  };

  function vitesseBarreHide(){
    $(".chapitreContenu .barreTemps-vitesseBtn input").hide();
  };
