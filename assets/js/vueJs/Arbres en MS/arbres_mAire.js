var appArbre = new Vue({
    el: '#arbres-mAireContenu',

    data: {
        grphFichier: new Object(),
        lecture_numBloc: undefined,
        recherche_val: undefined,
        insertion_val: undefined,
        suppression_val: undefined,
        ordre: undefined,
        nbEnregInit: undefined,

        oper: "",
        val: undefined,
        vitesse: 50,
        tabEtapes: [],
        textExe: "",
        index: -1,   
        stop: false,   

        ordreArb: 0,
        nbNoeud: 0,
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
            this.ordre = undefined;
            this.nbEnregInit = undefined;

            this.oper = "";
            this.val = undefined;
            this.vitesse = 50;
            this.tabEtapes = [];
            this.textExe = "";
            this.index = -1;
            this.stop = false;   
            
            this.ordreArb = 0;
            this.nbNoeud = 0;
            this.nbOper = 0;
            this.nbLect = 0;
            this.nbEcrit = 0;
            this.logOper = [[0, 0, 0]];

            $("#arbres-mAire-MS_Contenu").empty();
            $("#arbres-mAire-MC_Contenu").empty();
            $("#arbres-mAire-EXE_Contenu").empty();
            $("#arbres-mAire-EXE p").html("Exécution");
            $(".barreTemps-barreEtapes div").width(0);

            // Changer la Page
            $("#arbres-mAireContenu ul li:first-child a").addClass("active");
            $("#arbres-mAireContenu div div:first-child").addClass("active");
            $("#arbres-mAireContenu ul li:nth-child(2) a").removeClass("active");
            $("#arbres-mAireContenu ul li:nth-child(3) a").removeClass("active");
            $("#arbres-mAireContenu div div:nth-child(2)").removeClass("active");
            $("#arbres-mAireContenu div div:nth-child(3)").removeClass("active");
            $("#arbres-mAireContenu ul li:nth-child(2) a").addClass("disabled");
            $("#arbres-mAireContenu ul li:nth-child(3) a").addClass("disabled");
        },
        
        creer : function(){

            let n1 = parseInt(this.ordre);
            let n2 = parseInt(this.nbEnregInit);

            let tabVal = [];
            for(let i = 0; i < n2; i++) tabVal[i] = i;
        
            this.init();
            if(n1 >= 2 && n1 <= 4){
                if(n2 >= 0 && n2 <= 4){
                    let fichier = new Fichier_Arbre(n1);
                    fichier.chgInit(tabVal);
                                
                    this.grphFichier = new Grph_Fichier_Arbre(fichier);
                    $("#arbres-mAire-MS_Contenu").empty();
                    $("#arbres-mAire-MS_Contenu").append(this.grphFichier.conteneur);

                    // Changer la Page
                    $("#arbres-mAireContenu ul li:first-child a").removeClass("active");
                    $("#arbres-mAireContenu div div:first-child").removeClass("active");
                    $("#arbres-mAireContenu ul li:nth-child(2) a").addClass("active");
                    $("#arbres-mAireContenu div div:nth-child(2)").addClass("active");
                    $("#arbres-mAireContenu ul li:nth-child(2) a").removeClass("disabled");
                    $("#arbres-mAireContenu ul li:nth-child(3) a").removeClass("disabled");

                    $(".barreTemps-autoBtn button:first-child").css("visibility", "visible");
                    $(".barreTemps-autoBtn button:last-child").css("visibility", "hidden");
                }
                else {
                    alert("Erreur : Le Nombre d'Enreg. Initial doit être compris entre 0 et 4.");
                }
            }
            else {
                alert("Erreur : L'Ordrede l'Arbre doit être compris entre 2 et 4.");
            }
        },  

        lecture : function(){
            if(this.index == this.tabEtapes.length-1){
                switch(this.oper){  
                    case "recherche": 
                        let s1 = this.grphFichier.fichier_arbre.recherche(parseInt(this.val));

                        this.nbLect += s1.nbLect;
                        this.nbEcrit += s1.nbEcrit;

                        this.nbOper++;
                        this.logOper[this.nbOper] = [this.nbOper, this.nbLect, this.nbEcrit];
                        break;    
                    case "insertion": 
                        if((this.tabEtapes[this.tabEtapes.length-1].algorithme != "Err >> Pas d'Espace Mémoire")&&
                            (this.tabEtapes[this.tabEtapes.length-1].algorithme != "Err >> Hauteur Max = 2")){
                            let s2 = this.grphFichier.fichier_arbre.insertion(new EnregArbre(parseInt(this.val)));
            
                            this.nbLect += s2.nbLect;
                            this.nbEcrit += s2.nbEcrit;
                        }
                        else{
                            let s2 = this.grphFichier.fichier_arbre.recherche(parseInt(this.val));

                            this.nbLect += s2.nbLect;
                            this.nbEcrit += s2.nbEcrit;
                        }

                        this.nbOper++;
                        this.logOper[this.nbOper] = [this.nbOper, this.nbLect, this.nbEcrit];
                        break;
                    case "suppression": 
                        let s3 = this.grphFichier.fichier_arbre.suppression(parseInt(this.val));

                        this.nbLect += s3.nbLect;
                        this.nbEcrit += s3.nbEcrit;

                        this.nbOper++;
                        this.logOper[this.nbOper] = [this.nbOper, this.nbLect, this.nbEcrit];
                        break;
                    default: break;
                }

                // Parcours de l'Arbre
                let bloc = this.grphFichier.fichier_arbre.noeuds;
                if(this.lecture_numBloc != 1){
                    let p = this.lecture_numBloc-1;
                    if(p <= this.grphFichier.fichier_arbre.entete.ordre){
                        bloc = bloc.tabFils[p-1];
                    }
                    else{
                        let q = p - this.grphFichier.fichier_arbre.entete.ordre - 1;
                        let r = q / this.grphFichier.fichier_arbre.entete.ordre;
                        let s = q % this.grphFichier.fichier_arbre.entete.ordre;

                        bloc = bloc.tabFils[parseInt(r)];
                        if((bloc != undefined)&&(bloc != -1)) bloc = bloc.tabFils[s];
                        else bloc = undefined;
                    }
                }

                if((bloc != undefined)&&(bloc != -1)){
                    let grphBloc = new Grph_Bloc_Arbre(bloc, true, parseInt(this.lecture_numBloc));
                    $("#arbres-mAire-MC_Contenu").empty();
                    $("#arbres-mAire-MC_Contenu").append(grphBloc.conteneur);
    
                    this.grphFichier = new Grph_Fichier_Arbre(this.grphFichier.fichier_arbre);
                    $("#arbres-mAire-MS_Contenu").empty();
                    $("#arbres-mAire-MS_Contenu").append(this.grphFichier.conteneur);
                    this.grphFichier.selection(this.lecture_numBloc-1);
    
                    $("#arbres-mAire-EXE p").html("Exécution");
                    $("#arbres-mAire-EXE_Contenu").empty();
    
                    this.nbOper++;
                    this.nbLect++;
                    this.logOper[this.nbOper] = [this.nbOper, this.nbLect, this.nbEcrit];
                }
                else{
                    this.grphFichier = new Grph_Fichier_Arbre(this.grphFichier.fichier_arbre);
                    $("#arbres-mAire-MS_Contenu").empty();
                    $("#arbres-mAire-MS_Contenu").append(this.grphFichier.conteneur);
                    $("#arbres-mAire-MC_Contenu").empty();
                    $("#arbres-mAire-EXE p").html("Exécution");
                    $("#arbres-mAire-EXE_Contenu").empty();

                    let nbNoeudMax = 1 + this.grphFichier.fichier_arbre.entete.ordre*(this.grphFichier.fichier_arbre.entete.ordre + 1);
                    if(this.lecture_numBloc >= 1 && this.lecture_numBloc <= nbNoeudMax)
                        if(bloc == undefined)
                            alert("Erreur : Lecture Impossible ... Bloc " +this.lecture_numBloc+ " Introuvable.");
                        else
                            alert("Erreur : Lecture Impossible ... Bloc " +this.lecture_numBloc+ " est NULL.");
                    else alert("Erreur : Lecture Impossible ... Le Numéro du Bloc est compris entre 1 et "+nbNoeudMax+".");
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
                alert("Erreur : Une autre Opération est en cours d'Exécution.");
            }
            else{
                switch(this.oper){  
                    case "recherche": 
                        let s1 = this.grphFichier.fichier_arbre.recherche(parseInt(this.val));

                        this.nbLect += s1.nbLect;
                        this.nbEcrit += s1.nbEcrit;

                        this.nbOper++;
                        this.logOper[this.nbOper] = [this.nbOper, this.nbLect, this.nbEcrit];
                        break;    
                    case "insertion": 
                        if((this.tabEtapes[this.tabEtapes.length-1].algorithme != "Err >> Pas d'Espace Mémoire")&&
                            (this.tabEtapes[this.tabEtapes.length-1].algorithme != "Err >> Hauteur Max = 2")){
                            let s2 = this.grphFichier.fichier_arbre.insertion(new EnregArbre(parseInt(this.val)));
            
                            this.nbLect += s2.nbLect;
                            this.nbEcrit += s2.nbEcrit;
                        }
                        else{
                            let s2 = this.grphFichier.fichier_arbre.recherche(parseInt(this.val));

                            this.nbLect += s2.nbLect;
                            this.nbEcrit += s2.nbEcrit;
                        }

                        this.nbOper++;
                        this.logOper[this.nbOper] = [this.nbOper, this.nbLect, this.nbEcrit];
                        break;
                    case "suppression": 
                        let s3 = this.grphFichier.fichier_arbre.suppression(parseInt(this.val));
    
                        this.nbLect += s3.nbLect;
                        this.nbEcrit += s3.nbEcrit;
    
                        this.nbOper++;
                        this.logOper[this.nbOper] = [this.nbOper, this.nbLect, this.nbEcrit];
                        break;
                    default: break;
                }

                this.grphFichier = new Grph_Fichier_Arbre(this.grphFichier.fichier_arbre);
                $("#arbres-mAire-MS_Contenu").empty();
                $("#arbres-mAire-MS_Contenu").append(this.grphFichier.conteneur);
                $("#arbres-mAire-MC_Contenu").empty();
                $("#arbres-mAire-EXE p").html("Exécution");
                $("#arbres-mAire-EXE_Contenu").empty();

                this.oper = oper;
                this.tabEtapes = [];
                switch(this.oper){
                    case "recherche": 
                        if(this.recherche_val >= -99 && this.recherche_val <= 99){
                            this.val = this.recherche_val;
                            this.tabEtapes = this.grphFichier.recherche(parseInt(this.val), "this.grphFichier", "#arbres-mAire-MC_Contenu");
                            $("#arbres-mAire-EXE p").html("Exécution : Recherche("+parseInt(this.val)+")");
                            this.textExe = "";
                        }
                        else alert("Erreur : La Valeur à Rechercher doit être comprise entre -99 et 99.");

                        // Réinitialisation
                        this.recherche_val = undefined;
                        
                        break;
                    case "insertion": 
                        if(this.insertion_val>= -99 && this.insertion_val <= 99){
                            this.val = this.insertion_val;
                            this.tabEtapes = this.grphFichier.insertion(new EnregArbre(parseInt(this.val)), "this.grphFichier", "#arbres-mAire-MC_Contenu");
                            $("#arbres-mAire-EXE p").html("Exécution : Insertion("+parseInt(this.val)+")");
                            this.textExe = "";
                        }
                        else alert("Erreur : La Valeur à Insérer doit être comprise entre -99 et 99.");

                        // Réinitialisation
                        this.insertion_val = undefined;
                        break;
                    case "suppression":
                        if(this.suppression_val>= -99 && this.suppression_val <= 99){
                            this.val = this.suppression_val; 
                            this.tabEtapes = this.grphFichier.suppression(parseInt(this.val), "this.grphFichier", "#arbres-mAire-MC_Contenu");
                            $("#arbres-mAire-EXE p").html("Exécution : Suppression("+parseInt(this.val)+")");
                            this.textExe = "";
                        }
                        else alert("Erreur : La Valeur à Supprimer doit être comprise entre -99 et 99.");

                        // Réinitialisation
                        this.suppression_val = undefined;
                        break;
                }
                this.index = -1;
                this.stop = false;
                $(".barreTemps-barreEtapes div").width(0);
                $("#arbres-mAireContenu ul li:nth-child(3) a").addClass("disabled");
            }
        },                    

        operation : async function(){
            while((this.index < this.tabEtapes.length-1) && (this.stop == false)){
                this.index++;
                eval(this.tabEtapes[this.index].code);

                // Controle Stats
                if(this.index != this.tabEtapes.length-1){
                    $("#arbres-mAireContenu ul li:nth-child(3) a").addClass("disabled");
                }
                else $("#arbres-mAireContenu ul li:nth-child(3) a").removeClass("disabled");

                // Log de l'Exécution
                if(this.tabEtapes[this.index].algorithme != "") this.textExe += this.tabEtapes[this.index].algorithme + "<br/>";
                $("#arbres-mAire-EXE_Contenu").html(this.textExe);

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
                $("#arbres-mAire-EXE_Contenu").html(this.textExe);

                let w0 = 100 / this.tabEtapes.length;
                let w = $(".barreTemps-barreEtapes div").width() + w0;
                $(".barreTemps-barreEtapes div").width(w);

                // Controle Stats
                if(this.index != this.tabEtapes.length-1){
                    $("#arbres-mAireContenu ul li:nth-child(3) a").addClass("disabled");
                }
                else $("#arbres-mAireContenu ul li:nth-child(3) a").removeClass("disabled");
            }
        },

        prec: function(){
            this.index--;
            if(this.index <= -1) this.index = 0;
            else {
                eval(this.tabEtapes[this.index].code);

                // Log de l'Exécution
                this.textExe = "";

                for(let i = 0; i <= this.index; i++)
                    if(this.tabEtapes[i].algorithme != "") this.textExe += this.tabEtapes[i].algorithme + "<br/>";
                $("#arbres-mAire-EXE_Contenu").html(this.textExe);
            
                // Animation 'Barre temps'
                let w0 = 100 / this.tabEtapes.length;
                let w = $(".barreTemps-barreEtapes div").width() - w0;
                $(".barreTemps-barreEtapes div").width(w);

                // Controle Stats
                if(this.index != this.tabEtapes.length-1){
                    $("#arbres-mAireContenu ul li:nth-child(3) a").addClass("disabled");
                }
                else $("#arbres-mAireContenu ul li:nth-child(3) a").removeClass("disabled");
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
            this.grphFichier = new Grph_Fichier_Arbre(this.grphFichier.fichier_arbre);
            $("#arbres-mAire-MS_Contenu").empty();
            $("#arbres-mAire-MS_Contenu").append(this.grphFichier.conteneur);
            $("#arbres-mAire-MC_Contenu").empty();
            $("#arbres-mAire-EXE_Contenu").empty();

            $(".barreTemps-barreEtapes div").width(0);
            $(".barreTemps-autoBtn button:first-child").css("visibility", "visible");
            $(".barreTemps-autoBtn button:last-child").css("visibility", "hidden");
            $(".barreTemps-precBtn button").prop('disabled', false);
            $(".barreTemps-suivBtn button").prop('disabled', false);
            $("#arbres-mAireContenu ul li:nth-child(3) a").addClass("disabled");

            this.textExe = "";
        },

        stats : function(){
            if(this.index != this.tabEtapes.length-1){
                alert("Erreur : Une autre Opération est en cours d'Exécution.");
                
            }
            else{
                switch(this.oper){  
                    case "recherche": 
                        let s1 = this.grphFichier.fichier_arbre.recherche(parseInt(this.val));

                        this.nbLect += s1.nbLect;
                        this.nbEcrit += s1.nbEcrit;

                        this.nbOper++;
                        this.logOper[this.nbOper] = [this.nbOper, this.nbLect, this.nbEcrit];
                        break;    
                    case "insertion": 
                        if((this.tabEtapes[this.tabEtapes.length-1].algorithme != "Err >> Pas d'Espace Mémoire")&&
                            (this.tabEtapes[this.tabEtapes.length-1].algorithme != "Err >> Hauteur Max = 2")){
                            let s2 = this.grphFichier.fichier_arbre.insertion(new EnregArbre(parseInt(this.val)));
            
                            this.nbLect += s2.nbLect;
                            this.nbEcrit += s2.nbEcrit;
                        }
                        else{
                            let s2 = this.grphFichier.fichier_arbre.recherche(parseInt(this.val));

                            this.nbLect += s2.nbLect;
                            this.nbEcrit += s2.nbEcrit;
                        }

                        this.nbOper++;
                        this.logOper[this.nbOper] = [this.nbOper, this.nbLect, this.nbEcrit];
                        break;
                    case "suppression": 
                        let s3 = this.grphFichier.fichier_arbre.suppression(parseInt(this.val));
    
                        this.nbLect += s3.nbLect;
                        this.nbEcrit += s3.nbEcrit;
    
                        this.nbOper++;
                        this.logOper[this.nbOper] = [this.nbOper, this.nbLect, this.nbEcrit];
                        break;
                    default: break;
                }
                this.oper = "";
                $("#arbres-mAireContenu ul li:first-child a").removeClass("active");
                $("#arbres-mAireContenu div div:first-child").removeClass("active");
                $("#arbres-mAireContenu ul li:nth-child(2) a").removeClass("active");
                $("#arbres-mAireContenu div div:nth-child(2)").removeClass("active");
                $("#arbres-mAireContenu ul li:nth-child(3) a").addClass("active");
                $("#arbres-mAireContenu div div:nth-child(3)").addClass("active");

                this.index = -1;
                this.stop = false;
                this.grphFichier = new Grph_Fichier_Arbre(this.grphFichier.fichier_arbre);
                $("#arbres-mAire-MS_Contenu").empty();
                $("#arbres-mAire-MS_Contenu").append(this.grphFichier.conteneur);
                $("#arbres-mAire-MC_Contenu").empty();
                $("#arbres-mAire-EXE p").html("Exécution");
                $("#arbres-mAire-EXE_Contenu").empty();

                $(".barreTemps-barreEtapes div").width(0);
                $(".barreTemps-autoBtn button:first-child").css("visibility", "visible");
                $(".barreTemps-autoBtn button:last-child").css("visibility", "hidden");
                $(".barreTemps-precBtn button").prop('disabled', false);
                $(".barreTemps-suivBtn button").prop('disabled', false);

                this.textExe = "";
                this.tabEtapes = [];

        
                this.ordreArb = parseInt(this.grphFichier.fichier_arbre.entete.ordre);
        
                this.nbNoeud = parseInt(this.grphFichier.fichier_arbre.entete.nbNoeud);
        
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
        
                    var chart = new google.visualization.LineChart(document.getElementById('arbres-mAire_Statistiques-LE'));
                    
                    chart.draw(data, options);
                }
            }
        }

    }
});

// Form de Création

$("#arbres_mAire_creationForm").hover(function(){
    $(this).css({
        "width": "300px",
        "height": "325px",
        "background-color": "#121212",
    });
    $("#arbres_mAire_creationForm p").css({
        "opacity": "1",
    });
    $("#arbres_mAire_creationForm input").css({
        "opacity": "1",
    });
}, 
function(){
    $(this).css({
        "width": "55px",
        "height": "55px",
        "background-color": "transparent",
    });
    $("#arbres_mAire_creationForm p").css({
        "opacity": "0",
    });
    $("#arbres_mAire_creationForm input").css({
        "opacity": "0",
    });

});
