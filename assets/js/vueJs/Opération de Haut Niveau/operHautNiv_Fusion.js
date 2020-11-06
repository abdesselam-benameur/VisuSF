var appFusion = new Vue({
    el: '#operHautNiv-FusionContenu',

    data: {
        grphFichier: new Object(),

        vitesse: 50,
        tabEtapes: [],
        textExe: "",
        index: -1,   
        stop: false,             
    },

    methods: {
        init : function(){
            this.grphFichier = new Object();

            this.vitesse = 50;
            this.tabEtapes = [];
            this.textExe = "";
            this.index = -1;
            this.stop = false;   

            $("#operHautNiv-Fusion-MS1_Contenu").empty();
            $("#operHautNiv-Fusion-MS2_Contenu").empty();
            $("#operHautNiv-Fusion-MS3_Contenu").empty();
            $("#operHautNiv-Fusion-MC1_Contenu").empty();
            $("#operHautNiv-Fusion-MC2_Contenu").empty();
            $("#operHautNiv-Fusion-MC3_Contenu").empty();
            $("#operHautNiv-Fusion-EXE_Contenu").empty();
            $(".barreTemps-barreEtapes div").width(0);

            // Changer la Page
            $("#operHautNiv-FusionContenu ul li:first-child a").addClass("active");
            $("#operHautNiv-FusionContenu div div:first-child").addClass("active");
            $("#operHautNiv-FusionContenu ul li:nth-child(2) a").removeClass("active");
            $("#operHautNiv-FusionContenu ul li:nth-child(3) a").removeClass("active");
            $("#operHautNiv-FusionContenu div div:nth-child(2)").removeClass("active");
            $("#operHautNiv-FusionContenu div div:nth-child(3)").removeClass("active");
            $("#operHautNiv-FusionContenu ul li:nth-child(2) a").addClass("disabled");
            $("#operHautNiv-FusionContenu ul li:nth-child(3) a").addClass("disabled");
        },

        creer : function(){
                        
            this.init();
            this.grphFichier = new Fusion();
            
            $("#operHautNiv-Fusion-MS1_Contenu").empty();
            $("#operHautNiv-Fusion-MS1_Contenu").append(this.grphFichier.Grph_fichier1.conteneur);

            $("#operHautNiv-Fusion-MS2_Contenu").empty();
            $("#operHautNiv-Fusion-MS2_Contenu").append(this.grphFichier.Grph_fichier2.conteneur);

            $("#operHautNiv-Fusion-MS3_Contenu").empty();
            $("#operHautNiv-Fusion-MS3_Contenu").append(this.grphFichier.Grph_fichier3.conteneur);

            $("#operHautNiv-Fusion-EXE_Contenu").empty();

            // Changer la Page
            $("#operHautNiv-FusionContenu ul li:first-child a").removeClass("active");
            $("#operHautNiv-FusionContenu div div:first-child").removeClass("active");
            $("#operHautNiv-FusionContenu ul li:nth-child(2) a").addClass("active");
            $("#operHautNiv-FusionContenu div div:nth-child(2)").addClass("active");
            $("#operHautNiv-FusionContenu ul li:nth-child(2) a").removeClass("disabled");

            $(".barreTemps-autoBtn button:first-child").css("visibility", "visible");
            $(".barreTemps-autoBtn button:last-child").css("visibility", "hidden");
        },  

        operation : async function(){
            this.tabEtapes = this.grphFichier.operation("this.grphFichier","#operHautNiv-Fusion-MC1_Contenu", "#operHautNiv-Fusion-MC2_Contenu", "#operHautNiv-Fusion-MC3_Contenu", "#operHautNiv-Fusion-MS3_Contenu");
            
            while((this.index < this.tabEtapes.length-1) && (this.stop == false)){
                this.index++;
                eval(this.tabEtapes[this.index].code);

                // Log de l'Exécution
                if(this.tabEtapes[this.index].algorithme != "") this.textExe += this.tabEtapes[this.index].algorithme + "<br/>";
                $("#operHautNiv-Fusion-EXE_Contenu").html(this.textExe);

                // Animation 'Barre temps'
                let w0 = 100 / this.tabEtapes.length;
                let w = $(".barreTemps-barreEtapes div").width() + w0;
                $(".barreTemps-barreEtapes div").width(w);
                await new Promise(r => setTimeout(r, (parseInt(this.vitesse)+10)*20));
            }
        },                    

        demarrer: function(){
            this.stop = false;
            this.marchePause();
            this.operation();
        },                   

        stopper: function(){
            this.stop = true;
            this.marchePause();
        }, 

        suiv : function(){
            this.tabEtapes = this.grphFichier.operation("this.grphFichier","#operHautNiv-Fusion-MC1_Contenu", "#operHautNiv-Fusion-MC2_Contenu", "#operHautNiv-Fusion-MC3_Contenu", "#operHautNiv-Fusion-MS3_Contenu");

            this.index++;
            if(this.index >= this.tabEtapes.length) this.index = this.tabEtapes.length-1;
            else {
                eval(this.tabEtapes[this.index].code);

                // Log de l'Exécution
                
                if(this.tabEtapes[this.index].algorithme != "") this.textExe += this.tabEtapes[this.index].algorithme + "<br/>";
                $("#operHautNiv-Fusion-EXE_Contenu").html(this.textExe);

                let w0 = 100 / this.tabEtapes.length;
                let w = $(".barreTemps-barreEtapes div").width() + w0;
                $(".barreTemps-barreEtapes div").width(w);
            }
        },

        prec: function(){
            this.tabEtapes = this.grphFichier.operation("this.grphFichier","#operHautNiv-Fusion-MC1_Contenu", "#operHautNiv-Fusion-MC2_Contenu", "#operHautNiv-Fusion-MC3_Contenu", "#operHautNiv-Fusion-MS3_Contenu");

            this.index--;
            if(this.index <= -1) this.index = 0;
            else {
                eval(this.tabEtapes[this.index].code);

                // Log de l'Exécution
        
                this.textExe = "";
                for(let i = 0; i <= this.index; i++)
                    if(this.tabEtapes[i].algorithme != "") this.textExe += this.tabEtapes[i].algorithme + "<br/>";
                $("#operHautNiv-Fusion-EXE_Contenu").html(this.textExe);
            
                // Animation 'Barre temps'
                let w0 = 100 / this.tabEtapes.length;
                let w = $(".barreTemps-barreEtapes div").width() - w0;
                $(".barreTemps-barreEtapes div").width(w);
            }
        }, 
        
        marchePause : function(){
            if($(".barreTemps-autoBtn button:first-child").css("visibility") == "visible"){
                $(".barreTemps-autoBtn button:first-child").css("visibility", "hidden");
                $(".barreTemps-autoBtn button:last-child").css("visibility", "visible");

                $(".barreTemps-precBtn button").prop('disabled', true);
                $(".barreTemps-suivBtn button").prop('disabled', true);
            }
            else{
                $(".barreTemps-autoBtn button:first-child").css("visibility", "visible");
                $(".barreTemps-autoBtn button:last-child").css("visibility", "hidden");

                $(".barreTemps-precBtn button").prop('disabled', false);
                $(".barreTemps-suivBtn button").prop('disabled', false);
            }
        },

        reset : function(){
            while(this.index != 0) this.prec();
            
            this.index = -1;
            this.stop = false;
            $("#operHautNiv-Fusion-MS1_Contenu").empty();
            $("#operHautNiv-Fusion-MS1_Contenu").append(this.grphFichier.Grph_fichier1.conteneur);

            $("#operHautNiv-Fusion-MS2_Contenu").empty();
            $("#operHautNiv-Fusion-MS2_Contenu").append(this.grphFichier.Grph_fichier2.conteneur);

            $("#operHautNiv-Fusion-MS3_Contenu").empty();
            $("#operHautNiv-Fusion-MS3_Contenu").append(this.grphFichier.Grph_fichier3.conteneur);

            $("#operHautNiv-Fusion-MC1_Contenu").empty();
            $("#operHautNiv-Fusion-MC2_Contenu").empty();
            $("#operHautNiv-Fusion-MC3_Contenu").empty();

            $("#operHautNiv-Fusion-EXE_Contenu").empty();

            $(".barreTemps-barreEtapes div").width(0);
            $(".barreTemps-autoBtn button:first-child").css("visibility", "visible");
            $(".barreTemps-autoBtn button:last-child").css("visibility", "hidden");
            $(".barreTemps-precBtn button").prop('disabled', false);
            $(".barreTemps-suivBtn button").prop('disabled', false);

            this.textExe = "";
        },
    }
});
