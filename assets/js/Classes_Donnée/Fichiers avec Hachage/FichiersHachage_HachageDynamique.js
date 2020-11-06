class Bloc_TnOF_HachDyn extends Bloc_TnOF {
    _lien;
    static _b = 10;
  
    get b() {
      return Bloc_TnOF_HachDyn._b;
    }
  
    set b(b) {
      Bloc_TnOF_HachDyn._b = b;
    }
  
    get lien() {
      return this._lien;
    }
  
    set lien(l) {
      this._lien = l;
    }
  
    constructor() {
      super();
      this.lien = -1;
      this.tab = [];
      for (let i = 0; i < Bloc_TnOF_HachDyn._b; i++)
        this.tab.push(new EnregFixe());
    }
  
    plein() {
      return this.nb < Bloc_TnOF_HachDyn._b ? false : true;
    }
  
    rechercher(cle) {
      // recherche séquentielle dans le bloc
      for (let j = 0; j < this.nb; j++)
        if (this.tab[j].cle == cle)
          return { trv: true, j: j };
      return { trv: false, j: this.nb };
    }
  
    inserer(cle, i) {
      this.tab[i].cle = cle;
      this.nb++;
    }
  
    supprimer(j) {
      this.tab[j].cle = this.tab[this.nb - 1].cle;
      this.nb--;
    }

}
  

class Fichier_TnOF_HachDyn extends Fichier_TnOF {
    /** ENTETE */
    _entete = {
      i: 0, // niveau du fichier
      p: 0, // pointeur d'éclatement
      nbInsertions: 0, // nombre total d'insertions
      seuilMax: 0.85,
      nbBloc: 0 // nombre des blocs utilisés dans la zone primaire
    };
    /** FIN DE L'ENTETE */
  
    ZoneDebord = {
      // la zone de debordement
      tabBloc: [],
      teteLBV: -1 // tete de la liste des blocs vides
    };
  
    hash(i, cle) {
      if (cle > 0 && i >= 0) return cle % Math.pow(2, i);
      else return -1;
    }
  
    Adr(cle) {
      let a = this.hash(this.entete.i, cle);
      if (a < this.entete.p) a = this.hash(this.entete.i + 1, cle);
      return a;
    }
  
    allouerZD() {
      // allouer un nouveau bloc.
      return this.ZoneDebord.tabBloc.push(new Bloc_TnOF_HachDyn()) - 1;
    }
  
    chargementInitial(nbBlocs = 10, nbEnregsMax = 10, seuilM) {
      if (nbEnregsMax > 0 && nbBlocs > 0) {
        this.tabBloc = [];
        this.entete = {
          i: 0, // niveau du fichier
          p: 0, // pointeur d'éclatement
          nbInsertions: 0, // nombre total d'insertions
          seuilMax: seuilM,
          nbBloc: 1,
        };
        this.ZoneDebord = {
          tabBloc: [],
          teteLBV: -1
        };
  
        Bloc_TnOF_HachDyn._b = nbEnregsMax;
        for (let i = 0; i < nbBlocs; i++) this.tabBloc.push(new Bloc_TnOF_HachDyn());
  
        let tabCles = [];
        for (let i = 1; i <= nbBlocs * nbEnregsMax * 5; i++) tabCles.push(i);
        tabCles.shuffle();
  
        for (let i = 0; i < nbBlocs * nbEnregsMax; i++) {
          if ((this.entete.nbBloc + 1 > nbBlocs) && (((this.entete.nbInsertions + 1) / (this.entete.nbBloc * Bloc_TnOF_HachDyn._b)) > this.entete.seuilMax)) break;
          this.insererAvecEclat(tabCles[i]);
        }
        console.log(tabCles, this.entete.nbInsertions);
      }
    }
  
    tauxCharg() {
      return this.entete.nbInsertions / (this.entete.nbBloc * Bloc_TnOF_HachDyn._b);
    }
  
    eclater() {
      let L = [] /** On l'utilisera pour sauvegarder (en vue de les réutiliser) les numéros de blocs de la liste de débordement associée à n*/,
        i = this.entete.i, n = this.entete.p, cpt = 0, i0 = n, i1 = n, i2 = Math.pow(2, i) + n, prec = -1,
        j, j1 = -1, j2 = -1, x = -1, e, suiv, ZonePrim0 = true, ZonePrim1 = true, ZonePrim2 = true,
        buf0 = new Bloc_TnOF_HachDyn(), buf1 = new Bloc_TnOF_HachDyn(), buf2 = new Bloc_TnOF_HachDyn();
  
      while (i0 != -1) {
        cpt++;
        if (cpt > 1000) {
          alert("boucle infinie //////*/******/**/*/" + cpt);
          break;
        }
        if (i0 == n && ZonePrim0) {
          lireDir(this, i0, buf0);
          ZonePrim0 = false;
        } else lireDir(this.ZoneDebord, i0, buf0);
        suiv = buf0.lien;
        L.push(suiv);
        //alert("L = " + L);
        for (j = 0; j < buf0.nb; j++) {
          e = buf0.tab[j].cle;
          if (this.hash(i + 1, e) == n) {
            j1++;
            if (j1 >= Bloc_TnOF_HachDyn._b) {
              x = L.shift();
              //alert("L = " + L);
              buf1.lien = x;
              buf1.nb = Bloc_TnOF_HachDyn._b; // ou (j1 – 1)
              if (ZonePrim1) ecrireDir(this, i1, buf1);
              else ecrireDir(this.ZoneDebord, i1, buf1);
              ZonePrim1 = false;
              i1 = x;
              j1 = 0;
            }
            buf1.tab[j1].cle = e;
          } else {
            // c-a-d ( hi+1(e.cle) = 2i+n )
            j2++;
            if (j2 >= Bloc_TnOF_HachDyn._b) {
              // Allouer un nouveau ou réutiliser un bloc depuis la liste des blocs vides de S...
              if (this.ZoneDebord.teteLBV == -1) x = this.allouerZD();
              else x = this.ZoneDebord.teteLBV;
              buf2.lien = x;
              buf2.nb = Bloc_TnOF_HachDyn._b; // ou (j2 – 1)
              if (ZonePrim2) ecrireDir(this, i2, buf2);
              else ecrireDir(this.ZoneDebord, i2, buf2);
  
              // MAJ de la Tête de liste des blocs vides...
              lireDir(this.ZoneDebord, x, buf2); // en récupérant le champ 'lien'
              this.ZoneDebord.teteLBV = buf2.lien; //Aff-Entete( S, 2, buf2.lien ) ; // de l'ancien 1er elt de la liste.c
  
              ZonePrim2 = false;
              i2 = x;
              j2 = 0;
            }
            buf2.tab[j2].cle = e;
          } // ( hi+1(e.cle) = n )
        }
        prec = i0;
        i0 = suiv;
      }
  
      // Ecriture des derniers blocs ...
      x = L[0];
  
      buf1.lien = -1;
      buf1.nb = j1 + 1;
      buf2.lien = -1;
      buf2.nb = j2 + 1;
      if (ZonePrim1) ecrireDir(this, i1, buf1);
      else ecrireDir(this.ZoneDebord, i1, buf1);
      if (buf2.nb > 0) {
        if (ZonePrim2) ecrireDir(this, i2, buf2);
        else ecrireDir(this.ZoneDebord, i2, buf2);
      }
  
      // MAJ de la liste des blocs vides de S en y rajoutant les blocs de la liste de débordement de 'n', non réutilisés durant
      // l'éclatement ...
      if (x != -1) {
        //alert("prec = "+prec);
        buf0.lien = this.ZoneDebord.teteLBV; // l'ancienne Tête de la liste des blocs vides
        ecrireDir(this.ZoneDebord, prec, buf0);
        this.ZoneDebord.teteLBV = x; //Aff-Entete( S, 2, x ) ; // la nouvelle Tête devient x
      } else if (x == undefined) alert("x=" + x);
    }
  
    //fusionner() { }
  
    rechercher(cle) {
      let nbL = 1;
      let prec = -1,
        i = this.Adr(cle),
        trv0 = false,
        { trv, j } = this.tabBloc[i].rechercher(cle);
  
      if (trv) return { trouv: true, debord: false, prec: prec, i: i, j: j, nbEcrit: 0, nbLect: 1 };
  
      if (this.tabBloc[i].lien != -1) {
        // recherche séquentielle dans la zone de debordement
        prec = i;
        let cpt = 0;
        i = this.tabBloc[i].lien;
        while (!trv0 && cpt < 100) {
          nbL++;
          cpt++;
          if (cpt == 99) {
            alert("boucle infinie");
            break;
          }
          let { trv: t, j: jj } = this.ZoneDebord.tabBloc[i].rechercher(cle);
          if (t) return { trouv: true, debord: true, prec: prec, i: i, j: jj , nbEcrit: 0, nbLect: nbL};
          if (this.ZoneDebord.tabBloc[i].lien != -1) {
            prec = i;
            i = this.ZoneDebord.tabBloc[i].lien;
          } else break;
        }
        return {
          trouv: false,
          debord: true,
          prec: prec,
          i: i,
          j: this.ZoneDebord.tabBloc[i].nb,
          nbEcrit: 0,
          nbLect: nbL,
        };
      }
      return {
        trouv: false,
        debord: false,
        prec: prec,
        i: i,
        j: j,
        nbEcrit: 0,
        nbLect: 1,
      };
    }
  
    inserer(cle) {
      let { trouv, debord, i, j } = this.rechercher(cle);
      if (!trouv) {
        if (!debord) {
          if (this.tabBloc[i].plein()) {
            let p;
            if (this.ZoneDebord.teteLBV == -1) p = this.allouerZD();
            else {
              p = this.ZoneDebord.teteLBV;
              this.ZoneDebord.teteLBV = this.ZoneDebord.tabBloc[p].lien;
              this.ZoneDebord.tabBloc[p].nb = 0;
              this.ZoneDebord.tabBloc[p].lien = -1;
            }
            this.tabBloc[i].lien = p;
            this.ZoneDebord.tabBloc[p].inserer(cle, 0);
          } else {
            this.tabBloc[i].inserer(cle, j);
          }
        } else { // debord == true
          if (this.ZoneDebord.tabBloc[i].plein()) {
            let p;
            if (this.ZoneDebord.teteLBV == -1) p = this.allouerZD();
            else {
              p = this.ZoneDebord.teteLBV;
              this.ZoneDebord.teteLBV = this.ZoneDebord.tabBloc[p].lien;
              this.ZoneDebord.tabBloc[p].nb = 0;
              this.ZoneDebord.tabBloc[p].lien = -1;
            }
            this.ZoneDebord.tabBloc[i].lien = p;
            this.ZoneDebord.tabBloc[p].inserer(cle, 0);
          } else this.ZoneDebord.tabBloc[i].inserer(cle, j);
        }
        this.entete.nbInsertions++;
        return true;
      }
      return false;
    }
  
    insererAvecEclat(cle) {
      this.inserer(cle);
      if (this.tauxCharg() > this.entete.seuilMax) {
        console.log(
          `************ debut de l'operation de l'eclatement p = ${this.entete.p}, i = ${this.entete.i} ************`
        );
        if (this.entete.nbBloc == this.tabBloc.length) this.tabBloc.push(new Bloc_TnOF_HachDyn());
        this.entete.nbBloc++;
        this.eclater();
        this.entete.p++;
        if (this.entete.p == Math.pow(2, this.entete.i)) {
          this.entete.p = 0;
          this.entete.i++;
        }
        console.log(
          `************ fin de l'operation de l'eclatement p = ${this.entete.p}, i = ${this.entete.i} ************`
        );
      }
    }
  
    supprimer(cle) {
      let { trouv, debord, prec, i, j } = this.rechercher(cle);
      if (trouv) {
        if (!debord) {
          if (this.tabBloc[i].lien == -1) this.tabBloc[i].supprimer(j);
          else {
            let k = this.tabBloc[i].lien,
              nb = this.ZoneDebord.tabBloc[k].nb;
            this.tabBloc[i].tab[j].cle = this.ZoneDebord.tabBloc[k].tab[nb - 1].cle;
            this.ZoneDebord.tabBloc[k].nb--;
            if (this.ZoneDebord.tabBloc[k].nb == 0) {
              this.tabBloc[i].lien = this.ZoneDebord.tabBloc[k].lien;
              // MAJ de la liste des blocs vides
              this.ZoneDebord.tabBloc[k].lien = this.ZoneDebord.teteLBV;
              this.ZoneDebord.teteLBV = k;
            }
          }
        } else {
          //let nb = this.ZoneDebord.tabBloc[i].nb,
          let suiv = this.ZoneDebord.tabBloc[i].lien;
          this.ZoneDebord.tabBloc[i].supprimer(j);
          if (this.ZoneDebord.tabBloc[i].nb == 0) {
            if (prec == this.Adr(cle)) {
              this.tabBloc[this.Adr(cle)].lien = suiv;
            } else this.ZoneDebord.tabBloc[prec].lien = suiv;
  
            // MAJ de la liste des blocs vides
            this.ZoneDebord.tabBloc[i].lien = this.ZoneDebord.teteLBV;
            this.ZoneDebord.teteLBV = i;
          }
        }
        this.entete.nbInsertions--;
        return true;
      }
      return false;
    }
  
    afficher() {
      let res, l, cpt;
      for (let i = 0; i < this.entete.nbBloc; i++) {
        console.log(
          `Bloc${i}: nb = ${this.tabBloc[i].nb} // lien = ${this.tabBloc[i].lien}`
        );
        res = "[" + this.tabBloc[i].tab.map((e) => e.cle).slice(0, this.tabBloc[i].nb).toString() + "]";
        l = this.tabBloc[i].lien;
        cpt = 0;
        while (l != -1 && cpt < 100) {
          cpt++;
          if (cpt == 99) {
            alert("boucle infinie - affichage");
            break;
          }
          res += " -> " + "[" + this.ZoneDebord.tabBloc[l].tab.map((e) => e.cle).slice(0, this.ZoneDebord.tabBloc[l].nb).toString() + "]";
          l = this.ZoneDebord.tabBloc[l].lien;
        }
        console.log(res);
      }
      res = "";
      l = this.ZoneDebord.teteLBV;
      cpt = 0;
      while (cpt < 100 && l != -1) {
        res += l + " -> ";
        l = this.ZoneDebord.tabBloc[l].lien;
        cpt++;
        if (cpt == 99) {
          alert("boucle infinie - affichage");
          break;
        }
      }
      res += "-1"
      console.log(res);
  
      console.log("La Zone de debord");
      for (let i = 0; i < this.ZoneDebord.tabBloc.length; i++) {
        console.log(
          `BlocZD${i}: nb = ${this.ZoneDebord.tabBloc[i].nb} // lien = ${this.ZoneDebord.tabBloc[i].lien}`
        );
        res = "[" + this.ZoneDebord.tabBloc[i].tab.map((e) => e.cle).slice(0, this.ZoneDebord.tabBloc[i].nb).toString() + "]";
        console.log(res);
      }
    }
}


const ecrireDir = (f, i, buf) => {
    f.tabBloc[i].nb = buf.nb;
    f.tabBloc[i].lien = buf.lien;
    for (let j = 0; j < buf.nb; j++) {
      f.tabBloc[i].tab[j].cle = buf.tab[j].cle;
    }
  };
  
  const lireDir = (f, i, buf) => {
    buf.nb = f.tabBloc[i].nb;
    buf.lien = f.tabBloc[i].lien;
    for (let j = 0; j < buf.nb; j++) {
      buf.tab[j].cle = f.tabBloc[i].tab[j].cle;
    }
  };
  
  Array.prototype.shuffle = function () {
    // pour réorganiser un tableau
    this.sort(() => Math.random() - 0.5);
  };

