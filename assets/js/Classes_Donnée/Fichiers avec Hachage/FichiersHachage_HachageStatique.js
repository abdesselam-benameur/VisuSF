class Fichier_Hachage {
    // Attributs
    _tabFich = [];
    _entete = {
        nbBlocHach: 0,
        nbEnregMax: 0,
    };

    
    // Constructeur
	constructor(nbBloc, b){
       this._entete.nbBlocHach = nbBloc;
       this._entete.nbEnregMax = b;
       for(let i = 0; i < this._entete.nbBlocHach; i++) this.tabFich[i] = new Fichier_LnOF(0, this.entete.nbEnregMax, 2);
    }

    
    // Setters et Getters
    set tabFich(tabFich){
        this._tabFich = tabFich;
    }

    get tabFich(){
        return this._tabFich;
    }

    set entete(entete){
        this._entete = entete;
    }

    get entete(){
        return this._entete;
    }

    set nbBlocHach(nbBloc){
        this._entete.nbBlocHach = nbBloc;
    }

    get nbBlocHach(){
        return this._entete.nbBlocHach;
    }

    set nbEnregMax(b){
        this._entete.nbEnregMax = b;
    }

    get nbEnregMax(){
        return this._entete.nbEnregMax;
    }


    // Methodes
    hachage(cle){
        return cle%this.nbBlocHach;
    }

	chgInit(tabVal){ 
        for(let i = 0; i < tabVal.length; i++){
            let blcHach = this.hachage(tabVal[i]);
            this.tabFich[blcHach].insertion(new EnregFixe(tabVal[i]), 0);
        }
    }
    

	recherche(cle){
        return this.tabFich[this.hachage(cle)].recherche(cle);
	}
    
	insertion(enregFixe){
        let f = this.tabFich[this.hachage(enregFixe.cle)];
        if(!((f.entete.nbBloc == f.entete.nbBlocMax)&&(f.plein()))){
            let nouvIndice = this.tabFich[this.hachage(enregFixe.cle)].tabLien.splice(0, 1);
            return this.tabFich[this.hachage(enregFixe.cle)].insertion(enregFixe, nouvIndice);
        }
    }	
    
	suppression(cle){
		return this.tabFich[this.hachage(cle)].suppression(cle);
	}

}