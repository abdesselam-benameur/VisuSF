var appJointure = new Vue({
    el: '#operHautNiv-JointureContenu',

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

            $("#operHautNiv-Jointure-MS1_Contenu").empty();
            $("#operHautNiv-Jointure-MS2_Contenu").empty();
            $("#operHautNiv-Jointure-MS3_Contenu").empty();
            $("#operHautNiv-Jointure-MC1_Contenu").empty();
            $("#operHautNiv-Jointure-MC2_Contenu").empty();
            $("#operHautNiv-Jointure-MC3_Contenu").empty();
            $("#operHautNiv-Jointure-EXE_Contenu").empty();
            $(".barreTemps-barreEtapes div").width(0);

            // Changer la Page
            $("#operHautNiv-JointureContenu ul li:first-child a").addClass("active");
            $("#operHautNiv-JointureContenu div div:first-child").addClass("active");
            $("#operHautNiv-JointureContenu ul li:nth-child(2) a").removeClass("active");
            $("#operHautNiv-JointureContenu ul li:nth-child(3) a").removeClass("active");
            $("#operHautNiv-JointureContenu div div:nth-child(2)").removeClass("active");
            $("#operHautNiv-JointureContenu div div:nth-child(3)").removeClass("active");
            $("#operHautNiv-JointureContenu ul li:nth-child(2) a").addClass("disabled");
            $("#operHautNiv-JointureContenu ul li:nth-child(3) a").addClass("disabled");
        },

        creer : function(){
                        
            this.init();
            this.grphFichier = new Jointure();
            
            $("#operHautNiv-Jointure-MS1_Contenu").empty();
            $("#operHautNiv-Jointure-MS1_Contenu").append(this.grphFichier.Grph_fichier1.conteneur);

            $("#operHautNiv-Jointure-MS2_Contenu").empty();
            $("#operHautNiv-Jointure-MS2_Contenu").append(this.grphFichier.Grph_fichier2.conteneur);

            $("#operHautNiv-Jointure-MS3_Contenu").empty();
            $("#operHautNiv-Jointure-MS3_Contenu").append(this.grphFichier.Grph_fichier3.conteneur);

            $("#operHautNiv-Jointure-EXE_Contenu").empty();

            // Changer la Page
            $("#operHautNiv-JointureContenu ul li:first-child a").removeClass("active");
            $("#operHautNiv-JointureContenu div div:first-child").removeClass("active");
            $("#operHautNiv-JointureContenu ul li:nth-child(2) a").addClass("active");
            $("#operHautNiv-JointureContenu div div:nth-child(2)").addClass("active");
            $("#operHautNiv-JointureContenu ul li:nth-child(2) a").removeClass("disabled");

            $(".barreTemps-autoBtn button:first-child").css("visibility", "visible");
            $(".barreTemps-autoBtn button:last-child").css("visibility", "hidden");
        },  

        operation : async function(){
            this.tabEtapes = this.grphFichier.operation("this.grphFichier","#operHautNiv-Jointure-MC1_Contenu", "#operHautNiv-Jointure-MC2_Contenu", "#operHautNiv-Jointure-MC3_Contenu", "#operHautNiv-Jointure-MS3_Contenu");
            
            while((this.index < this.tabEtapes.length-1) && (this.stop == false)){
                this.index++;
                eval(this.tabEtapes[this.index].code);

                // Log de l'Exécution
                if(this.tabEtapes[this.index].algorithme != "") this.textExe += this.tabEtapes[this.index].algorithme + "<br/>";
                $("#operHautNiv-Jointure-EXE_Contenu").html(this.textExe);

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
            this.tabEtapes = this.grphFichier.operation("this.grphFichier","#operHautNiv-Jointure-MC1_Contenu", "#operHautNiv-Jointure-MC2_Contenu", "#operHautNiv-Jointure-MC3_Contenu", "#operHautNiv-Jointure-MS3_Contenu");

            this.index++;
            if(this.index >= this.tabEtapes.length) this.index = this.tabEtapes.length-1;
            else {
                eval(this.tabEtapes[this.index].code);

                // Log de l'Exécution
                
                if(this.tabEtapes[this.index].algorithme != "") this.textExe += this.tabEtapes[this.index].algorithme + "<br/>";
                $("#operHautNiv-Jointure-EXE_Contenu").html(this.textExe);

                let w0 = 100 / this.tabEtapes.length;
                let w = $(".barreTemps-barreEtapes div").width() + w0;
                $(".barreTemps-barreEtapes div").width(w);
            }
        },

        prec: function(){
            this.tabEtapes = this.grphFichier.operation("this.grphFichier","#operHautNiv-Jointure-MC1_Contenu", "#operHautNiv-Jointure-MC2_Contenu", "#operHautNiv-Jointure-MC3_Contenu", "#operHautNiv-Jointure-MS3_Contenu");

            this.index--;
            if(this.index <= -1) this.index = 0;
            else {
                eval(this.tabEtapes[this.index].code);

                // Log de l'Exécution
        
                this.textExe = "";
                for(let i = 0; i <= this.index; i++)
                    if(this.tabEtapes[i].algorithme != "") this.textExe += this.tabEtapes[i].algorithme + "<br/>";
                $("#operHautNiv-Jointure-EXE_Contenu").html(this.textExe);
            
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
            
            $("#operHautNiv-Jointure-MS1_Contenu").empty();
            $("#operHautNiv-Jointure-MS1_Contenu").append(this.grphFichier.Grph_fichier1.conteneur);

            $("#operHautNiv-Jointure-MS2_Contenu").empty();
            $("#operHautNiv-Jointure-MS2_Contenu").append(this.grphFichier.Grph_fichier2.conteneur);

            $("#operHautNiv-Jointure-MS3_Contenu").empty();
            $("#operHautNiv-Jointure-MS3_Contenu").append(this.grphFichier.Grph_fichier3.conteneur);

            $("#operHautNiv-Jointure-MC1_Contenu").empty();
            $("#operHautNiv-Jointure-MC2_Contenu").empty();
            $("#operHautNiv-Jointure-MC3_Contenu").empty();

            $("#operHautNiv-Jointure-EXE_Contenu").empty();

            $(".barreTemps-barreEtapes div").width(0);
            $(".barreTemps-autoBtn button:first-child").css("visibility", "visible");
            $(".barreTemps-autoBtn button:last-child").css("visibility", "hidden");
            $(".barreTemps-precBtn button").prop('disabled', false);
            $(".barreTemps-suivBtn button").prop('disabled', false);

            this.textExe = "";
        },
    }
});
