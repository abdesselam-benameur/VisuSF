class EnregArbre{

    // Attributs
    _cle;
    _bool;


    // Constructeur
    constructor(cle){

        this._cle = cle;
        this._bool = false;

    }


    // Setter et Getter 
    set cle(cle){

        this._cle = cle;

    }

    get cle(){

        return this._cle;

    }

    set bool(bool){

        this._bool = bool;

    }

    get bool(){

        return this._bool;

    }

}

class Bloc_Arbre{   
    
    // Attributs
    _tabVal;
    _tabFils;
    _degre;
    _ordre;



    // Constructeur
    constructor(ordre){

       this._tabVal = new Array(ordre-1);
       this._tabFils = new Array(ordre);
       this._degre = 0;
       this._ordre = ordre;

    }


    // Setters et Getters
    set tabVal(tab){ 

        this._tabVal = tab;

    }

    get tabVal(){

        return this._tabVal;

    }

    set tabFils(tab){ 

        this._tabFils = tab;

    }

    get tabFils(){

        return this._tabFils;

    }

    set degre(degre){

        this._degre = degre;

    }

    get degre(){

        return this._degre;

    }

    set ordre(ordre){

        this._ordre = ordre;

    }

    get ordre(){

        return this._ordre;

    }



    // Méthodes

    recherche(cle){
        let j = 0; 
        let trv = false;
        let stp = false ;
        let b = false;
        while (!trv && (j < this.degre-1) && !stp ){
            if(cle == this.tabVal[j].cle) trv = true;
            else if(cle < this.tabVal[j].cle) stp = true;
            else j++;
        }

        if(trv) b = this.tabVal[j].bool;
        
        return {
            trouv: trv,
            stop: stp,
            pos: j,
            bool: b,
        }
    
    }

    insertion(enregArbre){
        let res = this.recherche(enregArbre.cle);
        if(res.trouv){
            if(res.bool) this.tabVal[res.pos].bool = false;
            return -1;
        }
        else{
            if(this.degre < this.ordre){
                for(let k = this.degre; k > res.pos; k--){
                    this.tabVal[k] = this.tabVal[k-1];
                    this.tabFils[k+1] = this.tabFils[k];
                }
                this.tabVal[res.pos] = enregArbre;
                this.tabFils[res.pos+1] = -1;
                this.degre++;
                if(this.degre == 1){
                    this.tabFils[res.pos] = -1;
                    this.degre++;
                }
                return -1;
            }
            else{
                this.tabFils[res.pos] = new Bloc_Arbre(this.ordre);
                return this.tabFils[res.pos];
            }
        }
    }

    suppression(cle){

        let res = this.recherche(cle);
        if(res.trouv){
            if(!res.bool) this.tabVal[res.pos].bool = true;
        }

    }
}

class Fichier_Arbre{

    // Attributs
    _noeuds;
    _entete = {
        ordre: 0,
        nbNoeud: 0,
    };

    
    // Constructeur
	constructor(ordre){
       this._noeuds = -1;
       this._entete.ordre = ordre;
       this._entete.hauteur = 0;
       this._entete.nbNoeud = 0;
    }

    
    // Setters et Getters
    set noeuds(noeuds){
        this._noeuds = noeuds;
    }

    get noeuds(){
        return this._noeuds;
    }

    set entete(entete){
        this._entete = entete;
    }

    get entete(){
        return this._entete;
    }

    set ordre(ordre){
        this._entete.ordre = ordre;
    }

    get ordre(){
        return this._entete.ordre;
    }

    set nbNoeud(nbNoeud){
        this._entete.nbNoeud = nbNoeud;
    }

    get nbNoeud(){
        return this._entete.nbNoeud;
    }



    // Methodes
	chgInit(tabVal){ 
   
        let l = tabVal.length;
        // Remplissage Aléatoire des Blocs (Valeurs Non Dupliquées)
        for(let i = 0; i < l; i++){
            let val = tabVal.splice(Math.floor(Math.random() * tabVal.length), 1);
            let enregArbre = new EnregArbre(val);
            this.insertion(enregArbre);
        }
    }
    

	recherche(cle){
        let nbL = 0;
        let bloc = this.noeuds;
        let pos = -1;
        let prec = -1;
        let b = false;

        let trv = false;
        while(!trv && bloc != -1){
            let res = bloc.recherche(cle);
            trv = res.trouv;
            b = res.bool;
            if(!trv){
                prec = bloc;
                bloc = bloc.tabFils[res.pos];
                pos = res.pos;
            }
            nbL++;
        }
        
        return { 
            trouv: trv,
            blocFin: bloc,
            enregPos: pos,
            blocPrec: prec,
            bool: b,
            nbLect: nbL,
            nbEcrit: 0,
        }
	}
    
	insertion(enregArbre){
        let nbL = 0;
        let nbE = 0;

        if(this.noeuds == -1){
            this.noeuds = new Bloc_Arbre(this.ordre);
            this.noeuds.degre = 2;
            this.noeuds.tabVal[0] = enregArbre;
            this.noeuds.tabFils[0] = -1;
            this.noeuds.tabFils[1] = -1;

            nbL++;
            nbE++;
            this.nbNoeud++;
        }
        else{
            let res = this.recherche(enregArbre.cle);
            nbL += res.nbLect;
            nbE += res.nbEcrit;

            if(!res.trouv || res.bool){
                let x = (res.trouv) ? res.blocFin.insertion(enregArbre) : res.blocPrec.insertion(enregArbre);
                nbL++;
                if(x == -1) nbE++;
                
                if(x != -1) {
                    x.insertion(enregArbre);
                    nbL++;
                    nbE++;
                    this.nbNoeud++;
                }
                
            }
        }
        return {
            nbLect: nbL,
            nbEcrit: nbE,
        }
 
    }	
    
	suppression(cle){
        let nbL = 0;
        let nbE = 0;

        let res = this.recherche(cle);
        nbL += res.nbLect;
        nbE += res.nbEcrit;

        if(res.trouv && !res.bool) {
            res.blocFin.suppression(cle);
            nbE++;
        }

        return {nbLect: nbL, nbEcrit: nbE}
        
    }
    
    getNoeud(num){
        let bloc = this.noeuds;
        if(num != 1){
            let p = num-1;
            if(p <= this.entete.ordre){
                bloc = bloc.tabFils[p-1];
            }
            else{
                let q = p - this.entete.ordre - 1;
                let r = q / this.entete.ordre;
                let s = q % this.entete.ordre;

                bloc = bloc.tabFils[parseInt(r)];
                if((bloc != undefined)&&(bloc != -1)) bloc = bloc.tabFils[s];
                else bloc = undefined;
            }
        }
        return bloc;
    }

}