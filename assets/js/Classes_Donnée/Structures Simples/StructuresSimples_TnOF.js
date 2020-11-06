class Bloc_TnOF{   
    
    // Attributs
    _tab;
    _nb;


    // Constructeur
    constructor(){

       this._tab = [];
       this._nb = 0;

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


    // Méthodes
    chgInit(tabVal, nbEnreg){ 

        // Remplissage Aléatoire des Blocs (Valeurs Non Dupliquées)
		for (let i = 0; i < nbEnreg; i++) {
            let val = tabVal.splice(Math.floor(Math.random() * tabVal.length), 1);
			this._tab[i] = new EnregFixe(val);
        }
        
        // Affectation du Nombre d'Enregistrement dans 'nb'
        this._nb = nbEnreg;

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

class Fichier_TnOF{

    // Attributs
    _tabBloc = [];
    _entete = {
        nbBloc: 0,
        dernBlocNonVide: 0, 
        nbEnregMax: 0,
    };

    
    // Constructeur
	constructor(nbBloc, b){
       this._entete.nbBloc = nbBloc;
       this._entete.nbEnregMax = b;
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

    set nbBloc(nbBloc){
        this._entete.nbBloc = nbBloc;
    }

    get nbBloc(){
        return this._entete.nbBloc;
    }

    set dernBlocNonVide(dernBlocNonVide){
        this._dernBlocNonVide = dernBlocNonVide;
    }

    get dernBlocNonVide(){
        return this._dernBlocNonVide;
    }

    set nbEnregMax(b){
        this._entete.nbEnregMax = b;
    }

    get nbEnregMax(){
        return this._entete.nbEnregMax;
    }


    // Methodes
    chgInit(tabVal){ 
        if(this.entete.nbBloc != 0){

            // Remplissage Aléatoire et Total des Blocs (Valeurs Non Dupliquées)
            for(let k = 0; k < this.entete.nbBloc-1; k++){
                this._tabBloc[k] = new Bloc_TnOF();
                this._tabBloc[k].chgInit(tabVal, this._entete.nbEnregMax);
            }
            
            // Remplissage du Dernier Bloc avec nb < nbEnregMax Valeurs
            let nb = Math.floor(Math.random() * this._entete.nbEnregMax);
            this._tabBloc[this.entete.nbBloc-1] = new Bloc_TnOF();
            this._tabBloc[this.entete.nbBloc-1].chgInit(tabVal, nb);

            // Affectation du Dernier Bloc Non Vide
            this.entete.dernBlocNonVide = this.entete.nbBloc-1;

        }
    }

	recherche(cle){
        for (let i = 0; i <= this.entete.nbBloc-1; i++){
            let j = this._tabBloc[i].recherche(cle);
			if(j != -1) return[i,j];	
		}	
        return -1;
	}
	
    plein(){
        if(this._tabBloc[this._entete.nbBloc-1].nb == this._entete.nbEnregMax) 
            return true;
        else return false;
    }
	insertion(enregFixe){
        if(!this.plein()){
            if (this.recherche(enregFixe.cle) == -1){
                this._tabBloc[this.entete.dernBlocNonVide].insertion(enregFixe);
                if(this._tabBloc[this._entete.dernBlocNonVide].nb == this._entete.nbEnregMax) {
                    this.entete.dernBlocNonVide++;
                    if(this.entete.dernBlocNonVide > this.entete.nbBloc-1) this.entete.dernBlocNonVide = this.entete.nbBloc-1;
                }
                return 1;
            }
        }
        return 0;
    }	
    
	suppression(cle){
        let nbVisite = {
            nbLect: 0,
            nbEcrit: 0,
        };

		let c = this.recherche(cle); 
		if (c != -1){
            // Position de l'Enregistrement à Supprimer
            let numBloc = c[0];
            let numEnreg = c[1];

            // Récupération et Suppression du Dernier Enregistrement du Dernier Bloc de la Liste
            let numDernBloc = this.entete.dernBlocNonVide;
            let derBloc = this._tabBloc[numDernBloc];
            let derEnreg;

            // Cas: Dernier Bloc Vide
            if(derBloc.nb == 0){
                this.entete.dernBlocNonVide--;
                if(this.entete.dernBlocNonVide < 0) this.entete.dernBlocNonVide = 0;
            }
            numDernBloc = this.entete.dernBlocNonVide;
            derBloc = this._tabBloc[numDernBloc];
            derEnreg = derBloc.tab.pop();
            derBloc.nb--;
            if(derEnreg.cle != cle) this._tabBloc[numBloc].tab.splice(numEnreg, 1, derEnreg);
        }
        
        nbVisite.nbLect = 0;
        nbVisite.nbEcrit = 1;
        
        return nbVisite;
	}

}