class Grph_EnregFixe{

    // Attributs
    _enregFixe;
    _conteneur;
    _conteneurValeur;

    // Constructeur
    constructor(enregFixe){

        this._enregFixe = enregFixe;
        this._conteneur = document.createElement('div');
        this._conteneur.setAttribute("class", "enregFixe_conteneur");
        
        this._conteneurValeur = document.createElement('div');
        this._conteneurValeur.setAttribute("class", "enregFixe_conteneurValeur");
        this._conteneurValeur.innerHTML = this._enregFixe.cle;
        
        let conteneurDecor = document.createElement('div');
        conteneurDecor.setAttribute("class", "enregFixe_conteneurDecor");
        
        let rectDecor1 = document.createElement('div');
        rectDecor1.setAttribute("class", "enregFixe_rectDecor1");
        let rectDecor2 = document.createElement('div');
        rectDecor2.setAttribute("class", "enregFixe_rectDecor2");
        let rectDecor3 = document.createElement('div');
        rectDecor3.setAttribute("class", "enregFixe_rectDecor3");

        conteneurDecor.append(rectDecor1, rectDecor2, rectDecor3);

        this._conteneur.append(this._conteneurValeur, conteneurDecor);

    }

    
    // Setters et Getters
    set enregFixe(enregFixe){

        this._enregFixe = enregFixe;

    }

    get enregFixe(){

        return this._enregFixe;

    }

    set conteneur(conteneur){

        this._conteneur = conteneur;

    }

    get conteneur(){

        return this._conteneur;

    }

    set conteneurValeur(conteneurValeur){

        this._conteneurValeur = conteneurValeur;

    }

    get conteneurValeur(){

        return this._conteneurValeur;

    }


    // Méthodes
    modifierEnreg(enregFixe){

        this._enregFixe = enregFixe;
        this._conteneurValeur.innerHTML = enregFixe.cle;

    }

    static conteneurVide(){

        let conteneurVide = document.createElement('div');
        conteneurVide.setAttribute("class", "enregFixe_conteneurVide");
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

    suppression(){

        $(this._conteneur).css("opacity", "0");

    }

 
}
