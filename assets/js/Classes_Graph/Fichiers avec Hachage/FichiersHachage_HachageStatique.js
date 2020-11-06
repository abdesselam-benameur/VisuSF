class Grph_Fichier_Hachage{

    // Attributs
    _fichier_hachage;
    _conteneur;
    _conteneurTabFich = [];
    _conteneurHach;
    _conteneurTabHach = [];


    // Constructeur
    constructor(fichier_hachage){
        this._fichier_hachage = fichier_hachage;
        
        this._conteneur = document.createElement('div');
        this._conteneur.setAttribute("class", "fichier_Hachage_conteneur");
        

        for(let i = 0; i < this._fichier_hachage.entete.nbBlocHach; i++){
            let conteneurGrph = document.createElement('div');
            conteneurGrph.setAttribute("class", "fichier_Hachage_conteneurFich");

            let grph = new Grph_Fichier_LnOF(this._fichier_hachage.tabFich[i]);
            this.conteneurTabFich[i] = grph;
            conteneurGrph.append(grph.conteneur);
            this._conteneur.append(conteneurGrph);
        }

        // Table d'Hachage

        this._conteneurHach = document.createElement('div');
        this._conteneurHach.setAttribute("class", "fichier_Hachage_conteneurHach");

        for(let i = 0; i < this._fichier_hachage.entete.nbBlocHach; i++){
            this._conteneurTabHach[i] = document.createElement('p');
            this._conteneurTabHach[i].setAttribute("class", "hachDeselect");
            this._conteneurTabHach[i].innerHTML = i;
            this._conteneurHach.append(this._conteneurTabHach[i]);
        }

    }


    // Setters et Getters
     set fichier_hachage(fichier){

        this._fichier_hachage = fichier;

    }

    get fichier_hachage(){

        return this._fichier_hachage;

    }

    set conteneur(conteneur){

        this._conteneur = conteneur;

    }

    get conteneur(){

        return this._conteneur;

    }

    set conteneurTabFich(conteneurTabFich){

        this._conteneurTabFich= conteneurTabFich;

    }

    get conteneurTabFich(){

        return this._conteneurTabFich;

    }

    set conteneurHach(conteneurHach){

        this._conteneurHach = conteneurHach;

    }

    get conteneurHach(){

        return this._conteneurHach;

    }

    set conteneurTabHach(conteneurTabHach){

        this._conteneurTabHach = conteneurTabHach;

    }

    get conteneurTabHach(){

        return this._conteneurTabHach;

    }


    // Méthodes
    recherche(cle, nomFichier, nomBloc){
        let numBloc = this.fichier_hachage.hachage(cle);
        let t = [];
        let etape = new Etape();
        etape.code = "";
        etape.algorithme = "--> h(Clé) = Clé Mod " + (this.fichier_hachage.entete.nbBlocHach) + " = " + numBloc;
        t[0] = etape;
      
        t = t.concat(this.conteneurTabFich[numBloc].recherche(cle, nomFichier + ".conteneurTabFich["+numBloc+"]", nomBloc));
        return t;
    }

    insertion(enregFixe, nomFichier, nomBloc){
        let numBloc = this.fichier_hachage.hachage(enregFixe.cle);
        let t = [];
        let etape = new Etape();
        etape.code = "";
        etape.algorithme = "--> h(Clé) = Clé Mod " + (this.fichier_hachage.entete.nbBlocHach) + " = " + numBloc;
        t[0] = etape;

        t = t.concat(this.conteneurTabFich[numBloc].insertion(enregFixe, nomFichier + ".conteneurTabFich["+numBloc+"]", nomBloc));
        return t;
    }

    suppression(cle, nomFichier, nomBloc){
        
        let numBloc = this.fichier_hachage.hachage(cle);
        let t = [];
        let etape = new Etape();
        etape.code = "";
        etape.algorithme = "--> h(Clé) = Clé Mod " + (this.fichier_hachage.entete.nbBlocHach) + " = " + numBloc;
        t[0] = etape;
      
        t = t.concat(this.conteneurTabFich[numBloc].suppression(cle, nomFichier + ".conteneurTabFich["+numBloc+"]", nomBloc));
        return t;
    }


}