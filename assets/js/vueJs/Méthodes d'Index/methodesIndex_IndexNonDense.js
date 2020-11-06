var appIndexNonDense = new Vue({
    el: '#methodesIndex-IndexNonDenseContenu',

    data: {
        grphFichIndex: new Object(),
        grphFichier: new Object(),
        grphIndex: new Object(),
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
        nombreEnreg: 0,
        nombreInser: 0,
        nombreSuppr: 0,
        nbOper: 0,
        nbLect: 0, 
        nbEcrit: 0,
        logOper: [[0, 0, 0]],
    },

    methods: {

        init : function(){
            this.grphFichIndex = new Object();
            this.grphFichier = new Object();
            this.grphIndex = new Object();
            this.lecture_numHach = undefined;
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
            this.nombreEnreg = 0;
            this.nombreInser = 0;
            this.nombreSuppr = 0;
            this.nbOper = 0;
            this.nbLect = 0;
            this.nbEcrit = 0;
            this.logOper = [[0, 0, 0]];

            $("#methodesIndex-IndexNonDense-MS_Contenu").empty();
            $("#methodesIndex-IndexNonDense-MC_Contenu").empty();
            $("#methodesIndex-IndexNonDense-EXE_Contenu").empty();
            $("#methodesIndex-IndexNonDense-EXE p").html("Exécution");
            $("#methodesIndex-IndexNonDense-TabIndex_Contenu").empty();
            $(".barreTemps-barreEtapes div").width(0);

            // Changer la Page
            $("#methodesIndex-IndexNonDenseContenu ul li:first-child a").addClass("active");
            $("#methodesIndex-IndexNonDenseContenu div div:first-child").addClass("active");
            $("#methodesIndex-IndexNonDenseContenu ul li:nth-child(2) a").removeClass("active");
            $("#methodesIndex-IndexNonDenseContenu ul li:nth-child(3) a").removeClass("active");
            $("#methodesIndex-IndexNonDenseContenu div div:nth-child(2)").removeClass("active");
            $("#methodesIndex-IndexNonDenseContenu div div:nth-child(3)").removeClass("active");
            $("#methodesIndex-IndexNonDenseContenu ul li:nth-child(2) a").addClass("disabled");
            $("#methodesIndex-IndexNonDenseContenu ul li:nth-child(3) a").addClass("disabled");
        },
        
        creer : function(){
            // Création du Fichier
            let n1 = parseInt(this.nbBlocInit);
            let n2 = parseInt(this.nbEnregMax);
            let f = parseFloat(this.tauxChg);

            this.init();
            if(n1 >= 2 && n1 <= 7){
                if(n2 >= 1 && n2 <= 5){
                    if(f > 0 && f < 1){
                        let fichier = new FichTOF();
                        fichier.charINIT(n1, n2, f);

                        this.grphFichIndex = new Grph_Fich_IndexNonDense(fichier, n1);
                        this.grphFichier = this.grphFichIndex.Grph_fichier;
                        this.grphIndex = this.grphFichIndex.Grph_index;
                        
                        $("#methodesIndex-IndexNonDense-MS_Contenu").empty();
                        $("#methodesIndex-IndexNonDense-MS_Contenu").append(this.grphFichier.conteneur);

                        $("#methodesIndex-IndexNonDense-TabIndex_Contenu").empty();
                        $("#methodesIndex-IndexNonDense-TabIndex_Contenu").append(this.grphIndex.conteneur);

                        // Changer la Page
                        $("#methodesIndex-IndexNonDenseContenu ul li:first-child a").removeClass("active");
                        $("#methodesIndex-IndexNonDenseContenu div div:first-child").removeClass("active");
                        $("#methodesIndex-IndexNonDenseContenu ul li:nth-child(2) a").addClass("active");
                        $("#methodesIndex-IndexNonDenseContenu div div:nth-child(2)").addClass("active");
                        $("#methodesIndex-IndexNonDenseContenu ul li:nth-child(2) a").removeClass("disabled");
                        $("#methodesIndex-IndexNonDenseContenu ul li:nth-child(3) a").removeClass("disabled");

                        $(".barreTemps-autoBtn button:first-child").css("visibility", "visible");
                        $(".barreTemps-autoBtn button:last-child").css("visibility", "hidden");
                    }
                    else {
                        alert("Erreur : Le Taux de Chargement Initial doit être STRICTEMENT compris entre 0 et 1.");
                    }

                }
                else {
                    alert("Erreur : Le Nombre d'Enreg. Max dans le Bloc doit être compris entre 2 et 5.");
                }
            }
            else {
                alert("Erreur : Le Nombre de Blocs Max doit être compris entre 2 et 7.");
            }
        },  

        lecture : function(){
            if(this.index == this.tabEtapes.length-1){
                switch(this.oper){    
                    case "recherche": 
                        this.nbLect++;

                        this.nbOper++;
                        this.logOper[this.nbOper] = [this.nbOper, this.nbLect, this.nbEcrit];
                        break;  
                    case "insertion": 
                        this.nbLect++;

                        let b = inserer(parseInt(this.val), this.grphFichIndex.index, this.grphFichIndex.fichier);
                        if(b != false) this.nbEcrit++;
                        
                        this.nbOper++;
                        this.logOper[this.nbOper] = [this.nbOper, this.nbLect, this.nbEcrit];
                        break;
                    case "suppression": 
                        this.nbLect++;
                        this.nbEcrit += supprimer(parseInt(this.val), this.grphFichIndex.index, this.grphFichIndex.fichier);

                        this.nbOper++;
                        this.logOper[this.nbOper] = [this.nbOper, this.nbLect, this.nbEcrit];
                        break;
                    default: break;

                }

                this.grphFichIndex = new Grph_Fich_IndexNonDense(this.grphFichIndex.fichier, this.grphFichIndex.fichier.entete.nbBLOC);
                this.grphFichier = this.grphFichIndex.Grph_fichier;
                this.grphIndex = this.grphFichIndex.Grph_index;   

                let bloc = this.grphFichier.Fich_TOF.fich[this.lecture_numBloc-1];

                if(bloc != undefined){
                    let grphBloc = new Grph_BlocTOF_MC(bloc);
                    $("#methodesIndex-IndexNonDense-MC_Contenu").empty();
                    $("#methodesIndex-IndexNonDense-MC_Contenu").append(grphBloc.conteneur);

                    this.grphFichier = new Grph_Fich_TOF(this.grphFichIndex.fichier, this.grphFichIndex.fichier.entete.nbBLOC);
                    $("#methodesIndex-IndexNonDense-MS_Contenu").empty();
                    $("#methodesIndex-IndexNonDense-MS_Contenu").append(this.grphFichier.conteneur);
                    this.grphFichier.Tab_Rep_Bloc[this.lecture_numBloc-1].selectionBloc();

                    $("#methodesIndex-IndexNonDense-EXE p").html("Exécution");
                    $("#methodesIndex-IndexNonDense-EXE_Contenu").empty();

                    $("#methodesIndex-IndexNonDense-TabIndex_Contenu").empty();
                    $("#methodesIndex-IndexNonDense-TabIndex_Contenu").append(this.grphIndex.conteneur);

                    this.nbOper++;
                    this.nbLect++;
                    this.logOper[this.nbOper] = [this.nbOper, this.nbLect, this.nbEcrit];
                }
                else{
                    $("#methodesIndex-IndexNonDense-MS_Contenu").empty();
                    $("#methodesIndex-IndexNonDense-MS_Contenu").append(this.grphFichier.conteneur);
                    $("#methodesIndex-IndexNonDense-MC_Contenu").empty();
                    $("#methodesIndex-IndexNonDense-EXE p").html("Exécution");
                    $("#methodesIndex-IndexNonDense-EXE_Contenu").empty();
                    
                    $("#methodesIndex-IndexNonDense-TabIndex_Contenu").empty();
                    $("#methodesIndex-IndexNonDense-TabIndex_Contenu").append(this.grphIndex.conteneur);

                
                    if(this.lecture_numBloc >= 1 && this.lecture_numBloc <= this.grphFichier.Fich_TOF.nbBLOC)
                        alert("Erreur : Lecture Impossible ... Bloc " +this.lecture_numBloc+ " Introuvable.");
                    else alert("Erreur : Lecture Impossible ... Le Numéro du Bloc est compris entre 1 et "+this.grphFichier.Fich_TOF.nbBLOC+".");
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
                        this.nbLect++;

                        this.nbOper++;
                        this.logOper[this.nbOper] = [this.nbOper, this.nbLect, this.nbEcrit];
                        break;  
                    case "insertion": 
                        this.nbLect++;

                        let b = inserer(parseInt(this.val), this.grphFichIndex.index, this.grphFichIndex.fichier);
                        if(b != false) this.nbEcrit++;
                        
                        this.nbOper++;
                        this.logOper[this.nbOper] = [this.nbOper, this.nbLect, this.nbEcrit];
                        break;
                    case "suppression": 
                        this.nbLect++;
                        this.nbEcrit += supprimer(parseInt(this.val), this.grphFichIndex.index, this.grphFichIndex.fichier);

                        this.nbOper++;
                        this.logOper[this.nbOper] = [this.nbOper, this.nbLect, this.nbEcrit];
                        break;
                    default: break;
                }

                this.grphFichIndex = new Grph_Fich_IndexNonDense(this.grphFichIndex.fichier, this.grphFichIndex.fichier.entete.nbBLOC);
                this.grphFichier = this.grphFichIndex.Grph_fichier;
                this.grphIndex = this.grphFichIndex.Grph_index;

                $("#methodesIndex-IndexNonDense-MS_Contenu").empty();
                $("#methodesIndex-IndexNonDense-MS_Contenu").append(this.grphFichier.conteneur);
                $("#methodesIndex-IndexNonDense-MC_Contenu").empty();
                $("#methodesIndex-IndexNonDense-EXE p").html("Exécution");
                $("#methodesIndex-IndexNonDense-EXE_Contenu").empty();

                $("#methodesIndex-IndexNonDense-TabIndex_Contenu").empty();
                $("#methodesIndex-IndexNonDense-TabIndex_Contenu").append(this.grphIndex.conteneur);

                this.oper = oper;
                this.tabEtapes = [];
                switch(this.oper){
                    case "recherche": 
                        if(this.recherche_val >= -9999 && this.recherche_val <= 9999){
                            this.val = this.recherche_val;
                            this.tabEtapes = this.grphFichIndex.rechercher(parseInt(this.val), "this.grphFichIndex", "this.grphIndex", "this.grphFichier", "#methodesIndex-IndexNonDense-MC_Contenu");
                            $("#methodesIndex-IndexNonDense-EXE p").html("Exécution : Recherche("+parseInt(this.val)+")");
                            this.textExe = "Rech. Dichotomique dans Index<br/>";
                        }
                        else alert("Erreur : La Valeur à Rechercher doit être comprise entre -9999 et 9999.");

                        // Réinitialisation
                        this.recherche_val = undefined;

                        break;
                    case "insertion": 
                        if(this.insertion_val >= -9999 && this.insertion_val <= 9999){
                            this.val = this.insertion_val;
                            this.tabEtapes = this.grphFichIndex.inserer(parseInt(this.val), "this.grphFichIndex", "this.grphIndex", "this.grphFichier", "#methodesIndex-IndexNonDense-MC_Contenu");
                            $("#methodesIndex-IndexNonDense-EXE p").html("Exécution : Insertion("+parseInt(this.val)+")");
                            this.textExe = "Rech. Dichotomique dans Index<br/>";
                        }
                        else alert("Erreur : La Valeur à Insérer doit être comprise entre -9999 et 9999.");

                        // Réinitialisation
                        this.insertion_val = undefined;

                        break;
                    case "suppression":
                        if(this.suppression_val >= -9999 && this.suppression_val <= 9999){
                            this.val = this.suppression_val; 
                            this.tabEtapes = this.grphFichIndex.supprimer(parseInt(this.val), "this.grphFichIndex", "this.grphIndex", "this.grphFichier", "#methodesIndex-IndexNonDense-MC_Contenu");
                            $("#methodesIndex-IndexNonDense-EXE p").html("Exécution : Suppression("+parseInt(this.val)+")");
                            this.textExe = "Rech. Dichotomique dans Index<br/>";
                        }
                        else alert("Erreur : La Valeur à Supprimer doit être comprise entre -9999 et 9999.");

                        // Réinitialisation
                        this.suppression_val = undefined;
                        
                        break;
                }
                this.index = -1;
                this.stop = false;
                $(".barreTemps-barreEtapes div").width(0);
                $("#methodesIndex-IndexNonDenseContenu ul li:nth-child(3) a").addClass("disabled");
            }
        },

        operation : async function(){
            while((this.index < this.tabEtapes.length-1) && (this.stop == false)){
                this.index++;
                eval(this.tabEtapes[this.index].code);

                // Controle Stats
                if(this.index != this.tabEtapes.length-1){
                    $("#methodesIndex-IndexNonDenseContenu ul li:nth-child(3) a").addClass("disabled");
                }
                else $("#methodesIndex-IndexNonDenseContenu ul li:nth-child(3) a").removeClass("disabled");

                // Log de l'Exécution
                if(this.tabEtapes[this.index].algorithme != "") this.textExe += this.tabEtapes[this.index].algorithme + "<br/>";
                $("#methodesIndex-IndexNonDense-EXE_Contenu").html(this.textExe);

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
                $("#methodesIndex-IndexNonDense-EXE_Contenu").html(this.textExe);

                let w0 = 100 / this.tabEtapes.length;
                let w = $(".barreTemps-barreEtapes div").width() + w0;
                $(".barreTemps-barreEtapes div").width(w);

                // Controle Stats
                if(this.index != this.tabEtapes.length-1){
                    $("#methodesIndex-IndexNonDenseContenu ul li:nth-child(3) a").addClass("disabled");
                }
                else $("#methodesIndex-IndexNonDenseContenu ul li:nth-child(3) a").removeClass("disabled");
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
                        this.textExe = "Rech. Dichotomique dans Index<br/>";
                        break;
                    case "insertion": 
                    this.textExe = "Rech. Dichotomique dans Index<br/>";
                        break;
                    case "suppression":
                        this.textExe = "Rech. Dichotomique dans Index<br/>";
                        break;
                }
                for(let i = 0; i <= this.index; i++)
                    if(this.tabEtapes[i].algorithme != "") this.textExe += this.tabEtapes[i].algorithme + "<br/>";
                $("#methodesIndex-IndexNonDense-EXE_Contenu").html(this.textExe);
            
                // Animation 'Barre temps'
                let w0 = 100 / this.tabEtapes.length;
                let w = $(".barreTemps-barreEtapes div").width() - w0;
                $(".barreTemps-barreEtapes div").width(w);

                // Controle Stats
                if(this.index != this.tabEtapes.length-1){
                    $("#methodesIndex-IndexNonDenseContenu ul li:nth-child(3) a").addClass("disabled");
                }
                else $("#methodesIndex-IndexNonDenseContenu ul li:nth-child(3) a").removeClass("disabled");
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

            this.grphFichIndex = new Grph_Fich_IndexNonDense(this.grphFichIndex.fichier, this.grphFichIndex.fichier.entete.nbBLOC);
            this.grphFichier = this.grphFichIndex.Grph_fichier;
            this.grphIndex = this.grphFichIndex.Grph_index;

            $("#methodesIndex-IndexNonDense-MS_Contenu").empty();
            $("#methodesIndex-IndexNonDense-MS_Contenu").append(this.grphFichier.conteneur);
            $("#methodesIndex-IndexNonDense-MC_Contenu").empty();
            $("#methodesIndex-IndexNonDense-EXE_Contenu").empty();

            $("#methodesIndex-IndexNonDense-TabIndex_Contenu").empty();
            $("#methodesIndex-IndexNonDense-TabIndex_Contenu").append(this.grphIndex.conteneur);

            $(".barreTemps-barreEtapes div").width(0);
            $(".barreTemps-autoBtn button:first-child").css("visibility", "visible");
            $(".barreTemps-autoBtn button:last-child").css("visibility", "hidden");
            $(".barreTemps-precBtn button").prop('disabled', false);
            $(".barreTemps-suivBtn button").prop('disabled', false);
            $("#methodesIndex-IndexNonDenseContenu ul li:nth-child(3) a").addClass("disabled");

            switch(this.oper){
                case "recherche": 
                    this.textExe = "Rech. Dichotomique dans Index<br/>";
                    break;
                case "insertion": 
                this.textExe = "Rech. Dichotomique dans Index<br/>";
                    break;
                case "suppression":
                    this.textExe = "Rech. Dichotomique dans Index<br/>";
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
                        this.nbLect++;

                        this.nbOper++;
                        this.logOper[this.nbOper] = [this.nbOper, this.nbLect, this.nbEcrit];
                        break;  
                    case "insertion": 
                        this.nbLect++;

                        let b = inserer(parseInt(this.val), this.grphFichIndex.index, this.grphFichIndex.fichier);
                        if(b != false) this.nbEcrit++;
                        
                        this.nbOper++;
                        this.logOper[this.nbOper] = [this.nbOper, this.nbLect, this.nbEcrit];
                        break;
                    case "suppression": 
                        this.nbLect++;
                        this.nbEcrit += supprimer(parseInt(this.val), this.grphFichIndex.index, this.grphFichIndex.fichier);

                        this.nbOper++;
                        this.logOper[this.nbOper] = [this.nbOper, this.nbLect, this.nbEcrit];
                        break;
                    default: break;
                }

                this.oper = "";
                $("#methodesIndex-IndexNonDenseContenu ul li:first-child a").removeClass("active");
                $("#methodesIndex-IndexNonDenseContenu div div:first-child").removeClass("active");
                $("#methodesIndex-IndexNonDenseContenu ul li:nth-child(2) a").removeClass("active");
                $("#methodesIndex-IndexNonDenseContenu div div:nth-child(2)").removeClass("active");
                $("#methodesIndex-IndexNonDenseContenu ul li:nth-child(3) a").addClass("active");
                $("#methodesIndex-IndexNonDenseContenu div div:nth-child(3)").addClass("active");

                this.index = -1;
                this.stop = false;

                this.grphFichIndex = new Grph_Fich_IndexNonDense(this.grphFichIndex.fichier, this.grphFichIndex.fichier.entete.nbBLOC);
                this.grphFichier = this.grphFichIndex.Grph_fichier;
                this.grphIndex = this.grphFichIndex.Grph_index;

                $("#methodesIndex-IndexNonDense-MS_Contenu").empty();
                $("#methodesIndex-IndexNonDense-MS_Contenu").append(this.grphFichier.conteneur);
                $("#methodesIndex-IndexNonDense-MC_Contenu").empty();
                $("#methodesIndex-IndexNonDense-EXE p").html("Exécution");
                $("#methodesIndex-IndexNonDense-EXE_Contenu").empty();
                $("#methodesIndex-IndexNonDense-TabIndex_Contenu").empty();
                $("#methodesIndex-IndexNonDense-TabIndex_Contenu").append(this.grphIndex.conteneur);

                $(".barreTemps-barreEtapes div").width(0);
                $(".barreTemps-autoBtn button:first-child").css("visibility", "visible");
                $(".barreTemps-autoBtn button:last-child").css("visibility", "hidden");
                $(".barreTemps-precBtn button").prop('disabled', false);
                $(".barreTemps-suivBtn button").prop('disabled', false);

                this.textExe = "";
                this.tabEtapes = [];

        
                this.nombreBloc = parseInt(this.grphFichIndex.fichier.entete.nbBLOC);
                this.nombreEnreg = parseInt(this.grphFichIndex.fichier.entete.nbEnrg);
                this.nombreInser = parseInt(this.grphFichIndex.fichier.entete.nbINS);
                this.nombreSuppr = parseInt(this.grphFichIndex.fichier.entete.nbSupp);
        
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
                    
                    var chart = new google.visualization.LineChart(document.getElementById('methodesIndex-IndexNonDense_Statistiques-LE'));
                    
                    chart.draw(data, options);
                }
            }
        }
    }
});


// Form de Création

$("#methodesIndex_IndexNonDense_creationForm").hover(function(){
    $(this).css({
        "width": "300px",
        "height": "325px",
        "background-color": "#121212",
    });
    $("#methodesIndex_IndexNonDense_creationForm p").css({
        "opacity": "1",
    });
    $("#methodesIndex_IndexNonDense_creationForm input").css({
        "opacity": "1",
    });
}, 
function(){
    $(this).css({
        "width": "55px",
        "height": "55px",
        "background-color": "transparent",
    });
    $("#methodesIndex_IndexNonDense_creationForm p").css({
        "opacity": "0",
    });
    $("#methodesIndex_IndexNonDense_creationForm input").css({
        "opacity": "0",
    });

});
