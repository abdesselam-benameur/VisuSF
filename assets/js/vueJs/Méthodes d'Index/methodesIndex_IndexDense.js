var appIndexDense = new Vue({
    el: '#methodesIndex-IndexDenseContenu',

    data: {
        grphFichier: new Object(),
        grphIndex: new Object(),
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
            this.grphIndex = new Object();
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

            $("#methodesIndex-IndexDense-MS_Contenu").empty();
            $("#methodesIndex-IndexDense-MC_Contenu").empty();
            $("#methodesIndex-IndexDense-EXE_Contenu").empty();
            $("#methodesIndex-IndexDense-EXE p").html("Exécution");
            $("#methodesIndex-IndexDense-TabIndex_Contenu").empty();
            $(".barreTemps-barreEtapes div").width(0);

            // Changer la Page
            $("#methodesIndex-IndexDenseContenu ul li:first-child a").addClass("active");
            $("#methodesIndex-IndexDenseContenu div div:first-child").addClass("active");
            $("#methodesIndex-IndexDenseContenu ul li:nth-child(2) a").removeClass("active");
            $("#methodesIndex-IndexDenseContenu ul li:nth-child(3) a").removeClass("active");
            $("#methodesIndex-IndexDenseContenu div div:nth-child(2)").removeClass("active");
            $("#methodesIndex-IndexDenseContenu div div:nth-child(3)").removeClass("active");
            $("#methodesIndex-IndexDenseContenu ul li:nth-child(2) a").addClass("disabled");
            $("#methodesIndex-IndexDenseContenu ul li:nth-child(3) a").addClass("disabled");
        },
        
        creer : function(){
            // Création du Fichier
            let tabVal = [];
            let n1 = parseInt(this.nbBlocMax);
            let n2 = parseInt(this.nbEnregMax);
            for(let i = 0; i < (n1 * n2); i++) tabVal[i] = i;

            this.init();
            if(n1 >= 2 && n1 <= 5){
                if(n2 >= 2 && n2 <= 3){
                    let fichier = new Fichier_TnOF(n1, n2);
                    fichier.chgInit(tabVal);
                                
                    this.grphFichier = new Grph_Fichier_TnOF(fichier);
                    $("#methodesIndex-IndexDense-MS_Contenu").empty();
                    $("#methodesIndex-IndexDense-MS_Contenu").append(this.grphFichier.conteneur);

                    // Création de l'Index
                    let index = new IndexDense();
                    index.chargIndex(this.grphFichier.fichier_TnOF);

                    this.grphIndex = new Graph_IndexDense(index, true);
                    $("#methodesIndex-IndexDense-TabIndex_Contenu").empty();
                    $("#methodesIndex-IndexDense-TabIndex_Contenu").append(this.grphIndex.conteneur);

                    // Changer la Page
                    $("#methodesIndex-IndexDenseContenu ul li:first-child a").removeClass("active");
                    $("#methodesIndex-IndexDenseContenu div div:first-child").removeClass("active");
                    $("#methodesIndex-IndexDenseContenu ul li:nth-child(2) a").addClass("active");
                    $("#methodesIndex-IndexDenseContenu div div:nth-child(2)").addClass("active");
                    $("#methodesIndex-IndexDenseContenu ul li:nth-child(2) a").removeClass("disabled");
                    $("#methodesIndex-IndexDenseContenu ul li:nth-child(3) a").removeClass("disabled");

                    $(".barreTemps-autoBtn button:first-child").css("visibility", "visible");
                    $(".barreTemps-autoBtn button:last-child").css("visibility", "hidden");

                }
                else {
                    alert("Erreur : Le Nombre d'Enreg. Max dans le Bloc doit être compris entre 2 et 3.");
                }
            }
            else {
                alert("Erreur : Le Nombre de Blocs Max doit être compris entre 2 et 5.");
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

                        this.grphFichier.fichier_TnOF.insertion(new EnregFixe(parseInt(this.val)));
                        let res1 = this.grphIndex.index.rechercher(parseInt(this.val));
                        if(!res1.trouv) {
                            let e = {
                                cle: parseInt(this.val),
                                adr: {
                                    i: this.grphFichier.fichier_TnOF.entete.dernBlocNonVide,
                                    j: this.grphFichier.fichier_TnOF.tabBloc[this.grphFichier.fichier_TnOF.entete.dernBlocNonVide].nb-1,
                                }
                            }
                            this.grphIndex.index.inserer(e, res1.i); 

                            this.nbEcrit++;
                        }

                        this.nbOper++;
                        this.logOper[this.nbOper] = [this.nbOper, this.nbLect, this.nbEcrit];
                        break;
                    case "suppression": 
                        this.nbLect++;

                        this.grphFichier.fichier_TnOF.suppression(parseInt(this.val));
                        let res2 = this.grphIndex.index.rechercher(parseInt(this.val));
                        if(res2.trouv) {
                            this.grphIndex.index.supprimer(res2.i);
                            this.nbEcrit++;
                        }

                        this.nbOper++;
                        this.logOper[this.nbOper] = [this.nbOper, this.nbLect, this.nbEcrit];
                        break;
                    default: break;
                }

                let bloc = this.grphFichier.fichier_TnOF.tabBloc[this.lecture_numBloc-1];

                if(bloc != undefined){
                    let grphBloc = new Grph_Bloc_TnOF(bloc, this.grphFichier.fichier_TnOF.entete.nbEnregMax, true);
                    $("#methodesIndex-IndexDense-MC_Contenu").empty();
                    $("#methodesIndex-IndexDense-MC_Contenu").append(grphBloc.conteneur);

                    this.grphFichier = new Grph_Fichier_TnOF(this.grphFichier.fichier_TnOF);
                    $("#methodesIndex-IndexDense-MS_Contenu").empty();
                    $("#methodesIndex-IndexDense-MS_Contenu").append(this.grphFichier.conteneur);
                    this.grphFichier.selection(this.lecture_numBloc-1);

                    $("#methodesIndex-IndexDense-EXE p").html("Exécution");
                    $("#methodesIndex-IndexDense-EXE_Contenu").empty();

                    let index = new IndexDense();
                    index.chargIndex(this.grphFichier.fichier_TnOF);
                    this.grphIndex = new Graph_IndexDense(index, false);
                    $("#methodesIndex-IndexDense-TabIndex_Contenu").empty();
                    $("#methodesIndex-IndexDense-TabIndex_Contenu").append(this.grphIndex.conteneur);

                    this.nbOper++;
                    this.nbLect++;
                    this.logOper[this.nbOper] = [this.nbOper, this.nbLect, this.nbEcrit];
                }
                else{
                    this.grphFichier = new Grph_Fichier_TnOF(this.grphFichier.fichier_TnOF);
                    $("#methodesIndex-IndexDense-MS_Contenu").empty();
                    $("#methodesIndex-IndexDense-MS_Contenu").append(this.grphFichier.conteneur);
                    $("#methodesIndex-IndexDense-MC_Contenu").empty();
                    $("#methodesIndex-IndexDense-EXE p").html("Exécution");
                    $("#methodesIndex-IndexDense-EXE_Contenu").empty();
                    let index = new IndexDense();
                    index.chargIndex(this.grphFichier.fichier_TnOF);
                    this.grphIndex = new Graph_IndexDense(index, false);
                    $("#methodesIndex-IndexDense-TabIndex_Contenu").empty();
                    $("#methodesIndex-IndexDense-TabIndex_Contenu").append(this.grphIndex.conteneur);

                
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
                        this.nbLect++;

                        this.nbOper++;
                        this.logOper[this.nbOper] = [this.nbOper, this.nbLect, this.nbEcrit];
                        break;  
                    case "insertion": 
                        this.nbLect++;

                        this.grphFichier.fichier_TnOF.insertion(new EnregFixe(parseInt(this.val)));
                        let res1 = this.grphIndex.index.rechercher(parseInt(this.val));
                        if(!res1.trouv) {
                            let e = {
                                cle: parseInt(this.val),
                                adr: {
                                    i: this.grphFichier.fichier_TnOF.entete.dernBlocNonVide,
                                    j: this.grphFichier.fichier_TnOF.tabBloc[this.grphFichier.fichier_TnOF.entete.dernBlocNonVide].nb-1,
                                }
                            }
                            this.grphIndex.index.inserer(e, res1.i); 

                            this.nbEcrit++;
                        }

                        this.nbOper++;
                        this.logOper[this.nbOper] = [this.nbOper, this.nbLect, this.nbEcrit];
                        break;
                    case "suppression": 
                        this.nbLect++;
                        
                        this.grphFichier.fichier_TnOF.suppression(parseInt(this.val));
                        let res2 = this.grphIndex.index.rechercher(parseInt(this.val));
                        if(res2.trouv) {
                            this.grphIndex.index.supprimer(res2.i);
                            this.nbEcrit++;
                        }

                        this.nbOper++;
                        this.logOper[this.nbOper] = [this.nbOper, this.nbLect, this.nbEcrit];
                        break;
                    default: break;
                }

                this.grphFichier = new Grph_Fichier_TnOF(this.grphFichier.fichier_TnOF);
                $("#methodesIndex-IndexDense-MS_Contenu").empty();
                $("#methodesIndex-IndexDense-MS_Contenu").append(this.grphFichier.conteneur);
                $("#methodesIndex-IndexDense-MC_Contenu").empty();
                $("#methodesIndex-IndexDense-EXE p").html("Exécution");
                $("#methodesIndex-IndexDense-EXE_Contenu").empty();
                let index = new IndexDense();
                index.chargIndex(this.grphFichier.fichier_TnOF);
                this.grphIndex = new Graph_IndexDense(index, false);
                $("#methodesIndex-IndexDense-TabIndex_Contenu").empty();
                $("#methodesIndex-IndexDense-TabIndex_Contenu").append(this.grphIndex.conteneur);

                this.oper = oper;
                this.tabEtapes = [];
                switch(this.oper){
                    case "recherche": 
                        if(this.recherche_val >= -99 && this.recherche_val <= 99){
                            this.val = this.recherche_val;
                            this.tabEtapes = this.grphIndex.rechercher(parseInt(this.val), "this.grphIndex", "this.grphFichier", "#methodesIndex-IndexDense-MC_Contenu");
                            $("#methodesIndex-IndexDense-EXE p").html("Exécution : Recherche("+parseInt(this.val)+")");
                            this.textExe = "Rech. Dichotomique dans Index<br/>";
                        }
                        else alert("Erreur : La Valeur à Rechercher doit être comprise entre -99 et 99.");

                        // Réinitialisation
                        this.recherche_val = undefined;

                        break;
                    case "insertion": 
                        if(this.insertion_val >= -99 && this.insertion_val <= 99){
                            this.val = this.insertion_val;
                            this.tabEtapes = this.grphIndex.inserer(parseInt(this.val), "this.grphIndex", "this.grphFichier", "#methodesIndex-IndexDense-MC_Contenu");
                            $("#methodesIndex-IndexDense-EXE p").html("Exécution : Insertion("+parseInt(this.val)+")");
                            this.textExe = "Accès au Premier Bloc Libre<br/>";
                        }
                        else alert("Erreur : La Valeur à Insérer doit être comprise entre -99 et 99.");

                        // Réinitialisation
                        this.insertion_val = undefined;

                        break;
                    case "suppression":
                        if(this.suppression_val >= -99 && this.suppression_val <= 99){
                            this.val = this.suppression_val; 
                            this.tabEtapes = this.grphIndex.supprimer(parseInt(this.val), "this.grphIndex", "this.grphFichier", "#methodesIndex-IndexDense-MC_Contenu");
                            $("#methodesIndex-IndexDense-EXE p").html("Exécution : Suppression("+parseInt(this.val)+")");
                            this.textExe = "Rech. Dichotomique dans Index<br/>";
                        }
                        else alert("Erreur : La Valeur à Supprimer doit être comprise entre -99 et 99.");

                        // Réinitialisation
                        this.suppression_val = undefined;
                        
                        break;
                }
                this.index = -1;
                this.stop = false;
                $(".barreTemps-barreEtapes div").width(0);
                $("#methodesIndex-IndexDenseContenu ul li:nth-child(3) a").addClass("disabled");
            }
        },

        operation : async function(){
            while((this.index < this.tabEtapes.length-1) && (this.stop == false)){
                this.index++;
                eval(this.tabEtapes[this.index].code);

                // Controle Stats
                if(this.index != this.tabEtapes.length-1){
                    $("#methodesIndex-IndexDenseContenu ul li:nth-child(3) a").addClass("disabled");
                }
                else $("#methodesIndex-IndexDenseContenu ul li:nth-child(3) a").removeClass("disabled");

                // Log de l'Exécution
                if(this.tabEtapes[this.index].algorithme != "") this.textExe += this.tabEtapes[this.index].algorithme + "<br/>";
                $("#methodesIndex-IndexDense-EXE_Contenu").html(this.textExe);

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
                $("#methodesIndex-IndexDense-EXE_Contenu").html(this.textExe);

                let w0 = 100 / this.tabEtapes.length;
                let w = $(".barreTemps-barreEtapes div").width() + w0;
                $(".barreTemps-barreEtapes div").width(w);

                // Controle Stats
                if(this.index != this.tabEtapes.length-1){
                    $("#methodesIndex-IndexDenseContenu ul li:nth-child(3) a").addClass("disabled");
                }
                else $("#methodesIndex-IndexDenseContenu ul li:nth-child(3) a").removeClass("disabled");
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
                    this.textExe = "Accès au Premier Bloc Libre<br/>";
                        break;
                    case "suppression":
                        this.textExe = "Rech. Dichotomique dans Index<br/>";
                        break;
                }
                for(let i = 0; i <= this.index; i++)
                    if(this.tabEtapes[i].algorithme != "") this.textExe += this.tabEtapes[i].algorithme + "<br/>";
                $("#methodesIndex-IndexDense-EXE_Contenu").html(this.textExe);
            
                // Animation 'Barre temps'
                let w0 = 100 / this.tabEtapes.length;
                let w = $(".barreTemps-barreEtapes div").width() - w0;
                $(".barreTemps-barreEtapes div").width(w);

                // Controle Stats
                if(this.index != this.tabEtapes.length-1){
                    $("#methodesIndex-IndexDenseContenu ul li:nth-child(3) a").addClass("disabled");
                }
                else $("#methodesIndex-IndexDenseContenu ul li:nth-child(3) a").removeClass("disabled");
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
            $("#methodesIndex-IndexDense-MS_Contenu").empty();
            $("#methodesIndex-IndexDense-MS_Contenu").append(this.grphFichier.conteneur);
            $("#methodesIndex-IndexDense-MC_Contenu").empty();
            $("#methodesIndex-IndexDense-EXE_Contenu").empty();

            let index = new IndexDense();
            index.chargIndex(this.grphFichier.fichier_TnOF);
            this.grphIndex = new Graph_IndexDense(index, false);
            $("#methodesIndex-IndexDense-TabIndex_Contenu").empty();
            $("#methodesIndex-IndexDense-TabIndex_Contenu").append(this.grphIndex.conteneur);

            $(".barreTemps-barreEtapes div").width(0);
            $(".barreTemps-autoBtn button:first-child").css("visibility", "visible");
            $(".barreTemps-autoBtn button:last-child").css("visibility", "hidden");
            $(".barreTemps-precBtn button").prop('disabled', false);
            $(".barreTemps-suivBtn button").prop('disabled', false);
            $("#methodesIndex-IndexDenseContenu ul li:nth-child(3) a").addClass("disabled");

            switch(this.oper){
                case "recherche": 
                    this.textExe = "Rech. Dichotomique dans Index<br/>";
                    break;
                case "insertion": 
                this.textExe = "Accès au Premier Bloc Libre<br/>";
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

                        this.grphFichier.fichier_TnOF.insertion(new EnregFixe(parseInt(this.val)));
                        let res1 = this.grphIndex.index.rechercher(parseInt(this.val));
                        if(!res1.trouv) {
                            let e = {
                                cle: parseInt(this.val),
                                adr: {
                                    i: this.grphFichier.fichier_TnOF.entete.dernBlocNonVide,
                                    j: this.grphFichier.fichier_TnOF.tabBloc[this.grphFichier.fichier_TnOF.entete.dernBlocNonVide].nb-1,
                                }
                            }
                            this.grphIndex.index.inserer(e, res1.i); 

                            this.nbEcrit++;
                        }

                        this.nbOper++;
                        this.logOper[this.nbOper] = [this.nbOper, this.nbLect, this.nbEcrit];
                        break;
                    case "suppression": 
                        this.nbLect++;
                        
                        this.grphFichier.fichier_TnOF.suppression(parseInt(this.val));
                        let res2 = this.grphIndex.index.rechercher(parseInt(this.val));
                        if(res2.trouv) {
                            this.grphIndex.index.supprimer(res2.i);
                            this.nbEcrit++;
                        }

                        this.nbOper++;
                        this.logOper[this.nbOper] = [this.nbOper, this.nbLect, this.nbEcrit];
                        break;
                    default: break;
                }

                this.oper = "";
                $("#methodesIndex-IndexDenseContenu ul li:first-child a").removeClass("active");
                $("#methodesIndex-IndexDenseContenu div div:first-child").removeClass("active");
                $("#methodesIndex-IndexDenseContenu ul li:nth-child(2) a").removeClass("active");
                $("#methodesIndex-IndexDenseContenu div div:nth-child(2)").removeClass("active");
                $("#methodesIndex-IndexDenseContenu ul li:nth-child(3) a").addClass("active");
                $("#methodesIndex-IndexDenseContenu div div:nth-child(3)").addClass("active");

                this.index = -1;
                this.stop = false;
                this.grphFichier = new Grph_Fichier_TnOF(this.grphFichier.fichier_TnOF);
                $("#methodesIndex-IndexDense-MS_Contenu").empty();
                $("#methodesIndex-IndexDense-MS_Contenu").append(this.grphFichier.conteneur);
                $("#methodesIndex-IndexDense-MC_Contenu").empty();
                $("#methodesIndex-IndexDense-EXE p").html("Exécution");
                $("#methodesIndex-IndexDense-EXE_Contenu").empty();

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
                    
                    var chart = new google.visualization.LineChart(document.getElementById('methodesIndex-IndexDense_Statistiques-LE'));
                    
                    chart.draw(data, options);
                }
            }
        }
    }
});


// Form de Création

$("#methodesIndex_IndexDense_creationForm").hover(function(){
    $(this).css({
        "width": "300px",
        "height": "325px",
        "background-color": "#121212",
    });
    $("#methodesIndex_IndexDense_creationForm p").css({
        "opacity": "1",
    });
    $("#methodesIndex_IndexDense_creationForm input").css({
        "opacity": "1",
    });
}, 
function(){
    $(this).css({
        "width": "55px",
        "height": "55px",
        "background-color": "transparent",
    });
    $("#methodesIndex_IndexDense_creationForm p").css({
        "opacity": "0",
    });
    $("#methodesIndex_IndexDense_creationForm input").css({
        "opacity": "0",
    });

});
