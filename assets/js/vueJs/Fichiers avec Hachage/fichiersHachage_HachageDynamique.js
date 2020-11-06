var appHachDyn = new Vue({
    el: '#fichiersHachage-HachageDynamiqueContenu',

    data: {
        grphFichier: new Object(),
        lecture_numHach: undefined,
        lecture_numBloc: undefined,
        recherche_val: undefined,
        insertion_val: undefined,
        suppression_val: undefined,
        nbBlocInit: undefined,
        nbEnregMax: undefined,
        seuilMax: undefined,

        oper: "",
        val: undefined,
        vitesse: 50,
        tabEtapes: [],
        textExe: "",
        index: -1,   
        stop: false,   
        
        niv: 0,
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
            this.nbBlocInit = undefined;

            this.oper = "";
            this.val = undefined;
            this.vitesse = 50;
            this.tabEtapes = [];
            this.textExe = "";
            this.index = -1;
            this.stop = false;   
            
            this.niv = 0;
            this.nbOper = 0;
            this.nbLect = 0;
            this.nbEcrit = 0;
            this.logOper = [[0, 0, 0]];

            $("#fichiersHachage-HachageDynamique-MS_Contenu").empty();
            $("#fichiersHachage-HachageDynamique-MC1_Contenu").empty();
            $("#fichiersHachage-HachageDynamique-MC2_Contenu").empty();
            $("#fichiersHachage-HachageDynamique-MC3_Contenu").empty();
            $("#fichiersHachage-HachageDynamique-EXE_Contenu").empty();
            $("#fichiersHachage-HachageDynamique-EXE p").html("Exécution");
            $(".barreTemps-barreEtapes div").width(0);

            // Changer la Page
            $("#fichiersHachage-HachageDynamiqueContenu ul li:first-child a").addClass("active");
            $("#fichiersHachage-HachageDynamiqueContenu div div:first-child").addClass("active");
            $("#fichiersHachage-HachageDynamiqueContenu ul li:nth-child(2) a").removeClass("active");
            $("#fichiersHachage-HachageDynamiqueContenu ul li:nth-child(3) a").removeClass("active");
            $("#fichiersHachage-HachageDynamiqueContenu div div:nth-child(2)").removeClass("active");
            $("#fichiersHachage-HachageDynamiqueContenu div div:nth-child(3)").removeClass("active");
            $("#fichiersHachage-HachageDynamiqueContenu ul li:nth-child(2) a").addClass("disabled");
            $("#fichiersHachage-HachageDynamiqueContenu ul li:nth-child(3) a").addClass("disabled");
        },

        creer : function(){
            // Création du Fichier
            let n1 = parseInt(this.nbBlocInit);

            this.init();
            if(n1 >= 1 && n1 <= 5){
                let fichier = new Fichier_TnOF_HachDyn();
                fichier.chargementInitial(n1, 2, 0.5);
                                    
                this.grphFichier = new Grph_Fichier_TnOF_HachDyn(fichier);
                $("#fichiersHachage-HachageDynamique-MS_Contenu").empty();
                $("#fichiersHachage-HachageDynamique-MS_Contenu").append(this.grphFichier.conteneur);
                
                // Changer la Page
                $("#fichiersHachage-HachageDynamiqueContenu ul li:first-child a").removeClass("active");
                $("#fichiersHachage-HachageDynamiqueContenu div div:first-child").removeClass("active");
                $("#fichiersHachage-HachageDynamiqueContenu ul li:nth-child(2) a").addClass("active");
                $("#fichiersHachage-HachageDynamiqueContenu div div:nth-child(2)").addClass("active");
                $("#fichiersHachage-HachageDynamiqueContenu ul li:nth-child(2) a").removeClass("disabled");
                $("#fichiersHachage-HachageDynamiqueContenu ul li:nth-child(3) a").removeClass("disabled");

                $(".barreTemps-autoBtn button:first-child").css("visibility", "visible");
                $(".barreTemps-autoBtn button:last-child").css("visibility", "hidden");
            }
                  
            else {
                alert("Erreur : Le Nombre de Blocs Initial doit être compris entre 1 et 5.");
            }
        },  

        lecture : function(){
            if(this.index == this.tabEtapes.length-1){
                switch(this.oper){  
                    case "recherche": 
                        let s1 = this.grphFichier.fichier_TnOF.rechercher(parseInt(this.val));
                    
                        this.nbLect += s1.nbLect;
                        this.nbEcrit += s1.nbEcrit;

                        this.nbOper++;
                        this.logOper[this.nbOper] = [this.nbOper, this.nbLect, this.nbEcrit];
                        break;    
                    case "insertion": 
                        let s2 = this.grphFichier.fichier_TnOF.rechercher(parseInt(this.val));
                        
                        this.nbLect += s2.nbLect;
                        this.grphFichier.fichier_TnOF.inserer(parseInt(this.val));

                        this.nbEcrit ++;
                        this.nbOper++;
                        this.logOper[this.nbOper] = [this.nbOper, this.nbLect, this.nbEcrit];
                        
                        break;
                    case "suppression": 
                        
                        let s3 = this.grphFichier.fichier_TnOF.rechercher(parseInt(this.val));
                            
                        this.nbLect += s3.nbLect;
                        this.grphFichier.fichier_TnOF.supprimer(parseInt(this.val));
                        
                        this.nbEcrit ++;
                        this.nbOper++;
                        this.logOper[this.nbOper] = [this.nbOper, this.nbLect, this.nbEcrit];
                        break;

                    case "eclatement": 
                        this.grphFichier.fichier_TnOF.supprimer(parseInt(this.val));

                        let s4 = this.grphFichier.fichier_TnOF.rechercher(parseInt(this.val));
                        
                        this.nbLect += s4.nbLect;
                        this.grphFichier.fichier_TnOF.insererAvecEclat(parseInt(this.val));

                        this.nbLect++;
                        this.nbEcrit += 2;
                        this.nbOper++;
                        this.logOper[this.nbOper] = [this.nbOper, this.nbLect, this.nbEcrit];
                        break;
                    default: break;
                }
                
                if(this.lecture_numHach >= 1 && this.lecture_numHach <= this.grphFichier.fichier_TnOF.entete.nbBloc){
                    let bloc = [];
                    bloc[0] = this.grphFichier.fichier_TnOF.tabBloc[this.lecture_numHach-1];
                    let i = bloc[0].lien;
                    if(i != -1) bloc[1] = this.grphFichier.fichier_TnOF.ZoneDebord.tabBloc[i];
                    

                    if(bloc[this.lecture_numBloc-1] != undefined){
                        let grphBloc = new Grph_Bloc_TnOF_HachDyn(bloc[this.lecture_numBloc-1], 2, true);
                        $("#fichiersHachage-HachageDynamique-MC1_Contenu").empty();
                        $("#fichiersHachage-HachageDynamique-MC1_Contenu").append(grphBloc.conteneur);

                        this.grphFichier = new Grph_Fichier_TnOF_HachDyn(this.grphFichier.fichier_TnOF);
                        $("#fichiersHachage-HachageDynamique-MS_Contenu").empty();
                        $("#fichiersHachage-HachageDynamique-MS_Contenu").append(this.grphFichier.conteneur);
                        this.grphFichier.selection(this.lecture_numHach-1, this.lecture_numBloc);

                        $("#fichiersHachage-HachageDynamique-EXE p").html("Exécution");
                        $("#fichiersHachage-HachageDynamique-EXE_Contenu").empty();

                        this.nbOper++;
                        this.nbLect++;
                        this.logOper[this.nbOper] = [this.nbOper, this.nbLect, this.nbEcrit];
                    }
                    else{
                        $("#fichiersHachage-HachageDynamique-MS_Contenu").empty();
                        $("#fichiersHachage-HachageDynamique-MS_Contenu").append(this.grphFichier.conteneur);
                        $("#fichiersHachage-HachageDynamique-MC1_Contenu").empty();
                        $("#fichiersHachage-HachageDynamique-MC2_Contenu").empty();
                        $("#fichiersHachage-HachageDynamique-MC3_Contenu").empty();
                        $("#fichiersHachage-HachageDynamique-EXE p").html("Exécution");
                        $("#fichiersHachage-HachageDynamique-EXE_Contenu").empty();

                        
                            if(this.lecture_numBloc >= 1 && this.lecture_numBloc <= 2)
                                alert("Erreur : Lecture Impossible ... Bloc " +this.lecture_numBloc+ " Introuvable.");
                            else alert("Erreur : Lecture Impossible ... Le Numéro du Bloc est compris entre 1 et 2.");
                        }
                } 
                else {
                    $("#fichiersHachage-HachageDynamique-MS_Contenu").empty();
                    $("#fichiersHachage-HachageDynamique-MS_Contenu").append(this.grphFichier.conteneur);
                    $("#fichiersHachage-HachageDynamique-MC_Contenu").empty();
                    $("#fichiersHachage-HachageDynamique-EXE p").html("Exécution");
                    $("#fichiersHachage-HachageDynamique-EXE_Contenu").empty();

                    alert("Erreur : Lecture Impossible ... Le Numéro d'Hachage est compris entre 1 et "+(this.grphFichier.fichier_TnOF.entete.nbBloc)+".");
                }

                // Réinitialisation
                this.index = -1;
                this.stop = false;
                this.tabEtapes = [];
                $(".barreTemps-barreEtapes div").width(0);

            }
            else alert("Erreur : Une autre Opération est en cours d'Exécution.");

            // Réinitialisation
            this.lecture_numHach = undefined;
            this.lecture_numBloc = undefined;
        },

        setOper(oper){
            if(this.index != this.tabEtapes.length-1){
                alert("Erreur : Une autre Opération est en cours d'Exécution.");
            }
            else{
                switch(this.oper){  
                    case "recherche": 
                        let s1 = this.grphFichier.fichier_TnOF.rechercher(parseInt(this.val));
                    
                        this.nbLect += s1.nbLect;
                        this.nbEcrit += s1.nbEcrit;

                        this.nbOper++;
                        this.logOper[this.nbOper] = [this.nbOper, this.nbLect, this.nbEcrit];
                        break;    
                    case "insertion": 
                        let s2 = this.grphFichier.fichier_TnOF.rechercher(parseInt(this.val));
                        
                        this.nbLect += s2.nbLect;
                        this.grphFichier.fichier_TnOF.inserer(parseInt(this.val));

                        this.nbEcrit ++;
                        this.nbOper++;
                        this.logOper[this.nbOper] = [this.nbOper, this.nbLect, this.nbEcrit];
                        
                        break;
                    case "suppression": 
                        
                        let s3 = this.grphFichier.fichier_TnOF.rechercher(parseInt(this.val));
                            
                        this.nbLect += s3.nbLect;
                        this.grphFichier.fichier_TnOF.supprimer(parseInt(this.val));
                        
                        this.nbEcrit ++;
                        this.nbOper++;
                        this.logOper[this.nbOper] = [this.nbOper, this.nbLect, this.nbEcrit];
                        break;

                    case "eclatement": 
                        this.grphFichier.fichier_TnOF.supprimer(parseInt(this.val));

                        let s4 = this.grphFichier.fichier_TnOF.rechercher(parseInt(this.val));
                        
                        this.nbLect += s4.nbLect;
                        this.grphFichier.fichier_TnOF.insererAvecEclat(parseInt(this.val));

                        this.nbLect++;
                        this.nbEcrit += 2;
                        this.nbOper++;
                        this.logOper[this.nbOper] = [this.nbOper, this.nbLect, this.nbEcrit];
                        break;
                    default: break;
                }

                this.grphFichier = new Grph_Fichier_TnOF_HachDyn(this.grphFichier.fichier_TnOF);
                $("#fichiersHachage-HachageDynamique-MS_Contenu").empty();
                $("#fichiersHachage-HachageDynamique-MS_Contenu").append(this.grphFichier.conteneur);
                $("#fichiersHachage-HachageDynamique-MC1_Contenu").empty();
                $("#fichiersHachage-HachageDynamique-MC2_Contenu").empty();
                $("#fichiersHachage-HachageDynamique-MC3_Contenu").empty();
                $("#fichiersHachage-HachageDynamique-EXE p").html("Exécution");
                $("#fichiersHachage-HachageDynamique-EXE_Contenu").empty();
        

                this.oper = oper;
                this.tabEtapes = [];
                switch(this.oper){
                    case "recherche": 
                        if(this.recherche_val >= 0 && this.recherche_val <= 99){
                            this.val = this.recherche_val;
                            this.tabEtapes = this.grphFichier.recherche(parseInt(this.val), "this.grphFichier", "#fichiersHachage-HachageDynamique-MC1_Contenu");
                            $("#fichiersHachage-HachageDynamique-EXE p").html("Exécution : Recherche("+parseInt(this.val)+")");
                            this.textExe = "Hachage de la Clé<br/>";
                        }
                        else alert("Erreur : La Valeur à Rechercher doit être comprise entre 0 et 99.");

                        // Réinitialisation
                        this.recherche_val = undefined;

                        break;
                    case "insertion": 
                        if(this.insertion_val >= 0 && this.insertion_val <= 99){
                            this.val = this.insertion_val;
                            this.tabEtapes = this.grphFichier.insertion(parseInt(this.val), "this.grphFichier", "#fichiersHachage-HachageDynamique-MC1_Contenu");
                            $("#fichiersHachage-HachageDynamique-EXE p").html("Exécution : Insertion("+parseInt(this.val)+")");
                            this.textExe = "Hachage de la Clé<br/>";
                        }
                        else alert("Erreur : La Valeur à Insérer doit être comprise entre 0 et 99.");

                        // Réinitialisation
                        this.insertion_val = undefined;

                        break;
                    case "suppression":
                        if(this.suppression_val >= 0 && this.suppression_val <= 99){
                            this.val = this.suppression_val; 
                            this.tabEtapes = this.grphFichier.suppression(parseInt(this.val), "this.grphFichier", "#fichiersHachage-HachageDynamique-MC1_Contenu");
                            $("#fichiersHachage-HachageDynamique-EXE p").html("Exécution : Suppression("+parseInt(this.val)+")");
                            this.textExe = "Hachage de la Clé<br/>";
                        }
                        else alert("Erreur : La Valeur à Supprimer doit être comprise entre 0 et 99.");

                        // Réinitialisation
                        this.suppression_val = undefined;

                        break;
                }
                this.index = -1;
                this.stop = false;
                $(".barreTemps-barreEtapes div").width(0);
                $("#fichiersHachage-HachageDynamiqueContenu ul li:nth-child(3) a").addClass("disabled");
            }
        },

        operation : async function(){
            while((this.index < this.tabEtapes.length-1) && (this.stop == false)){
                this.index++;
                eval(this.tabEtapes[this.index].code);

                // Controle Stats
                if(this.index != this.tabEtapes.length-1){
                    $("#fichiersHachage-HachageDynamiqueContenu ul li:nth-child(3) a").addClass("disabled");
                }
                else $("#fichiersHachage-HachageDynamiqueContenu ul li:nth-child(3) a").removeClass("disabled");

                // Log de l'Exécution
                if(this.tabEtapes[this.index].algorithme != "") this.textExe += this.tabEtapes[this.index].algorithme + "<br/>";
                $("#fichiersHachage-HachageDynamique-EXE_Contenu").html(this.textExe);

                // Animation 'Barre temps'
                let w0 = 100 / this.tabEtapes.length;
                let w = $(".barreTemps-barreEtapes div").width() + w0;
                $(".barreTemps-barreEtapes div").width(w);
                await new Promise(r => setTimeout(r, (parseInt(this.vitesse)+10)*20));

                // Cas Eclatement
                if (this.index == this.tabEtapes.length-1) {
                    if ((this.oper == 'insertion') && (!this.grphFichier.fichier_TnOF.rechercher(parseInt(this.val)).trouv && this.grphFichier.fichier_TnOF.tauxCharg() + 1 / (this.grphFichier.fichier_TnOF.entete.nbBloc * Bloc_TnOF_HachDyn._b) > this.grphFichier.fichier_TnOF.entete.seuilMax)) {
                        let answer = confirm("Une Opération d'Eclatement est Nécéssaire! Voulez-vous y procéder ?");
                        if (answer) {
                            this.grphFichier.fichier_TnOF.inserer(parseInt(this.val));
                            this.reset();
                            this.tabEtapes = this.grphFichier.eclater('this.grphFichier', "#fichiersHachage-HachageDynamique-MC1_Contenu", "#fichiersHachage-HachageDynamique-MC2_Contenu", "#fichiersHachage-HachageDynamique-MC3_Contenu");
                            this.oper = "eclatement";
                            this.textExe = "";
                            
                        }
                    }
                }
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
                $("#fichiersHachage-HachageDynamique-EXE_Contenu").html(this.textExe);

                let w0 = 100 / this.tabEtapes.length;
                let w = $(".barreTemps-barreEtapes div").width() + w0;
                $(".barreTemps-barreEtapes div").width(w);

                
                // Controle Stats
                if(this.index != this.tabEtapes.length-1){
                    $("#fichiersHachage-HachageDynamiqueContenu ul li:nth-child(3) a").addClass("disabled");
                }
                else {
                    // Cas Eclatement
                    if (this.index == this.tabEtapes.length-1) {
                        if ((this.oper == 'insertion') && (!this.grphFichier.fichier_TnOF.rechercher(parseInt(this.val)).trouv && this.grphFichier.fichier_TnOF.tauxCharg() + 1 / (this.grphFichier.fichier_TnOF.entete.nbBloc * Bloc_TnOF_HachDyn._b) > this.grphFichier.fichier_TnOF.entete.seuilMax)) {
                            let answer = confirm("Une Opération d'Eclatement est Nécéssaire! Voulez-vous y procéder ?");
                            if (answer) {
                                this.grphFichier.fichier_TnOF.inserer(parseInt(this.val));
                                this.reset();
                                this.tabEtapes = this.grphFichier.eclater('this.grphFichier', "#fichiersHachage-HachageDynamique-MC1_Contenu", "#fichiersHachage-HachageDynamique-MC2_Contenu", "#fichiersHachage-HachageDynamique-MC3_Contenu");
                                this.oper = "eclatement";
                                this.textExe = "";
                            }
                        }
                    }
                    $("#fichiersHachage-HachageDynamiqueContenu ul li:nth-child(3) a").removeClass("disabled")};
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
                        this.textExe = "Hachage de la Clé<br/>";
                        break;
                    case "insertion": 
                    this.textExe = "Hachage de la Clé<br/>";
                        break;
                    case "suppression":
                        this.textExe = "Hachage de la Clé<br/>";
                        break;
                }
                for(let i = 0; i <= this.index; i++)
                    if(this.tabEtapes[i].algorithme != "") this.textExe += this.tabEtapes[i].algorithme + "<br/>";
                $("#fichiersHachage-HachageDynamique-EXE_Contenu").html(this.textExe);
            
                // Animation 'Barre temps'
                let w0 = 100 / this.tabEtapes.length;
                let w = $(".barreTemps-barreEtapes div").width() - w0;
                $(".barreTemps-barreEtapes div").width(w);

                // Controle Stats
                if(this.index != this.tabEtapes.length-1){
                    $("#fichiersHachage-HachageDynamiqueContenu ul li:nth-child(3) a").addClass("disabled");
                }
                else $("#fichiersHachage-HachageDynamiqueContenu ul li:nth-child(3) a").removeClass("disabled");
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
            this.grphFichier = new Grph_Fichier_TnOF_HachDyn(this.grphFichier.fichier_TnOF);
            $("#fichiersHachage-HachageDynamique-MS_Contenu").empty();
            $("#fichiersHachage-HachageDynamique-MS_Contenu").append(this.grphFichier.conteneur);
            $("#fichiersHachage-HachageDynamique-MC1_Contenu").empty();
            $("#fichiersHachage-HachageDynamique-MC2_Contenu").empty();
            $("#fichiersHachage-HachageDynamique-MC3_Contenu").empty();
            $("#fichiersHachage-HachageDynamique-EXE_Contenu").empty();

            $(".barreTemps-barreEtapes div").width(0);
            $(".barreTemps-autoBtn button:first-child").css("visibility", "visible");
            $(".barreTemps-autoBtn button:last-child").css("visibility", "hidden");
            $(".barreTemps-precBtn button").prop('disabled', false);
            $(".barreTemps-suivBtn button").prop('disabled', false);
            $("#fichiersHachage-HachageDynamiqueContenu ul li:nth-child(3) a").addClass("disabled");

            switch(this.oper){
                case "recherche": 
                    this.textExe = "Hachage de la Clé<br/>";
                    break;
                case "insertion": 
                this.textExe = "Hachage de la Clé<br/>";
                    break;
                case "suppression":
                    this.textExe = "Hachage de la Clé<br/>";
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
                        let s1 = this.grphFichier.fichier_TnOF.rechercher(parseInt(this.val));
                    
                        this.nbLect += s1.nbLect;
                        this.nbEcrit += s1.nbEcrit;

                        this.nbOper++;
                        this.logOper[this.nbOper] = [this.nbOper, this.nbLect, this.nbEcrit];
                        break;    
                    case "insertion": 
                        let s2 = this.grphFichier.fichier_TnOF.rechercher(parseInt(this.val));
                        
                        this.nbLect += s2.nbLect;
                        this.grphFichier.fichier_TnOF.inserer(parseInt(this.val));

                        this.nbEcrit ++;
                        this.nbOper++;
                        this.logOper[this.nbOper] = [this.nbOper, this.nbLect, this.nbEcrit];
                        
                        break;
                    case "suppression": 
                        
                        let s3 = this.grphFichier.fichier_TnOF.rechercher(parseInt(this.val));
                            
                        this.nbLect += s3.nbLect;
                        this.grphFichier.fichier_TnOF.supprimer(parseInt(this.val));
                        
                        this.nbEcrit ++;
                        this.nbOper++;
                        this.logOper[this.nbOper] = [this.nbOper, this.nbLect, this.nbEcrit];
                        break;

                    case "eclatement": 
                        this.grphFichier.fichier_TnOF.supprimer(parseInt(this.val));

                        let s4 = this.grphFichier.fichier_TnOF.rechercher(parseInt(this.val));
                        
                        this.nbLect += s4.nbLect;
                        this.grphFichier.fichier_TnOF.insererAvecEclat(parseInt(this.val));

                        this.nbLect++;
                        this.nbEcrit += 2;
                        this.nbOper++;
                        this.logOper[this.nbOper] = [this.nbOper, this.nbLect, this.nbEcrit];
                        break;
                    default: break;
                }

                this.oper = "";
                $("#fichiersHachage-HachageDynamiqueContenu ul li:first-child a").removeClass("active");
                $("#fichiersHachage-HachageDynamiqueContenu div div:first-child").removeClass("active");
                $("#fichiersHachage-HachageDynamiqueContenu ul li:nth-child(2) a").removeClass("active");
                $("#fichiersHachage-HachageDynamiqueContenu div div:nth-child(2)").removeClass("active");
                $("#fichiersHachage-HachageDynamiqueContenu ul li:nth-child(3) a").addClass("active");
                $("#fichiersHachage-HachageDynamiqueContenu div div:nth-child(3)").addClass("active");

                this.index = -1;
                this.stop = false;
                this.grphFichier = new Grph_Fichier_TnOF_HachDyn(this.grphFichier.fichier_TnOF);
                $("#fichiersHachage-HachageDynamique-MS_Contenu").empty();
                $("#fichiersHachage-HachageDynamique-MS_Contenu").append(this.grphFichier.conteneur);
                $("#fichiersHachage-HachageDynamique-MC1_Contenu").empty();
                $("#fichiersHachage-HachageDynamique-MC2_Contenu").empty();
                $("#fichiersHachage-HachageDynamique-MC3_Contenu").empty();
                $("#fichiersHachage-HachageDynamique-EXE p").html("Exécution");
                $("#fichiersHachage-HachageDynamique-EXE_Contenu").empty();

                $(".barreTemps-barreEtapes div").width(0);
                $(".barreTemps-autoBtn button:first-child").css("visibility", "visible");
                $(".barreTemps-autoBtn button:last-child").css("visibility", "hidden");
                $(".barreTemps-precBtn button").prop('disabled', false);
                $(".barreTemps-suivBtn button").prop('disabled', false);

                this.textExe = "";
                this.tabEtapes = [];

        
                this.niv = parseInt(this.grphFichier.fichier_TnOF.entete.i);
        
        
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
                    
                    var chart = new google.visualization.LineChart(document.getElementById('fichiersHachage-HachageDynamique_Statistiques-LE'));
                    
                    chart.draw(data, options);
                }
            }
        }
    }
});


// Form de Création

$("#fichiersHachage_HachageDynamique_creationForm").hover(function(){
    $(this).css({
        "width": "300px",
        "height": "200px",
        "background-color": "#121212",
    });
    $("#fichiersHachage_HachageDynamique_creationForm p").css({
        "opacity": "1",
    });

    $("#fichiersHachage_HachageDynamique_creationForm input").css({
        "opacity": "1",
    });
}, 
function(){
    $(this).css({
        "width": "55px",
        "height": "55px",
        "background-color": "transparent",
    });
    $("#fichiersHachage_HachageDynamique_creationForm p").css({
        "opacity": "0",
    });
    $("#fichiersHachage_HachageDynamique_creationForm input").css({
        "opacity": "0",
    });

});
