class Grph_Bloc_LOVC {

    // Attributs
    _bloc_LOVC;
    _conteneur;
    _conteneurTab = [];


    // Constructeur
    constructor(bloc_LOVC, b, animation) {

        this._bloc_LOVC = bloc_LOVC;

        this._conteneur = document.createElement('div');
        this._conteneur.setAttribute("class", "bloc_LOVC_conteneur");

        // Création du Conteneur du Tableau de caractères
        let conteneurTab = document.createElement('div');
        conteneurTab.setAttribute("class", "bloc_LOVC_conteneurTab");

        let conteneurTabText = document.createElement('p');
        conteneurTabText.setAttribute("class", "bloc_LOVC_conteneurTabText");
        conteneurTabText.innerHTML = 'Tab ';

        let conteneurTabCar = document.createElement('ul');
        conteneurTabCar.setAttribute("class", "bloc_LOVC_conteneurTabCar");

        for (let i = 0; i < bloc_LOVC.max; i++) {
            let conteneurCarac = document.createElement('li');
            conteneurCarac.setAttribute("class", "bloc_LOVC_conteneurCar");
            let conteneurCaracVide = document.createElement('div');
            conteneurCaracVide.setAttribute("class", "bloc_LOVC_conteneurCarVide");
            conteneurCarac.append(conteneurCaracVide);
            conteneurTabCar.append(conteneurCarac);
            this._conteneurTab[i] = conteneurCarac;

        }
        for (let i = 0; i < b; i++) {
            let conteneurCarac = this._conteneurTab[i];
            let conteneur = document.createElement('div');
            if (bloc_LOVC.tab[i] === false) {

                conteneur.setAttribute("class", "bloc_LOVC_conteneurBoolNonSup");
                conteneur.innerHTML = "F";
            }
            else {
                if (bloc_LOVC.tab[i] === true) {
                    conteneur.setAttribute("class", "bloc_LOVC_conteneurBoolSup");
                    conteneur.innerHTML = "V";
                }
                else {
                    if (bloc_LOVC.tab[i] == 0) {
                        conteneur.innerHTML = " ";
                        conteneur.setAttribute("class", "bloc_LOVC_conteneurRest");
                    }
                    else {
                        conteneur.setAttribute("class", "bloc_LOVC_conteneurCle");
                        conteneur.innerHTML = bloc_LOVC.tab[i];
                    }
                }
            }
            if (animation == false) conteneurCarac.firstChild.append(conteneur);
            else {
                setTimeout(function () {
                    $(conteneur).addClass("animated fast slide-in-blurred-left");
                    conteneurCarac.firstChild.append(conteneur);
                }, i * 50);
            }
            this._conteneurTab[i] = conteneurCarac;
        }

        conteneurTab.append(conteneurTabText, conteneurTabCar);

        // Création du Conteneur de l'attribut 'suiv'
        let conteneurSuiv = document.createElement('div');
        conteneurSuiv.setAttribute("class", "bloc_LOVC_conteneurSuiv");
        conteneurSuiv.innerHTML = "Suiv : ";

        let conteneurSuiv_Valeur = document.createElement('p');
        conteneurSuiv_Valeur.setAttribute("class", "bloc_LOVC_conteneurSuiv_Valeur");
        if(this._bloc_LOVC.suivant != -1) conteneurSuiv_Valeur.innerHTML = parseInt(this._bloc_LOVC.suivant) + 1;
        else conteneurSuiv_Valeur.innerHTML = this._bloc_LOVC.suivant;
        conteneurSuiv.append(conteneurSuiv_Valeur);

        this._conteneur.append(conteneurTab, conteneurSuiv);

    }


    // Setters et Getters
    set bloc_LOVC(bloc_LOVC) {

        this._bloc_LOVC = bloc_LOVC;

    }

    get bloc_LOVC() {

        return this._bloc_LOVC;

    }


    set conteneur(conteneur) {

        this._conteneur = conteneur;

    }

    get conteneur() {

        return this._conteneur;

    }


    // Méthodes d'Animation
    apparition(i) {

        this.initAnimation();
        $(this._conteneurTab[i]).addClass("animated fast slide-in-blurred-left");

    }

    disparition(i) {

        this.initAnimation();

        $(this._conteneurTab[i].firstChild.firstChild).children().addClass("animated fast fadeOut");
        $(this._conteneurTab[i].firstChild.firstChild).fadeTo(800, 0.0);

    }

    ajout(i) {

        this.initAnimation();

        $(this._conteneurTab[i].firstChild.firstChild).addClass("animated fast bounceIn");

    }

    selection(t, i) {

        this.initAnimation();
        for (let j = i; j < i + t; j++)
            if (j >= 0)
                $(this._conteneurTab[j].firstChild.firstChild).addClass("animated fast shadow-drop-center");

    }

    validation(t, i) {

        this.initAnimation();
        for (let j = i; j < i + t; j++)
            $(this._conteneurTab[j].firstChild.firstChild).addClass("animated fast shadow-drop-center2");

    }

    initAnimation() {

        $(this._conteneur).removeClass("animated fast slide-in-blurred-left");

        $(this._conteneur).children().removeClass("animated fast fadeOut");
        $(this._conteneur).css("opacity", "1");

        $(this._conteneur).removeClass("animated fast bounceIn");

        $(this._conteneur).removeClass("animated fast shadow-drop-center");

        $(this._conteneur).removeClass("animated fast shadow-drop-center2");

    }

    initAnimation(t, i) {
        for (let j = i; j < i + t; j++) {
            if (j >= 0) {
                $(this._conteneurTab[j].firstChild.firstChild).removeClass("animated fast slide-in-blurred-left");

                $(this._conteneurTab[j].firstChild.firstChild).children().removeClass("animated fast fadeOut");
                $(this._conteneurTab[j].firstChild.firstChild).css("opacity", "1");

                $(this._conteneurTab[j].firstChild.firstChild).removeClass("animated fast bounceIn");

                $(this._conteneurTab[j].firstChild.firstChild).removeClass("animated fast shadow-drop-center");

                $(this._conteneurTab[j].firstChild.firstChild).removeClass("animated fast shadow-drop-center2");
            }
        }

    }


    // Méthodes
    recherche(cle, nomVar, j, b, tai) {

        // Récupération du Résultat de la Recherche
        let result = {
            etapes: [],
            b: 0,
            ta: 0,
            trouv: false
        }
        let ind = 0;
        let tab_tailles = [];
        let tab_pos = [];
        let t = tai;
        if (j == -1) {
            tab_pos[ind] = 0;
            tab_tailles[ind] = t;
        }
        else {
            tab_pos[ind] = j;
            tab_tailles[ind] = this._bloc_LOVC.tab[j];
        }
        let res = this._bloc_LOVC.recherche_interne(cle, j, t);
        while ((!res.s) && (!res.next) && (!res.t) && (res.pos != b)) {
            ind++;
            tab_pos[ind] = res.pos;
            tab_tailles[ind] = this._bloc_LOVC.tab[res.pos];
            res = this._bloc_LOVC.recherche_interne(cle, res.pos, t);
        }
        if (res.s) {
            //ind++;
            tab_pos[ind] = res.pos;
            if (res.pos == -1) {
                ind++;
                tab_pos[ind] = 0;
                tab_tailles[ind] = this._bloc_LOVC.tab[res.pos] + res.pos;
            }
            else {
                if ((b - res.pos) > this._bloc_LOVC.tab[res.pos]) {
                    tab_tailles[ind] = this._bloc_LOVC.tab[res.pos];
                }
                else {
                    tab_tailles[ind] = b - res.pos;
                }
            }
        }
        if (res.next) {
            tab_pos[ind] = tab_pos[ind - 1] + tab_tailles[ind - 1];
            tab_tailles[ind] = b - tab_pos[ind - 1] - tab_tailles[ind - 1];
        }
        result.b = res.pos;
        result.trouv = res.t;
        result.ta = res.taille_prec;

        // Remplissage de la table d'Etapes


        result.etapes[0] = new Etape();
        result.etapes[0].algorithme = "Selection : Enreg 1";
        result.etapes[0].code =

            nomVar + ".selection(" + tab_tailles[0] + ", " + tab_pos[0] + ");" +
            nomVar + ".initAnimation(" + tab_tailles[1] + ", " + tab_pos[1] + ");";

        for (let i = 0; i < ind; i++) {
            result.etapes[i] = new Etape();
            let s = tab_tailles[i + 1];
            if ((i == (ind - 1)) && (res.t)) {
                if (s >= (b - tab_pos[ind]))
                    s = b - tab_pos[ind];
            }
            result.etapes[i].algorithme = "Selection : Enreg " + (i + 1);
            result.etapes[i].code =
                nomVar + ".initAnimation(" + tab_tailles[(i - 1)] + ", " + tab_pos[(i - 1)] + ");" +
                nomVar + ".selection(" + tab_tailles[i] + "," + tab_pos[i] + ");" +
                nomVar + ".initAnimation(" + s + ", " + tab_pos[(i + 1)] + ");";
        }
        let k = tab_tailles[ind];
        if (k >= (b - tab_pos[ind]))
            k = b - tab_pos[ind];
        result.etapes[ind] = new Etape();
        result.etapes[ind].algorithme = "Selection : Enreg " + (ind + 1);
        result.etapes[ind].code =
            nomVar + ".initAnimation(" + tab_tailles[(ind - 1)] + ", " + tab_pos[(ind - 1)] + ");" +
            nomVar + ".selection(" + k + ", " + tab_pos[ind] + ");";
        if (res.t) {
            result.etapes[ind + 1] = new Etape();
            result.etapes[ind + 1].algorithme = "--> Clé Trouvée";
            result.etapes[ind + 1].code =
                nomVar + ".validation(" + k + ", " + tab_pos[ind] + ");";
        }
        else {
            result.etapes[ind + 1] = new Etape();
            result.etapes[ind + 1].algorithme = "--> Clé Non Trouvée";
            result.etapes[ind + 1].code =
                nomVar + ".initAnimation(" + k + ", " + tab_pos[ind] + ");";
        }
        return result;
    }

    suppression_logique(cle, nomVar, j, b, tai) {

        // Récupération du Résultat de la Recherche
        let result = {
            etapes: [],
            b: 0,
            ta: 0,
            trouv: false,
            sup: true
        }
        let ind = 0;
        let tab_tailles = [];
        let tab_pos = [];
        let t = tai;
        if (j == -1) {
            tab_pos[ind] = 0;
            tab_tailles[ind] = t;
        }
        else {
            tab_pos[ind] = j;
            tab_tailles[ind] = this._bloc_LOVC.tab[j];
        }
        let res = this._bloc_LOVC.recherche_interne(cle, j, t);
        while ((!res.s) && (!res.next) && (!res.t) && (res.pos != b)) {
            ind++;
            tab_pos[ind] = res.pos;
            tab_tailles[ind] = this._bloc_LOVC.tab[res.pos];
            res = this._bloc_LOVC.recherche_interne(cle, res.pos, t);
        }
        if (res.s) {
            //ind++;
            tab_pos[ind] = res.pos;
            if (res.pos == -1) {
                ind++;
                tab_pos[ind] = 0;
                tab_tailles[ind] = this._bloc_LOVC.tab[res.pos] + res.pos;
            }
            else {
                if ((b - res.pos) > this._bloc_LOVC.tab[res.pos]) {
                    tab_tailles[ind] = this._bloc_LOVC.tab[res.pos];
                }
                else {
                    tab_tailles[ind] = b - res.pos;
                }
            }
        }
        if (res.next) {
            tab_pos[ind] = tab_pos[ind - 1] + tab_tailles[ind - 1];
            tab_tailles[ind] = b - tab_pos[ind - 1] - tab_tailles[ind - 1];
        }
        result.b = res.pos;
        result.trouv = res.t;
        result.ta = res.taille_prec;

        // Remplissage de la table d'Etapes


        result.etapes[0] = new Etape();
        result.etapes[0].algorithme = "Selection : Enreg 1";
        result.etapes[0].code =

            nomVar + ".selection(" + tab_tailles[0] + ", " + tab_pos[0] + ");" +
            nomVar + ".initAnimation(" + tab_tailles[1] + ", " + tab_pos[1] + ");";

        for (let i = 0; i < ind; i++) {
            result.etapes[i] = new Etape();
            let s = tab_tailles[i + 1];
            if ((i == (ind - 1)) && (res.t)) {
                if (s >= (b - tab_pos[ind]))
                    s = b - tab_pos[ind];
            }
            result.etapes[i].algorithme = "Selection : Enreg " + (i + 1);
            result.etapes[i].code =
                nomVar + ".initAnimation(" + tab_tailles[(i - 1)] + ", " + tab_pos[(i - 1)] + ");" +
                nomVar + ".selection(" + tab_tailles[i] + "," + tab_pos[i] + ");" +
                nomVar + ".initAnimation(" + s + ", " + tab_pos[(i + 1)] + ");";
        }
        let k = tab_tailles[ind];
        if (k >= (b - tab_pos[ind]))
            k = b - tab_pos[ind];
        result.etapes[ind] = new Etape();
        result.etapes[ind].algorithme = "Selection : Enreg " + (ind + 1);
        result.etapes[ind].code =
            nomVar + ".initAnimation(" + tab_tailles[(ind - 1)] + ", " + tab_pos[(ind - 1)] + ");" +
            nomVar + ".selection(" + k + ", " + tab_pos[ind] + ");";
        if (res.t) {
            result.etapes[ind + 1] = new Etape();
            result.etapes[ind + 1].algorithme = "--> Clé Trouvée";
            result.etapes[ind + 1].code =
                nomVar + ".validation(" + k + ", " + tab_pos[ind] + ");" +
                nomVar + ".initAnimation(" + k + ", " + tab_pos[(ind)] + ");";
            k = tab_pos[ind] + 2;
            if (k == b) {
                result.sup = false;
                return result;
            }
            if (j == -1)
                k = tab_pos[ind] + 1;
            if ((k) < this._bloc_LOVC.max) {
                if (this._bloc_LOVC.tab[k] === false) {
                    result.etapes[ind + 2] = new Etape();
                    result.etapes[ind + 2].algorithme = "Suppression : Enreg " + (ind + 1);
                    result.etapes[ind + 2].code =
                        nomVar + ".disparition(" + (k) + ");";
                    result.etapes[ind + 3] = new Etape();
                    result.etapes[ind + 3].code =
                        "let conteneur = document.createElement('div');" +
                        "conteneur.setAttribute('class', 'bloc_LOVC_conteneurBoolSup');" +
                        "conteneur.innerHTML = 'V';" +
                        "let old_cont = " + nomVar + "._conteneurTab[" + (k) + "].firstChild.firstChild;" +
                        nomVar + "._conteneurTab[" + (k) + "].firstChild.replaceChild(conteneur,old_cont);" +
                        nomVar + ".ajout(" + (k) + ");";
                }
                else {
                    result.etapes[ind + 2] = new Etape();
                    result.etapes[ind + 2].algorithme = "Echec > Clé déja Supprimée";
                    result.etapes[ind + 2].code = "";
                        
                }
            }
        }
        else {
            result.etapes[ind + 1] = new Etape();
            result.etapes[ind + 1].algorithme = "Echec > Clé Non Trouvée";
            result.etapes[ind + 1].code =
                nomVar + ".initAnimation(" + k + ", " + tab_pos[ind] + ");" ;
        }
        return result;
    }

    insertion(cle, n_t, nomVar, j, b, tai) {

        // Récupération du Résultat de la Recherche
        let result = {
            etapes: [],
            b: 0,
            ta: 0,
            trouv: false,
            insert: 0,
            bool: true,
            rest: 0,
        }
        let ind = 0;
        let tab_tailles = [];
        let tab_pos = [];
        let t = tai;
        if (j == -1) {
            tab_pos[ind] = 0;
            tab_tailles[ind] = t;
        }
        else {
            tab_pos[ind] = j;
            tab_tailles[ind] = this._bloc_LOVC.tab[j];
        }
        let res = this._bloc_LOVC.recherche_interne(cle, j, t);
        while ((!res.s) && (!res.next) && (!res.t) && (res.pos != b)) {
            ind++;
            tab_pos[ind] = res.pos;
            tab_tailles[ind] = this._bloc_LOVC.tab[res.pos];
            res = this._bloc_LOVC.recherche_interne(cle, res.pos, t);
        }
        if (res.s) {
            //ind++;
            tab_pos[ind] = res.pos;
            if (res.pos == -1) {
                ind++;
                tab_pos[ind] = 0;
                tab_tailles[ind] = this._bloc_LOVC.tab[res.pos] + res.pos;
            }
            else {
                if ((b - res.pos) > this._bloc_LOVC.tab[res.pos]) {
                    tab_tailles[ind] = this._bloc_LOVC.tab[res.pos];
                }
                else {
                    tab_tailles[ind] = b - res.pos;
                }
            }
        }
        if (res.next) {
            tab_pos[ind] = tab_pos[ind - 1] + tab_tailles[ind - 1];
            tab_tailles[ind] = b - tab_pos[ind - 1] - tab_tailles[ind - 1];
        }
        result.b = res.pos;
        result.trouv = res.t;
        result.ta = res.taille_prec;

        // Remplissage de la table d'Etapes


        result.etapes[0] = new Etape();
        result.etapes[0].algorithme = "Selection : Enreg 1";
        result.etapes[0].code =

            nomVar + ".selection(" + tab_tailles[0] + ", " + tab_pos[0] + ");" +
            nomVar + ".initAnimation(" + tab_tailles[1] + ", " + tab_pos[1] + ");";

        for (let i = 0; i < ind; i++) {
            result.etapes[i] = new Etape();
            let s = tab_tailles[i + 1];
            if ((i == (ind - 1)) && (res.t)) {
                if (s >= (b - tab_pos[ind]))
                    s = b - tab_pos[ind];
            }
            result.etapes[i].algorithme = "Selection : Enreg " + (i + 1);
            result.etapes[i].code =
                nomVar + ".initAnimation(" + tab_tailles[(i - 1)] + ", " + tab_pos[(i - 1)] + ");" +
                nomVar + ".selection(" + tab_tailles[i] + "," + tab_pos[i] + ");" +
                nomVar + ".initAnimation(" + s + ", " + tab_pos[(i + 1)] + ");";
        }
        let k = tab_tailles[ind];
        if (k >= (b - tab_pos[ind]))
            k = b - tab_pos[ind];
        result.etapes[ind] = new Etape();
        result.etapes[ind].algorithme = "Selection : Enreg " + (ind + 1);
        result.etapes[ind].code =
            nomVar + ".initAnimation(" + tab_tailles[(ind - 1)] + ", " + tab_pos[(ind - 1)] + ");" +
            nomVar + ".selection(" + k + ", " + tab_pos[ind] + ");";
        if (res.t) {
            result.etapes[ind + 1] = new Etape();
            result.etapes[ind + 1].algorithme = "Cle trouvee";
            result.etapes[ind + 1].code =
                nomVar + ".validation(" + k + ", " + tab_pos[ind] + ");" +
                nomVar + ".initAnimation(" + k + ", " + tab_pos[(ind)] + ");";
            k = tab_pos[ind] + 2;
            if (k == b) {
                result.bool = false;
                return result;
            }
            if (j == -1)
                k = tab_pos[ind] + 1;
            if ((k) < this._bloc_LOVC.max) {
                result.etapes[ind + 2] = new Etape();
                if (this._bloc_LOVC.tab[k] === true) {
                    result.etapes[ind + 2].algorithme = "Clé Supprimée : Réinsertion";
                    result.etapes[ind + 2].code =
                        nomVar + ".disparition(" + (k) + ");";
                    result.etapes[ind + 3] = new Etape();
                    result.etapes[ind + 3].code =
                        "let conteneur = document.createElement('div');" +
                        "conteneur.setAttribute('class', 'bloc_LOVC_conteneurBoolNonSup');" +
                        "conteneur.innerHTML = 'F';" +
                        "let old_cont = " + nomVar + "._conteneurTab[" + (k) + "].firstChild.firstChild;" +
                        nomVar + "._conteneurTab[" + (k) + "].firstChild.replaceChild(conteneur,old_cont);" +
                        nomVar + ".ajout(" + (k) + ");";
                }
                else {
                    result.etapes[ind + 2].algorithme = "Echec : Clé Existante";
                    result.etapes[ind + 2].code = "";
                }
            }
        }
        else {
            let c = tab_pos[ind];
            if ((res.pos == b) || (res.pos == -1)) {
                c = tab_pos[ind] + tab_tailles[ind];
            }
            if ((c + n_t) > this._bloc_LOVC.max)
                result.insert = c + n_t - this._bloc_LOVC.max;
            result.etapes[ind + 1] = new Etape();
            result.etapes[ind + 1].code =
                nomVar + ".initAnimation(" + k + ", " + tab_pos[ind] + ");";
            if ((b + n_t) > this._bloc_LOVC.max)
                result.rest = b + n_t - this._bloc_LOVC.max;
            result.etapes[ind + 2] = new Etape();
            result.etapes[ind + 2].algorithme = "Insertion > Clé " + cle;
            result.etapes[ind + 2].code =
                "let a = " + (b + n_t - 1) + ";" +
                "if(a >= " + nomVar + "._bloc_LOVC.max){" +
                "a = (" + nomVar + "._bloc_LOVC.max) - 1;}" +
                "let j = a - " + n_t + ";" +
                "if(a < " + (c + n_t) + "){" +
                "j = " + (c - 1) + ";}" +
                "if(" + c + " == " + tab_pos[ind] + "){" +
                "for(let k = " + (b - 1) + "; k > j; k--){" +
                nomVar + "._conteneurTab[k].firstChild.removeChild(" + nomVar + "._conteneurTab[k].firstChild.childNodes[0]);}}" +
                "while(a >= " + (c + n_t) + "){" +
                "let conteneur = " + nomVar + "._conteneurTab[j].firstChild.firstChild;" +
                nomVar + "._conteneurTab[a].firstChild.append(conteneur);" +
                nomVar + ".apparition(a);" +
                "a--;" +
                "j--;}" +
                "let i = " + (c) + ";" +
                "while((i < " + nomVar + "._bloc_LOVC.max)&&(i < " + (c + n_t) + ")){" +
                "let conteneur = document.createElement('div');" +
                "if(i == " + (c) + "){" +
                "conteneur.setAttribute('class', 'bloc_LOVC_conteneurCle');" +
                "conteneur.innerHTML = " + n_t + "}" +
                "else{if(i == " + (c + 1) + "){" +
                "conteneur.setAttribute('class', 'bloc_LOVC_conteneurCle');" +
                "conteneur.innerHTML = " + cle + ";}" +
                "else{if(i == " + (c + 2) + "){" +
                "conteneur.setAttribute('class', 'bloc_LOVC_conteneurBoolNonSup');" +
                "conteneur.innerHTML = 'F';}" +
                "else{" +
                "conteneur.setAttribute('class', 'bloc_LOVC_conteneurRest');" +
                "conteneur.innerHTML = ' ';}}}" +
                nomVar + "._conteneurTab[i].firstChild.append(conteneur,);" +
                nomVar + ".ajout(i);" +
                "i++;}" +
                "let t =" + (n_t) + ";" +
                "if(t > " + nomVar + ".bloc_LOVC.max - " + c + "){t = " + nomVar + ".bloc_LOVC.max - " + c + ";}" +
                nomVar + ".selection(t," + c + ");";
            result.rest = result.rest - result.insert;
        }
        return result;
    }

}




class Grph_Fichier_LOVC {

    // Attributs
    _fichier_LOVC;
    _conteneur;
    _conteneurTabBloc = [];


    // Constructeur
    constructor(fichier_LOVC) {

        this._fichier_LOVC = fichier_LOVC;


        this._conteneur = document.createElement('div');
        this._conteneur.setAttribute("class", "fichier_LOVC_conteneur");

        let conteneurTab = document.createElement('ul');
        conteneurTab.setAttribute("class", "fichier_LOVC_conteneurTabBloc");



        for (let i = 0; i < 10; i++) {
            let conteneurBloc = document.createElement('li');
            conteneurBloc.setAttribute("class", "fichier_LOVC_conteneurBloc");
            conteneurBloc.innerHTML = (i + 1 < 10) ? ("Bloc 0" + (i + 1)) : ("Bloc " + (i + 1));

            let conteneurBlocVide = document.createElement('div');
            conteneurBlocVide.setAttribute("class", "fichier_LOVC_conteneurBlocVide");
            conteneurBloc.append(conteneurBlocVide);

            conteneurTab.append(conteneurBloc);
            this._conteneurTabBloc[i] = conteneurBloc;
        }

        let j = this.fichier_LOVC.tete;
        for (let i = 0; i < this.fichier_LOVC.nb_blocs; i++) {

            let conteneurBlocPlein = document.createElement('div');
            conteneurBlocPlein.setAttribute("class", "fichier_LOVC_conteneurBlocPlein");

            let blocPlein_GrandRect = document.createElement('div');
            blocPlein_GrandRect.setAttribute("class", "fichier_LOVC_conteneurBlocPlein_grandRect");
            let blocPlein_PetitRect1 = document.createElement('div');
            blocPlein_PetitRect1.setAttribute("class", "fichier_LOVC_conteneurBlocPlein_petitRect1");

            conteneurBlocPlein.append(blocPlein_GrandRect, blocPlein_PetitRect1);
            this._conteneurTabBloc[j].removeChild(this._conteneurTabBloc[j].childNodes[1]);
            this._conteneurTabBloc[j].append(conteneurBlocPlein);
            j = this.fichier_LOVC.tab_blocs[j].suivant;
        }


        this._conteneur.append(conteneurTab);

    }


    // Setters et Getters
    set fichier_LOVC(fichier) {

        this._fichier_LOVC = fichier;

    }

    get fichier_LOVC() {

        return this._fichier_LOVC;

    }

    set conteneur(conteneur) {

        this._conteneur = conteneur;

    }

    get conteneur() {

        return this._conteneur;

    }

    set conteneurTabBloc(conteneurTabBloc) {

        this._conteneurTabBloc = conteneurTabBloc;

    }

    get conteneurTabBloc() {

        return this._conteneurTabBloc;

    }


    // Méthodes
    recherche(cle, nomFichier, nomBloc) {

        // Récupération du Résultat de la Recherche
        let resultat = this.fichier_LOVC.recherche(cle);
        let nbIter = 0;
        let b;
        let a = 0;
        let te = this.fichier_LOVC.tete;
        while (te != resultat.a) {
            nbIter++;
            te = this.fichier_LOVC.tab_blocs[te].suivant;
        }
        nbIter++;

        // Remplissage de la table d'Etapes
        let etapes = [];

        let j = this.fichier_LOVC.tete;
        let prec = -1;
        let k = 0;
        let t = 0;
        for (let i = 0; i < nbIter; i++) {

            if (this.fichier_LOVC.tab_blocs[j].suivant == -1)
                b = this.fichier_LOVC.b;
            else
                b = this.fichier_LOVC.tab_blocs[j].max;
            etapes[k] = new Etape();
            etapes[k].code = nomFichier + ".selection(" + j + ");" + "$('" + nomBloc + "').empty();";
            if (prec != -1) etapes[k].code += nomFichier + ".initAnimation(" + prec + ");";
            k++;

            etapes[k] = new Etape();
            etapes[k].algorithme = "Accés >> Bloc " + (parseInt(j)+1);
            etapes[k].code =
                "let bloc = new Grph_Bloc_LOVC(" + nomFichier + ".fichier_LOVC.tab_blocs[" + j + "], " + b + ", false);" +
                "$('" + nomBloc + "').empty();" +
                "$('" + nomBloc + "').append(bloc.conteneur);";
            k++;

            let blc = new Grph_Bloc_LOVC(this.fichier_LOVC.tab_blocs[j], b, false);
            let resultat = blc.recherche(cle, "bloc", a, b, t);
            t = resultat.ta;
            let tab = resultat.etapes;
            a = resultat.b;
            for (let z = 0; z < tab.length; z++) {
                if (this.fichier_LOVC.tab_blocs[j].suivant == -1)
                    b = this.fichier_LOVC.b;
                else
                    b = this.fichier_LOVC.tab_blocs[j].max;
                etapes[k] = new Etape();
                etapes[k].code = nomFichier + ".selection(" + j + ");";
                let suiv = this.fichier_LOVC.tab_blocs[j].suivant;
                if (suiv != -1) etapes[k].code += nomFichier + ".initAnimation(" + suiv + ");";

                etapes[k].code +=
                    "let bloc = new Grph_Bloc_LOVC(" + nomFichier + ".fichier_LOVC.tab_blocs[" + j + "], " + b + ", false);" +
                    "$('" + nomBloc + "').empty();" +
                    "$('" + nomBloc + "').append(bloc.conteneur);";

                etapes[k].code += tab[z].code;
                etapes[k].algorithme += tab[z].algorithme;
                k++;
            }

            prec = j;
            j = this.fichier_LOVC.tab_blocs[j].suivant;
        }

        if ((prec != -1)) {
            etapes[k] = new Etape();
            etapes[k].code = nomFichier + ".initAnimation(" + prec + ");";
        }

        return etapes;
    }


    suppression(cle, nomFichier, nomBloc) {

        // Récupération du Résultat de la Recherche

        let resultat = this.fichier_LOVC.recherche(cle);
        let nbIter = 0;
        let b;
        let a = 0;
        let te = this.fichier_LOVC.tete;
        while (te != resultat.a) {
            nbIter++;
            te = this.fichier_LOVC.tab_blocs[te].suivant;
        }
        nbIter++;

        // Remplissage de la table d'Etapes
        let etapes = [];

        let j = this.fichier_LOVC.tete;
        let prec = -1;
        let k = 0;
        let t = 0;
        for (let i = 0; i < nbIter; i++) {

            if (this.fichier_LOVC.tab_blocs[j].suivant == -1)
                b = this.fichier_LOVC.b;
            else
                b = this.fichier_LOVC.tab_blocs[j].max;
            etapes[k] = new Etape();
            etapes[k].code = nomFichier + ".selection(" + j + ");" + "$('" + nomBloc + "').empty();";
            if (prec != -1) etapes[k].code += nomFichier + ".initAnimation(" + prec + ");";
            k++;

            etapes[k] = new Etape();
            etapes[k].algorithme = "Accés >> Bloc " + (parseInt(j)+1);
            etapes[k].code =
                "let bloc = new Grph_Bloc_LOVC(" + nomFichier + ".fichier_LOVC.tab_blocs[" + j + "], " + b + ", false);" +
                "$('" + nomBloc + "').empty();" +
                "$('" + nomBloc + "').append(bloc.conteneur);";
            k++;

            let blc = new Grph_Bloc_LOVC(this.fichier_LOVC.tab_blocs[j], b, false);
            let resultat = blc.suppression_logique(cle, "bloc", a, b, t);
            t = resultat.ta;
            let tab = resultat.etapes;
            a = resultat.b;
            for (let z = 0; z < tab.length; z++) {
                if (this.fichier_LOVC.tab_blocs[j].suivant == -1)
                    b = this.fichier_LOVC.b;
                else
                    b = this.fichier_LOVC.tab_blocs[j].max;
                etapes[k] = new Etape();
                etapes[k].code = nomFichier + ".selection(" + j + ");";
                let suiv = this.fichier_LOVC.tab_blocs[j].suivant;
                if (suiv != -1) etapes[k].code += nomFichier + ".initAnimation(" + suiv + ");";

                etapes[k].code +=
                    "let bloc = new Grph_Bloc_LOVC(" + nomFichier + ".fichier_LOVC.tab_blocs[" + j + "], " + b + ", false);" +
                    "$('" + nomBloc + "').empty();" +
                    "$('" + nomBloc + "').append(bloc.conteneur);";

                etapes[k].code += tab[z].code;
                etapes[k].algorithme += tab[z].algorithme;
                k++;
            }
            let l = this.fichier_LOVC.tab_blocs[j].suivant;
            if (!(resultat.sup) && (resultat.trouv)) {
                if (this.fichier_LOVC.tab_blocs[l].suivant == -1)
                    b = this.fichier_LOVC.b;
                else
                    b = this.fichier_LOVC.tab_blocs[j].max;
                etapes[k] = new Etape();
                etapes[k].algorithme = "Accés >> Bloc " + (parseInt(l)+1);
                etapes[k].code = nomFichier + ".selection(" + l + ");";
                let suiv = this.fichier_LOVC.tab_blocs[l].suivant;
                if (suiv != -1) etapes[k].code += nomFichier + ".initAnimation(" + suiv + ");";

                etapes[k].code +=
                    "let bloc = new Grph_Bloc_LOVC(" + nomFichier + ".fichier_LOVC.tab_blocs[" + l + "], " + b + ", false);" +
                    "$('" + nomBloc + "').empty();" +
                    "$('" + nomBloc + "').append(bloc.conteneur);";
                if (this.fichier_LOVC.tab_blocs[l].tab[0] === false) {
                    etapes[k].algorithme = "Suppression : Enreg 1";
                    etapes[k].code +=
                        "bloc.disparition(" + (0) + ");" +
                        k++;
                    etapes[k] = new Etape();
                    etapes[k].code =
                        "let bloc = new Grph_Bloc_LOVC(" + nomFichier + ".fichier_LOVC.tab_blocs[" + l + "], " + b + ", false);" +
                        "$('" + nomBloc + "').empty();" +
                        "$('" + nomBloc + "').append(bloc.conteneur);" +
                        "let conteneur = document.createElement('div');" +
                        "conteneur.setAttribute('class', 'bloc_LOVC_conteneurBoolSup');" +
                        "conteneur.innerHTML = 'V';" +
                        "let old_cont = bloc._conteneurTab[" + (0) + "].firstChild.firstChild;" +
                        "bloc._conteneurTab[" + (0) + "].firstChild.replaceChild(conteneur,old_cont);" +
                        "bloc.ajout(" + (0) + ");";
                }
                else {
                    k++;
                    etapes[k] = new Etape();
                    etapes[k].algorithme = "Err >> Clé Existante";
                    etapes[k].code = "";
                }
                k++;
            }


            prec = j;
            j = this.fichier_LOVC.tab_blocs[j].suivant;
        }

        if ((prec != -1)) {
            etapes[k] = new Etape();
            etapes[k].code = nomFichier + ".initAnimation(" + prec + ");";
        }


        return etapes;
    }

    insertion(cle, taille_enr, nomFichier, nomBloc) {

        // Récupération du Résultat de la Recherche
        let resultat = this.fichier_LOVC.recherche(cle);
        let nbIter = 0;
        let b;
        let a = resultat.a;
        let prec = -1;
        let te = this.fichier_LOVC.tete;
        if (resultat.b == -1) {
            a = resultat.prec;
            resultat.b = this.fichier_LOVC.tab_blocs[this.fichier_LOVC.tete].max - 1;
        }
        while (te != a) {
            nbIter++;
            prec = te;
            te = this.fichier_LOVC.tab_blocs[te].suivant;
        }
        // Remplissage de la table d'Etapes
        let etapes = [];
        a = 0;
        let j = this.fichier_LOVC.tete;
        prec = -1;
        let k = 0;
        let t = 0;
        if (((this.fichier_LOVC.b + taille_enr) > this.fichier_LOVC.tab_blocs[this.fichier_LOVC.tete].max - 1) && (this.fichier_LOVC.tabLien.length == 0)) {
            etapes[0] = new Etape();
            etapes[0].code = "";
            etapes[0].algorithme = "Err >> Pas d'Espace Mémoire";
            return etapes;
        }
        else {
            for (let i = 0; i < nbIter; i++) {

                if (this.fichier_LOVC.tab_blocs[j].suivant == -1)
                    b = this.fichier_LOVC.b;
                else
                    b = this.fichier_LOVC.tab_blocs[j].max;
                etapes[k] = new Etape();
                etapes[k].code = nomFichier + ".selection(" + j + ");" + "$('" + nomBloc + "').empty();";
                if (prec != -1) etapes[k].code += nomFichier + ".initAnimation(" + prec + ");";
                k++;

                etapes[k] = new Etape();
                etapes[k].algorithme = "Accés >> Bloc " + (parseInt(j)+1);
                etapes[k].code =
                    "let bloc = new Grph_Bloc_LOVC(" + nomFichier + ".fichier_LOVC.tab_blocs[" + j + "], " + b + ", false);" +
                    "$('" + nomBloc + "').empty();" +
                    "$('" + nomBloc + "').append(bloc.conteneur);";
                k++;
                let blc = new Grph_Bloc_LOVC(this.fichier_LOVC.tab_blocs[j], b, false);
                let resultat = blc.recherche(cle, "bloc", a, b, t);
                t = resultat.ta;
                let tab = resultat.etapes;
                a = resultat.b;
                for (let z = 0; z < tab.length; z++) {
                    if (this.fichier_LOVC.tab_blocs[j].suivant == -1)
                        b = this.fichier_LOVC.b;
                    else
                        b = this.fichier_LOVC.tab_blocs[j].max;
                    etapes[k] = new Etape();
                    etapes[k].code = nomFichier + ".selection(" + j + ");";
                    let suiv = this.fichier_LOVC.tab_blocs[j].suivant;
                    if (suiv != -1) etapes[k].code += nomFichier + ".initAnimation(" + suiv + ");";

                    etapes[k].code +=
                        "let bloc = new Grph_Bloc_LOVC(" + nomFichier + ".fichier_LOVC.tab_blocs[" + j + "], " + b + ", false);" +
                        "$('" + nomBloc + "').empty();" +
                        "$('" + nomBloc + "').append(bloc.conteneur);";

                    etapes[k].code += tab[z].code;
                    etapes[k].algorithme += tab[z].algorithme;
                    k++;
                }


                prec = j;
                j = this.fichier_LOVC.tab_blocs[j].suivant;
            }
            if (this.fichier_LOVC.tab_blocs[j].suivant == -1)
                b = this.fichier_LOVC.b;
            else
                b = this.fichier_LOVC.tab_blocs[j].max;
            etapes[k] = new Etape();
            etapes[k].algorithme = "Accés >> Bloc " + (parseInt(j)+1);
            etapes[k].code = nomFichier + ".selection(" + j + ");" + "$('" + nomBloc + "').empty();";
            if (prec != -1) etapes[k].code += nomFichier + ".initAnimation(" + prec + ");";
            k++;

            etapes[k] = new Etape();
            etapes[k].code =
                "let bloc = new Grph_Bloc_LOVC(" + nomFichier + ".fichier_LOVC.tab_blocs[" + j + "], " + b + ", false);" +
                "$('" + nomBloc + "').empty();" +
                "$('" + nomBloc + "').append(bloc.conteneur);";
            k++;


            let blc = new Grph_Bloc_LOVC(this.fichier_LOVC.tab_blocs[j], b, false);
            resultat = blc.insertion(cle, taille_enr, "bloc", a, b, t);
            t = resultat.ta;
            let tab = resultat.etapes;
            a = resultat.b;
            for (let z = 0; z < tab.length; z++) {
                if (this.fichier_LOVC.tab_blocs[j].suivant == -1)
                    b = this.fichier_LOVC.b;
                else
                    b = this.fichier_LOVC.tab_blocs[j].max;
                etapes[k] = new Etape();
                etapes[k].code = nomFichier + ".selection(" + j + ");";
                let suiv = this.fichier_LOVC.tab_blocs[j].suivant;
                if (suiv != -1) etapes[k].code += nomFichier + ".initAnimation(" + suiv + ");";

                etapes[k].code +=
                    "let bloc = new Grph_Bloc_LOVC(" + nomFichier + ".fichier_LOVC.tab_blocs[" + j + "], " + b + ", false);" +
                    "$('" + nomBloc + "').empty();" +
                    "$('" + nomBloc + "').append(bloc.conteneur);";

                etapes[k].code += tab[z].code;
                etapes[k].algorithme += tab[z].algorithme;
                k++;
            }
            let su = this.fichier_LOVC.tab_blocs[j].suivant;
            if (a == -1) {
                etapes[k] = new Etape();
                let f = this.fichier_LOVC.tab_blocs[j].max - 1;
                if (this.fichier_LOVC.tab_blocs[su].tab[0] == cle) {
                    if (this.fichier_LOVC.tab_blocs[su].suivant == -1)
                        b = this.fichier_LOVC.b;
                    else
                        b = this.fichier_LOVC.tab_blocs[su].max;
                        etapes[k].algorithme = "Accés >> Bloc " + (parseInt(su)+1);
                    etapes[k].code = nomFichier + ".selection(" + su + ");" + "$('" + nomBloc + "').empty();";
                    if (j != -1) etapes[k].code += nomFichier + ".initAnimation(" + j + ");";
                    etapes[k].code +=
                        "bloc = new Grph_Bloc_LOVC(" + nomFichier + ".fichier_LOVC.tab_blocs[" + su + "], " + b + ", false);" +
                        "$('" + nomBloc + "').empty();" +
                        "$('" + nomBloc + "').append(bloc.conteneur);";
                    k++;
                    etapes[k] = new Etape();
                    if (this.fichier_LOVC.tab_blocs[su].tab[1] == false) {
                        etapes[k].algorithme = "Echec > Clé Existante";
                        etapes[k].code =
                            "let bloc = new Grph_Bloc_LOVC(" + nomFichier + ".fichier_LOVC.tab_blocs[" + su + "], " + b + ", false);" +
                            "$('" + nomBloc + "').empty();" +
                            "$('" + nomBloc + "').append(bloc.conteneur);" +
                            nomFichier + ".initAnimation(" + su + ")";
                    }
                    else {
                        etapes[k].algorithme = "Clé déja Supprimée : Réinsertion";
                        etapes[k].code =
                            "let bloc = new Grph_Bloc_LOVC(" + nomFichier + ".fichier_LOVC.tab_blocs[" + su + "], " + b + ", false);" +
                            "$('" + nomBloc + "').empty();" +
                            "$('" + nomBloc + "').append(bloc.conteneur);" +
                            "let conteneur = document.createElement('div');" +
                            "conteneur.setAttribute('class', 'bloc_LOVC_conteneurBoolNonSup');" +
                            "conteneur.innerHTML = 'F';" +
                            "let old_cont = bloc._conteneurTab[1].firstChild.firstChild;" +
                            "bloc._conteneurTab[1].firstChild.replaceChild(conteneur,old_cont);" +
                            "bloc.ajout(1);" +
                            nomFichier + ".initAnimation(" + su + ")";

                    }

                }
                else {
                    if (this.fichier_LOVC.tab_blocs[j].suivant == -1)
                        b = this.fichier_LOVC.b;
                    else
                        b = this.fichier_LOVC.tab_blocs[j].max;
                        etapes[k].algorithme = "Accés >> Bloc " + (parseInt(j)+1);
                    etapes[k].code = nomFichier + ".selection(" + j + ");";
                    etapes[k].code +=
                        "let bloc = new Grph_Bloc_LOVC(" + nomFichier + ".fichier_LOVC.tab_blocs[" + j + "], " + b + ", false);" +
                        "$('" + nomBloc + "').empty();" +
                        "$('" + nomBloc + "').append(bloc.conteneur);";
                    etapes[k].code +=
                        "let s = " + f + ";" +
                        "bloc._conteneurTab[s].firstChild.removeChild(bloc._conteneurTab[s].firstChild.childNodes[0]);" +
                        "let conteneur = document.createElement('div');" +
                        "conteneur.setAttribute('class', 'bloc_LOVC_conteneurCle');" +
                        "conteneur.innerHTML = " + taille_enr + ";" +
                        "bloc._conteneurTab[s].firstChild.append(conteneur,);" +
                        "bloc.ajout(s);" +
                        "bloc.selection(1 ,s);";
                    resultat.insert = taille_enr - 1;
                    resultat.rest = 1;
                    k++;
                    if (this.fichier_LOVC.tab_blocs[su].suivant == -1)
                        b = this.fichier_LOVC.b;
                    else
                        b = this.fichier_LOVC.tab_blocs[su].max;
                    etapes[k] = new Etape();
                    etapes[k].algorithme = "Bloc " + (parseInt(su)+1) + " : Insertion & Décalages";
                    etapes[k].code = nomFichier + ".selection(" + su + ");" + "$('" + nomBloc + "').empty();";
                    if (j != -1) etapes[k].code += nomFichier + ".initAnimation(" + j + ");";
                    etapes[k].code +=
                        "bloc = new Grph_Bloc_LOVC(" + nomFichier + ".fichier_LOVC.tab_blocs[" + su + "], " + b + ", false);" +
                        "$('" + nomBloc + "').empty();" +
                        "$('" + nomBloc + "').append(bloc.conteneur);";
                    etapes[k].code += "let i = " + (b - 1) + ";" +
                        "let j = i - " + (taille_enr - 1) + ";" +
                        "for(let k = " + (b - 1) + "; k > j; k--){" +
                        "bloc._conteneurTab[k].firstChild.removeChild(bloc._conteneurTab[k].firstChild.childNodes[0]);}" +
                        "while(i >= " + (taille_enr - 1) + "){" +
                        "let conteneur = bloc._conteneurTab[j].firstChild.firstChild;" +
                        "bloc._conteneurTab[i].firstChild.append(conteneur);" +
                        "bloc.apparition(i);" +
                        "i--;" +
                        "j--;}" +
                        "i = 0;" +
                        "while((i < " + (taille_enr - 1) + ")){" +
                        "let conteneur = document.createElement('div');" +
                        "if(i == 0){" +
                        "conteneur.setAttribute('class', 'bloc_LOVC_conteneurCle');" +
                        "conteneur.innerHTML = " + cle + ";}" +
                        "else{if(i == 1){" +
                        "conteneur.setAttribute('class', 'bloc_LOVC_conteneurBoolNonSup');" +
                        "conteneur.innerHTML = 'F';}" +
                        "else{" +
                        "conteneur.setAttribute('class', 'bloc_LOVC_conteneurRest');" +
                        "conteneur.innerHTML = ' ';}}" +
                        "bloc._conteneurTab[i].firstChild.append(conteneur,);" +
                        "bloc.ajout(i);" +
                        "i++;}" +
                        "let t =" + (taille_enr - 1) + ";" +
                        "bloc.selection(t, 0);";
                    j = su;
                }
                k++;
            }
            if (!(resultat.bool)) {
                etapes[k] = new Etape();
                let su = this.fichier_LOVC.tab_blocs[j].suivant;
                if (this.fichier_LOVC.tab_blocs[su].suivant == -1)
                    b = this.fichier_LOVC.b;
                else
                    b = this.fichier_LOVC.tab_blocs[su].max;
                etapes[k].algorithme = "Bloc " + (parseInt(su)+1) + ": selection";
                etapes[k].code = nomFichier + ".selection(" + su + ");" + "$('" + nomBloc + "').empty();";
                if (j != -1) etapes[k].code += nomFichier + ".initAnimation(" + j + ");";
                etapes[k].code +=
                    "bloc = new Grph_Bloc_LOVC(" + nomFichier + ".fichier_LOVC.tab_blocs[" + su + "], " + b + ", false);" +
                    "$('" + nomBloc + "').empty();" +
                    "$('" + nomBloc + "').append(bloc.conteneur);";
                k++;
                etapes[k] = new Etape();
                if (this.fichier_LOVC.tab_blocs[su].tab[0] == false) {
                    etapes[k].algorithme = "Cle Existante : Pas d'Insertion";
                    etapes[k].code =
                        "let bloc = new Grph_Bloc_LOVC(" + nomFichier + ".fichier_LOVC.tab_blocs[" + su + "], " + b + ", false);" +
                        "$('" + nomBloc + "').empty();" +
                        "$('" + nomBloc + "').append(bloc.conteneur);" +
                        nomFichier + ".initAnimation(" + su + ")";
                }
                else {
                    etapes[k].algorithme = "Clé Supprimée : Réinsertion";
                    etapes[k].code =
                        "let bloc = new Grph_Bloc_LOVC(" + nomFichier + ".fichier_LOVC.tab_blocs[" + su + "], " + b + ", false);" +
                        "$('" + nomBloc + "').empty();" +
                        "$('" + nomBloc + "').append(bloc.conteneur);" +
                        "let conteneur = document.createElement('div');" +
                        "conteneur.setAttribute('class', 'bloc_LOVC_conteneurBoolNonSup');" +
                        "conteneur.innerHTML = 'F';" +
                        "let old_cont = bloc._conteneurTab[0].firstChild.firstChild;" +
                        "bloc._conteneurTab[0].firstChild.replaceChild(conteneur,old_cont);" +
                        "bloc.ajout(0);" +
                        nomFichier + ".initAnimation(" + su + ")";

                }
            }
            prec = j;
            j = this.fichier_LOVC.tab_blocs[j].suivant;

            if (!(this.fichier_LOVC.recherche(cle).tr)) {
                while (j != -1) {
                    etapes[k] = new Etape();
                    etapes[k].algorithme = "> Décalages Intra Blocs";
                    etapes[k].code = nomFichier + ".initAnimation(" + prec + ");" +
                        nomFichier + ".selection(" + j + ");";
                    let suiv = this.fichier_LOVC.tab_blocs[j].suivant;
                    if (suiv != -1) etapes[k].code += nomFichier + ".initAnimation(" + suiv + ");";
                    k++;
                    prec = j;
                    j = this.fichier_LOVC.tab_blocs[j].suivant;
                }

                if ((prec != -1)) {
                    etapes[k] = new Etape();
                    etapes[k].code = nomFichier + ".initAnimation(" + prec + ");";
                    if ((this._fichier_LOVC.b + taille_enr) >= this._fichier_LOVC.tab_blocs[this.fichier_LOVC.tete].max) {
                        etapes[k].code += "let j = " + nomFichier + "._fichier_LOVC.tabLien[0];" +
                            "if (" + nomFichier + "._conteneurTabBloc[j].childNodes[1].classList.contains('fichier_LOVC_conteneurBlocPlein')) {" +
                            "let conteneurBlocVide = document.createElement('div');" +
                            'conteneurBlocVide.setAttribute("class", "fichier_LOVC_conteneurBlocVide");' +
                            nomFichier + "._conteneurTabBloc[j].replaceChild(conteneurBlocVide, " + nomFichier + "._conteneurTabBloc[j].childNodes[1]);" +
                            nomFichier + ".ajout(j);}";
                    }
                    k++;
                }

                if ((this._fichier_LOVC.b + taille_enr) >= this._fichier_LOVC.tab_blocs[this.fichier_LOVC.tete].max) {
                    etapes[k] = new Etape();
                    etapes[k].algorithme = "Création : Nouveau Bloc";
                    etapes[k].code =
                        "let j = " + nomFichier + "._fichier_LOVC.tabLien[0];" +
                        "let conteneurBlocPlein = document.createElement('div');" +
                        "conteneurBlocPlein.setAttribute('class', 'fichier_LOVC_conteneurBlocPlein');" +
                        "let blocPlein_GrandRect = document.createElement('div');" +
                        "blocPlein_GrandRect.setAttribute('class', 'fichier_LOVC_conteneurBlocPlein_grandRect');" +
                        "let blocPlein_PetitRect1 = document.createElement('div');" +
                        "blocPlein_PetitRect1.setAttribute('class', 'fichier_LOVC_conteneurBlocPlein_petitRect1');" +
                        "conteneurBlocPlein.append(blocPlein_GrandRect, blocPlein_PetitRect1);" +
                        nomFichier + "._conteneurTabBloc[j].replaceChild(conteneurBlocPlein, " + nomFichier + "._conteneurTabBloc[j].childNodes[1]);" +
                        nomFichier + ".ajout(j);";
                    etapes[k + 1] = new Etape();
                    etapes[k + 1].code =
                        "let j = " + nomFichier + "._fichier_LOVC.tabLien[0];" +
                        nomFichier + ".initAnimation(j);";
                }
            }
        }
        return etapes;
    }

    // Méthodes d'Animation
    selection(j) {

        $(this._conteneurTabBloc[j].childNodes[1]).addClass("animated fast shadow-drop-center");

    }

    ajout(j) {

        $(this._conteneurTabBloc[j].childNodes[1]).addClass("animated fast bounceIn");

    }

    initAnimation(j) {

        $(this._conteneurTabBloc[j].childNodes[1]).removeClass("animated fast shadow-drop-center");

    }

    apparition(i) {

        $(this._conteneurTabBloc[i].childNodes[1]).addClass("animated fast slide-in-blurred-left");

    }

}



