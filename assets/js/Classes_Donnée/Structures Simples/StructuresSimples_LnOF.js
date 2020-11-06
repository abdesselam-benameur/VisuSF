class Bloc_LnOF{   
    
    // Attributs
    _tab;
    _nb;
    _suiv;


    // Constructeur
    constructor(){

       this._tab = [];
       this._nb = 0;
       this._suiv = -1;

    }


    // Setters et Getters
    set tab(tab){ 

        this._tab = tab;

    }

    get tab(){

        return this._tab;

    }

    set nb(nb){

        this._nb = nb;

    }

    get nb(){

        return this._nb;

    }

    set suiv(suiv){

        this._suiv = suiv;

    }
    get suiv(){

        return this._suiv;

    }


    // Méthodes
    chgInit(tabVal, nbEnreg, lien){ 

        // Remplissage Aléatoire des Blocs (Valeurs Non Dupliquées)
		for (let i = 0; i < nbEnreg; i++) {
            let val = tabVal.splice(Math.floor(Math.random() * tabVal.length), 1);
			this._tab[i] = new EnregFixe(val);
        }
        
        // Affectation du Nombre d'Enregistrement dans 'nb'
        this._nb = nbEnreg;

        // Affectation du Lien dans 'suiv'
        this._suiv = lien;

    }

    recherche(cle){
        var c = cle;
        return this._tab.findIndex(testRecherche);

        function testRecherche(value, index, array){
            return value.cle == c;
        }

    }

    insertion(enregFixe){

        if(this.recherche(enregFixe.cle) == -1){
            this._tab[this._nb] = enregFixe;
            this._nb++;
        }

    }

    suppression(cle, nouvCle){

        let i = this.recherche(cle);
        if(i != -1){
            this._tab[i] = new EnregFixe(nouvCle);
        }

    }
}

class Fichier_LnOF{

    // Attributs
    _tabBloc = [];
    _entete = {
        tete: -1, 
        queue: -1,
        nbBloc: 0,
        nbEnregMax: 0,
        nbBlocMax:0,
    };
    _tabLien = [];

    
    // Constructeur
	constructor(nbBlocInit, b, nbBlocMax){
       this._entete.nbBloc = nbBlocInit;
       this._entete.nbEnregMax = b;
       this._entete.nbBlocMax = nbBlocMax;
       for(let k = 0; k < nbBlocMax; k++) this._tabLien[k] = k;
    }

    
    // Setters et Getters
    set tabBloc(tabBloc){
        this._tabBloc = tabBloc;
    }

    get tabBloc(){
        return this._tabBloc;
    }

    set entete(entete){
        this._entete = entete;
    }

    get entete(){
        return this._entete;
    }

    set tete(tete){
        this._entete.tete = tete;
    }

    get tete(){
        return this._entete.tete;
    }

    set queue(queue){
        this._entete.queue = queue;
    }

    get queue(){
        return this._entete.queue;
    }

    set nbBloc(nbBloc){
        this._entete.nbBloc = nbBloc;
    }

    get nbBloc(){
        return this._entete.nbBloc;
    }

    set nbEnregMax(b){
        this._entete.nbEnregMax = b;
    }

    get nbEnregMax(){
        return this._entete.nbEnregMax;
    }

    set nbBlocMax(b){
        this._entete.nbBlocMax = b;
    }

    get nbBlocMax(){
        return this._entete.nbBlocMax;
    }

    set tabLien(tab){
        this._tabLien = tab;
    }

    get tabLien(){
        return this._tabLien;
    }


    // Methodes
	chgInit(tabVal){ 
        if(this.entete.nbBloc != 0){
            // Tête de la Liste
            this._entete.tete = this.tabLien.splice(Math.floor(Math.random() * this.tabLien.length), 1);

            // Remplissage Aléatoire des Blocs (Valeurs Non Dupliquées)
            let i = this._entete.tete;
            for(let k = 0; k < this.entete.nbBloc-1; k++){
                let j = this.tabLien.splice(Math.floor(Math.random() * this.tabLien.length), 1);
                this._tabBloc[i] = new Bloc_LnOF();
                this._tabBloc[i].chgInit(tabVal, this._entete.nbEnregMax, j);	
                i = j; 
            }
            
            this._tabBloc[i] = new Bloc_LnOF();
            this._tabBloc[i].chgInit(tabVal, this._entete.nbEnregMax, -1);

            // Queue de la Liste
            this._entete.queue = i;
        }
    }
    

	recherche(cle){
        let numBloc = this._entete.tete;
        let numEnreg = -1;
        while(numBloc != -1){
            numEnreg = this._tabBloc[numBloc].recherche(cle);
            if(numEnreg != -1) return [numBloc, numEnreg];
            numBloc = this._tabBloc[numBloc].suiv;
        }	
        return -1;
	}
	
	plein(){
        if(this._entete.queue != -1){
            if (this._tabBloc[this._entete.queue].nb == this._entete.nbEnregMax) return true;
		    else return false;
        }
        else return false;
    }

    vide(){
        if(this._entete.queue != -1){
            if (this._tabBloc[this._entete.queue].nb == 0) return true;
		    else return false;
        }
        else return true;
    }
    
	insertion(enregFixe, nouvIndice){
        let nbVisite = {
            nbLect: 0,
            nbEcrit: 0,
        };

		if (this.recherche(enregFixe.cle) == -1){
			if ((this.plein()) || (this.entete.tete == -1)){
                if(this.entete.tete == -1) {
                    this.entete.tete = nouvIndice;
                    this.entete.queue = nouvIndice;
                    this._entete.nbBloc++;
                    this._tabBloc[nouvIndice]= new Bloc_LnOF();
                    this._tabBloc[this._entete.queue].suiv = -1; 
                }
                else {
                    this._entete.nbBloc++;
                    this._tabBloc[nouvIndice]= new Bloc_LnOF();
                    this._tabBloc[this._entete.queue].suiv = nouvIndice; 
                    this._entete.queue = nouvIndice;
                }
                nbVisite.nbLect = 1;
            }
            this._tabBloc[this._entete.queue].insertion(enregFixe);

            nbVisite.nbEcrit = 1;
        }

        return nbVisite;
    }	
    
	suppression(cle){

		let c = this.recherche(cle); 
		if (c != -1){
            // Position de l'Enregistrement à Supprimer
            let numBloc = c[0];
            let numEnreg = c[1];

            // Récupération et Suppression du Dernier Enregistrement du Dernier Bloc de la Liste
            let derBloc = this._tabBloc[this._entete.queue];
            let derEnreg = derBloc.tab.pop();
            derBloc.nb--;

            // Cas: Dernier Bloc Vide
            if(this.vide()){
                if(this.entete.tete != this._entete.queue){
                    let i = this.entete.tete; 
                    let prec = -1;
                    while(i != this._entete.queue){
                        prec = i;
                        i = this.tabBloc[i].suiv;
                    }
                    this._entete.nbBloc--;
                    this.tabLien.unshift(this._entete.queue);
                    this.tabBloc.splice(this._entete.queue, 1, undefined);
                    this._entete.queue = prec;
                    this.tabBloc[prec].suiv = -1;
                }
                else{
                    this.entete.nbBloc = 0;
                    this.tabLien.unshift(this._entete.queue);
                    this.tabBloc.splice(this.entete.tete, 1, undefined);
                    this.entete.tete = -1;
                    this.entete.queue = -1;
                }
                
            }
            if(derEnreg.cle != cle) this._tabBloc[numBloc].tab.splice(numEnreg, 1, derEnreg);
        }

	}

}