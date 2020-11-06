var appTOFzd = new Vue({
    el: '#structuresSimples-TOFzdContenu',

    data: {
        grphFichier: new Object(),
        bloc: new Object(),
        lecture_numBloc: undefined,
        recherche_val: undefined,
        insertion_val: undefined,
        suppression_val: undefined,
        nbBlocInit: undefined,
        nbEnregMax: undefined,
        tauxChg: undefined,

        oper: "",
        val: undefined,
        vitesse: 50,
        tabEtapes: [],
        textExe: "",
        index: -1,   
        stop: false,    
        
        nombreBloc: 0,
        nombreZD: 0,
        nombreEnreg: 0,
        nbOper: 0,
        nbLect: 0, 
        nbEcrit: 0,
        logOper: [[0, 0, 0]],
    },

    methods: {
        init : function(){
            this.grphFichier = new Object();
            this.bloc = new Object();
            this.lecture_numBloc = undefined;
            this.recherche_val = undefined;
            this.insertion_val = undefined;
            this.suppression_val = undefined;
            this.nbBlocInit = undefined;
            this.nbEnregMax = undefined;
            this.tauxChg = undefined,

            this.oper = "";
            this.val = undefined;
            this.vitesse = 50;
            this.tabEtapes = [];
            this.textExe = "";
            this.index = -1;
            this.stop = false;   
            
            this.nombreBloc = 0;
            this.nombreZD = 0;
            this.nombreEnreg = 0;
            this.nbOper = 0;
            this.nbLect = 0;
            this.nbEcrit = 0;
            this.logOper = [[0, 0, 0]];

            $("#structuresSimples-TOFzd-MS_Contenu").empty();
            $("#structuresSimples-TOFzd-MC_Contenu").empty();
            $("#structuresSimples-TOFzd-EXE_Contenu").empty();
            $("#structuresSimples-TOFzd-EXE p").html("Exécution");
            $(".barreTemps-barreEtapes div").width(0);

            // Changer la Page
            $("#structuresSimples-TOFzdContenu ul li:first-child a").addClass("active");
            $("#structuresSimples-TOFzdContenu div div:first-child").addClass("active");
            $("#structuresSimples-TOFzdContenu ul li:nth-child(2) a").removeClass("active");
            $("#structuresSimples-TOFzdContenu ul li:nth-child(3) a").removeClass("active");
            $("#structuresSimples-TOFzdContenu div div:nth-child(2)").removeClass("active");
            $("#structuresSimples-TOFzdContenu div div:nth-child(3)").removeClass("active");
            $("#structuresSimples-TOFzdContenu ul li:nth-child(2) a").addClass("disabled");
            $("#structuresSimples-TOFzdContenu ul li:nth-child(3) a").addClass("disabled");
        },
        
        creer : function(){
            let n1 = parseInt(this.nbBlocInit);
            let n2 = parseInt(this.nbEnregMax);
            let f = parseFloat(this.tauxChg);

           this.init();
           if(n1 >= 3 && n1 <= 5){
                if(n2 >= 1 && n2 <= 10){
                    if(f > 0 && f < 1){
                        let fichier = new FichTOFzd();
                        fichier.charINIT(n1, n2, f);
                                    
                        this.grphFichier = new Grph_Fich_TOFzd(fichier, n1);
                        $("#structuresSimples-TOFzd-MS_Contenu").empty();
                        $("#structuresSimples-TOFzd-MS_Contenu").append(this.grphFichier.conteneur);

                        // Changer la Page
                        $("#structuresSimples-TOFzdContenu ul li:first-child a").removeClass("active");
                        $("#structuresSimples-TOFzdContenu div div:first-child").removeClass("active");
                        $("#structuresSimples-TOFzdContenu ul li:nth-child(2) a").addClass("active");
                        $("#structuresSimples-TOFzdContenu div div:nth-child(2)").addClass("active");
                        $("#structuresSimples-TOFzdContenu ul li:nth-child(2) a").removeClass("disabled");
                        $("#structuresSimples-TOFzdContenu ul li:nth-child(3) a").removeClass("disabled");

                        $(".barreTemps-autoBtn button:first-child").css("visibility", "visible");
                        $(".barreTemps-autoBtn button:last-child").css("visibility", "hidden");
                    }
                    else {
                        alert("Erreur : Le Taux de Chargement Initial doit être STRICTEMENT compris entre 0 et 1.");
                    }
                }
                else {
                    alert("Erreur : Le Nombre d'Enreg. Max dans le Bloc doit être compris entre 1 et 10.");
                }
            }
            else {
                alert("Erreur : Le Nombre de Blocs Initial doit être compris entre 3 et 5.");
            }
        },  

        lecture : function(){
            if(this.index == this.tabEtapes.length-1){
                switch(this.oper){    
                    case "recherche":
                        let s1 = this.grphFichier.Fich_TOF.rech(parseInt(this.val));

                        this.nbLect += s1.nbVisites.nbLect;
                        this.nbOper++;
                        this.logOper[this.nbOper] = [this.nbOper, this.nbLect, this.nbEcrit];
                        break;   
                    case "insertion": 
                        let s2 = this.grphFichier.Fich_TOF.rech(parseInt(this.val));
                        this.nbLect += s2.nbVisites.nbLect;

                        if((this.tabEtapes[this.tabEtapes.length-1].algorithme != "Err >> Pas d'Espace Mémoire")&&
                            (this.tabEtapes[this.tabEtapes.length-1].algorithme != "Err >> Deux ZD au Max")&&
                            (this.tabEtapes[this.tabEtapes.length-1].algorithme != ">> Erreur")){
                            this.grphFichier.Fich_TOF.insert(parseInt(this.val));

                            this.nbLect ++;
                            this.nbEcrit ++;
                        }

                        this.nbOper++;
                        this.logOper[this.nbOper] = [this.nbOper, this.nbLect, this.nbEcrit];
                        break;
                    case "suppression": 
                        let s3 = this.grphFichier.Fich_TOF.rech(parseInt(this.val));
                        this.nbLect += s3.nbVisites.nbLect;

                        this.grphFichier.Fich_TOF.delete(parseInt(this.val));
                        this.nbEcrit ++;

                        this.nbOper++;
                        this.logOper[this.nbOper] = [this.nbOper, this.nbLect, this.nbEcrit];
                        break;
                    default: break;
                }

                let bloc = this.grphFichier.Fich_TOF.fich[this.lecture_numBloc-1];

                if(bloc != undefined){
                    let grphBloc;
                    if(this.lecture_numBloc <= this.grphFichier.NbBlocMAX) grphBloc = new Grph_BlocTOFzd_MC(bloc);
                    else grphBloc = new Grph_Bloc_LnOFzd(bloc, this.grphFichier.Fich_TOF.entete.nbEnrg, true);
                    
                    $("#structuresSimples-TOFzd-MC_Contenu").empty();
                    $("#structuresSimples-TOFzd-MC_Contenu").append(grphBloc.conteneur);

                    this.grphFichier = new Grph_Fich_TOFzd(this.grphFichier.Fich_TOF, this.grphFichier.NbBlocMAX);
                    $("#structuresSimples-TOFzd-MS_Contenu").empty();
                    $("#structuresSimples-TOFzd-MS_Contenu").append(this.grphFichier.conteneur);

                    if(this.lecture_numBloc <= this.grphFichier.NbBlocMAX)
                        this.grphFichier.Tab_Rep_Bloc[this.lecture_numBloc-1].selectionBloc();
                    else this.grphFichier.selection(this.lecture_numBloc-1);
                    

                    $("#structuresSimples-TOFzd-EXE p").html("Exécution");
                    $("#structuresSimples-TOFzd-EXE_Contenu").empty();

                    
                    this.nbOper++;
                    this.nbLect++;
                    this.logOper[this.nbOper] = [this.nbOper, this.nbLect, this.nbEcrit];
                }
                else{
                    this.grphFichier = new Grph_Fich_TOFzd(this.grphFichier.Fich_TOF, this.grphFichier.NbBlocMAX);
                    $("#structuresSimples-TOFzd-MS_Contenu").empty();
                    $("#structuresSimples-TOFzd-MS_Contenu").append(this.grphFichier.conteneur);
                    $("#structuresSimples-TOFzd-MC_Contenu").empty();
                    $("#structuresSimples-TOFzd-EXE p").html("Exécution");
                    $("#structuresSimples-TOFzd-EXE_Contenu").empty();

                    if(this.lecture_numBloc >= 1 && this.lecture_numBloc <= 10)
                        alert("Erreur : Lecture Impossible ... Bloc " +this.lecture_numBloc+ " Introuvable.");
                    else alert("Erreur : Lecture Impossible ... Le Numéro du Bloc est compris entre 1 et 10.");
                } 
                // Réinitialisation
                this.index = -1;
                this.stop = false;
                this.tabEtapes = [];
                this.oper = "";
                $(".barreTemps-barreEtapes div").width(0);
            }
            else alert("Erreur : Une autre Opération est en cours d'Exécution.");

            // Réinitialisation
            this.lecture_numBloc = undefined;
        },

        setOper(oper){
            if(this.index != this.tabEtapes.length-1){
                alert("Opération en exécution");
            }
            else{
                switch(this.oper){    
                    case "recherche":
                        let s1 = this.grphFichier.Fich_TOF.rech(parseInt(this.val));

                        this.nbLect += s1.nbVisites.nbLect;
                        this.nbOper++;
                        this.logOper[this.nbOper] = [this.nbOper, this.nbLect, this.nbEcrit];
                        break;   
                    case "insertion": 
                        let s2 = this.grphFichier.Fich_TOF.rech(parseInt(this.val));
                        this.nbLect += s2.nbVisites.nbLect;

                        if((this.tabEtapes[this.tabEtapes.length-1].algorithme != "Err >> Pas d'Espace Mémoire")&&
                            (this.tabEtapes[this.tabEtapes.length-1].algorithme != "Err >> Deux ZD au Max")&&
                            (this.tabEtapes[this.tabEtapes.length-1].algorithme != ">> Erreur")){
                            this.grphFichier.Fich_TOF.insert(parseInt(this.val));

                            this.nbLect ++;
                            this.nbEcrit ++;
                        }

                        this.nbOper++;
                        this.logOper[this.nbOper] = [this.nbOper, this.nbLect, this.nbEcrit];
                        break;
                    case "suppression": 
                        let s3 = this.grphFichier.Fich_TOF.rech(parseInt(this.val));
                        this.nbLect += s3.nbVisites.nbLect;

                        this.grphFichier.Fich_TOF.delete(parseInt(this.val));
                        this.nbEcrit ++;

                        this.nbOper++;
                        this.logOper[this.nbOper] = [this.nbOper, this.nbLect, this.nbEcrit];
                        break;
                    default: break;
                }

                this.grphFichier = new Grph_Fich_TOFzd(this.grphFichier.Fich_TOF, this.grphFichier._NbBlocMAX);
                $("#structuresSimples-TOFzd-MS_Contenu").empty();
                $("#structuresSimples-TOFzd-MS_Contenu").append(this.grphFichier.conteneur);
                $("#structuresSimples-TOFzd-MC_Contenu").empty();
                $("#structuresSimples-TOFzd-EXE p").html("Exécution");
                $("#structuresSimples-TOFzd-EXE_Contenu").empty();

                this.oper = oper;
                this.tabEtapes = [];
                switch(this.oper){
                    case "recherche": 
                        if(this.recherche_val >= -9999 && this.recherche_val <= 9999){
                            this.val = this.recherche_val;
                            this.tabEtapes = this.grphFichier.recherche(parseInt(this.val), "this.grphFichier", "this.bloc", "#structuresSimples-TOFzd-MC_Contenu");
                            $("#structuresSimples-TOFzd-EXE p").html("Exécution : Recherche("+parseInt(this.val)+")");
                            this.textExe = "Recherche Dichotomique dans MS<br/>";
                        }
                        else alert("Erreur : La Valeur à Rechercher doit être comprise entre -9999 et 9999.");

                        // Réinitialisation
                        this.recherche_val = undefined;

                        break;
                    case "insertion": 
                        if(this.insertion_val >= -9999 && this.insertion_val <= 9999){
                            this.val = this.insertion_val;
                            this.tabEtapes = this.grphFichier.insertion(parseInt(this.val), "this.grphFichier", "this.bloc", "#structuresSimples-TOFzd-MC_Contenu");
                            $("#structuresSimples-TOFzd-EXE p").html("Exécution : Insertion("+parseInt(this.val)+")");
                            this.textExe = "Recherche Dichotomique dans MS<br/>";
                        }
                        else alert("Erreur : La Valeur à Insérer doit être comprise entre -9999 et 9999.");

                        // Réinitialisation
                        this.insertion_val = undefined;

                        break;
                    case "suppression":
                        if(this.suppression_val >= -9999 && this.suppression_val <= 9999){
                            this.val = this.suppression_val; 
                            this.tabEtapes = this.grphFichier.suppression(parseInt(this.val), "this.grphFichier", "this.bloc", "#structuresSimples-TOFzd-MC_Contenu");
                            $("#structuresSimples-TOFzd-EXE p").html("Exécution : Suppression("+parseInt(this.val)+")");
                            this.textExe = "";
                        }
                        else alert("Erreur : La Valeur à Supprimer doit être comprise entre -9999 et 9999.");

                        // Réinitialisation
                        this.suppression_val = undefined;

                        break;
                }
                this.index = -1;
                this.stop = false;
                $(".barreTemps-barreEtapes div").width(0);
                $("#structuresSimples-TOFzdContenu ul li:nth-child(3) a").addClass("disabled");
            }
        },

        operation : async function(){
            while((this.index < this.tabEtapes.length-1) && (this.stop == false)){
                this.index++;
                eval(this.tabEtapes[this.index].code);

                // Controle Stats
                if(this.index != this.tabEtapes.length-1){
                    $("#structuresSimples-TOFzdContenu ul li:nth-child(3) a").addClass("disabled");
                }
                else $("#structuresSimples-TOFzdContenu ul li:nth-child(3) a").removeClass("disabled");

                // Log de l'Exécution
                if(this.tabEtapes[this.index].algorithme != "") this.textExe += this.tabEtapes[this.index].algorithme + "<br/>";
                $("#structuresSimples-TOFzd-EXE_Contenu").html(this.textExe);

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
                $("#structuresSimples-TOFzd-EXE_Contenu").html(this.textExe);

                let w0 = 100 / this.tabEtapes.length;
                let w = $(".barreTemps-barreEtapes div").width() + w0;
                $(".barreTemps-barreEtapes div").width(w);

                // Controle Stats
                if(this.index != this.tabEtapes.length-1){
                    $("#structuresSimples-TOFzdContenu ul li:nth-child(3) a").addClass("disabled");
                }
                else $("#structuresSimples-TOFzdContenu ul li:nth-child(3) a").removeClass("disabled");
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
                        this.textExe = "Recherche Dichotomique dans MS<br/>";
                        
                        break;
                    case "insertion": 
                        this.textExe = "Recherche Dichotomique dans MS<br/>";
                        break;
                    case "suppression":
                        this.textExe = "";
                        break;
                }
                for(let i = 0; i <= this.index; i++)
                    if(this.tabEtapes[i].algorithme != "") this.textExe += this.tabEtapes[i].algorithme + "<br/>";
                $("#structuresSimples-TOFzd-EXE_Contenu").html(this.textExe);
            
                // Animation 'Barre temps'
                let w0 = 100 / this.tabEtapes.length;
                let w = $(".barreTemps-barreEtapes div").width() - w0;
                $(".barreTemps-barreEtapes div").width(w);

                // Controle Stats
                if(this.index != this.tabEtapes.length-1){
                    $("#structuresSimples-TOFzdContenu ul li:nth-child(3) a").addClass("disabled");
                }
                else $("#structuresSimples-TOFzdContenu ul li:nth-child(3) a").removeClass("disabled");
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
            this.grphFichier = new Grph_Fich_TOFzd(this.grphFichier.Fich_TOFzd, 10);
            $("#structuresSimples-TOFzd-MS_Contenu").empty();
            $("#structuresSimples-TOFzd-MS_Contenu").append(this.grphFichier.conteneur);
            $("#structuresSimples-TOFzd-MC_Contenu").empty();
            $("#structuresSimples-TOFzd-EXE_Contenu").empty();

            $(".barreTemps-barreEtapes div").width(0);
            $(".barreTemps-autoBtn button:first-child").css("visibility", "visible");
            $(".barreTemps-autoBtn button:last-child").css("visibility", "hidden");
            $(".barreTemps-precBtn button").prop('disabled', false);
            $(".barreTemps-suivBtn button").prop('disabled', false);
            $("#structuresSimples-TOFzdContenu ul li:nth-child(3) a").addClass("disabled");

            switch(this.oper){
                case "recherche": 
                    this.textExe = "Recherche Dichotomique dans MS<br/>";
                    
                    break;
                case "insertion": 
                    this.textExe = "Recherche Dichotomique dans MS<br/>";
                    break;
                case "suppression":
                    this.textExe = "";
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
                        let s1 = this.grphFichier.Fich_TOF.rech(parseInt(this.val));

                        this.nbLect += s1.nbVisites.nbLect;
                        this.nbOper++;
                        this.logOper[this.nbOper] = [this.nbOper, this.nbLect, this.nbEcrit];
                        break;   
                    case "insertion": 
                        let s2 = this.grphFichier.Fich_TOF.rech(parseInt(this.val));
                        this.nbLect += s2.nbVisites.nbLect;

                        if((this.tabEtapes[this.tabEtapes.length-1].algorithme != "Err >> Pas d'Espace Mémoire")&&
                            (this.tabEtapes[this.tabEtapes.length-1].algorithme != "Err >> Deux ZD au Max")&&
                            (this.tabEtapes[this.tabEtapes.length-1].algorithme != ">> Erreur")){
                            this.grphFichier.Fich_TOF.insert(parseInt(this.val));

                            this.nbLect ++;
                            this.nbEcrit ++;
                        }

                        this.nbOper++;
                        this.logOper[this.nbOper] = [this.nbOper, this.nbLect, this.nbEcrit];
                        break;
                    case "suppression": 
                        let s3 = this.grphFichier.Fich_TOF.rech(parseInt(this.val));
                        this.nbLect += s3.nbVisites.nbLect;

                        this.grphFichier.Fich_TOF.delete(parseInt(this.val));
                        this.nbEcrit ++;

                        this.nbOper++;
                        this.logOper[this.nbOper] = [this.nbOper, this.nbLect, this.nbEcrit];
                        break;
                    default: break;
                }

                this.oper = "";
                $("#structuresSimples-TOFzdContenu ul li:first-child a").removeClass("active");
                $("#structuresSimples-TOFzdContenu div div:first-child").removeClass("active");
                $("#structuresSimples-TOFzdContenu ul li:nth-child(2) a").removeClass("active");
                $("#structuresSimples-TOFzdContenu div div:nth-child(2)").removeClass("active");
                $("#structuresSimples-TOFzdContenu ul li:nth-child(3) a").addClass("active");
                $("#structuresSimples-TOFzdContenu div div:nth-child(3)").addClass("active");

                this.index = -1;
                this.stop = false;
                
                this.grphFichier = new Grph_Fich_TOFzd(this.grphFichier.Fich_TOF, this.grphFichier._NbBlocMAX);
                $("#structuresSimples-TOFzd-MS_Contenu").empty();
                $("#structuresSimples-TOFzd-MS_Contenu").append(this.grphFichier.conteneur);
                $("#structuresSimples-TOFzd-MC_Contenu").empty();
                $("#structuresSimples-TOFzd-EXE p").html("Exécution");
                $("#structuresSimples-TOFzd-EXE_Contenu").empty();

                $(".barreTemps-barreEtapes div").width(0);
                $(".barreTemps-autoBtn button:first-child").css("visibility", "visible");
                $(".barreTemps-autoBtn button:last-child").css("visibility", "hidden");
                $(".barreTemps-precBtn button").prop('disabled', false);
                $(".barreTemps-suivBtn button").prop('disabled', false);

                this.textExe = "";
                this.tabEtapes = [];
    
                this.nombreBloc = parseInt(this.grphFichier.Fich_TOF.entete.nbBLOC);
                this.nombreZD = parseInt(this.grphFichier.Fich_TOF.entete.numZD) - this.nombreBloc - 1;
                this.nombreEnreg = parseInt(this.grphFichier.Fich_TOF.entete.nbEnrg);
        
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
        
                    var chart = new google.visualization.LineChart(document.getElementById('structuresSimples-TOFzd_Statistiques-LE'));
                    
                    chart.draw(data, options);
                }
            }
        }
    }
});

// Form de Création

$("#structureSimples_TOFzd_creationForm").hover(function(){
    $(this).css({
        "width": "300px",
        "height": "325px",
        "background-color": "#121212",
    });
    $("#structureSimples_TOFzd_creationForm p").css({
        "opacity": "1",
    });
    $("#structureSimples_TOFzd_creationForm input").css({
        "opacity": "1",
    });
}, 
function(){
    $(this).css({
        "width": "55px",
        "height": "55px",
        "background-color": "transparent",
    });
    $("#structureSimples_TOFzd_creationForm p").css({
        "opacity": "0",
    });
    $("#structureSimples_TOFzd_creationForm input").css({
        "opacity": "0",
    });

});