class Grph_Bloc_TnOF{

    // Attributs
    _bloc_TnOF;
    _nbEnregMax;
    _conteneur;
    _conteneurTabEnreg = [];
    _tabEnreg = [];
    _conteneurNb_Valeur;


    // Constructeur
    constructor(bloc_TnOF, b, animation){
        
        this._bloc_TnOF = bloc_TnOF;
        this._nbEnregMax = b;

        this._conteneur = document.createElement('div');
        this._conteneur.setAttribute("class", "bloc_TnOF_conteneur");
        
        // Création du Conteneur du Tableau d'Enregistrements
        let conteneurTab = document.createElement('div');
        conteneurTab.setAttribute("class", "bloc_TnOF_conteneurTab"); 

        let conteneurTabText = document.createElement('p');
        conteneurTabText.setAttribute("class", "bloc_TnOF_conteneurTabText"); 
        conteneurTabText.innerHTML = 'Tab :';

        let conteneurListeEnreg = document.createElement('ul');
        conteneurListeEnreg.setAttribute("class", "bloc_TnOF_conteneurListeEnreg");

        for(let i = 0; i < b; i++){
            let conteneurEnreg = document.createElement('li');
            conteneurEnreg.setAttribute("class", "bloc_TnOF_conteneurEnreg");
            conteneurEnreg.style.margin = "0px calc(100% / "+b+" - 4.1vw) 0px 0px ";
            conteneurEnreg.innerHTML = (i+1 < 10) ? ("E::0" + (i+1)) : ("E::" + (i+1));
            conteneurEnreg.append(Grph_EnregFixe.conteneurVide());
            conteneurListeEnreg.append(conteneurEnreg);

            this._conteneurTabEnreg[i] = conteneurEnreg;
        }

        for(let i = 0; i < this._bloc_TnOF.nb; i++){
            
            let grphEnreg = new Grph_EnregFixe(this._bloc_TnOF.tab[i]);
            let conteneurEnreg = this._conteneurTabEnreg[i];      

            if(animation == false) conteneurEnreg.append(grphEnreg.conteneur);
            else {
                setTimeout(function(){
                grphEnreg.apparition();
                conteneurEnreg.append(grphEnreg.conteneur);
                }, i*125);
            }
            
            this._tabEnreg[i] = grphEnreg;
        }
        
        conteneurTab.append(conteneurTabText, conteneurListeEnreg);

        // Création du Conteneur de l'attribut 'nb'
        let conteneurNb = document.createElement('div');
        conteneurNb.setAttribute("class", "bloc_TnOF_conteneurNb");
        conteneurNb.innerHTML = "Nb : ";

        this._conteneurNb_Valeur = document.createElement('p');
        this._conteneurNb_Valeur.setAttribute("class", "bloc_TnOF_conteneurNb_Valeur");

        for(let i = 0; i <= this._bloc_TnOF.nb; i++){     
            if(animation == false) this._conteneurNb_Valeur.innerHTML = i;
            else{
                let x = this._conteneurNb_Valeur;
                setTimeout(function(){
                    x.innerHTML = i;
                }, i * 125);
            }
        }
        conteneurNb.append(this._conteneurNb_Valeur);

        this._conteneur.append(conteneurTab, conteneurNb);

    }


    // Setters et Getters
     set bloc_TnOF(enregFixe){

        this._bloc_LnOF = bloc_TnOF;

    }

    get bloc_TnOF(){

        return this._bloc_TnOF;

    }

    set nbEnregMax(nbEnregMax){

        this._nbEnregMax = nbEnregMax;

    }

    get nbEnregMax(){

        return this._nbEnregMax;

    }

    set conteneur(conteneur){

        this._conteneur = conteneur;

    }

    get conteneur(){

        return this._conteneur;

    }

    set conteneurTabEnreg(conteneurTabEnreg){

        this._conteneurTabEnreg = conteneurTabEnreg;

    }

    get conteneurTabEnreg(){

        return this._conteneurTabEnreg;

    }

    set tabEnreg(tabEnreg){

        this.tabEnreg = tabEnreg;

    }

    get tabEnreg(){

        return this._tabEnreg;

    }

    set conteneurNb_Valeur(conteneurNb_Valeur){
        this._conteneurNb_Valeur = conteneurNb_Valeur;
    }

    get conteneurNb_Valeur(){
        return this._conteneurNb_Valeur;
    }

    initNb(val){
        this._conteneurNb_Valeur.innerHTML = parseInt(val);
    }

    // Méthodes
    recherche(cle, nomVar){

        // Récupération du Résultat de la Recherche
        let indiceFin = this._bloc_TnOF.recherche(cle);
        let nb = this._bloc_TnOF.nb;

        // Remplissage de la table d'Etapes
        let etapes = [];
        
        for(let i = 0; i < ((indiceFin+nb)%nb); i++){
            etapes[i] = new Etape();
            etapes[i].code = nomVar + ".tabEnreg["+i+"].selection();";
            if(i > 0) etapes[i].code += nomVar + ".tabEnreg["+(i-1)+"].initAnimation();";
            etapes[i].code += nomVar + ".tabEnreg["+(i+1)+"].initAnimation();";

            etapes[i].algorithme = "Enreg :: " +(i+1)+" >> Echec";
        }
        
        etapes[(indiceFin+nb)%nb] = new Etape();
        if((indiceFin+nb)%nb > 0) {
            etapes[(indiceFin+nb)%nb].code = 
            nomVar + ".tabEnreg["+((indiceFin+nb)%nb-1)+"].initAnimation();"+
            nomVar + ".tabEnreg["+(indiceFin+nb)%nb+"].selection();";
        }
        else {
            etapes[(indiceFin+nb)%nb].code = nomVar + ".tabEnreg["+(indiceFin+nb)%nb+"].selection();";
        }

        if(indiceFin != -1){
            etapes[indiceFin+1] = new Etape();
            etapes[indiceFin+1].code = nomVar + ".tabEnreg["+(indiceFin)+"].validation();";

            etapes[indiceFin+1].algorithme = "Enreg :: " +(indiceFin+1)+" >> Succès";
        }
        else{
            if(nb > 0){
                etapes[nb] = new Etape();
                etapes[nb].code = nomVar + ".tabEnreg["+(nb-1)+"].initAnimation();";

                etapes[nb].algorithme = "Enreg :: " +nb+" >> Echec";
            }  
        }
        return etapes;
    }

    insertion(enregFixe, nomVar){

        // Récupération du Résultat de la Recherche
        let indiceFin = this._bloc_TnOF.recherche(enregFixe.cle);
        let nb = this._bloc_TnOF.nb;

        // Remplissage de la table d'Etapes
        let etapes = [];
        
        for(let i = 0; i < (indiceFin+nb)%nb; i++){
            etapes[i] = new Etape();
            etapes[i].code = nomVar + ".tabEnreg["+i+"].selection();";
            if(i > 0) etapes[i].code += nomVar + ".tabEnreg["+(i-1)+"].initAnimation();";
            etapes[i].code += nomVar + ".tabEnreg["+(i+1)+"].initAnimation();";

            let v = parseInt(i)+1
            etapes[i].algorithme = "Enreg :: "+v+" >> Echec";
        }
        
        etapes[(indiceFin+nb)%nb] = new Etape();
        if((indiceFin+nb)%nb > 0) {
            etapes[(indiceFin+nb)%nb].code = 
            nomVar + ".tabEnreg["+((indiceFin+nb)%nb-1)+"].initAnimation();"+
            nomVar + ".tabEnreg["+(indiceFin+nb)%nb+"].selection();";
        }
        else {
            etapes[(indiceFin+nb)%nb].code = nomVar + ".tabEnreg["+(indiceFin+nb)%nb+"].selection();";
        }

        etapes[(indiceFin+nb)%nb].code += 
            "if("+ nomVar + ".tabEnreg["+ nb +"] != null){"+
            "delete "+ nomVar + ".tabEnreg["+ nb +"];"+
            nomVar + ".initNb("+ nb +");"+
            nomVar + ".conteneurTabEnreg["+ nb +"].removeChild("+nomVar + ".conteneurTabEnreg["+ nb +"].childNodes[2]);}";

        let u = parseInt(((indiceFin+nb)%nb))+1;
        etapes[(indiceFin+nb)%nb].algorithme = "Enreg :: "+u+" >> Echec";

        if(indiceFin != -1){
            etapes[indiceFin+1] = new Etape();
            etapes[indiceFin+1].code = nomVar + ".tabEnreg["+(indiceFin)+"].validation();";
        }
        else{
            if(nb < this.nbEnregMax){
                if(nb == 0){
                    etapes[nb] = new Etape();
                    etapes[nb].code = 
                        "if("+ nomVar + ".tabEnreg["+ nb +"] != null){"+
                        "delete "+ nomVar + ".tabEnreg["+ nb +"];"+
                        nomVar + ".initNb("+ nb +");"+
                        nomVar + ".conteneurTabEnreg["+ nb +"].removeChild("+nomVar + ".conteneurTabEnreg["+ nb +"].childNodes[2]);}";

                    etapes[nb+1] = new Etape();
                    etapes[nb+1].code = 
                        nomVar + ".tabEnreg["+ nb +"] = new Grph_EnregFixe(new EnregFixe("+ enregFixe.cle +"));"+
                        nomVar + ".tabEnreg["+ nb +"].ajout();"+
                        nomVar + ".conteneurTabEnreg["+ nb +"].append("+nomVar+".tabEnreg["+ nb +"].conteneur);"+
                        nomVar + ".initNb("+ (nb+1) +");";
                    if(nb > 0) etapes[nb].code += nomVar + ".tabEnreg["+ (nb-1) +"].initAnimation();";
                }
                else{
                    etapes[nb] = new Etape();
                    etapes[nb].code = 
                        nomVar + ".tabEnreg["+ nb +"] = new Grph_EnregFixe(new EnregFixe("+ enregFixe.cle +"));"+
                        nomVar + ".tabEnreg["+ nb +"].ajout();"+
                        nomVar + ".conteneurTabEnreg["+ nb +"].append("+nomVar+".tabEnreg["+ nb +"].conteneur);"+
                        nomVar + ".initNb("+ (nb+1) +");";
                    if(nb > 0) etapes[nb].code += nomVar + ".tabEnreg["+ (nb-1) +"].initAnimation();";
                }  
                let k = parseInt(nb)+1;
                etapes[nb].algorithme = "Insertion >> Enreg :: "+k;   
            }
        }
        return etapes;
    }

    suppression(cle, nouvCle , nomVar){

        // Récupération du Résultat de la Recherche
        let indiceFin = this._bloc_TnOF.recherche(cle);
        let nb = this._bloc_TnOF.nb;

        // Remplissage de la table d'Etapes
        let etapes = [];

        for(let i = 0; i < (indiceFin+nb)%nb; i++){
            etapes[i] = new Etape();
            etapes[i].code = nomVar + ".tabEnreg["+i+"].selection();";
            if(i > 0) etapes[i].code += nomVar + ".tabEnreg["+(i-1)+"].initAnimation();";
            etapes[i].code += 
                nomVar + ".tabEnreg["+(i+1)+"].initAnimation();";

            let v = parseInt(i)+1
            etapes[i].algorithme = "Enreg :: "+v+" >> Echec";
        }
        
        etapes[(indiceFin+nb)%nb] = new Etape();
        if((indiceFin+nb)%nb > 0) {
            etapes[(indiceFin+nb)%nb].code = 
            nomVar + ".tabEnreg["+((indiceFin+nb)%nb-1)+"].initAnimation();"+
            nomVar + ".tabEnreg["+(indiceFin+nb)%nb+"].selection();";
        }
        else {
            etapes[(indiceFin+nb)%nb].code = nomVar + ".tabEnreg["+(indiceFin+nb)%nb+"].selection();";
        }

        
     
        if(indiceFin != -1){
            etapes[indiceFin+1] = new Etape();
            etapes[indiceFin+1].code = 
                "if("+ nomVar + ".tabEnreg["+ (indiceFin) +"].enregFixe.cle == " +nouvCle+"){"+
                "delete "+ nomVar + ".tabEnreg["+ (indiceFin) +"];"+
                nomVar + ".conteneurTabEnreg["+ (indiceFin) +"].removeChild("+nomVar + ".conteneurTabEnreg["+ (indiceFin) +"].childNodes[2]);"+
                nomVar + ".tabEnreg["+ (indiceFin) +"] = new Grph_EnregFixe(new EnregFixe("+ cle +"));"+
                nomVar + ".conteneurTabEnreg["+ (indiceFin) +"].append("+nomVar+".tabEnreg["+ (indiceFin) +"].conteneur);}"+
                nomVar + ".tabEnreg["+(indiceFin)+"].validation();";

            let y = parseInt(indiceFin)+1;
            etapes[indiceFin+1].algorithme = "Enreg :: "+y+" >> Succès";

            etapes[indiceFin+2] = new Etape();
            etapes[indiceFin+2].code = nomVar + ".tabEnreg["+(indiceFin)+"].disparition();";
            etapes[indiceFin+2].algorithme = "Remplacement ...";                

            etapes[indiceFin+3] = new Etape();
            etapes[indiceFin+3].code = 
                "delete "+ nomVar + ".tabEnreg["+ (indiceFin) +"];"+
                nomVar + ".conteneurTabEnreg["+ (indiceFin) +"].removeChild("+nomVar + ".conteneurTabEnreg["+ (indiceFin) +"].childNodes[2]);"+
                nomVar + ".tabEnreg["+ (indiceFin) +"] = new Grph_EnregFixe(new EnregFixe("+ nouvCle +"));"+
                nomVar + ".tabEnreg["+ (indiceFin) +"].ajout();"+
                nomVar + ".conteneurTabEnreg["+ (indiceFin) +"].append("+nomVar+".tabEnreg["+ (indiceFin) +"].conteneur);";
            etapes[indiceFin+3].algorithme = "-> Dernier Enreg du Bloc"; 
        }
        else{
            etapes[nb] = new Etape();
            if(nb > 0) etapes[nb].code = nomVar + ".tabEnreg["+(nb-1)+"].initAnimation();";
        }

        return etapes;
    }

}

class Grph_Fichier_TnOF{

    // Attributs
    _fichier_TnOF;
    _conteneur;
    _conteneurTabBloc = [];


    // Constructeur
    constructor(fichier_TnOF){
        
        this._fichier_TnOF = fichier_TnOF;
        
        
        this._conteneur = document.createElement('div');
        this._conteneur.setAttribute("class", "fichier_TnOF_conteneur");

        let conteneurTab = document.createElement('ul');
        conteneurTab.setAttribute("class", "fichier_TnOF_conteneurTabBloc"); 
        
        

        for(let i = 0; i < this.fichier_TnOF.entete.nbBloc; i++){
            let conteneurBloc = document.createElement('li');
            conteneurBloc.setAttribute("class", "fichier_TnOF_conteneurBloc");
            conteneurBloc.style.margin = "0px calc(100% / "+this.fichier_TnOF.entete.nbBloc+" - 6.22vw) 0px 0px ";
            conteneurBloc.innerHTML = (i+1 < 10) ? ("Bloc 0" + (i+1)) : ("Bloc " + (i+1));
            
            let conteneurBlocPlein = document.createElement('div');
            conteneurBlocPlein.setAttribute("class", "fichier_TnOF_conteneurBlocPlein");

            let blocPlein_GrandRect = document.createElement('div');
            blocPlein_GrandRect.setAttribute("class", "fichier_TnOF_conteneurBlocPlein_grandRect");
            let blocPlein_PetitRect = document.createElement('div');
            blocPlein_PetitRect.setAttribute("class", "fichier_TnOF_conteneurBlocPlein_petitRect");

            conteneurBlocPlein.append(blocPlein_GrandRect, blocPlein_PetitRect);
            conteneurBloc.append(conteneurBlocPlein);
            
            conteneurTab.append(conteneurBloc);
            this._conteneurTabBloc[i] = conteneurBloc;
        }
        
        this._conteneur.append(conteneurTab);

    }


    // Setters et Getters
     set fichier_TnOF(fichier){

        this._fichier_TnOF = fichier;

    }

    get fichier_TnOF(){

        return this._fichier_TnOF;

    }

    set conteneur(conteneur){

        this._conteneur = conteneur;

    }

    get conteneur(){

        return this._conteneur;

    }

    set conteneurTabBloc(conteneurTabBloc){

        this._conteneurTabBloc = conteneurTabBloc;

    }

    get conteneurTabBloc(){

        return this._conteneurTabBloc;

    }


    // Méthodes
    recherche(cle, nomFichier, nomBloc){

        // Récupération du Résultat de la Recherche
        let indiceFin = this.fichier_TnOF.recherche(cle);
        let nbIter = 0;
        if(indiceFin == -1) nbIter = this.fichier_TnOF.entete.nbBloc;
        else {
            nbIter = indiceFin[0] + 1 ;
        }
        // Remplissage de la table d'Etapes
        let etapes = [];
    
        let k = 0;
        for(let i = 0; i < nbIter; i++){
            
            etapes[k] = new Etape();
            etapes[k].code = nomFichier + ".selection("+ i +");" + "$('"+ nomBloc +"').empty();";
            if(i > 0) etapes[k].code += nomFichier + ".initAnimation("+ (i-1) +");";
            
            let n = parseInt(i)+1;
            etapes[k].algorithme = "Lecture :: Bloc " + n;
            k++;
            
            etapes[k] = new Etape();
            etapes[k].code = 
                "let bloc = new Grph_Bloc_TnOF("+ nomFichier +".fichier_TnOF.tabBloc["+ i +"], "+ nomFichier +".fichier_TnOF.entete.nbEnregMax, true);"+
                "$('"+ nomBloc +"').empty();"+
                "$('"+ nomBloc +"').append(bloc.conteneur);";

            etapes[k].algorithme = "Recherche Séquencielle >> Bloc " + n;
            k++;
 
            let blc = new Grph_Bloc_TnOF(this.fichier_TnOF.tabBloc[i], this.fichier_TnOF.entete.nbEnregMax);
            let tab = blc.recherche(cle, "bloc");
            for(let z = 0; z < tab.length; z++){
                etapes[k] = new Etape();
                etapes[k].code = nomFichier + ".selection("+ i +");";
                if(i+1 < this.fichier_TnOF.entete.nbBloc) etapes[k].code += nomFichier + ".initAnimation("+ (i+1) +");";

                etapes[k].code += 
                    "let bloc = new Grph_Bloc_TnOF("+ nomFichier +".fichier_TnOF.tabBloc["+ i +"], "+ nomFichier +".fichier_TnOF.entete.nbEnregMax, false);"+
                    "$('"+ nomBloc +"').empty();"+
                    "$('"+ nomBloc +"').append(bloc.conteneur);";
                
                etapes[k].code += tab[z].code;

                etapes[k].algorithme += tab[z].algorithme;
                k++;
            }
        }
            
        if(indiceFin == -1){
            etapes[k] = new Etape();
            etapes[k].code = nomFichier + ".initAnimation("+ (nbIter-1) +");";
            etapes[k].algorithme = "--> Clé Introuvable";
        }

        return etapes;
    }

    insertion(enregFixe, nomFichier, nomBloc){
        
        // Récupération du Résultat de la Recherche
        let indiceFin = this.fichier_TnOF.recherche(enregFixe.cle);

        // Remplissage de la table d'Etapes
        let etapes = [];
        if(indiceFin == -1) {
            if(!this.fichier_TnOF.plein()){
                let k = 0;
                for(let i = this.fichier_TnOF.entete.dernBlocNonVide; i <= this.fichier_TnOF.entete.dernBlocNonVide; i++){
                    
                    etapes[k] = new Etape();
                    etapes[k].code = nomFichier + ".selection("+ i +");" + "$('"+ nomBloc +"').empty();";
                    if(i > 0) etapes[k].code += nomFichier + ".initAnimation("+ (i-1) +");";
                    if(i+1 < this.fichier_TnOF.entete.nbBloc) etapes[k].code += nomFichier + ".initAnimation("+ (i+1) +");";
    
                    k++;
                    
                }
    
                let j = this.fichier_TnOF.entete.dernBlocNonVide;
                etapes[k] = new Etape();
                etapes[k].code = 
                    "let bloc = new Grph_Bloc_TnOF("+ nomFichier +".fichier_TnOF.tabBloc["+ j +"], "+ nomFichier +".fichier_TnOF.entete.nbEnregMax, true);"+
                    "$('"+ nomBloc +"').empty();"+
                    "$('"+ nomBloc +"').append(bloc.conteneur);";
    
                let m = parseInt(j)+1;
                etapes[k].algorithme = "Lecture :: Bloc " + m; 
                k++;
                
                let blc = new Grph_Bloc_TnOF(this.fichier_TnOF.tabBloc[j], this.fichier_TnOF.entete.nbEnregMax, false);
                let tab = blc.insertion(enregFixe, "bloc");
                for(let z = 0; z < tab.length; z++){
                    etapes[k] = new Etape();
                    etapes[k].code = 
                        "let bloc = new Grph_Bloc_TnOF("+ nomFichier +".fichier_TnOF.tabBloc["+ j +"], "+ nomFichier +".fichier_TnOF.entete.nbEnregMax, false);"+
                        "$('"+ nomBloc +"').empty();"+
                        "$('"+ nomBloc +"').append(bloc.conteneur);";
                                
                    etapes[k].code += tab[z].code;
    
                    etapes[k].algorithme += tab[z].algorithme;
                    k++;
                }
            }
            else {
                let z = etapes.length;
                etapes[z] = new Etape();
                etapes[z].code = "";
                etapes[z].algorithme = "Echec > Pas d'Espace Mémoire";
            }
        }
        else {
            etapes[0] = new Etape();
            etapes[0].code = "";
            etapes[0].algorithme = "Echec >  La Clé Existe";
        }
            
        return etapes;
    }

    suppression(cle, nomFichier, nomBloc){
        
        // Récupération du Résultat de la Recherche
        let indiceFin = this.fichier_TnOF.recherche(cle);
        
        // Remplissage de la table d'Etapes
        let etapes = [];
        if(indiceFin != -1) {
            let k = 0;
            for(let i = 0; i <= indiceFin[0]; i++){
                
                etapes[k] = new Etape();
                etapes[k].code = nomFichier + ".selection("+ i +");" + "$('"+ nomBloc +"').empty();";
                if(i > 0) etapes[k].code += nomFichier + ".initAnimation("+ (i-1) +");";
                if(i+1 < this.fichier_TnOF.entete.nbBloc) etapes[k].code += nomFichier + ".initAnimation("+ (i+1) +");";

                let m = parseInt(i)+1;
                etapes[k].algorithme = "Parcours >>> Bloc " + m; 
                k++;   
            }
            
            let j = indiceFin[0];

            // Récupération du dernier Enreg du dernier Bloc
            let dernBloc = this.fichier_TnOF.entete.dernBlocNonVide;
            if(this.fichier_TnOF.tabBloc[dernBloc].nb == 0){
                dernBloc--;
                if(dernBloc < 0) dernBloc = 0;
            }
            let dernBlocNb = this.fichier_TnOF.tabBloc[dernBloc].nb;
            let dernEnreg = this.fichier_TnOF.tabBloc[dernBloc].tab[dernBlocNb-1];

            etapes[k] = new Etape();
            etapes[k].code = 
                "let bloc = new Grph_Bloc_TnOF("+ nomFichier +".fichier_TnOF.tabBloc["+ j +"], "+ nomFichier +".fichier_TnOF.entete.nbEnregMax, true);"+
                "$('"+ nomBloc +"').empty();"+
                "$('"+ nomBloc +"').append(bloc.conteneur);";

            let f = parseInt(j)+1;
            etapes[k].algorithme = "Lecture :: Bloc " + f; 
            k++;

            if(dernEnreg.cle != cle){
                let blc = new Grph_Bloc_TnOF(this.fichier_TnOF.tabBloc[j], this.fichier_TnOF.entete.nbEnregMax);
                let tab = blc.suppression(cle, dernEnreg.cle, "bloc");
                for(let z = 0; z < tab.length; z++){
                    etapes[k] = new Etape();
                    etapes[k].code = nomFichier + ".selection("+ j +");";
                    if(j+1 < this.fichier_TnOF.entete.nbBloc) etapes[k].code += nomFichier + ".initAnimation("+ (j+1) +");";

                    etapes[k].code += 
                        "let bloc = new Grph_Bloc_TnOF("+ nomFichier +".fichier_TnOF.tabBloc["+ j +"], "+ nomFichier +".fichier_TnOF.entete.nbEnregMax, false);"+
                        "$('"+ nomBloc +"').empty();"+
                        "$('"+ nomBloc +"').append(bloc.conteneur);";
                    if(j == dernBloc) {
                        etapes[k].code += 
                            "bloc.tabEnreg["+(dernBlocNb-1)+"].suppression();"+
                            "bloc.initNb("+ (dernBlocNb-1) +");";
                    }
            
                    etapes[k].code += tab[z].code;

                    etapes[k].algorithme += tab[z].algorithme;
                    k++;
                }
            }
            else{
                etapes[k] = new Etape();
                etapes[k].code = 
                        "let bloc = new Grph_Bloc_TnOF("+ nomFichier +".fichier_TnOF.tabBloc["+ j +"], "+ nomFichier +".fichier_TnOF.entete.nbEnregMax, false);"+
                        "$('"+ nomBloc +"').empty();"+
                        "$('"+ nomBloc +"').append(bloc.conteneur);";
                if(j == dernBloc) {
                    etapes[k].code += 
                            "bloc.tabEnreg["+(dernBlocNb-1)+"].suppression();"+
                            "bloc.initNb("+ (dernBlocNb-1) +");";
                    if(dernBlocNb != 1) etapes[k].algorithme = "Suppression :: Dernier Enreg";
                }

                if(dernBlocNb == 1){
                    etapes[k].code += 
                        "let conteneurBlocVide = document.createElement('div');"+
                        "conteneurBlocVide.setAttribute('class', 'fichier_LnOF_conteneurBlocVide');"+
                        nomFichier + ".conteneurTabBloc["+ j +"].removeChild("+nomFichier+".conteneurTabBloc["+ j +"].childNodes[1]);"+
                        nomFichier + ".conteneurTabBloc["+ j +"].append(conteneurBlocVide);";
                    etapes[k].algorithme += "Suppression :: Dernier Bloc"; 
                    if(j == dernBloc)  etapes[k].algorithme += " et Enreg";
                }
                k++;
            }
        }
        else {
            etapes[0] = new Etape();
            etapes[0].code = "";
            etapes[0].algorithme = "Echec >  La Clé est Introuvable";
        }
            
        return etapes;
    }

    // Méthodes d'Animation
    selection(j){

        $(this._conteneurTabBloc[j].childNodes[1]).addClass("animated fast shadow-drop-center");

    }

    initAnimation(j){

        $(this._conteneurTabBloc[j].childNodes[1]).removeClass("animated fast shadow-drop-center");

    }

}