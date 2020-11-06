class Etape{

    // Attributs
    _code;
    _algorithme = "";


    // Constructeur
    constructor(){}


    // Setters et Getters
    set code(code){

        this._code = code;

    }

    get code(){

        return this._code;

    }

    set algorithme(algorithme){

        this._algorithme = algorithme;

    }

    get algorithme(){

        return this._algorithme;

    }

}

class EnregFixe{

    // Attributs
    _cle;


    // Constructeur
    constructor(cle){

        this._cle = cle;

    }


    // Setter et Getter 
    set cle(cle){

        this._cle = cle;

    }

    get cle(){

        return this._cle;

    }

}