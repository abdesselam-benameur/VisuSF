class Grph_EnregArbre{

    // Attributs
    _enregArbre;
    _conteneur;

    // Constructeur
    constructor(enregArbre){

        this._enregArbre = enregArbre;

        this._conteneur = document.createElement('div');
        if(this._enregArbre.bool) this._conteneur.setAttribute("class", "enregArbre_conteneurV");
        else this._conteneur.setAttribute("class", "enregArbre_conteneurF");
        
        this._conteneur.innerHTML = this._enregArbre.cle;
    }

    
    // Setters et Getters
    set enregArbre(enregArbre){

        this._enregArbre = enregArbre;

    }

    get enregArbre(){

        return this._enregArbre;

    }

    set conteneur(conteneur){

        this._conteneur = conteneur;

    }

    get conteneur(){

        return this._conteneur;

    }


    // Méthodes
    modifierEnreg(enregArbre){

        this._enregArbre = enregArbre;
        this._conteneur.innerHTML = enregArbre.cle;
        this._conteneur.setAttribute("class", "enregArbre_conteneurF");
    }

    static conteneurVide(){

        let conteneurVide = document.createElement('div');
        conteneurVide.setAttribute("class", "enregArbre_conteneurVide");
        return conteneurVide;

    }


    // Méthodes d'Animation
    apparition(){

        this.initAnimation();

        $(this._conteneur).addClass("animated fast slide-in-blurred-left");

    }

    disparition(){

        this.initAnimation();

        $(this._conteneur).children().addClass("animated fast fadeOut");
        $(this._conteneur).fadeTo(800, 0.5);

    }

    ajout(){

        this.initAnimation();

        $(this._conteneur).addClass("animated fast bounceIn");

    }

    selection(){

        this.initAnimation();

        $(this._conteneur).addClass("animated fast shadow-drop-center");

    }

    validation(){

        this.initAnimation();

        $(this._conteneur).addClass("animated fast shadow-drop-center2");

    }

    initAnimation(){

        $(this._conteneur).removeClass("animated fast slide-in-blurred-left");

        $(this._conteneur).children().removeClass("animated fast fadeOut");
        $(this._conteneur).css("opacity", "1");

        $(this._conteneur).removeClass("animated fast bounceIn");

        $(this._conteneur).removeClass("animated fast shadow-drop-center");

        $(this._conteneur).removeClass("animated fast shadow-drop-center2");

    }

    insertion(){

        this._conteneur.setAttribute("class", "enregArbre_conteneurF");

    }

    suppression(){

        this._conteneur.setAttribute("class", "enregArbre_conteneurV");

    }

 
}

class Grph_Bloc_Arbre{

    // Attributs
    _bloc_arbre;
    _conteneur;
    _conteneurTabVal = [];
    _tabVal = [];
    _tabFils = [];
    _conteneurDegre_Valeur;


    // Constructeur
    constructor(bloc_arbre, animation, num){
        
        this._bloc_arbre = bloc_arbre;

        this._conteneur = document.createElement('div');
        this._conteneur.setAttribute("class", "bloc_arbre_conteneur");
        
        // Création du Conteneur du Tableau de Valeurs
        let conteneurTab1 = document.createElement('div');
        conteneurTab1.setAttribute("class", "bloc_arbre_conteneurTabVal"); 

        let conteneurTab1Text = document.createElement('p');
        conteneurTab1Text.setAttribute("class", "bloc_arbre_conteneurTabValText"); 
        conteneurTab1Text.innerHTML = 'Val :';

        let conteneurListeVal = document.createElement('ul');
        conteneurListeVal.setAttribute("class", "bloc_arbre_conteneurListeVal");

        for(let i = 0; i < this._bloc_arbre.ordre-1; i++){
            let conteneurEnreg = document.createElement('li');
            conteneurEnreg.setAttribute("class", "bloc_arbre_conteneurVal");
            conteneurEnreg.style.margin = "0px calc(100% / "+(this._bloc_arbre.ordre-1)+" - 3vw) 0px 0px ";
            conteneurEnreg.append(Grph_EnregArbre.conteneurVide());
            conteneurListeVal.append(conteneurEnreg);

            this._conteneurTabVal[i] = conteneurEnreg;
        }

        for(let i = 0; i < this._bloc_arbre.degre-1; i++){
            let grphEnreg = new Grph_EnregArbre(this._bloc_arbre.tabVal[i]);
            let conteneurEnreg = this._conteneurTabVal[i];      

            if(animation == false) conteneurEnreg.append(grphEnreg.conteneur);
            else {
                setTimeout(function(){
                grphEnreg.apparition();
                conteneurEnreg.append(grphEnreg.conteneur);
                }, i*125);
            }
            
            this._tabVal[i] = grphEnreg;
        }
        
        conteneurTab1.append(conteneurTab1Text, conteneurListeVal);

        // Création du Conteneur du Tableau de Fils
        let conteneurTab2 = document.createElement('div');
        conteneurTab2.setAttribute("class", "bloc_arbre_conteneurTabFils"); 

        let conteneurTab2Text = document.createElement('p');
        conteneurTab2Text.setAttribute("class", "bloc_arbre_conteneurTabFilsText"); 
        conteneurTab2Text.innerHTML = 'Fils :';

        let conteneurListeFils = document.createElement('ul');
        conteneurListeFils.setAttribute("class", "bloc_arbre_conteneurListeFils");

        for(let i = 0; i < this._bloc_arbre.ordre; i++){
            let conteneurFils = document.createElement('li');
            conteneurFils.setAttribute("class", "bloc_arbre_conteneurFils");
            conteneurFils.style.margin = "0px calc(100% / "+(this._bloc_arbre.ordre)+" - 3vw) 0px 0px ";
            if(this._bloc_arbre.tabFils[i] == undefined) conteneurFils.innerHTML = " ---";
            else if(this._bloc_arbre.tabFils[i] == -1) conteneurFils.innerHTML = "-1";
                else{
                    conteneurFils.innerHTML = parseInt(i + 2 + (num - 1) * this._bloc_arbre.ordre);
                }
                
            conteneurListeFils.append(conteneurFils);

            this._tabFils[i] = conteneurFils;
        }
        
        conteneurTab2.append(conteneurTab2Text, conteneurListeFils);

        // Création du Conteneur de l'attribut 'Degre'
        let conteneurDegre = document.createElement('div');
        conteneurDegre.setAttribute("class", "bloc_arbre_conteneurDegre");
        conteneurDegre.innerHTML = "Degré : ";

        this._conteneurDegre_Valeur = document.createElement('p');
        this._conteneurDegre_Valeur.setAttribute("class", "bloc_arbre_conteneurDegre_Valeur");

        for(let i = 0; i <= this._bloc_arbre.degre; i++){     
            if(animation == false) this._conteneurDegre_Valeur.innerHTML = i;
            else{
                let x = this._conteneurDegre_Valeur;
                setTimeout(function(){
                    x.innerHTML = i;
                }, i * 125);
            }
        }
        conteneurDegre.append(this._conteneurDegre_Valeur);

        
        this._conteneur.append(conteneurTab1, conteneurTab2, conteneurDegre);

    }


    // Setters et Getters
     set bloc_arbre(bloc_arbre){

        this._bloc_arbre = bloc_arbre;

    }

    get bloc_arbre(){

        return this._bloc_arbre;

    }

    set conteneur(conteneur){

        this._conteneur = conteneur;

    }

    get conteneur(){

        return this._conteneur;

    }

    set conteneurTabVal(conteneurTabVal){

        this._conteneurTabVal = conteneurTabVal;

    }

    get conteneurTabVal(){

        return this._conteneurTabVal;

    }

    set tabVal(tabVal){

        this.tabVal = tabVal;

    }

    get tabVal(){

        return this._tabVal;

    }

    set tabFils(tabFils){

        this.tabFils = tabFils;

    }

    get tabFils(){

        return this._tabFils;

    }

    set conteneurDegre_Valeur(conteneurDegre_Valeur){
        this._conteneurDegre_Valeur = conteneurDegre_Valeur;
    }

    get conteneurDegre_Valeur(){
        return this._conteneurDegre_Valeur;
    }

    initDegre(val){
        this._conteneurDegre_Valeur.innerHTML = parseInt(val);
    }

    // Méthodes
    recherche(cle, nomVar){

        // Récupération du Résultat de la Recherche
        let res = this._bloc_arbre.recherche(cle);
        let indiceFin = (res.trouv) ? res.pos : (res.pos - 1);
        if(!res.trouv && indiceFin < 0) indiceFin = 0;

        // Remplissage de la table d'Etapes
        let etapes = [];

        if(this.bloc_arbre.degre != 0){
            for(let i = 0; i < indiceFin; i++){
                etapes[i] = new Etape();
                etapes[i].code = nomVar + ".tabVal["+i+"].selection();";
                if(i > 0) etapes[i].code += nomVar + ".tabVal["+(i-1)+"].initAnimation();";
                etapes[i].code += nomVar + ".tabVal["+(i+1)+"].initAnimation();";
    
                etapes[i].algorithme = "Enreg :: " +(i+1)+" >> Echec";
            }
            
            etapes[indiceFin] = new Etape();
            if(indiceFin > 0) {
                etapes[indiceFin].code = 
                nomVar + ".tabVal["+(indiceFin-1)+"].initAnimation();"+
                nomVar + ".tabVal["+indiceFin+"].selection();";
            }
            else {
                etapes[indiceFin].code = nomVar + ".tabVal["+indiceFin+"].selection();";
            }

            if(res.trouv){
                if(!res.bool){
                    etapes[indiceFin+1] = new Etape();
                    etapes[indiceFin+1].code = nomVar + ".tabVal["+(indiceFin)+"].validation();";
        
                    etapes[indiceFin+1].algorithme = "Enreg :: " +(indiceFin+1)+" >> Succès";
                }
                else{
                    etapes[indiceFin+1] = new Etape();
                    etapes[indiceFin+1].code = nomVar + ".tabVal["+(indiceFin)+"].validation();";
    
                    etapes[indiceFin+1].algorithme = "Enreg :: " +(indiceFin+1)+" >> Supprimé";
                }
                
            }
            else{
                etapes[indiceFin+1] = new Etape();
                etapes[indiceFin+1].code = nomVar + ".tabVal["+indiceFin+"].initAnimation();";
    
                etapes[indiceFin+1].algorithme = "Enreg :: " +(indiceFin+1)+" >> Echec";
                
            }
        }

        return etapes;
    }

    insertion(enregArbre, nomVar){

        // Récupération du Résultat de la Recherche
        let res = this._bloc_arbre.recherche(enregArbre.cle);

        let etapes = [];
        etapes = etapes.concat(this.recherche(enregArbre.cle, nomVar));

        if((res.trouv)&&(res.bool)){
            let z = etapes.length-1;
            etapes[z].code +=  nomVar + ".tabVal["+res.pos+"].suppression();";

            let etape = new Etape();
            etape.code = nomVar + ".tabVal["+res.pos+"].insertion();";
            etape.algorithme = ">> Insertion Logique";

            etapes.push(etape);
        }

        if(!res.trouv){
            if(this.bloc_arbre.degre < this.bloc_arbre.ordre){
                let etape = new Etape();
                etape.code = "";
                etape.algorithme = "";
                for(let k = this.bloc_arbre.degre-1; k > res.pos; k--){
                    etape.code += nomVar + ".conteneurTabVal["+k+"].append(" + nomVar + ".tabVal["+(k-1)+"].conteneur);";
                    etape.code += nomVar + ".tabFils["+(k+1)+"].innerHTML = " + nomVar + ".tabFils["+k+"].innerHTML;";
                    etape.algorithme = "Décalage + ";
                }

                etape.code += nomVar + ".tabVal["+(res.pos)+"] = new Grph_EnregArbre(new EnregArbre(parseInt(this.val)));";
                etape.code += nomVar + ".conteneurTabVal["+res.pos+"].append(" + nomVar + ".tabVal["+(res.pos)+"].conteneur);";
                etape.code += nomVar + ".tabFils["+(res.pos+1)+"].innerHTML =  '-1';";
                etape.code += nomVar + ".initDegre("+(this.bloc_arbre.degre + 1)+");";

                if(this.bloc_arbre.degre == 0){
                    etape.code += nomVar + ".tabFils["+(res.pos)+"].innerHTML =  '-1';";
                    etape.code += nomVar + ".initDegre("+(this.bloc_arbre.degre + 2)+");";
                }

                etape.algorithme += "Insertion ...";

                etapes.push(etape);
            }
        }
        
        return etapes;
    }

    suppression(cle, nomVar){

        // Récupération du Résultat de la Recherche
        let res = this._bloc_arbre.recherche(cle);

        let etapes = [];
        etapes = etapes.concat(this.recherche(cle, nomVar));

        if((res.trouv)&&(!res.bool)){
            let z = etapes.length-1;
            etapes[z].code +=  nomVar + ".tabVal["+res.pos+"].insertion();";

            let etape = new Etape();
            etape.code = nomVar + ".tabVal["+res.pos+"].suppression();";
            etape.algorithme = ">> Suppression Logique";

            etapes.push(etape);
        }
        
        return etapes;
    }

}

class Grph_Fichier_Arbre{

    // Attributs
    _fichier_arbre;
    _conteneur;

    _tabLettre = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23','24','25','26'];
    _conteneurTabNoeud = [];
    _conteneurTabLien = [];


    // Constructeur
    constructor(fichier_arbre){
        this._fichier_arbre = fichier_arbre;
        
        
        this._conteneur = document.createElement('div');
        this._conteneur.setAttribute("class", "fichier_arbre_conteneur");

        // Hauteur 0
        let conteneurH0 = document.createElement('ul');
        conteneurH0.setAttribute("class", "d-flex justify-content-center align-items-center fichier_arbre_conteneurH0"); 

        let conteneurBloc = document.createElement('li');
        conteneurBloc.setAttribute("class", "fichier_arbre_conteneurBlocH0");
        conteneurBloc.innerHTML = this._tabLettre.shift();
            
        let conteneurBlocVide = document.createElement('div');
        conteneurBlocVide.setAttribute("class", "fichier_arbre_conteneurBlocNullH0");
        
        conteneurBloc.append(conteneurBlocVide);
        conteneurH0.append(conteneurBloc);
        this._conteneurTabNoeud.push(conteneurBloc);
        this._conteneur.append(conteneurH0);

        // Hauteur 1
        let dx;
        switch(this._fichier_arbre.ordre){
            case 2: dx = 25;break;
            case 3: dx = 17;break;
            case 4: dx = 13;break;
        }
        let conteneurLien1 = '<svg class = "fichier_arbre_conteneurLien">';

        let conteneurH1 = document.createElement('ul');
        conteneurH1.setAttribute("class", "d-flex justify-content-center align-items-center fichier_arbre_conteneurH1"); 
        for(let i = 0; i < this._fichier_arbre.ordre; i++){
            let conteneurBloc = document.createElement('li');
            conteneurBloc.setAttribute("class", "fichier_arbre_conteneurBlocH1");
            conteneurBloc.style.margin = "0px calc((100% / "+this._fichier_arbre.ordre+" - 4.14vw)/2) ";
            conteneurBloc.innerHTML = this._tabLettre.shift();
                
            let conteneurBlocVide = document.createElement('div');
            conteneurBlocVide.setAttribute("class", "fichier_arbre_conteneurBlocVideH1");

            conteneurLien1 += '<line x1="50%" y1="5" x2="'+dx+'%" y2="100%" class = "fichier_arbre_lien"/>';
            dx += (100 / this._fichier_arbre.ordre);
           
            conteneurBloc.append(conteneurBlocVide);
            conteneurH1.append(conteneurBloc);

            this._conteneurTabNoeud.push(conteneurBloc);
        }
        this._conteneur.innerHTML += conteneurLien1 + '</svg>';
        this._conteneur.append(conteneurH1);

        // Hauteur 2
        let du;
        switch(this._fichier_arbre.ordre){
            case 2: du = 12; dx = 23; break;
            case 3: du = 6; dx = 17; break;
            case 4: du = 3; dx = 13; break;
        }
        let conteneurLien2 = '<svg class = "fichier_arbre_conteneurLien">';

        let conteneurH2 = document.createElement('ul');
        conteneurH2.setAttribute("class", "d-flex justify-content-center align-items-center fichier_arbre_conteneurH2"); 
        for(let i = 0; i < this._fichier_arbre.ordre*this._fichier_arbre.ordre; i++){
            let conteneurBloc = document.createElement('li');
            conteneurBloc.setAttribute("class", "fichier_arbre_conteneurBlocH2");
            conteneurBloc.style.margin = "0px calc((100% / "+this._fichier_arbre.ordre*this._fichier_arbre.ordre+" - 2.72vw)/2) ";
            conteneurBloc.innerHTML = this._tabLettre.shift();
                
            let conteneurBlocVide = document.createElement('div');
            conteneurBlocVide.setAttribute("class", "fichier_arbre_conteneurBlocVideH2");

            conteneurLien2 += '<line x1="'+dx+'%" y1="5" x2="'+du+'%" y2="100%" class = "fichier_arbre_lien"/>';
            if((i+1)%this._fichier_arbre.ordre == 0) dx += (100 / this._fichier_arbre.ordre);
            du += (100 / (this._fichier_arbre.ordre*this._fichier_arbre.ordre));
            
            conteneurBloc.append(conteneurBlocVide);
            conteneurH2.append(conteneurBloc);
            this._conteneurTabNoeud.push(conteneurBloc);
        }
        this._conteneur.innerHTML += conteneurLien2 + '</svg>';
        this._conteneur.append(conteneurH2);

        // Remplissage des Noeuds
        let p = this.fichier_arbre.noeuds;
        if(p != -1){
            // Hauteur 0
            let conteneurBlocPlein = document.createElement('div');
            conteneurBlocPlein.setAttribute("class", "fichier_arbre_conteneurBlocPleinH0");

            let blocPlein_GrandRect1 = document.createElement('div');
            blocPlein_GrandRect1.setAttribute("class", "fichier_arbre_conteneurBlocPleinH0_grandRect1");
            let blocPlein_GrandRect2 = document.createElement('div');
            blocPlein_GrandRect2.setAttribute("class", "fichier_arbre_conteneurBlocPleinH0_grandRect2");
            let blocPlein_PetitRect = document.createElement('div');
            blocPlein_PetitRect.setAttribute("class", "fichier_arbre_conteneurBlocPleinH0_petitRect");

            conteneurBlocPlein.append(blocPlein_GrandRect1, blocPlein_GrandRect2, blocPlein_PetitRect);
            this._conteneurTabNoeud[0].removeChild(this._conteneurTabNoeud[0].childNodes[1]);
            this._conteneurTabNoeud[0].append(conteneurBlocPlein);   

            // Hauteur 1
            for(let k = 0; k < this.fichier_arbre.ordre; k++){
                p = this.fichier_arbre.noeuds.tabFils[k];
                if(p != undefined){
                    this.existenceLien(1, k);
                    if(p == -1){
                        this._conteneurTabNoeud[k+1].childNodes[1].setAttribute("class", "fichier_arbre_conteneurBlocNullH1");
                    }
                    else {
                        let conteneurBlocPlein = document.createElement('div');
                        conteneurBlocPlein.setAttribute("class", "fichier_arbre_conteneurBlocPleinH1");
            
                        let blocPlein_GrandRect1 = document.createElement('div');
                        blocPlein_GrandRect1.setAttribute("class", "fichier_arbre_conteneurBlocPleinH1_grandRect1");
                        let blocPlein_GrandRect2 = document.createElement('div');
                        blocPlein_GrandRect2.setAttribute("class", "fichier_arbre_conteneurBlocPleinH1_grandRect2");
                        let blocPlein_PetitRect = document.createElement('div');
                        blocPlein_PetitRect.setAttribute("class", "fichier_arbre_conteneurBlocPleinH1_petitRect");
            
                        conteneurBlocPlein.append(blocPlein_GrandRect1, blocPlein_GrandRect2, blocPlein_PetitRect);
                        this._conteneurTabNoeud[k+1].removeChild(this._conteneurTabNoeud[k+1].childNodes[1]);
                        this._conteneurTabNoeud[k+1].append(conteneurBlocPlein); 
                    }
                } 
            }

            // Hauteur 1
            for(let k = 0; k < this.fichier_arbre.ordre; k++){
                for(let l = 0; l < this.fichier_arbre.ordre; l++){
                    if((this.fichier_arbre.noeuds.tabFils[k] != undefined)&&(this.fichier_arbre.noeuds.tabFils[k] != -1)){
                    p = this.fichier_arbre.noeuds.tabFils[k].tabFils[l];
                    if(p != undefined){
                        this.existenceLien(2, this.fichier_arbre.ordre * k + l);
                        if(p == -1){
                            this._conteneurTabNoeud[this.fichier_arbre.ordre * (k+1) + l + 1].childNodes[1].setAttribute("class", "fichier_arbre_conteneurBlocNullH2");
                        }
                        else {
                            let conteneurBlocPlein = document.createElement('div');
                            conteneurBlocPlein.setAttribute("class", "fichier_arbre_conteneurBlocPleinH2");
                
                            let blocPlein_GrandRect1 = document.createElement('div');
                            blocPlein_GrandRect1.setAttribute("class", "fichier_arbre_conteneurBlocPleinH2_grandRect1");
                            let blocPlein_GrandRect2 = document.createElement('div');
                            blocPlein_GrandRect2.setAttribute("class", "fichier_arbre_conteneurBlocPleinH2_grandRect2");
                            let blocPlein_PetitRect = document.createElement('div');
                            blocPlein_PetitRect.setAttribute("class", "fichier_arbre_conteneurBlocPleinH2_petitRect");
                
                            conteneurBlocPlein.append(blocPlein_GrandRect1, blocPlein_GrandRect2, blocPlein_PetitRect);
                            this._conteneurTabNoeud[this.fichier_arbre.ordre * (k+1) + l + 1].removeChild(this._conteneurTabNoeud[this.fichier_arbre.ordre * (k+1) + l + 1].childNodes[1]);
                            this._conteneurTabNoeud[this.fichier_arbre.ordre * (k+1) + l + 1].append(conteneurBlocPlein); 
                        }
                    } 
                }
            }
            }
        }

        this._conteneur.replaceChild(conteneurH0, this._conteneur.childNodes[0]);
        this._conteneur.replaceChild(conteneurH1, this._conteneur.childNodes[2]);
        this._conteneur.replaceChild(conteneurH2, this._conteneur.childNodes[4]);

    }


    // Setters et Getters
     set fichier_arbre(fichier){

        this._fichier_arbre = fichier;

    }

    get fichier_arbre(){

        return this._fichier_arbre;

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

    set tabLettre(tab){
        this._tabLettre = tab;
    }

    get tabLettre(){
        return this._tabLettre;
    }

    set conteneurTabNoeud(tab){
        this._conteneurTabNoeud = tab;
    }

    get conteneurTabNoeud(){
        return this._conteneurTabNoeud;
    }

    set conteneurTabLien(tab){
        this._conteneurTabLien = tab;
    }

    get conteneurTabLien(){
        return this._conteneurTabLien;
    }


    // Méthodes
    recherche(cle, nomFichier, nomBloc){

        // Récupération du Résultat de la Recherche
        let res = this.fichier_arbre.recherche(cle);
        let chemin = [];
        let p = this.fichier_arbre.noeuds;
        let blocFin = (res.trouv) ? res.blocFin : res.blocPrec;

        let stop = false;
        let i = 0;
        
        if(p != -1){
            while((p != blocFin)&&(!stop)){
                chemin.push({bloc: p, num: i});
                let k = 0;
                let t = p;
                while((k < this.fichier_arbre.entete.ordre)&&(!stop)){
                    i++;
                    p = t.tabFils[k];

                    if((p != -1)&&(p != undefined)){
                        if(p == blocFin) stop = true;
                        else{
                            let q = p;
                            let j = this.fichier_arbre.entete.ordre + this.fichier_arbre.entete.ordre * (i - 1);

                            let m = 0;
                            while((m < this.fichier_arbre.entete.ordre)&&(!stop)){
                                j++;
                                p = q.tabFils[m];

                                if((p != -1)&&(p != undefined)){
                                    if(p == blocFin) {
                                        chemin.push({bloc: q, num: i});
                                        i = j;
                                        stop = true;
                                    }
                                }
                                m++;
                            }
                        }
                    }
                    
                    k++;
                }
            }
            chemin.push({bloc: p, num: i});
        }

        // Remplissage de la table d'Etapes
        let etapes = [];

        let k = 0;
        for(let i = 0; i < chemin.length; i++){
            
            etapes[k] = new Etape();
            etapes[k].code = nomFichier + ".selection("+ chemin[i].num +");" + "$('"+ nomBloc +"').empty();";
            if(i > 0) {
                etapes[k].code += nomFichier + ".initAnimation("+ chemin[i-1].num +");";
                let lien = chemin[i].num - 1 - this.fichier_arbre.entete.ordre * (i - 1);
                etapes[k].code += nomFichier + ".selectionLien("+i+", "+lien+");";
            }
            
            let n = parseInt(chemin[i].num)+1;
            etapes[k].algorithme = "Parcours :: Bloc " + n;
            k++;
            
            etapes[k] = new Etape();
            etapes[k].code = 
                "let bloc = new Grph_Bloc_Arbre("+ nomFichier +".fichier_arbre.getNoeud("+ (chemin[i].num+1) +"), true, "+(chemin[i].num+1)+");"+
                "$('"+ nomBloc +"').empty();"+
                "$('"+ nomBloc +"').append(bloc.conteneur);";

            etapes[k].algorithme = "Recherche Séquencielle >> Bloc " + n;
            k++;
 
            let blc = new Grph_Bloc_Arbre(chemin[i].bloc, false, chemin[i].num);
            let tab = blc.recherche(cle, "bloc");
            for(let z = 0; z < tab.length; z++){
                etapes[k] = new Etape();
                etapes[k].code = nomFichier + ".selection("+ chemin[i].num +");";
                if(i+1 < chemin.length) {
                    etapes[k].code += nomFichier + ".initAnimation("+ chemin[i+1].num+");";
                    let lien = chemin[i+1].num - 1 - this.fichier_arbre.entete.ordre * i;
                    etapes[k].code += nomFichier + ".existenceLien("+(i+1)+", "+lien+");";
                }

                etapes[k].code += 
                    "let bloc = new Grph_Bloc_Arbre("+ nomFichier +".fichier_arbre.getNoeud("+ (chemin[i].num+1) +"), false, "+(chemin[i].num+1)+");"+
                    "$('"+ nomBloc +"').empty();"+
                    "$('"+ nomBloc +"').append(bloc.conteneur);";
                
                etapes[k].code += tab[z].code;

                etapes[k].algorithme += tab[z].algorithme;
                k++;
            }
        }
            
        if(!res.trouv){
            etapes[k] = new Etape();
            etapes[k].code = "";
            etapes[k].algorithme = "--> Clé Introuvable";
        }

        return etapes;
    }

    insertion(enregArbre, nomFichier, nomBloc){

        if(this.fichier_arbre.noeuds == -1){
            let etapes = [];

            etapes[0] = new Etape();
            etapes[0].code = 
            "let conteneurBlocPlein = document.createElement('div');"+
            'conteneurBlocPlein.setAttribute("class", "fichier_arbre_conteneurBlocPleinH0");'+
            "let blocPlein_GrandRect1 = document.createElement('div');"+
            'blocPlein_GrandRect1.setAttribute("class", "fichier_arbre_conteneurBlocPleinH0_grandRect1");'+
            "let blocPlein_GrandRect2 = document.createElement('div');"+
            'blocPlein_GrandRect2.setAttribute("class", "fichier_arbre_conteneurBlocPleinH0_grandRect2");'+
            "let blocPlein_PetitRect = document.createElement('div');"+
            'blocPlein_PetitRect.setAttribute("class", "fichier_arbre_conteneurBlocPleinH0_petitRect");'+
            "conteneurBlocPlein.append(blocPlein_GrandRect1, blocPlein_GrandRect2, blocPlein_PetitRect);"+
            nomFichier + "._conteneurTabNoeud[0].removeChild(" + nomFichier + "._conteneurTabNoeud[0].childNodes[1]);"+
            nomFichier + "._conteneurTabNoeud[0].append(conteneurBlocPlein);$('"+ nomBloc +"').empty();";
            etapes[0].algorithme = "Création : Nouvelle Racine";

            etapes[1] = new Etape();
            etapes[1].code = nomFichier + ".selection(0);" + "$('"+ nomBloc +"').empty();";
            etapes[1].code += 
                    "let bloc = new Grph_Bloc_Arbre(new Bloc_Arbre("+nomFichier+".fichier_arbre.entete.ordre), true, 1);"+
                    "$('"+ nomBloc +"').empty();"+
                    "$('"+ nomBloc +"').append(bloc.conteneur);";
            etapes[1].algorithme = "Accés : Bloc 1";

            let blc = new Grph_Bloc_Arbre(new Bloc_Arbre(this.fichier_arbre.entete.ordre), false, 1);
            let tab = [];
            let k = 2;
                
            tab = blc.insertion(enregArbre, "bloc");

            for(let z = 0; z < tab.length; z++){
                etapes[k] = new Etape();

                etapes[k].code = 
                    "let bloc = new Grph_Bloc_Arbre(new Bloc_Arbre("+nomFichier+".fichier_arbre.entete.ordre), false, 1);"+
                    "$('"+ nomBloc +"').empty();"+
                    "$('"+ nomBloc +"').append(bloc.conteneur);";
                
                etapes[k].code += tab[z].code;

                etapes[k].algorithme += tab[z].algorithme;
                k++;
            }

            let m = etapes.length-1;
            etapes[m].code += 
                nomFichier + ".nonExistenceLien(1, 0);"+
                nomFichier + ".nonExistenceLien(1, 1);"+
                nomFichier + '._conteneurTabNoeud[1].childNodes[1].setAttribute("class", "fichier_arbre_conteneurBlocVideH1");'+
                nomFichier + '._conteneurTabNoeud[2].childNodes[1].setAttribute("class", "fichier_arbre_conteneurBlocVideH1");';


            let etape = new Etape();
            etape.code = 
                nomFichier + ".existenceLien(1, 0);"+
                nomFichier + ".existenceLien(1, 1);"+
                nomFichier + '._conteneurTabNoeud[1].childNodes[1].setAttribute("class", "fichier_arbre_conteneurBlocNullH1");'+
                nomFichier + '._conteneurTabNoeud[2].childNodes[1].setAttribute("class", "fichier_arbre_conteneurBlocNullH1");';
            etape.algorithme = "M.À.J des Liens";

            etapes.push(etape);

            return etapes;

        }
        else{

            // Récupération du Résultat de la Recherche
            let res = this.fichier_arbre.recherche(enregArbre.cle);
            let chemin = [];
            let p = this.fichier_arbre.noeuds;
            let blocFin = (res.trouv) ? res.blocFin : res.blocPrec;

            let stop = false;
            let i = 0;
            
            if(p != -1){
                while((p != blocFin)&&(!stop)){
                    chemin.push({bloc: p, num: i});
                    let k = 0;
                    let t = p;
                    while((k < this.fichier_arbre.entete.ordre)&&(!stop)){
                        i++;
                        p = t.tabFils[k];

                        if((p != -1)&&(p != undefined)){
                            if(p == blocFin) stop = true;
                            else{
                                let q = p;
                                let j = this.fichier_arbre.entete.ordre + this.fichier_arbre.entete.ordre * (i - 1);

                                let m = 0;
                                while((m < this.fichier_arbre.entete.ordre)&&(!stop)){
                                    j++;
                                    p = q.tabFils[m];

                                    if((p != -1)&&(p != undefined)){
                                        if(p == blocFin) {
                                            chemin.push({bloc: q, num: i});
                                            i = j;
                                            stop = true;
                                        }
                                    }
                                    m++;
                                }
                            }
                        }
                        
                        k++;
                    }
                }
                chemin.push({bloc: p, num: i});
            }

            // Remplissage de la table d'Etapes
            let etapes = [];

            let k = 0;
            for(let i = 0; i < chemin.length; i++){
                
                etapes[k] = new Etape();
                etapes[k].code = nomFichier + ".selection("+ chemin[i].num +");" + "$('"+ nomBloc +"').empty();";
                if(i > 0) {
                    etapes[k].code += nomFichier + ".initAnimation("+ chemin[i-1].num +");";
                    let lien = chemin[i].num - 1 - this.fichier_arbre.entete.ordre * (i - 1);
                    etapes[k].code += nomFichier + ".selectionLien("+i+", "+lien+");";
                }
                
                let n = parseInt(chemin[i].num)+1;
                etapes[k].algorithme = "Parcours :: Bloc " + n;
                k++;
                
                etapes[k] = new Etape();
                etapes[k].code = 
                    "let bloc = new Grph_Bloc_Arbre("+ nomFichier +".fichier_arbre.getNoeud("+ (chemin[i].num+1) +"), true, "+(chemin[i].num+1)+");"+
                    "$('"+ nomBloc +"').empty();"+
                    "$('"+ nomBloc +"').append(bloc.conteneur);";

                etapes[k].algorithme = "Recherche Séquencielle >> Bloc " + n;
                k++;
    
                if((res.trouv)&&(res.bool)){
                    let tab = [];
                    let blc = new Grph_Bloc_Arbre(chemin[i].bloc, false, chemin[i].num);
                    tab = blc.insertion(enregArbre, "bloc");
                    for(let z = 0; z < tab.length; z++){
                        etapes[k] = new Etape();
                        etapes[k].code = nomFichier + ".selection("+ chemin[i].num +");";
                        if(i+1 < chemin.length) {
                            etapes[k].code += nomFichier + ".initAnimation("+ chemin[i+1].num+");";
                            let lien = chemin[i+1].num - 1 - this.fichier_arbre.entete.ordre * i;
                            etapes[k].code += nomFichier + ".existenceLien("+(i+1)+", "+lien+");";
                        }
    
                        etapes[k].code += 
                            "let bloc = new Grph_Bloc_Arbre("+ nomFichier +".fichier_arbre.getNoeud("+ (chemin[i].num+1) +"), false, "+(chemin[i].num+1)+");"+
                            "$('"+ nomBloc +"').empty();"+
                            "$('"+ nomBloc +"').append(bloc.conteneur);";
                        
                        etapes[k].code += tab[z].code;
    
                        etapes[k].algorithme += tab[z].algorithme;
                        k++;
                    }
                }
                else {
                    if(res.blocPrec.degre < this.fichier_arbre.entete.ordre){
                        let tab = [];
                        let blc = new Grph_Bloc_Arbre(chemin[i].bloc, false, chemin[i].num);
                        tab = blc.insertion(enregArbre, "bloc");
    
                        if(i == chemin.length-1 && chemin.length < 3){
                            let numNull;
                            if(i == 0){
                                numNull = (chemin[i].num + 1) + (chemin[i].bloc.degre);
                            }
                            else{
                                numNull = (chemin[i].num + 1) + chemin[i].num *this.fichier_arbre.entete.ordre + (chemin[i].bloc.degre) - chemin[i].num ;
                            }
                            
                           
                            let numLien = numNull - 1 - i * this.fichier_arbre.entete.ordre ;
                            
                            let h = tab.length-2;
                            tab[h].code += 
                            nomFichier + ".nonExistenceLien("+(i+1)+", "+numLien+");"+
                            nomFichier + '._conteneurTabNoeud['+numNull+'].childNodes[1].setAttribute("class", "fichier_arbre_conteneurBlocVideH'+(i+1)+'");';
    
                            h++;
                            tab[h].code += 
                                nomFichier + ".existenceLien("+(i+1)+", "+numLien+");"+
                                nomFichier + '._conteneurTabNoeud['+numNull+'].childNodes[1].setAttribute("class", "fichier_arbre_conteneurBlocNullH'+(i+1)+'");';
                        }
    
                        for(let z = 0; z < tab.length; z++){
                            etapes[k] = new Etape();
                            etapes[k].code = nomFichier + ".selection("+ chemin[i].num +");";
                            if(i+1 < chemin.length) {
                                etapes[k].code += nomFichier + ".initAnimation("+ chemin[i+1].num+");";
                                let lien = chemin[i+1].num - 1 - this.fichier_arbre.entete.ordre * i;
                                etapes[k].code += nomFichier + ".existenceLien("+(i+1)+", "+lien+");";
                            }
        
                            etapes[k].code += 
                                "let bloc = new Grph_Bloc_Arbre("+ nomFichier +".fichier_arbre.getNoeud("+ (chemin[i].num+1) +"), false, "+(chemin[i].num+1)+");"+
                                "$('"+ nomBloc +"').empty();"+
                                "$('"+ nomBloc +"').append(bloc.conteneur);";
                            
                            etapes[k].code += tab[z].code;
        
                            etapes[k].algorithme += tab[z].algorithme;
                            k++;
                        }
    
                    }
                    else {
                        let nbNoeudMax = 1 + this.fichier_arbre.entete.ordre * (this.fichier_arbre.entete.ordre + 1);
                        if(this.fichier_arbre.entete.nbNoeud == nbNoeudMax){
                            let etape = new Etape();
                            etape.code = "";
                            etape.algorithme = "Err >> Pas d'Espace Mémoire";
    
                            etapes.push(etape);
                        }
                        else if(chemin.length == 3){
                            let etape = new Etape();
                            etape.code = "";
                            etape.algorithme = "Err >> Hauteur Max = 2";
    
                            etapes.push(etape);
                        }
                        else{
                            if(i == chemin.length-1 && chemin.length < 3){
                                let tab = [];
                                let k = etapes.length;
                                let blc = new Grph_Bloc_Arbre(chemin[i].bloc, false, chemin[i].num);
                                tab = blc.recherche(enregArbre, "bloc");
                                for(let z = 0; z < tab.length; z++){
                                    etapes[k] = new Etape();
                                    etapes[k].code = nomFichier + ".selection("+ chemin[i].num +");";
                                    if(i+1 < chemin.length) {
                                        etapes[k].code += nomFichier + ".initAnimation("+ chemin[i+1].num+");";
                                        let lien = chemin[i+1].num - 1 - this.fichier_arbre.entete.ordre * i;
                                        etapes[k].code += nomFichier + ".existenceLien("+(i+1)+", "+lien+");";
                                    }
                
                                    etapes[k].code += 
                                        "let bloc = new Grph_Bloc_Arbre("+ nomFichier +".fichier_arbre.getNoeud("+ (chemin[i].num+1) +"), false, "+(chemin[i].num+1)+");"+
                                        "$('"+ nomBloc +"').empty();"+
                                        "$('"+ nomBloc +"').append(bloc.conteneur);";
                                    
                                    etapes[k].code += tab[z].code;
                
                                    etapes[k].algorithme += tab[z].algorithme;
                                    k++;
                                }
                                
                                let numNoeud;
                                if(i == 0){
                                    numNoeud = (chemin[i].num + 1) + (res.enregPos+1);
                                }
                                else{
                                    numNoeud = (chemin[i].num + 1) + chemin[i].num *this.fichier_arbre.entete.ordre + (res.enregPos+1) - chemin[i].num ;
                                }
                                numNoeud--;

                                let d = etapes.length-1;
                                etapes[d].code +=
                                    nomFichier + ".existenceLien("+(i+1)+", "+(numNoeud-1)+");"+
                                    "let conteneurBlocNull = document.createElement('div');"+
                                    'conteneurBlocNull.setAttribute("class", "fichier_arbre_conteneurBlocNullH'+(i+1)+'");'+
                                    nomFichier + "._conteneurTabNoeud["+numNoeud+"].removeChild(" + nomFichier + "._conteneurTabNoeud["+numNoeud+"].childNodes[1]);"+
                                    nomFichier + "._conteneurTabNoeud["+numNoeud+"].append(conteneurBlocNull);";

                                let etape = new Etape();
                                etape.code = 
                                    "let conteneurBlocPlein = document.createElement('div');"+
                                    'conteneurBlocPlein.setAttribute("class", "fichier_arbre_conteneurBlocPleinH'+(i+1)+'");'+
                                    "let blocPlein_GrandRect1 = document.createElement('div');"+
                                    'blocPlein_GrandRect1.setAttribute("class", "fichier_arbre_conteneurBlocPleinH'+(i+1)+'_grandRect1");'+
                                    "let blocPlein_GrandRect2 = document.createElement('div');"+
                                    'blocPlein_GrandRect2.setAttribute("class", "fichier_arbre_conteneurBlocPleinH'+(i+1)+'_grandRect2");'+
                                    "let blocPlein_PetitRect = document.createElement('div');"+
                                    'blocPlein_PetitRect.setAttribute("class", "fichier_arbre_conteneurBlocPleinH'+(i+1)+'_petitRect");'+
                                    "conteneurBlocPlein.append(blocPlein_GrandRect1, blocPlein_GrandRect2, blocPlein_PetitRect);"+
                                    nomFichier + ".selectionLien("+(i+1)+", "+(numNoeud-1)+");"+
                                    nomFichier + "._conteneurTabNoeud["+numNoeud+"].removeChild(" + nomFichier + "._conteneurTabNoeud["+numNoeud+"].childNodes[1]);"+
                                    nomFichier + "._conteneurTabNoeud["+numNoeud+"].append(conteneurBlocPlein);$('"+ nomBloc +"').empty();";
                                etape.algorithme = "Création : Nouveau Noeud";
                                etapes.push(etape);

                                etape = new Etape();
                                etape.code = nomFichier + ".selection("+numNoeud+");" + "$('"+ nomBloc +"').empty();";
                                etape.code += 
                                        "let bloc = new Grph_Bloc_Arbre(new Bloc_Arbre("+nomFichier+".fichier_arbre.entete.ordre), true, "+(numNoeud+1)+");"+
                                        "$('"+ nomBloc +"').empty();"+
                                        "$('"+ nomBloc +"').append(bloc.conteneur);";
                                etape.algorithme = "Accés : Bloc "+(numNoeud+1);
                                etapes.push(etape);

                                blc = new Grph_Bloc_Arbre(new Bloc_Arbre(this.fichier_arbre.entete.ordre), false, numNoeud+1);
                                tab = [];
                                    
                                tab = blc.insertion(enregArbre, "bloc");
                                k = etapes.length;
                                for(let z = 0; z < tab.length; z++){
                                    etapes[k] = new Etape();

                                    etapes[k].code = 
                                        "let bloc = new Grph_Bloc_Arbre(new Bloc_Arbre("+nomFichier+".fichier_arbre.entete.ordre), false, "+(numNoeud+1)+");"+
                                        "$('"+ nomBloc +"').empty();"+
                                        "$('"+ nomBloc +"').append(bloc.conteneur);";
                                    
                                    etapes[k].code += tab[z].code;

                                    etapes[k].algorithme += tab[z].algorithme;
                                    k++;
                                }

                                if(i == chemin.length-1 && chemin.length == 1){
                                    let numNull = (numNoeud + 1) + numNoeud *this.fichier_arbre.entete.ordre - numNoeud;
                                    let numLien = numNull - 1 - this.fichier_arbre.entete.ordre ;

                                    let m = etapes.length-1;
                                    etapes[m].code += 
                                        nomFichier + ".nonExistenceLien("+(i+2)+", "+numLien+");"+
                                        nomFichier + ".nonExistenceLien("+(i+2)+", "+(numLien+1)+");"+
                                        nomFichier + '._conteneurTabNoeud['+numNull+'].childNodes[1].setAttribute("class", "fichier_arbre_conteneurBlocVideH'+(i+2)+'");'+
                                        nomFichier + '._conteneurTabNoeud['+(numNull+1)+'].childNodes[1].setAttribute("class", "fichier_arbre_conteneurBlocVideH'+(i+2)+'");';

                                    
                                    etape = new Etape();
                                    etape.code = 
                                        nomFichier + ".existenceLien("+(i+2)+", "+numLien+");"+
                                        nomFichier + ".existenceLien("+(i+2)+", "+(numLien+1)+");"+
                                        nomFichier + '._conteneurTabNoeud['+numNull+'].childNodes[1].setAttribute("class", "fichier_arbre_conteneurBlocNullH'+(i+2)+'");'+
                                        nomFichier + '._conteneurTabNoeud['+(numNull+1)+'].childNodes[1].setAttribute("class", "fichier_arbre_conteneurBlocNullH'+(i+2)+'");';
                                    etape.algorithme = "M.À.J des Liens";

                                    etapes.push(etape);
                                }
                            }
                                            
                        }
                    }                
                                
                }

            }
                
            if((res.trouv)&&(!res.bool)){
                let w = etapes.length;
                etapes[w] = new Etape();
                etapes[w].code = "";
                etapes[w].algorithme = "--> La Clé Existe";
            }

        

            return etapes;
        }
        
        
    }

    suppression(cle, nomFichier, nomBloc){
        // Récupération du Résultat de la Recherche
        let res = this.fichier_arbre.recherche(cle);
        let chemin = [];
        let p = this.fichier_arbre.noeuds;
        let blocFin = (res.trouv) ? res.blocFin : res.blocPrec;

        let stop = false;
        let i = 0;
        
        if(p != -1){
            while((p != blocFin)&&(!stop)){
                chemin.push({bloc: p, num: i});
                let k = 0;
                let t = p;
                while((k < this.fichier_arbre.entete.ordre)&&(!stop)){
                    i++;
                    p = t.tabFils[k];

                    if((p != -1)&&(p != undefined)){
                        if(p == blocFin) stop = true;
                        else{
                            let q = p;
                            let j = this.fichier_arbre.entete.ordre + this.fichier_arbre.entete.ordre * (i - 1);

                            let m = 0;
                            while((m < this.fichier_arbre.entete.ordre)&&(!stop)){
                                j++;
                                p = q.tabFils[m];

                                if((p != -1)&&(p != undefined)){
                                    if(p == blocFin) {
                                        chemin.push({bloc: q, num: i});
                                        i = j;
                                        stop = true;
                                    }
                                }
                                m++;
                            }
                        }
                    }
                    
                    k++;
                }
            }
            chemin.push({bloc: p, num: i});
        }

        // Remplissage de la table d'Etapes
        let etapes = [];

        let k = 0;
        for(let i = 0; i < chemin.length; i++){
            
            etapes[k] = new Etape();
            etapes[k].code = nomFichier + ".selection("+ chemin[i].num +");" + "$('"+ nomBloc +"').empty();";
            if(i > 0) {
                etapes[k].code += nomFichier + ".initAnimation("+ chemin[i-1].num +");";
                let lien = chemin[i].num - 1 - this.fichier_arbre.entete.ordre * (i - 1);
                etapes[k].code += nomFichier + ".selectionLien("+i+", "+lien+");";
            }
            
            let n = parseInt(chemin[i].num)+1;
            etapes[k].algorithme = "Parcours :: Bloc " + n;
            k++;
            
            etapes[k] = new Etape();
            etapes[k].code = 
                "let bloc = new Grph_Bloc_Arbre("+ nomFichier +".fichier_arbre.getNoeud("+ (chemin[i].num+1) +"), true, "+(chemin[i].num+1)+");"+
                "$('"+ nomBloc +"').empty();"+
                "$('"+ nomBloc +"').append(bloc.conteneur);";

            etapes[k].algorithme = "Recherche Séquencielle >> Bloc " + n;
            k++;
 
            let blc = new Grph_Bloc_Arbre(chemin[i].bloc, false, chemin[i].num);
            let tab = blc.suppression(cle, "bloc");
            for(let z = 0; z < tab.length; z++){
                etapes[k] = new Etape();
                etapes[k].code = nomFichier + ".selection("+ chemin[i].num +");";
                if(i+1 < chemin.length) {
                    etapes[k].code += nomFichier + ".initAnimation("+ chemin[i+1].num+");";
                    let lien = chemin[i+1].num - 1 - this.fichier_arbre.entete.ordre * i;
                    etapes[k].code += nomFichier + ".existenceLien("+(i+1)+", "+lien+");";
                }

                etapes[k].code += 
                    "let bloc = new Grph_Bloc_Arbre("+ nomFichier +".fichier_arbre.getNoeud("+ (chemin[i].num+1) +"), false, "+(chemin[i].num+1)+");"+
                    "$('"+ nomBloc +"').empty();"+
                    "$('"+ nomBloc +"').append(bloc.conteneur);";
                
                etapes[k].code += tab[z].code;

                etapes[k].algorithme += tab[z].algorithme;
                k++;
            }
        }
            
        if(!res.trouv){
            etapes[k] = new Etape();
            etapes[k].code = "";
            etapes[k].algorithme = "--> Clé Introuvable";
        }

        return etapes;
    }

    // Méthodes d'Animation
    selection(j){

        $(this._conteneurTabNoeud[j].childNodes[1]).addClass("animated fast shadow-drop-center");

    }

    initAnimation(j){

        $(this._conteneurTabNoeud[j].childNodes[1]).removeClass("animated fast shadow-drop-center");

    }

    existenceLien(h, lien){
        if(h == 2) h++;
        $(this._conteneur.childNodes[h].childNodes[lien]).attr("class", "fichier_arbre_lienExiste");
    }

    selectionLien(h, lien){
        if(h == 2) h++;
        $(this._conteneur.childNodes[h].childNodes[lien]).attr("class", "fichier_arbre_lienSelect");

    }

    nonExistenceLien(h, lien){
        if(h == 2) h++;
        $(this._conteneur.childNodes[h].childNodes[lien]).attr("class", "fichier_arbre_lien");

    }



}