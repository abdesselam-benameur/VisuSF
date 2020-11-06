var appTnOF = new Vue({
    el: '#structuresSimples-TnOFContenu',

    data: {
        grphFichier: new Object(),
        lecture_numBloc: undefined,
        recherche_val: undefined,
        insertion_val: undefined,
        suppression_val: undefined,
        nbBlocMax: undefined,
        nbEnregMax: undefined,

        oper: "",
        val: undefined,
        vitesse: 50,
        tabEtapes: [],
        textExe: "",
        index: -1,   
        stop: false,  
        
        nombreBloc: 0,
        nombreEnreg: 0,
        nbOper: 0,
        nbLect: 0, 
        nbEcrit: 0,
        logOper: [[0, 0, 0]],
    },

    methods: {

        init : function(){
            this.grphFichier = new Object();
            this.lecture_numHach = undefined;
            this.lecture_numBloc = undefined;
            this.recherche_val = undefined;
            this.insertion_val = undefined;
            this.suppression_val = undefined;
            this.nbBlocMax = undefined;
            this.nbEnregMax = undefined;

            this.oper = "";
            this.val = undefined;
            this.vitesse = 50;
            this.tabEtapes = [];
            this.textExe = "";
            this.index = -1;
            this.stop = false;   
            
            this.nombreBloc = 0;
            this.nombreEnreg = 0;
            this.nbOper = 0;
            this.nbLect = 0;
            this.nbEcrit = 0;
            this.logOper = [[0, 0, 0]];

            $("#structuresSimples-TnOF-MS_Contenu").empty();
            $("#structuresSimples-TnOF-MC_Contenu").empty();
            $("#structuresSimples-TnOF-EXE_Contenu").empty();
            $("#structuresSimples-TnOF-EXE p").html("Exécution");
            $(".barreTemps-barreEtapes div").width(0);

            // Changer la Page
            $("#structuresSimples-TnOFContenu ul li:first-child a").addClass("active");
            $("#structuresSimples-TnOFContenu div div:first-child").addClass("active");
            $("#structuresSimples-TnOFContenu ul li:nth-child(2) a").removeClass("active");
            $("#structuresSimples-TnOFContenu ul li:nth-child(3) a").removeClass("active");
            $("#structuresSimples-TnOFContenu div div:nth-child(2)").removeClass("active");
            $("#structuresSimples-TnOFContenu div div:nth-child(3)").removeClass("active");
            $("#structuresSimples-TnOFContenu ul li:nth-child(2) a").addClass("disabled");
            $("#structuresSimples-TnOFContenu ul li:nth-child(3) a").addClass("disabled");
        },
        
        creer : function(){
            let tabVal = [];
            let n1 = parseInt(this.nbBlocMax);
            let n2 = parseInt(this.nbEnregMax);
            for(let i = 0; i < (n1 * n2); i++) tabVal[i] = i;

            this.init();
            if(n1 >= 1 && n1 <= 10){
                if(n2 >= 1 && n2 <= 10){
        
                    let fichier = new Fichier_TnOF(n1, n2);
                    fichier.chgInit(tabVal);
                                
                    this.grphFichier = new Grph_Fichier_TnOF(fichier);
                    $("#structuresSimples-TnOF-MS_Contenu").empty();
                    $("#structuresSimples-TnOF-MS_Contenu").append(this.grphFichier.conteneur);

                    // Changer la Page
                    $("#structuresSimples-TnOFContenu ul li:first-child a").removeClass("active");
                    $("#structuresSimples-TnOFContenu div div:first-child").removeClass("active");
                    $("#structuresSimples-TnOFContenu ul li:nth-child(2) a").addClass("active");
                    $("#structuresSimples-TnOFContenu div div:nth-child(2)").addClass("active");
                    $("#structuresSimples-TnOFContenu ul li:nth-child(2) a").removeClass("disabled");
                    $("#structuresSimples-TnOFContenu ul li:nth-child(3) a").removeClass("disabled");

                    $(".barreTemps-autoBtn button:first-child").css("visibility", "visible");
                    $(".barreTemps-autoBtn button:last-child").css("visibility", "hidden");
                }
                else {
                    alert("Erreur : Le Nombre d'Enreg. Max dans le Bloc doit être compris entre 1 et 10.");
                }
            }
            else {
                alert("Erreur : Le Nombre de Blocs Max doit être compris entre 1 et 10.");
            }
        },  

        lecture : function(){
            if(this.index == this.tabEtapes.length-1){
                switch(this.oper){  
                    case "recherche": 
                        let n = this.grphFichier.fichier_TnOF.recherche(parseInt(this.val));
                        if(n != -1) this.nbLect += parseInt(n[0])+1;
                        else this.nbLect += parseInt(this.grphFichier.fichier_TnOF.entete.nbBloc);

                        this.nbOper++;
                        this.logOper[this.nbOper] = [this.nbOper, this.nbLect, this.nbEcrit];
                        break;    
                    case "insertion": 
                        this.nbLect++;   
                        this.nbEcrit += parseInt(this.grphFichier.fichier_TnOF.insertion(new EnregFixe(parseInt(this.val))));
        
                        this.nbOper++;
                        this.logOper[this.nbOper] = [this.nbOper, this.nbLect, this.nbEcrit];
                        
                        break;
                    case "suppression": 
                        let p = this.grphFichier.fichier_TnOF.recherche(parseInt(this.val));
                        if(p != -1) {
                            this.nbLect += parseInt(p[0]+1);
                            this.nbEcrit++;
                        }
                        else this.nbLect += parseInt(this.grphFichier.fichier_TnOF.entete.nbBloc);     

                        this.grphFichier.fichier_TnOF.suppression(parseInt(this.val));
        
                        this.nbOper++;
                        this.logOper[this.nbOper] = [this.nbOper, this.nbLect, this.nbEcrit];
                        break;
                    default: break;
                }

                let bloc = this.grphFichier.fichier_TnOF.tabBloc[this.lecture_numBloc-1];

                if(bloc != undefined){

                    let grphBloc = new Grph_Bloc_TnOF(bloc, this.grphFichier.fichier_TnOF.entete.nbEnregMax, true);
                    $("#structuresSimples-TnOF-MC_Contenu").empty();
                    $("#structuresSimples-TnOF-MC_Contenu").append(grphBloc.conteneur);

                    this.grphFichier = new Grph_Fichier_TnOF(this.grphFichier.fichier_TnOF);
                    $("#structuresSimples-TnOF-MS_Contenu").empty();
                    $("#structuresSimples-TnOF-MS_Contenu").append(this.grphFichier.conteneur);
                    this.grphFichier.selection(this.lecture_numBloc-1);

                    $("#structuresSimples-TnOF-EXE p").html("Exécution");
                    $("#structuresSimples-TnOF-EXE_Contenu").empty();

                    this.nbOper++;
                    this.nbLect++;
                    this.logOper[this.nbOper] = [this.nbOper, this.nbLect, this.nbEcrit];
                }
                else{
                    this.grphFichier = new Grph_Fichier_TnOF(this.grphFichier.fichier_TnOF);
                    $("#structuresSimples-TnOF-MS_Contenu").empty();
                    $("#structuresSimples-TnOF-MS_Contenu").append(this.grphFichier.conteneur);
                    $("#structuresSimples-TnOF-MC_Contenu").empty();
                    $("#structuresSimples-TnOF-EXE p").html("Exécution");
                    $("#structuresSimples-TnOF-EXE_Contenu").empty();

                
                    if(!(this.lecture_numBloc >= 1 && this.lecture_numBloc <= this.grphFichier.fichier_TnOF.entete.nbBloc))
                        alert("Erreur : Lecture Impossible ... Le Numéro du Bloc est compris entre 1 et "+this.grphFichier.fichier_TnOF.entete.nbBloc+".");
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
                        let n = this.grphFichier.fichier_TnOF.recherche(parseInt(this.val));
                        if(n != -1) this.nbLect += parseInt(n[0])+1;
                        else this.nbLect += parseInt(this.grphFichier.fichier_TnOF.entete.nbBloc);

                        this.nbOper++;
                        this.logOper[this.nbOper] = [this.nbOper, this.nbLect, this.nbEcrit];
                        break;    
                    case "insertion": 
                        this.nbLect++;   
                        this.nbEcrit += parseInt(this.grphFichier.fichier_TnOF.insertion(new EnregFixe(parseInt(this.val))));
        
                        this.nbOper++;
                        this.logOper[this.nbOper] = [this.nbOper, this.nbLect, this.nbEcrit];
                        
                        break;
                    case "suppression": 
                        let p = this.grphFichier.fichier_TnOF.recherche(parseInt(this.val));
                        if(p != -1) {
                            this.nbLect += parseInt(p[0]+1);
                            this.nbEcrit++;
                        }
                        else this.nbLect += parseInt(this.grphFichier.fichier_TnOF.entete.nbBloc);     

                        this.grphFichier.fichier_TnOF.suppression(parseInt(this.val));
        
                        this.nbOper++;
                        this.logOper[this.nbOper] = [this.nbOper, this.nbLect, this.nbEcrit];
                        break;
                    default: break;
                }

                this.grphFichier = new Grph_Fichier_TnOF(this.grphFichier.fichier_TnOF);
                $("#structuresSimples-TnOF-MS_Contenu").empty();
                $("#structuresSimples-TnOF-MS_Contenu").append(this.grphFichier.conteneur);
                $("#structuresSimples-TnOF-MC_Contenu").empty();
                $("#structuresSimples-TnOF-EXE p").html("Exécution");
                $("#structuresSimples-TnOF-EXE_Contenu").empty();

                this.oper = oper;
                this.tabEtapes = [];
                switch(this.oper){
                    case "recherche": 
                        if(this.recherche_val >= -99 && this.recherche_val <= 99){
                            this.val = this.recherche_val;
                            this.tabEtapes = this.grphFichier.recherche(parseInt(this.val), "this.grphFichier", "#structuresSimples-TnOF-MC_Contenu");
                            $("#structuresSimples-TnOF-EXE p").html("Exécution : Recherche("+parseInt(this.val)+")");
                            this.textExe = "Recherche Séquentielle des Blocs<br/>";
                        }
                        else alert("Erreur : La Valeur à Rechercher doit être comprise entre -99 et 99.");

                        // Réinitialisation
                        this.recherche_val = undefined;

                        break;
                    case "insertion": 
                        if(this.insertion_val >= -99 && this.insertion_val <= 99){
                            this.val = this.insertion_val;
                            this.tabEtapes = this.grphFichier.insertion(new EnregFixe(parseInt(this.val)), "this.grphFichier", "#structuresSimples-TnOF-MC_Contenu");
                            $("#structuresSimples-TnOF-EXE p").html("Exécution : Insertion("+parseInt(this.val)+")");
                            this.textExe = "Accès au Premier Bloc Libre<br/>";
                        }
                        else alert("Erreur : La Valeur à Insérer doit être comprise entre -99 et 99.");

                        // Réinitialisation
                        this.insertion_val = undefined;

                        break;
                    case "suppression":
                        if(this.suppression_val >= -99 && this.suppression_val <= 99){
                            this.val = this.suppression_val; 
                            this.tabEtapes = this.grphFichier.suppression(parseInt(this.val), "this.grphFichier", "#structuresSimples-TnOF-MC_Contenu");
                            $("#structuresSimples-TnOF-EXE p").html("Exécution : Suppression("+parseInt(this.val)+")");
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
                $("#structuresSimples-TnOFContenu ul li:nth-child(3) a").addClass("disabled");
            }
        },

        operation : async function(){
            while((this.index < this.tabEtapes.length-1) && (this.stop == false)){
                this.index++;
                eval(this.tabEtapes[this.index].code);

                // Controle Stats
                if(this.index != this.tabEtapes.length-1){
                    $("#structuresSimples-TnOFContenu ul li:nth-child(3) a").addClass("disabled");
                }
                else $("#structuresSimples-TnOFContenu ul li:nth-child(3) a").removeClass("disabled");

                // Log de l'Exécution
                if(this.tabEtapes[this.index].algorithme != "") this.textExe += this.tabEtapes[this.index].algorithme + "<br/>";
                $("#structuresSimples-TnOF-EXE_Contenu").html(this.textExe);

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
                $("#structuresSimples-TnOF-EXE_Contenu").html(this.textExe);

                let w0 = 100 / this.tabEtapes.length;
                let w = $(".barreTemps-barreEtapes div").width() + w0;
                $(".barreTemps-barreEtapes div").width(w);

                // Controle Stats
                if(this.index != this.tabEtapes.length-1){
                    $("#structuresSimples-TnOFContenu ul li:nth-child(3) a").addClass("disabled");
                }
                else $("#structuresSimples-TnOFContenu ul li:nth-child(3) a").removeClass("disabled");
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
                        this.textExe = "Accès au Premier Bloc Libre<br/>";
                        break;
                    case "suppression":
                        this.textExe = "Recherche Séquentielle des Blocs<br/>";
                        break;
                }
                for(let i = 0; i <= this.index; i++)
                    if(this.tabEtapes[i].algorithme != "") this.textExe += this.tabEtapes[i].algorithme + "<br/>";
                $("#structuresSimples-TnOF-EXE_Contenu").html(this.textExe);
            
                // Animation 'Barre temps'
                let w0 = 100 / this.tabEtapes.length;
                let w = $(".barreTemps-barreEtapes div").width() - w0;
                $(".barreTemps-barreEtapes div").width(w);

                // Controle Stats
                if(this.index != this.tabEtapes.length-1){
                    $("#structuresSimples-TnOFContenu ul li:nth-child(3) a").addClass("disabled");
                }
                else $("#structuresSimples-TnOFContenu ul li:nth-child(3) a").removeClass("disabled");
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
            this.grphFichier = new Grph_Fichier_TnOF(this.grphFichier.fichier_TnOF);
            $("#structuresSimples-TnOF-MS_Contenu").empty();
            $("#structuresSimples-TnOF-MS_Contenu").append(this.grphFichier.conteneur);
            $("#structuresSimples-TnOF-MC_Contenu").empty();
            $("#structuresSimples-TnOF-EXE_Contenu").empty();

            $(".barreTemps-barreEtapes div").width(0);
            $(".barreTemps-autoBtn button:first-child").css("visibility", "visible");
            $(".barreTemps-autoBtn button:last-child").css("visibility", "hidden");
            $(".barreTemps-precBtn button").prop('disabled', false);
            $(".barreTemps-suivBtn button").prop('disabled', false);
            $("#structuresSimples-TnOFContenu ul li:nth-child(3) a").addClass("disabled");

            switch(this.oper){
                case "recherche": 
                    this.textExe = "Recherche Séquentielle des Blocs<br/>";
                    
                    break;
                case "insertion": 
                    this.textExe = "Accès au Premier Bloc Libre<br/>";
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
                        let n = this.grphFichier.fichier_TnOF.recherche(parseInt(this.val));
                        if(n != -1) this.nbLect += parseInt(n[0])+1;
                        else this.nbLect += parseInt(this.grphFichier.fichier_TnOF.entete.nbBloc);

                        this.nbOper++;
                        this.logOper[this.nbOper] = [this.nbOper, this.nbLect, this.nbEcrit];
                        break;    
                    case "insertion": 
                        this.nbLect++;   
                        this.nbEcrit += parseInt(this.grphFichier.fichier_TnOF.insertion(new EnregFixe(parseInt(this.val))));
        
                        this.nbOper++;
                        this.logOper[this.nbOper] = [this.nbOper, this.nbLect, this.nbEcrit];
                        
                        break;
                    case "suppression": 
                        let p = this.grphFichier.fichier_TnOF.recherche(parseInt(this.val));
                        if(p != -1) {
                            this.nbLect += parseInt(p[0]+1);
                            this.nbEcrit++;
                        }
                        else this.nbLect += parseInt(this.grphFichier.fichier_TnOF.entete.nbBloc);     

                        this.grphFichier.fichier_TnOF.suppression(parseInt(this.val));
        
                        this.nbOper++;
                        this.logOper[this.nbOper] = [this.nbOper, this.nbLect, this.nbEcrit];
                        break;
                    default: break;
                }

                this.oper = "";
                $("#structuresSimples-TnOFContenu ul li:first-child a").removeClass("active");
                $("#structuresSimples-TnOFContenu div div:first-child").removeClass("active");
                $("#structuresSimples-TnOFContenu ul li:nth-child(2) a").removeClass("active");
                $("#structuresSimples-TnOFContenu div div:nth-child(2)").removeClass("active");
                $("#structuresSimples-TnOFContenu ul li:nth-child(3) a").addClass("active");
                $("#structuresSimples-TnOFContenu div div:nth-child(3)").addClass("active");

                this.index = -1;
                this.stop = false;
                this.grphFichier = new Grph_Fichier_TnOF(this.grphFichier.fichier_TnOF);
                $("#structuresSimples-TnOF-MS_Contenu").empty();
                $("#structuresSimples-TnOF-MS_Contenu").append(this.grphFichier.conteneur);
                $("#structuresSimples-TnOF-MC_Contenu").empty();
                $("#structuresSimples-TnOF-EXE p").html("Exécution");
                $("#structuresSimples-TnOF-EXE_Contenu").empty();

                $(".barreTemps-barreEtapes div").width(0);
                $(".barreTemps-autoBtn button:first-child").css("visibility", "visible");
                $(".barreTemps-autoBtn button:last-child").css("visibility", "hidden");
                $(".barreTemps-precBtn button").prop('disabled', false);
                $(".barreTemps-suivBtn button").prop('disabled', false);

                this.textExe = "";
                this.tabEtapes = [];

        
                this.nombreBloc = parseInt(this.grphFichier.fichier_TnOF.entete.nbBloc);
        
                this.nombreEnreg = parseInt(this.grphFichier.fichier_TnOF.entete.nbEnregMax);
        
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
                    
                    var chart = new google.visualization.LineChart(document.getElementById('structuresSimples-TnOF_Statistiques-LE'));
                    
                    chart.draw(data, options);
                }
            }
        }
    }
});

// Form de Création

$("#structureSimples_TnOF_creationForm").hover(function(){
    $(this).css({
        "width": "300px",
        "height": "325px",
        "background-color": "#121212",
    });
    $("#structureSimples_TnOF_creationForm p").css({
        "opacity": "1",
    });
    $("#structureSimples_TnOF_creationForm input").css({
        "opacity": "1",
    });
}, 
function(){
    $(this).css({
        "width": "55px",
        "height": "55px",
        "background-color": "transparent",
    });
    $("#structureSimples_TnOF_creationForm p").css({
        "opacity": "0",
    });
    $("#structureSimples_TnOF_creationForm input").css({
        "opacity": "0",
    });

});