class bloc_LOVC {
    suivant = -1;
    max = 30; //nombre de caracteres dans un bloc
    tab = Array(this.max).fill(0);
    v = 3;

    get max() {

        return this.max;

    }

    insert_enreg(c, j) {
        let taille;
        let rand = Math.floor(Math.random() * this.v) + 1;
        //console.log(rand);
        let result = {
            plein: false,
            dernier_car: 0,
            t: 0,
            c: false,
            bool: false
        }
        taille = rand + 5;
        this.tab[j] = taille;
        j++;
        if (j >= this.max) {
            j = j + rand + 4;
            result.c = true;
            result.plein = true;
            j = j - this.max;
        }
        else {
            this.tab[j] = c;
            j++;
            if (j >= this.max) {
                j = j + rand + 3;
                result.bool = true;
                result.plein = true;
                j = j - this.max;
            }
            else {
                this.tab[j] = false;
                j = j + rand + 3; //On saute la taille de la partie variable et 2 car la taille et la clé doivent etre sur 2 caracteres et non pas 1
                if (j >= this.max) {
                    result.plein = true;
                    j = j - this.max;
                }
            }
        }

        result.t = taille;
        result.dernier_car = j;
        return result;
    }

    recherche_interne(c, j, t) {
        let res = {
            pos: 0,
            next: false,
            s: false,
            t: false,
            taille_prec: 0
        }
        let cle;
        let taille;
        if ((j + 1) != this.max) {
            if (j == -1) {
                cle = this.tab[j + 1];
                taille = t;
            }
            else {
                cle = this.tab[j + 1];
                taille = this.tab[j];
            }
        }
        else {
            res.pos = -1;
            res.taille_prec = this.tab[j];
            res.next = true;
            return res;
        }
        if (cle == c)
            res.t = true;
        else {
            if (cle < c) {
                if (this.max - j > taille) {
                    j = j + taille;
                }
                else {
                    j = j + taille - this.max;
                    res.next = true;
                }
            }
            else {
                res.s = true;
            }
        }
        res.pos = j;
        return (res);
    }
}

Array.prototype.shuffle = function () {
    // pour réorganiser un tableau
    this.sort(() => Math.random() - 0.5);
};

class fichier_LOVC {
    nbr_carac_inser = 0;
    nbr_carac_supp = 0;
    nbr_carac_init = 0;
    tab_blocs = [];
    tabLien = [];
    nb_blocs = 0;
    b = -1; //la position de la premiere case libre 
    tete = 0; //la tete de la liste




    chargement_initial(n) {
        for (let k = 0; k < 10; k++) this.tabLien[k] = k;
        this.tabLien.shuffle();
        this.tete = this.tabLien.splice(Math.floor(Math.random() * this.tabLien.length), 1);
        let t = this.tete;
        let i = t;//indice du bloc
        let a = 1;//numéro de l'enregistrement courant
        let cle = 3;
        let j = 0;
        let bloc = new bloc_LOVC();
        let res;
        while (a <= n) {
            res = bloc.insert_enreg(cle, j);
            j = res.dernier_car;
            if ((res.plein == true)&&((j > 0) || (a != n))) {
                let s = this.tabLien.splice(Math.floor(Math.random() * this.tabLien.length), 1);
                bloc.suivant = s;
                this.tab_blocs[i] = bloc;
                this.nb_blocs++;
                i = s;
                bloc = new bloc_LOVC();
                if (res.c == true) {
                    bloc.tab[0] = cle;
                    bloc.tab[1] = false;
                }
                if (res.bool == true)
                    bloc.tab[0] = false;
            }
            cle = cle + 3;
            a++;
        }
        this.nb_blocs++;
        if(j == 0) j = bloc.max;
        this.b = j;
        bloc.suivant = -1;
        this.tab_blocs[i] = bloc;
        this.nbr_carac_init = bloc_LOVC.max * (this.tab_blocs.length - 1) + j;
    }

    //La recherche retourne vrai meme si la cle a été supprimé logiquement
    recherche(cle) {
        let res = {
            a: -1,
            b: -1,
            tr: false,
            prec: -1,
            nbLect: 0,
            nbEcr: 0
        }
        let r;
        let j = 0;
        let t = 0;
        let i = this.tete;
        let trouv = false;
        let stop = false;
        let sauv_i;
        let bloc = this.tab_blocs[i];
        while ((i != -1) && (!trouv) && (!stop)) {
            res.prec = sauv_i;
            sauv_i = i;
            r = bloc.recherche_interne(cle, j, t);
            stop = r.s;
            j = r.pos;
            trouv = r.t;
            t = r.taille_prec;
            if (r.next == true) {
                res.nbLect++;
                i = this.tab_blocs[i].suivant;
                bloc = this.tab_blocs[i];
            }
            if(i == -1) break;
            if ((bloc.suivant == -1) && (j == this.b)) {
                stop = true;
                sauv_i = i;
            }
        }
        if (!r.next)
            res.nbLect++;
        res.a = sauv_i;
        res.b = j;
        res.tr = trouv;
        return res;
    }


    suppression(c) {
        let r = this.recherche(c);
        let res = {
            nbLect: 0,
            nbEcr: 0
        }
        res.nbLect = r.nbLect;
        if (r.tr == true) {
            let buf = this.tab_blocs[r.a];
            let tai = buf.tab[r.b];
            let k = r.b + 2;
            if (k >= buf.max) {
                k = k - buf.max;
                i = buf.suivant;
                buf = this.tab_blocs[i];
                res.nbLect++;
            }
            if (buf.tab[k] == false) {
                buf.tab[k] = true;
                res.nbEcr++;
                this.nbr_carac_supp = this.nbr_carac_supp + tai;
            }

        }
        return res;
    }

    insertion(c, t) {
        let res = {
            nbLect: 0,
            nbEcr: 0
        }
        let r = this.recherche(c);
        res.nbLect = r.nbLect;
        let pile = [];
        let i = r.a;
        if (r.b == -1) {
            i = r.prec;
            r.b = bloc_LOVC.max - 1;
        }
        let sauv_i;
        let bloc = this.tab_blocs[i];
        if (!(r.tr)) {
            this.nbr_carac_inser = this.nbr_carac_inser + t;
            while (i != -1) {
                res.nbLect++;
                res.nbEcr++;
                pile.push(i);
                sauv_i = i;
                bloc = this.tab_blocs[i];
                i = bloc.suivant;
            }
            res.nbLect--;
            i = pile.pop();
            let m = this.b;
            let rest = bloc.max - m;
            this.b = this.b + t;
            if (t > rest) {
                let nouveau = new bloc_LOVC();
                this.b = m + t - bloc.max;
                m--;
                if (r.b != m + 1) {
                    for (let ind = m + t - bloc.max; ind >= 0; ind--) {
                        nouveau.tab[ind] = bloc.tab[m];
                        m--;
                    }
                    m--;
                }
                let s = this.tabLien.splice(Math.floor(Math.random() * this.tabLien.length), 1);
                this.tab_blocs[s] = nouveau;
                this.nb_blocs++;
                this.tab_blocs[i].suivant = s;
                this.tab_blocs[s].suivant = -1;
                res.nbEcr++;
                res.nbLect++;
            }
            let bloc2 = bloc;
            let k;
            while ((pile.length != 0) || (m >= r.b)) {
                if (m < 0) {
                    sauv_i = i;
                    i = pile.pop();
                    m = bloc.max - 1;
                    bloc = this.tab_blocs[i];
                }
                if (m + t == bloc.max - 1) {
                    bloc2 = bloc;
                    sauv_i = i;
                }
                k = m + t;
                if (k >= bloc.max)
                    k = k - bloc.max;
                bloc2.tab[k] = bloc.tab[m];
                m--;
            }
            m++;
            bloc.tab[m] = t;
            k = m + 1;
            for (let l = 2; l <= t; l++) {
                if (k >= bloc.max) {
                    i = bloc.suivant;
                    bloc = this.tab_blocs[i];
                    k = 0;
                }
                if (l > 3)
                    bloc.tab[k] = 0;
                else
                    if (l == 3)
                        bloc.tab[k] = false;
                    else
                        bloc.tab[k] = c;
                k++;
            }
        }
        else {
            bloc = this.tab_blocs[r.a];
            let k = r.b;
            let tai = bloc.tab[k];
            k = k + 2;
            if (k > bloc.max) {
                k = k - max;
                bloc = this.tab_blocs[bloc.suivant];
            }
            if (bloc.tab[k] == true) {
                bloc.tab[k] = false;
                this.nbr_carac_inser = this.nbr_carac_inser + tai;
            }
        }
        return res;
    }

}