var appLOVC = new Vue({
    el: '#structuresSimples-LOVCContenu',

    data: {
        grphFichier: new Object(),
        lecture_numBloc: undefined,
        recherche_val: undefined,
        insertion_val: undefined,
        suppression_val: undefined,
        nbEnregInit: undefined,

        oper: "",
        val: undefined,
        vitesse: 50,
        tabEtapes: [],
        textExe: "",
        index: -1,   
        stop: false,           
        
        tete: -1,
        nombreBloc: 0,
        nbOper: 0,
        nbLect: 0, 
        nbEcrit: 0,
        logOper: [[0, 0, 0]],
    },

    methods: {
        init : function(){
            this.grphFichier = new Object();
            this.lecture_numBloc = undefined;
            this.recherche_val = undefined;
            this.insertion_val = undefined;
            this.suppression_val = undefined;
            this.nbEnregInit = undefined;

            this.oper = "";
            this.val = undefined;
            this.vitesse = 50;
            this.tabEtapes = [];
            this.textExe = "";
            this.index = -1;
            this.stop = false;   
            
            this.tete = -1;
            this.nombreBloc = 0;
            this.nbOper = 0;
            this.nbLect = 0;
            this.nbEcrit = 0;
            this.logOper = [[0, 0, 0]];

            $("#structuresSimples-LOVC-MS_Contenu").empty();
            $("#structuresSimples-LOVC-MC_Contenu").empty();
            $("#structuresSimples-LOVC-EXE_Contenu").empty();
            $("#structuresSimples-LOVC-EXE p").html("Exécution");
            $(".barreTemps-barreEtapes div").width(0);

            // Changer la Page
            $("#structuresSimples-LOVCContenu ul li:first-child a").addClass("active");
            $("#structuresSimples-LOVCContenu div div:first-child").addClass("active");
            $("#structuresSimples-LOVCContenu ul li:nth-child(2) a").removeClass("active");
            $("#structuresSimples-LOVCContenu ul li:nth-child(3) a").removeClass("active");
            $("#structuresSimples-LOVCContenu div div:nth-child(2)").removeClass("active");
            $("#structuresSimples-LOVCContenu div div:nth-child(3)").removeClass("active");
            $("#structuresSimples-LOVCContenu ul li:nth-child(2) a").addClass("disabled");
            $("#structuresSimples-LOVCContenu ul li:nth-child(3) a").addClass("disabled");
        },
        
        creer : function(){
            let n = parseInt(this.nbEnregInit);

            this.init();
            if(n >= 0 && n <= 40){
                let fichier = new fichier_LOVC();
                fichier.chargement_initial(n);
                            
                this.grphFichier = new Grph_Fichier_LOVC(fichier);
                $("#structuresSimples-LOVC-MS_Contenu").empty();
                $("#structuresSimples-LOVC-MS_Contenu").append(this.grphFichier.conteneur);

                // Changer la Page
                $("#structuresSimples-LOVCContenu ul li:first-child a").removeClass("active");
                $("#structuresSimples-LOVCContenu div div:first-child").removeClass("active");
                $("#structuresSimples-LOVCContenu ul li:nth-child(2) a").addClass("active");
                $("#structuresSimples-LOVCContenu div div:nth-child(2)").addClass("active");
                $("#structuresSimples-LOVCContenu ul li:nth-child(2) a").removeClass("disabled");
                $("#structuresSimples-LOVCContenu ul li:nth-child(3) a").removeClass("disabled");

                $(".barreTemps-autoBtn button:first-child").css("visibility", "visible");
                $(".barreTemps-autoBtn button:last-child").css("visibility", "hidden");
            }
            else {
                alert("Erreur : Le Nombre d'Enreg. Initial doit être compris entre 0 et 40.");
            }
        },  

        lecture : function(){
            if(this.index == this.tabEtapes.length-1){
                switch(this.oper){   
                    case "recherche": 
                        let a = this.grphFichier.fichier_LOVC.recherche(parseInt(this.val), 5);

                        this.nbLect += a.nbLect;
                        this.nbEcrit += a.nbEcr;

                        this.nbOper++;
                        this.logOper[this.nbOper] = [this.nbOper, this.nbLect, this.nbEcrit];
                        break;   
                    case "insertion": 
                        if (!(((this.grphFichier.fichier_LOVC.b + 5) > this.grphFichier.fichier_LOVC.tab_blocs[this.grphFichier.fichier_LOVC.tete].max - 1) && 
                            (this.grphFichier.fichier_LOVC.tabLien.length == 0))) {

                            let b = this.grphFichier.fichier_LOVC.insertion(parseInt(this.val), 5);
                            this.nbLect += b.nbLect;
                            this.nbEcrit += b.nbEcr;

                            this.nbOper++;
                            this.logOper[this.nbOper] = [this.nbOper, this.nbLect, this.nbEcrit];
                            
                        }
                        else{
                            let b = this.grphFichier.fichier_LOVC.recherche(parseInt(this.val), 5);

                            this.nbLect += b.nbLect;
                            this.nbEcrit += b.nbEcr;

                            this.nbOper++;
                            this.logOper[this.nbOper] = [this.nbOper, this.nbLect, this.nbEcrit];

                        }
                        break;
                    case "suppression": 
                        let c = this.grphFichier.fichier_LOVC.suppression(parseInt(this.val));

                        this.nbLect += c.nbLect;
                        this.nbEcrit += c.nbEcr;

                        this.nbOper++;
                        this.logOper[this.nbOper] = [this.nbOper, this.nbLect, this.nbEcrit];
                        break;
                    default: break;
                }

                let bloc = this.grphFichier.fichier_LOVC.tab_blocs[parseInt(this.lecture_numBloc)-1];
                let b;
                if (bloc.suivant == -1) b = this.grphFichier.fichier_LOVC.b;
                else b = bloc.max;

                if(bloc != undefined){
                    let grphBloc = new Grph_Bloc_LOVC(bloc, b, true);
                    $("#structuresSimples-LOVC-MC_Contenu").empty();
                    $("#structuresSimples-LOVC-MC_Contenu").append(grphBloc.conteneur);

                    this.grphFichier = new Grph_Fichier_LOVC(this.grphFichier.fichier_LOVC);
                    $("#structuresSimples-LOVC-MS_Contenu").empty();
                    $("#structuresSimples-LOVC-MS_Contenu").append(this.grphFichier.conteneur);
                    this.grphFichier.selection(this.lecture_numBloc-1);

                    $("#structuresSimples-LOVC-EXE p").html("Exécution");
                    $("#structuresSimples-LOVC-EXE_Contenu").empty();

                    this.nbOper++;
                    this.nbLect++;
                    this.logOper[this.nbOper] = [this.nbOper, this.nbLect, this.nbEcrit];
                }
                else{
                    this.grphFichier = new Grph_Fichier_LOVC(this.grphFichier.fichier_LOVC);
                    $("#structuresSimples-LOVC-MS_Contenu").empty();
                    $("#structuresSimples-LOVC-MS_Contenu").append(this.grphFichier.conteneur);
                    $("#structuresSimples-LOVC-MC_Contenu").empty();
                    $("#structuresSimples-LOVC-EXE p").html("Exécution");
                    $("#structuresSimples-LOVC-EXE_Contenu").empty();

                    if(this.lecture_numBloc >= 1 && this.lecture_numBloc <= 10)
                        alert("Erreur : Lecture Impossible ... Bloc " +this.lecture_numBloc+ " Introuvable.");
                    else alert("Erreur : Lecture Impossible ... Le Numéro du Bloc est compris entre 1 et 10.");
                } 
                // Réinitialisation
                this.index = -1;
                this.stop = false;
                this.tabEtapes = [];
                $(".barreTemps-barreEtapes div").width(0);
            }
            else alert("Erreur : Une autre Opération est en cours d'Exécution.");

            // Réinitialisation
            this.lecture_numBloc = undefined;
        },

        setOper(oper){
            if(this.index != this.tabEtapes.length-1){
                alert("Erreur : Une autre Opération est en cours d'Exécution.");
            }
            else{
                switch(this.oper){   
                    case "recherche": 
                        let a = this.grphFichier.fichier_LOVC.recherche(parseInt(this.val), 5);

                        this.nbLect += a.nbLect;
                        this.nbEcrit += a.nbEcr;

                        this.nbOper++;
                        this.logOper[this.nbOper] = [this.nbOper, this.nbLect, this.nbEcrit];
                        break;   
                    case "insertion": 
                        if (!(((this.grphFichier.fichier_LOVC.b + 5) > this.grphFichier.fichier_LOVC.tab_blocs[this.grphFichier.fichier_LOVC.tete].max - 1) && 
                            (this.grphFichier.fichier_LOVC.tabLien.length == 0))) {

                            let b = this.grphFichier.fichier_LOVC.insertion(parseInt(this.val), 5);
                            this.nbLect += b.nbLect;
                            this.nbEcrit += b.nbEcr;

                            this.nbOper++;
                            this.logOper[this.nbOper] = [this.nbOper, this.nbLect, this.nbEcrit];
                            
                        }
                        else{
                            let b = this.grphFichier.fichier_LOVC.recherche(parseInt(this.val), 5);

                            this.nbLect += b.nbLect;
                            this.nbEcrit += b.nbEcr;

                            this.nbOper++;
                            this.logOper[this.nbOper] = [this.nbOper, this.nbLect, this.nbEcrit];

                        }
                        break;
                    case "suppression": 
                        let c = this.grphFichier.fichier_LOVC.suppression(parseInt(this.val));

                        this.nbLect += c.nbLect;
                        this.nbEcrit += c.nbEcr;

                        this.nbOper++;
                        this.logOper[this.nbOper] = [this.nbOper, this.nbLect, this.nbEcrit];
                        break;
                    default: break;
                }

                this.grphFichier = new Grph_Fichier_LOVC(this.grphFichier.fichier_LOVC);
                $("#structuresSimples-LOVC-MS_Contenu").empty();
                $("#structuresSimples-LOVC-MS_Contenu").append(this.grphFichier.conteneur);
                $("#structuresSimples-LOVC-MC_Contenu").empty();
                $("#structuresSimples-LOVC-EXE p").html("Exécution");
                $("#structuresSimples-LOVC-EXE_Contenu").empty();

                this.oper = oper;
                this.tabEtapes = [];
                switch(this.oper){
                    case "recherche": 
                        if(this.recherche_val >= -99 && this.recherche_val <= 99){
                            this.val = this.recherche_val;
                            this.tabEtapes = this.grphFichier.recherche(parseInt(this.val), "this.grphFichier", "#structuresSimples-LOVC-MC_Contenu");
                            $("#structuresSimples-LOVC-EXE p").html("Exécution : Recherche("+parseInt(this.val)+")");
                            this.textExe = "Recherche Séquentielle des Blocs<br/>";
                        }
                        else alert("Erreur : La Valeur à Rechercher doit être comprise entre -99 et 99.");

                        // Réinitialisation
                        this.recherche_val = undefined;
                    
                        break;
                    case "insertion": 
                        if(this.insertion_val >= -99 && this.insertion_val <= 99){
                            this.val = this.insertion_val;
                            this.tabEtapes = this.grphFichier.insertion(parseInt(this.val), 5, "this.grphFichier", "#structuresSimples-LOVC-MC_Contenu");
                            $("#structuresSimples-LOVC-EXE p").html("Exécution : Insertion("+parseInt(this.val)+")");
                            this.textExe = "Recherche Séquentielle des Blocs<br/>";
                        }
                        else alert("Erreur : La Valeur à Insérer doit être comprise entre -99 et 99.");

                        // Réinitialisation
                        this.insertion_val = undefined;
                    
                        break;
                    case "suppression":
                        if(this.suppression_val >= -99 && this.suppression_val <= 99){
                            this.val = this.suppression_val; 
                            this.tabEtapes = this.grphFichier.suppression(parseInt(this.val), "this.grphFichier", "#structuresSimples-LOVC-MC_Contenu");
                            $("#structuresSimples-LOVC-EXE p").html("Exécution : Suppression("+parseInt(this.val)+")");
                            this.textExe = "Recherche Séquentielle des Blocs<br/>";
                        }
                        else alert("Erreur : La Valeur à Supprimer doit être comprise entre -99 et 99.");

                        // Réinitialisation
                        this.suppression_val = undefined;
                    
                        break;
                }
                this.index = -1;
                this.stop = false;
                $(".barreTemps-barreEtapes div").width(0);
                $("#structuresSimples-LOVCContenu ul li:nth-child(3) a").addClass("disabled");
            }
        },

        operation : async function(){
            while((this.index < this.tabEtapes.length-1) && (this.stop == false)){
                this.index++;
                eval(this.tabEtapes[this.index].code);

                // Controle Stats
                if(this.index != this.tabEtapes.length-1){
                    $("#structuresSimples-LOVCContenu ul li:nth-child(3) a").addClass("disabled");
                }
                else $("#structuresSimples-LOVCContenu ul li:nth-child(3) a").removeClass("disabled");

                // Log de l'Exécution
                if(this.tabEtapes[this.index].algorithme != "") this.textExe += this.tabEtapes[this.index].algorithme + "<br/>";
                $("#structuresSimples-LOVC-EXE_Contenu").html(this.textExe);

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
            this.index++;
            if(this.index >= this.tabEtapes.length) this.index = this.tabEtapes.length-1;
            else {
                eval(this.tabEtapes[this.index].code);

                // Log de l'Exécution
                
                if(this.tabEtapes[this.index].algorithme != "") this.textExe += this.tabEtapes[this.index].algorithme + "<br/>";
                $("#structuresSimples-LOVC-EXE_Contenu").html(this.textExe);

                let w0 = 100 / this.tabEtapes.length;
                let w = $(".barreTemps-barreEtapes div").width() + w0;
                $(".barreTemps-barreEtapes div").width(w);

                // Controle Stats
                if(this.index != this.tabEtapes.length-1){
                    $("#structuresSimples-LOVCContenu ul li:nth-child(3) a").addClass("disabled");
                }
                else $("#structuresSimples-LOVCContenu ul li:nth-child(3) a").removeClass("disabled");
            }
        },

        prec: function(){
            this.index--;
            if(this.index <= -1) this.index = 0;
            else {
                eval(this.tabEtapes[this.index].code);

                // Log de l'Exécution
                switch(this.oper){
                    case "recherche": 
                        this.textExe = "Recherche Séquentielle des Blocs<br/>";
                        
                        break;
                    case "insertion": 
                        this.textExe = "Recherche Séquentielle des Blocs<br/>";
                        break;
                    case "suppression":
                        this.textExe = "Recherche Séquentielle des Blocs<br/>";
                        break;
                }
                for(let i = 0; i <= this.index; i++)
                    if(this.tabEtapes[i].algorithme != "") this.textExe += this.tabEtapes[i].algorithme + "<br/>";
                $("#structuresSimples-LOVC-EXE_Contenu").html(this.textExe);
            
                // Animation 'Barre temps'
                let w0 = 100 / this.tabEtapes.length;
                let w = $(".barreTemps-barreEtapes div").width() - w0;
                $(".barreTemps-barreEtapes div").width(w);

                // Controle Stats
                if(this.index != this.tabEtapes.length-1){
                    $("#structuresSimples-LOVCContenu ul li:nth-child(3) a").addClass("disabled");
                }
                else $("#structuresSimples-LOVCContenu ul li:nth-child(3) a").removeClass("disabled");
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
            this.index = -1;
            this.stop = false;
            this.grphFichier = new Grph_Fichier_LOVC(this.grphFichier.fichier_LOVC);
            $("#structuresSimples-LOVC-MS_Contenu").empty();
            $("#structuresSimples-LOVC-MS_Contenu").append(this.grphFichier.conteneur);
            $("#structuresSimples-LOVC-MC_Contenu").empty();
            $("#structuresSimples-LOVC-EXE_Contenu").empty();

            $(".barreTemps-barreEtapes div").width(0);
            $(".barreTemps-autoBtn button:first-child").css("visibility", "visible");
            $(".barreTemps-autoBtn button:last-child").css("visibility", "hidden");
            $(".barreTemps-precBtn button").prop('disabled', false);
            $(".barreTemps-suivBtn button").prop('disabled', false);
            $("#structuresSimples-LOVCContenu ul li:nth-child(3) a").addClass("disabled");

            switch(this.oper){
                case "recherche": 
                    this.textExe = "Recherche Séquentielle des Blocs<br/>";
                    
                    break;
                case "insertion": 
                    this.textExe = "Recherche Séquentielle des Blocs<br/>";
                    break;
                case "suppression":
                    this.textExe = "Recherche Séquentielle des Blocs<br/>";
                    break;
            }
        },

        stats : function(){
            if(this.index != this.tabEtapes.length-1){
                alert("Erreur : Une autre Opération est en cours d'Exécution.");
                
            }
            else{
                switch(this.oper){   
                    case "recherche": 
                        let a = this.grphFichier.fichier_LOVC.recherche(parseInt(this.val), 5);

                        this.nbLect += a.nbLect;
                        this.nbEcrit += a.nbEcr;

                        this.nbOper++;
                        this.logOper[this.nbOper] = [this.nbOper, this.nbLect, this.nbEcrit];
                        break;   
                    case "insertion": 
                        if (!(((this.grphFichier.fichier_LOVC.b + 5) > this.grphFichier.fichier_LOVC.tab_blocs[this.grphFichier.fichier_LOVC.tete].max - 1) && 
                            (this.grphFichier.fichier_LOVC.tabLien.length == 0))) {

                            let b = this.grphFichier.fichier_LOVC.insertion(parseInt(this.val), 5);
                            this.nbLect += b.nbLect;
                            this.nbEcrit += b.nbEcr;

                            this.nbOper++;
                            this.logOper[this.nbOper] = [this.nbOper, this.nbLect, this.nbEcrit];
                            
                        }
                        else{
                            let b = this.grphFichier.fichier_LOVC.recherche(parseInt(this.val), 5);

                            this.nbLect += b.nbLect;
                            this.nbEcrit += b.nbEcr;

                            this.nbOper++;
                            this.logOper[this.nbOper] = [this.nbOper, this.nbLect, this.nbEcrit];

                        }
                        break;
                    case "suppression": 
                        let c = this.grphFichier.fichier_LOVC.suppression(parseInt(this.val));

                        this.nbLect += c.nbLect;
                        this.nbEcrit += c.nbEcr;

                        this.nbOper++;
                        this.logOper[this.nbOper] = [this.nbOper, this.nbLect, this.nbEcrit];
                        break;
                    default: break;
                }

                this.oper = "";
                $("#structuresSimples-LOVCContenu ul li:first-child a").removeClass("active");
                $("#structuresSimples-LOVCContenu div div:first-child").removeClass("active");
                $("#structuresSimples-LOVCContenu ul li:nth-child(2) a").removeClass("active");
                $("#structuresSimples-LOVCContenu div div:nth-child(2)").removeClass("active");
                $("#structuresSimples-LOVCContenu ul li:nth-child(3) a").addClass("active");
                $("#structuresSimples-LOVCContenu div div:nth-child(3)").addClass("active");

                this.index = -1;
                this.stop = false;
                this.grphFichier = new Grph_Fichier_LOVC(this.grphFichier.fichier_LOVC);
                $("#structuresSimples-LOVC-MS_Contenu").empty();
                $("#structuresSimples-LOVC-MS_Contenu").append(this.grphFichier.conteneur);
                $("#structuresSimples-LOVC-MC_Contenu").empty();
                $("#structuresSimples-LOVC-EXE p").html("Exécution");
                $("#structuresSimples-LOVC-EXE_Contenu").empty();

                $(".barreTemps-barreEtapes div").width(0);
                $(".barreTemps-autoBtn button:first-child").css("visibility", "visible");
                $(".barreTemps-autoBtn button:last-child").css("visibility", "hidden");
                $(".barreTemps-precBtn button").prop('disabled', false);
                $(".barreTemps-suivBtn button").prop('disabled', false);

                this.textExe = "";
                this.tabEtapes = [];

                if(this.grphFichier.fichier_LOVC.tete != -1) this.tete = parseInt(this.grphFichier.fichier_LOVC.tete) + 1;
                else this.tete = parseInt(this.grphFichier.fichier_LOVC.tete);
        
                this.nombreBloc = parseInt(this.grphFichier.fichier_LOVC.nb_blocs);
        
                // Graphe de L/E
        
                google.charts.load('current', {'packages':['corechart']});
                google.charts.setOnLoadCallback(drawChart);

                var tabData = this.logOper;
                
                function drawChart() {
                    var data = new google.visualization.DataTable();
                    data.addColumn('number', "Nombre d'Opérations");
                    data.addColumn('number', 'Lecture');
                    data.addColumn('number', 'Ecriture');
        
                    data.addRows(tabData);            
        
                    var options = {
                        title: "Nombre de Visites ( Lecture / Ecriture )",
                        titleTextStyle: {
                            color: '#A0A0A0',
                            fontName: "montserrat",
                            fontSize: 15,
                            bold: false,
                        },
                        curveType: 'function',
                        legend: { 
                            position: 'right',
                            textStyle: { 
                                color: "white",
                                fontName: "montserrat",
                                fontSize: 13,
                                bold: false,
                            },
                        },
                        backgroundColor: "transparent",
                        colors: ['#7650ED', '#1697DD'],
                        chartArea: { left: 50, width: '84%', height: '55%'},
                        hAxis: {
                            title: "Nombre d'Opérations",
                            titleTextStyle: {
                              color: '#A0A0A0',
                              fontName: "montserrat",
                              fontSize: 13,
                              bold: false,
                            },
                            titlePosition: "right",
                            baselineColor: "#A0A0A0",
                            gridlines: {color: 'transparent'},
                            textStyle:{ 
                                color: "#A0A0A0",
                                fontName: "montserrat",
                                fontSize: 10,
                                bold: false,
                            },
                            minValue: 20,
                        },
        
                        vAxis: {
                            titlePosition: "right",
                            baselineColor: "#A0A0A0",
                            gridlines: {color: 'transparent'},
                            textStyle:{ 
                                color: "#A0A0A0",
                                fontName: "montserrat",
                                fontSize: 10,
                                bold: false,
                            },
                            minValue: 20,
                            viewWindowMode: "maximized",
                        },
                    };
        
                    var chart = new google.visualization.LineChart(document.getElementById('structuresSimples-LOVC_Statistiques-LE'));
                    
                    chart.draw(data, options);
                }
            }
        }
    }
});

// Form de Création

$("#structureSimples_LOVC_creationForm").hover(function(){
    $(this).css({
        "width": "300px",
        "height": "225px",
        "background-color": "#121212",
    });
    $("#structureSimples_LOVC_creationForm p").css({
        "opacity": "1",
    });
    $("#structureSimples_LOVC_creationForm input").css({
        "opacity": "1",
    });
}, 
function(){
    $(this).css({
        "width": "55px",
        "height": "55px",
        "background-color": "transparent",
    });
    $("#structureSimples_LOVC_creationForm p").css({
        "opacity": "0",
    });
    $("#structureSimples_LOVC_creationForm input").css({
        "opacity": "0",
    });

});