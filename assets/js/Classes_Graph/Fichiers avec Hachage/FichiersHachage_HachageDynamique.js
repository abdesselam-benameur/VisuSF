class Grph_Bloc_TnOF_HachDyn extends Grph_Bloc_TnOF {

    // Méthodes
    recherche(cle, nomVar) {

        // Récupération du Résultat de la Recherche
        let indiceFin = this._bloc_TnOF.recherche(cle);
        let nb = this._bloc_TnOF.nb;

        // Remplissage de la table d'Etapes
        let etapes = [];

        for (let i = 0; i < ((indiceFin + nb) % nb); i++) {
            etapes[i] = new Etape();
            etapes[i].code = nomVar + ".tabEnreg[" + i + "].selection();";
            if (i > 0) etapes[i].code += nomVar + ".tabEnreg[" + (i - 1) + "].initAnimation();";
            etapes[i].code += nomVar + ".tabEnreg[" + (i + 1) + "].initAnimation();";
            etapes[i].algorithme = "Enreg :: " + (i + 1) + " >> Echec";
        }

        etapes[(indiceFin + nb) % nb] = new Etape();
        if ((indiceFin + nb) % nb > 0) {
            etapes[(indiceFin + nb) % nb].code =
                nomVar + ".tabEnreg[" + ((indiceFin + nb) % nb - 1) + "].initAnimation();" +
                nomVar + ".tabEnreg[" + (indiceFin + nb) % nb + "].selection();";
        } else {
            etapes[(indiceFin + nb) % nb].code = nomVar + ".tabEnreg[" + (indiceFin + nb) % nb + "].selection();";
        }

        if (indiceFin != -1) {
            etapes[indiceFin + 1] = new Etape();
            etapes[indiceFin + 1].code = nomVar + ".tabEnreg[" + (indiceFin) + "].validation();";

            etapes[indiceFin + 1].algorithme = "Enreg :: " + (indiceFin + 1) + " >> Succès";
        }
        else {
            if (nb > 0) {
                etapes[nb] = new Etape();
                etapes[nb].code = nomVar + ".tabEnreg[" + (nb - 1) + "].initAnimation();";

                etapes[nb].algorithme = "Enreg :: " + nb + " >> Echec";
            }
        }
        return etapes;
    }

    insertion(cle, nomVar) {
        let nb = this._bloc_TnOF.nb;

        // Remplissage de la table d'Etapes
        let etapes = [], etape;

        etape = new Etape();
        if (nb < this.nbEnregMax) {
            etape.code =
                "if(" + nomVar + ".tabEnreg[" + nb + "] != undefined){" +
                "delete " + nomVar + ".tabEnreg[" + nb + "];" +
                nomVar + ".initNb(" + nb + ");" +
                nomVar + ".conteneurTabEnreg[" + nb + "].removeChild(" + nomVar + ".conteneurTabEnreg[" + nb + "].childNodes[2]);}";

            etapes.push(etape);

            etape = new Etape();
            etape.code =
                nomVar + ".tabEnreg[" + nb + "] = new Grph_EnregFixe(new EnregFixe(" + cle + "));" +
                nomVar + ".tabEnreg[" + nb + "].ajout();" +
                nomVar + ".conteneurTabEnreg[" + nb + "].append(" + nomVar + ".tabEnreg[" + nb + "].conteneur);" +
                nomVar + ".initNb(" + (nb + 1) + ");";
            if (nb > 0) etape.code += nomVar + ".tabEnreg[" + (nb - 1) + "].initAnimation();";
            etape.algorithme = "Insertion >> Enreg :: " + (nb + 1);
            etapes.push(etape);
        }
        return etapes;
    }

    suppression(j, nouvCle, nomVar) {

        let etapes = [];
        let nb = this.bloc_TnOF.nb;

        let etape = new Etape();
        etape.code =
            nomVar + ".initNb(" + (nb - 1) + ");" + nomVar + ".tabEnreg[" + j + "].disparition();";
        etape.algorithme = (j < nb - 1) ? "Remplacement ..." : "Suppression ...";
        etapes.push(etape);

        etape = new Etape();
        etape.code =
            nomVar + ".tabEnreg[" + (nb - 1) + "].suppression();";
        if (j < nb - 1) {
            etape.code +=
                "delete " + nomVar + ".tabEnreg[" + j + "];" +
                nomVar + ".conteneurTabEnreg[" + j + "].removeChild(" + nomVar + ".conteneurTabEnreg[" + j + "].childNodes[2]);" +
                nomVar + ".tabEnreg[" + j + "] = new Grph_EnregFixe(new EnregFixe(" + nouvCle + "));" +
                nomVar + ".tabEnreg[" + j + "].ajout();" +
                nomVar + ".conteneurTabEnreg[" + j + "].append(" + nomVar + ".tabEnreg[" + j + "].conteneur);";
        }
        etape.algorithme = "-> Dernier Enreg du Bloc";
        etapes.push(etape);

        return etapes;
    }

}

class Grph_Fichier_TnOF_HachDyn extends Grph_Fichier_TnOF {

    // Attributs
    _buf1;
    _buf2;

    // Constructeur
    constructor(fichier_TnOF) {
        super(fichier_TnOF);

        this._buf1 = new Bloc_TnOF_HachDyn();
        this._buf2 = new Bloc_TnOF_HachDyn();

        for (let i = 0; i < this.fichier_TnOF.entete.nbBloc; i++) {

            this._conteneur.firstChild.children[i].style.margin = "0px calc(100% / 10 - 6.22vw) 0px 0px ";
            let l = this.fichier_TnOF.tabBloc[i].lien;
            while (l != -1) {
                let conteneurBlocPlein = document.createElement('div');
                conteneurBlocPlein.setAttribute("class", "fichier_TnOF_conteneurBlocPlein");

                let blocPlein_GrandRect = document.createElement('div');
                blocPlein_GrandRect.setAttribute("class", "fichier_TnOF_conteneurBlocPlein_grandRect");
                let blocPlein_PetitRect = document.createElement('div');
                blocPlein_PetitRect.setAttribute("class", "fichier_TnOF_conteneurBlocPlein_petitRect");

                conteneurBlocPlein.append(blocPlein_GrandRect, blocPlein_PetitRect);
                this._conteneur.firstChild.children[i].append(conteneurBlocPlein);
                l = this.fichier_TnOF.ZoneDebord.tabBloc[l].lien;
            }
        }

        for (let i = this.fichier_TnOF.entete.nbBloc; i < 10; i++) {
            let conteneurBloc = document.createElement('li');
            conteneurBloc.setAttribute("class", "fichier_TnOF_conteneurBloc");
            conteneurBloc.style.margin = "0px calc(100% / 10 - 6.22vw) 0px 0px ";
            conteneurBloc.innerHTML = (i + 1 < 10) ? ("Bloc 0" + (i + 1)) : ("Bloc " + (i + 1));

            let conteneurBlocVide = document.createElement('div');
            conteneurBlocVide.setAttribute('class', 'fichier_TnOF_conteneurBlocVide');

            conteneurBloc.appendChild(conteneurBlocVide);
            this._conteneur.firstChild.appendChild(conteneurBloc);
        }

        /*let infos = document.createElement('div'), niv = document.createElement('p'),
            pointeur = document.createElement('p'), nbInsertions = document.createElement('p'),
            tauxCh = document.createElement('p');
        infos.setAttribute('class', 'fichier_TnOF_conteneurInfos');

        infos.innerHTML = 'Niveau: ';//'<span>Niveau: </span>';
        niv.setAttribute('class', 'fichier_TnOF_conteneurInfo_Valeur');
        niv.innerHTML = this.fichier_TnOF.entete.i;
        infos.appendChild(niv);

        infos.innerHTML += ' Pointeur: ';//'<span> Pointeur: </span>';
        pointeur.setAttribute('class', 'fichier_TnOF_conteneurInfo_Valeur');
        pointeur.innerHTML = this.fichier_TnOF.entete.p + 1;
        infos.appendChild(pointeur);

        infos.innerHTML += " Nombre d'insertions: ";
        nbInsertions.setAttribute('class', 'fichier_TnOF_conteneurInfo_Valeur');
        nbInsertions.innerHTML = this.fichier_TnOF.entete.nbInsertions;
        infos.appendChild(nbInsertions);

        infos.innerHTML += ' Taux de chargement: ';//'<span> Taux de chargement: </span>';
        tauxCh.setAttribute('class', 'fichier_TnOF_conteneurInfo_Valeur');
        tauxCh.innerHTML = Math.trunc(this.fichier_TnOF.tauxCharg() * 1000) / 1000;
        infos.appendChild(tauxCh);

        this._conteneur.appendChild(infos);*/
    }


    // Setters et Getters
    get buf1() {
        return this._buf1;
    }

    set buf1(b) {
        this._buf1 = b;
    }

    get buf2() {
        return this._buf2;
    }

    set buf2(b) {
        this._buf2 = b;
    }

    // Méthodes
    eclater(nomFichier, nomBloc0, nomBloc1, nomBloc2) {
        let i = this.fichier_TnOF.entete.i, n = this.fichier_TnOF.entete.p, i0 = n, i1 = n, i2 = Math.pow(2, i) + n, n1 = i2,
            j, j1 = -1, j2 = -1, e, suiv, ZonePrim0 = true, ZonePrim1 = true, ZonePrim2 = true, k0 = 2, k1 = 1, k2 = 1, m,
            buf0 = new Bloc_TnOF_HachDyn(), buf1 = new Bloc_TnOF_HachDyn(), buf2 = new Bloc_TnOF_HachDyn(), etape, etapes = [];

        let NouvTauxCh = this.fichier_TnOF.entete.nbInsertions / ((this.fichier_TnOF.entete.nbBloc + 1) * Bloc_TnOF_HachDyn._b);
        //for (let i0 = 0; i0 < this.conteneurTabBloc[p].children.length; i++) {
        while (i0 != -1) {
            etape = new Etape();
            if (ZonePrim0) {
                etape.code =
                    nomFichier + ".selection(" + n + ", 1);" + (suiv != -1 ? nomFichier + ".initAnimation(" + n + ",2);" : "") +
                    nomFichier + ".buf1.nb = 0;" + nomFichier + ".buf2.nb = 0;" +
                    "let bloc = new Grph_Bloc_TnOF_HachDyn(" + nomFichier + ".fichier_TnOF.tabBloc[" + i0 + "], Bloc_TnOF_HachDyn._b, true);" +
                    "$('" + nomBloc0 + "').empty();$('" + nomBloc0 + "').append(bloc.conteneur);";
                etape.algorithme = "Lecture du Bloc primaire";
                lireDir(this.fichier_TnOF, i0, buf0);
                //k0++;
            } else {
                //console.log(etapes[m].code+"*******");
                etapes[etapes.length - 1].code += etapes[m].code.replace('let ', '').replace('true', 'false');
                etape.code =
                    nomFichier + ".selection(" + n + "," + k0 + ");" +
                    nomFichier + ".initAnimation(" + n + "," + (k0 - 1) + ");" +
                    (suiv != -1 ? nomFichier + ".initAnimation(" + n + "," + (k0 + 1) + ");" : "") +
                    "let bloc = new Grph_Bloc_TnOF_HachDyn(" + nomFichier + ".fichier_TnOF.ZoneDebord.tabBloc[" + i0 + "], Bloc_TnOF_HachDyn._b, true);" +
                    "$('" + nomBloc0 + "').empty(); $('" + nomBloc0 + "').append(bloc.conteneur);";
                etape.algorithme = "Lecture de la zone de débordement";
                lireDir(this.fichier_TnOF.ZoneDebord, i0, buf0);
                k0++;
            }
            suiv = buf0.lien;
            m = etapes.push(etape) - 1;

            for (j = 0; j < buf0.nb; j++) {
                e = buf0.tab[j].cle;
                etape = new Etape();
                etape.code =
                    "let bloc = new Grph_Bloc_TnOF_HachDyn(" + nomFichier + ".fichier_TnOF" + (ZonePrim0 ? "" : ".ZoneDebord") + ".tabBloc[" + i0 + "], Bloc_TnOF_HachDyn._b, false);" +
                    "$('" + nomBloc0 + "').empty(); $('" + nomBloc0 + "').append(bloc.conteneur);" +
                    "bloc.tabEnreg[" + j + "].selection();";
                if (j > 0) etape.code += "bloc.tabEnreg[" + (j - 1) + "].initAnimation();";
                if (j + 1 < buf0.nb) etape.code += "bloc.tabEnreg[" + (j + 1) + "].initAnimation();";
                etape.algorithme = "Lecture >> Enreg :: " + (j + 1);
                etapes.push(etape);

                if (this.fichier_TnOF.hash(i + 1, e) == n) {
                    j1++;
                    if (j1 >= Bloc_TnOF_HachDyn._b) {
                        etapes[etapes.length - 1].code += nomFichier + ".deselection2(" + n + "," + k1 + ");";
                        etape = new Etape();
                        etape.algorithme = "Ecriture de buf1 dans " + (ZonePrim1 ? "le " : "la Zone de débordement du ") + "Bloc " + (i1 + 1 < 10 ? "0" : "") + (i1 + 1);
                        etape.code = nomFichier + ".initAnimation(" + n + "," + k1 + ");" + nomFichier + ".selection2(" + n + "," + k1 + ");"
                        ZonePrim1 = false;
                        k1++;
                        j1 = 0;
                        buf1.nb = 0;
                        etapes.push(etape);
                    }
                    let blc = new Grph_Bloc_TnOF_HachDyn(buf1, Bloc_TnOF_HachDyn._b, false);
                    let tab = blc.insertion(e, "bloc");
                    for (let z = 0; z < tab.length; z++) {
                        etape = new Etape();
                        // etape.code =
                        //     (j1 == 0 ? nomFichier + ".initAnimation(" + n + "," + k1 + ");" : "") +
                        //     nomFichier + ".selection(" + n + "," + k0 + ");";
                        etape.code =
                            nomFichier + ".buf1.tab[" + j1 + "].cle = " + e + " ;" + nomFichier + ".buf1.nb = " + buf1.nb + ";" +
                            "let bloc = new Grph_Bloc_TnOF_HachDyn(" + nomFichier + ".buf1, Bloc_TnOF_HachDyn._b , false);" +
                            "$('" + nomBloc1 + "').empty();$('" + nomBloc1 + "').append(bloc.conteneur);";
                        etape.code += tab[z].code;

                        etape.algorithme = tab[z].algorithme.length > 0 ? "h[i+1] (" + e + ") = " + (n + 1) + " <br> " + tab[z].algorithme + " dans buf1" : "";
                        etapes.push(etape);
                    }
                    buf1.inserer(e, j1);
                } else {
                    j2++;
                    if (j2 >= Bloc_TnOF_HachDyn._b) {
                        etapes[etapes.length - 1].code +=
                            "if ((" + nomFichier + ".conteneurTabBloc.length > " + n1 + ") && (" +
                            nomFichier + ".conteneur.firstChild.children[" + n1 + "].children.length == " + k2 + ")){" +
                            nomFichier + ".conteneur.firstChild.children[" + n1 + "].lastChild.remove();" +
                            "if (" + nomFichier + ".conteneur.firstChild.children[" + n1 + "].children.length == 0){" +
                            nomFichier + ".conteneurTabBloc.pop();let conteneurBlocVide = document.createElement('div');" +
                            "conteneurBlocVide.setAttribute('class', 'fichier_TnOF_conteneurBlocVide');" +
                            nomFichier + ".conteneur.firstChild.children[" + n1 + "].appendChild(conteneurBlocVide);}}";
                        etape = new Etape();
                        etape.code =
                            "if ((" + nomFichier + ".conteneurTabBloc.length <= " + n1 + ") || (" +
                            nomFichier + ".conteneur.firstChild.children[" + n1 + "].children.length < " + k2 + ")){" +
                            "let conteneurBlocPlein = document.createElement('div');" +
                            'conteneurBlocPlein.setAttribute("class", "fichier_TnOF_conteneurBlocPlein");' +
                            "let blocPlein_GrandRect = document.createElement('div');" +
                            'blocPlein_GrandRect.setAttribute("class", "fichier_TnOF_conteneurBlocPlein_grandRect");' +
                            "let blocPlein_PetitRect = document.createElement('div');" +
                            'blocPlein_PetitRect.setAttribute("class", "fichier_TnOF_conteneurBlocPlein_petitRect");' +
                            'conteneurBlocPlein.append(blocPlein_GrandRect, blocPlein_PetitRect);' +
                            (ZonePrim2 ? nomFichier + ".conteneur.firstChild.children[" + n1 + "].children[0].remove();" : "") +
                            nomFichier + ".conteneur.firstChild.children[" + n1 + "].append(conteneurBlocPlein);}" +
                            nomFichier + ".conteneurTabBloc[" + n1 + "] = " + nomFichier + ".conteneur.firstChild.children[" + n1 + "];}" +
                            nomFichier + ".deselection2(" + n1 + "," + k2 + ");";
                        etape.algorithme = "Allocation d'un nouveau Bloc " + (ZonePrim2 ? "" : "dans la zone de débordement du Bloc " + (i2 + 1 < 10 ? "0" : "") + (i2 + 1));
                        etapes.push(etape);

                        etape = new Etape();
                        etape.code = nomFichier + ".initAnimation(" + n1 + "," + k2 + ");" + nomFichier + ".selection2(" + n1 + "," + k2 + ");";
                        etape.algorithme = "Ecriture de buf2 dans " + (ZonePrim2 ? "le " : "la Zone de débordement du ") + "Bloc " + (i2 + 1 < 10 ? "0" : "") + (i2 + 1);
                        etapes.push(etape);
                        k2++;
                        ZonePrim2 = false;
                        j2 = 0;
                        buf2.nb = 0;
                    }
                    let blc = new Grph_Bloc_TnOF_HachDyn(buf2, Bloc_TnOF_HachDyn._b, false);
                    let tab = blc.insertion(e, "bloc");
                    for (let z = 0; z < tab.length; z++) {
                        etape = new Etape();
                        etape.code =
                            nomFichier + ".buf2.tab[" + j2 + "].cle = " + e + " ;" + nomFichier + ".buf2.nb = " + (buf2.nb) + ";" +
                            "let bloc = new Grph_Bloc_TnOF_HachDyn(" + nomFichier + ".buf2, Bloc_TnOF_HachDyn._b , false);" +
                            "$('" + nomBloc2 + "').empty();$('" + nomBloc2 + "').append(bloc.conteneur);";
                        etape.code += tab[z].code;

                        etape.algorithme = tab[z].algorithme.length > 0 ? "h[i+1] (" + e + ") = " + (n1 + 1) + " <br> " + tab[z].algorithme + " dans buf2" : "";
                        etapes.push(etape);
                    }
                    buf2.inserer(e, j2);
                }
            }
            ZonePrim0 = false;
            i0 = suiv;
        }
        etapes[etapes.length - 1].code += etapes[m].code.replace('let ', '').replace('true', 'false') +
            nomFichier + ".deselection2(" + n + "," + k1 + ");";


        etape = new Etape();
        etape.algorithme = "Ecriture de buf1 dans " + (ZonePrim1 ? "le " : "la Zone de débordement du ") + "Bloc " + (i1 + 1 < 10 ? "0" : "") + (i1 + 1);
        etape.code =
            nomFichier + ".initAnimation(" + n + "," + k1 + ");" + nomFichier + ".selection2(" + n + "," + k1 + ");" +
            "if ((" + nomFichier + ".conteneurTabBloc.length > " + n1 + ") && (" +
            nomFichier + ".conteneur.firstChild.children[" + n1 + "].children.length == " + k2 + ")){" +
            nomFichier + ".conteneur.firstChild.children[" + n1 + "].lastChild.remove();" +
            "if (" + nomFichier + ".conteneur.firstChild.children[" + n1 + "].children.length == 0){" +
            nomFichier + ".conteneurTabBloc.pop();let conteneurBlocVide = document.createElement('div');" +
            "conteneurBlocVide.setAttribute('class', 'fichier_TnOF_conteneurBlocVide');" +
            nomFichier + ".conteneur.firstChild.children[" + n1 + "].appendChild(conteneurBlocVide);}}";
        etapes.push(etape);


        if (buf2.nb > 0) {
            etape = new Etape();
            etape.code =
                "if ((" + nomFichier + ".conteneurTabBloc.length <= " + n1 + ") || (" +
                nomFichier + ".conteneur.firstChild.children[" + n1 + "].children.length < " + k2 + ")){" +
                "let conteneurBlocPlein = document.createElement('div');" +
                'conteneurBlocPlein.setAttribute("class", "fichier_TnOF_conteneurBlocPlein");' +
                "let blocPlein_GrandRect = document.createElement('div');" +
                'blocPlein_GrandRect.setAttribute("class", "fichier_TnOF_conteneurBlocPlein_grandRect");' +
                "let blocPlein_PetitRect = document.createElement('div');" +
                'blocPlein_PetitRect.setAttribute("class", "fichier_TnOF_conteneurBlocPlein_petitRect");' +
                'conteneurBlocPlein.append(blocPlein_GrandRect, blocPlein_PetitRect);' +
                (ZonePrim2 ? nomFichier + ".conteneur.firstChild.children[" + n1 + "].children[0].remove();" : "") +
                nomFichier + ".conteneur.firstChild.children[" + n1 + "].append(conteneurBlocPlein);" +
                nomFichier + ".conteneurTabBloc[" + n1 + "] = " + nomFichier + ".conteneur.firstChild.children[" + n1 + "];}" +
                nomFichier + ".deselection2(" + n1 + "," + k2 + ");";
            etape.algorithme = "Allocation d'un nouveau Bloc " + (ZonePrim2 ? "" : "dans la zone de débordement du Bloc " + (i2 + 1 < 10 ? "0" : "") + (i2 + 1));
            etapes.push(etape);

            etape = new Etape();
            etape.code = nomFichier + ".initAnimation(" + n1 + ", " + k2 + ");" + nomFichier + ".selection2(" + n1 + ", " + k2 + ");";
            etape.algorithme = "Ecriture de buf2 dans " + (ZonePrim2 ? "le " : "la Zone de débordement du ") + "Bloc " + (i2 + 1 < 10 ? "0" : "") + (i2 + 1);
            etapes.push(etape);
        }

        if (k1 < this.conteneurTabBloc[n].children.length) {
            etapes[etapes.length - 1].code += "$(" + nomFichier + ".conteneurTabBloc[" + n + "].children[" + (this.conteneurTabBloc[n].children.length - 1) + "]).show();";
            for (let k = this.conteneurTabBloc[n].children.length - 1; k >= k1; k--) {
                etape = new Etape();
                etape.algorithme = "Rajout des blocs non réutilisés à la liste des blocs vides";
                etape.code = "$(" + nomFichier + ".conteneurTabBloc[" + n + "].children[" + k + "]).hide();";
                if (k >= k1) etape.code += "$(" + nomFichier + ".conteneurTabBloc[" + n + "].children[" + (k - 1) + "]).show();";
                etapes.push(etape);
            }
        }

        etape = new Etape();
        etape.algorithme = "Incrément. Pointeur d'Eclat. (p)"; //>> p = " + (this.fichier_TnOF.entete.p+1);
        etapes.push(etape);

        etape = new Etape();
        etape.algorithme = "Test: p == (2 puissance i) ?";
        etapes.push(etape);

        etape = new Etape();
        if (this.fichier_TnOF.entete.p + 2 == Math.pow(2, this.fichier_TnOF.entete.i)) {
            etape.algorithme += "--> Succès >> p = 0 et Niveau++";
        } else etape.algorithme = "--> p =/= (2 puissance i)";
        etapes.push(etape);

        return etapes;
    }

    recherche(cle, nomFichier, nomBloc) {

        // Récupération du Résultat de la Recherche
        let { trouv, debord, i } = this.fichier_TnOF.rechercher(cle);
        let etapes = [], etape;
        let a = this.fichier_TnOF.Adr(cle), k = 1;

        etape = new Etape();
        etape.code = nomFichier + ".selection(" + a + ", 1" + ");" + "$('" + nomBloc + "').empty();";
        etape.algorithme = "h(Clé) = Clé Mod (2 puissance " + this.fichier_TnOF.entete.i + ")";
        etapes.push(etape);

        etape = new Etape();
        etape.code =
            "let bloc = new Grph_Bloc_TnOF_HachDyn(" + nomFichier + ".fichier_TnOF.tabBloc[" + a + "], Bloc_TnOF_HachDyn._b, true);" +
            "$('" + nomBloc + "').empty();" +
            "$('" + nomBloc + "').append(bloc.conteneur);";
        etape.algorithme = "Lecture >> Bloc " + (a + 1);
        etapes.push(etape);

        let blc = new Grph_Bloc_TnOF_HachDyn(this.fichier_TnOF.tabBloc[a], Bloc_TnOF_HachDyn._b);
        let tab = blc.recherche(cle, "bloc");
        for (let z = 0; z < tab.length; z++) {
            etape = new Etape();
            etape.code = nomFichier + ".selection(" + a + ", 1);";
            if (debord) etape.code += nomFichier + ".initAnimation(" + a + ", 2);";

            etape.code +=
                "let bloc = new Grph_Bloc_TnOF_HachDyn(" + nomFichier + ".fichier_TnOF.tabBloc[" + a + "], Bloc_TnOF_HachDyn._b , false);" +
                "$('" + nomBloc + "').empty();" +
                "$('" + nomBloc + "').append(bloc.conteneur);";

            etape.code += tab[z].code;

            etape.algorithme = tab[z].algorithme;
            etapes.push(etape);
        }

        if (debord) {
            let l = this.fichier_TnOF.tabBloc[a].lien;
            k = 2;
            while (true) {
                etape = new Etape();
                etape.code = nomFichier + ".initAnimation(" + a + ", " + (k - 1) + ");";
                etape.code += nomFichier + ".selection(" + a + ", " + k + "); $('" + nomBloc + "').empty(); ";
                //etape.code += nomFichier + ".initAnimation(" + a + ", " + (k + 1) + ");";
                etape.algorithme = "Lecture >> ZD du Bloc " + (a + 1);
                etapes.push(etape);

                let blc = new Grph_Bloc_TnOF_HachDyn(this.fichier_TnOF.ZoneDebord.tabBloc[l], Bloc_TnOF_HachDyn._b);
                let tab = blc.recherche(cle, "bloc");
                for (let z = 0; z < tab.length; z++) {
                    etape = new Etape();
                    etape.code = nomFichier + ".selection(" + a + ", " + k + "); " + "$('" + nomBloc + "').empty(); ";
                    etape.code += nomFichier + ".initAnimation(" + a + ", " + (k - 1) + ");";

                    etape.code +=
                        "let bloc = new Grph_Bloc_TnOF_HachDyn(" + nomFichier + ".fichier_TnOF.ZoneDebord.tabBloc[" + l + "], Bloc_TnOF_HachDyn._b , false);" +
                        "$('" + nomBloc + "').empty();" +
                        "$('" + nomBloc + "').append(bloc.conteneur);";

                    etape.code += tab[z].code;

                    etape.algorithme = tab[z].algorithme;
                    etapes.push(etape);
                }
                l = this.fichier_TnOF.ZoneDebord.tabBloc[l].lien;
                if (l != this.fichier_TnOF.ZoneDebord.tabBloc[i].lien) etapes[etapes.length - 1].code += nomFichier + ".initAnimation(" + a + ", " + (k + 1) + ");";
                else break;
                k++;
            }
        }
        if (!trouv) {
            etape = new Etape();
            etape.code = nomFichier + ".initAnimation(" + a + ", " + k + ");";
            etape.algorithme = "--> Clé Introuvable";
            etapes.push(etape);
        }
        return etapes;
    }

    insertion(cle, nomFichier, nomBloc) {

        // Récupération du Résultat de la Recherche
        let { trouv, debord, i, j } = this.fichier_TnOF.rechercher(cle);
        let etapes = this.recherche(cle, nomFichier, nomBloc), etape;
        let a = this.fichier_TnOF.Adr(cle);

        // Remplissage de la table d'Etapes
        if (!trouv) {
            etapes.pop();
            etapes[etapes.length - 1].code +=
                nomFichier + " = new Grph_Fichier_TnOF_HachDyn(" + nomFichier + ".fichier_TnOF);" +
                "$('#fichiersHachage-HachageDynamique-MS_Contenu').empty();$('#fichiersHachage-HachageDynamique-MS_Contenu').append(" + nomFichier + ".conteneur);";
            let m = debord ? Number(etapes[etapes.length - 1].code.split('.initAnimation(' + a + ',').slice(-1)[0].split(');')[0]) + 1 : 1;

            if ((!debord && (this.fichier_TnOF.tabBloc[i].plein())) || (debord && (this.fichier_TnOF.ZoneDebord.tabBloc[i].plein()))) {
                etape = new Etape();
                etape.code =
                    nomFichier + " = new Grph_Fichier_TnOF_HachDyn(" + nomFichier + ".fichier_TnOF);" + "$('#fichiersHachage-HachageDynamique-MS_Contenu').empty();" +
                    "$('#fichiersHachage-HachageDynamique-MS_Contenu').append(" + nomFichier + ".conteneur);" +
                    "let conteneurBlocPlein = document.createElement('div');" +
                    "conteneurBlocPlein.setAttribute('class', 'fichier_TnOF_conteneurBlocPlein');" +
                    "let blocPlein_GrandRect = document.createElement('div');" +
                    'blocPlein_GrandRect.setAttribute("class", "fichier_TnOF_conteneurBlocPlein_grandRect");' +
                    "let blocPlein_PetitRect = document.createElement('div');" +
                    'blocPlein_PetitRect.setAttribute("class", "fichier_TnOF_conteneurBlocPlein_petitRect");' +
                    "conteneurBlocPlein.append(blocPlein_GrandRect, blocPlein_PetitRect);" +
                    nomFichier + ".conteneurTabBloc[" + a + "].append(conteneurBlocPlein);";
                etape.algorithme = "Allocation : bloc dans ZD";
                etapes.push(etape);


                let blc = new Grph_Bloc_TnOF_HachDyn(new Bloc_TnOF_HachDyn(), Bloc_TnOF_HachDyn._b, false);
                let tab = blc.insertion(cle, "bloc");
                for (let z = 0; z < tab.length; z++) {
                    etape = new Etape();
                    etape.code = nomFichier + ".selection(" + a + ", " + (m + 1) + "); $('" + nomBloc + "').empty(); ";
                    etape.code += nomFichier + ".initAnimation(" + a + ", " + m + ");";

                    etape.code +=
                        "let bloc = new Grph_Bloc_TnOF_HachDyn(new Bloc_TnOF_HachDyn(), Bloc_TnOF_HachDyn._b , true);" +
                        "$('" + nomBloc + "').empty();$('" + nomBloc + "').append(bloc.conteneur);";

                    etape.code += tab[z].code;

                    etape.algorithme = tab[z].algorithme;
                    etapes.push(etape);
                }
            } else {
                let blc = new Grph_Bloc_TnOF_HachDyn(debord ? this.fichier_TnOF.ZoneDebord.tabBloc[i] : this.fichier_TnOF.tabBloc[i], Bloc_TnOF_HachDyn._b, false);
                let tab = blc.insertion(cle, "bloc");
                for (let z = 0; z < tab.length; z++) {
                    etape = new Etape();
                    etape.code = nomFichier + ".selection(" + a + ", 1);$('" + nomBloc + "').empty();";

                    etape.code +=
                        "let bloc = new Grph_Bloc_TnOF_HachDyn(" + nomFichier + ".fichier_TnOF" + (debord ? ".ZoneDebord" : "") + ".tabBloc[" + i + "], Bloc_TnOF_HachDyn._b, false);" +
                        "$('" + nomBloc + "').empty(); $('" + nomBloc + "').append(bloc.conteneur);";

                    etape.code += tab[z].code;

                    etape.algorithme = tab[z].algorithme;
                    etapes.push(etape);
                }
            }

        } else {
            etape = new Etape();
            etape.code = "";
            etape.algorithme = "Err >> La Clé Existe";
            etapes.push(etape);

        }

        return etapes;
    }

    suppression(cle, nomFichier, nomBloc) {

        // Récupération du Résultat de la Recherche
        let { trouv, debord, i, j } = this.fichier_TnOF.rechercher(cle);
        let etapes = this.recherche(cle, nomFichier, nomBloc), etape;
        let a = this.fichier_TnOF.Adr(cle);

        // Remplissage de la table d'Etapes
        if (trouv) {
            let m = debord ? Number(etapes[etapes.length - 1].code.split('.initAnimation(' + a + ',').slice(-1)[0].split(');')[0]) + 1 : 1;

            if (!debord) {
                if (this.fichier_TnOF.tabBloc[i].lien == -1) {
                    let nb = this.fichier_TnOF.tabBloc[i].nb,
                        nouvCle = this.fichier_TnOF.tabBloc[i].tab[nb - 1].cle;

                    let blc = new Grph_Bloc_TnOF_HachDyn(this.fichier_TnOF.tabBloc[i], Bloc_TnOF_HachDyn._b, false);
                    let tab = blc.suppression(j, nouvCle, "bloc");

                    for (let z = 0; z < tab.length; z++) {
                        etape = new Etape();
                        etape.code =
                            "let bloc = new Grph_Bloc_TnOF_HachDyn(" + nomFichier + ".fichier_TnOF.tabBloc[" + i + "], Bloc_TnOF_HachDyn._b, false);" +
                            "$('" + nomBloc + "').empty(); $('" + nomBloc + "').append(bloc.conteneur);";
                        etape.code += tab[z].code;
                        etape.algorithme += tab[z].algorithme;
                        etapes.push(etape);
                    }
                } else {
                    let k = this.fichier_TnOF.tabBloc[i].lien,
                        nb = this.fichier_TnOF.ZoneDebord.tabBloc[k].nb,
                        nouvCle = this.fichier_TnOF.ZoneDebord.tabBloc[k].tab[nb - 1].cle;

                    etape = new Etape();
                    etape.code = "let bloc = new Grph_Bloc_TnOF_HachDyn(" + nomFichier + ".fichier_TnOF.tabBloc[" + i + "], Bloc_TnOF_HachDyn._b, false);" +
                        "$('" + nomBloc + "').empty(); $('" + nomBloc + "').append(bloc.conteneur);" +
                        "bloc.tabEnreg[" + j + "].suppression();";
                    etape.algorithme = "Remplacement ...";
                    etapes.push(etape);

                    etape = new Etape();
                    etape.code =
                        nomFichier + " = new Grph_Fichier_TnOF_HachDyn(" + nomFichier + ".fichier_TnOF);" + "$('#fichiersHachage-HachageDynamique-MS_Contenu').empty();" +
                        "$('#fichiersHachage-HachageDynamique-MS_Contenu').append(" + nomFichier + ".conteneur);" + nomFichier + ".selection(" + a + ", " + m + ");" +
                        "let bloc = new Grph_Bloc_TnOF_HachDyn(" + nomFichier + ".fichier_TnOF.tabBloc[" + i + "], Bloc_TnOF_HachDyn._b, false);" +
                        "$('" + nomBloc + "').empty(); $('" + nomBloc + "').append(bloc.conteneur); delete bloc.tabEnreg[" + j + "];" +
                        "bloc.conteneurTabEnreg[" + j + "].removeChild(bloc.conteneurTabEnreg[" + j + "].childNodes[2]);" +
                        "bloc.tabEnreg[" + j + "] = new Grph_EnregFixe(new EnregFixe(" + nouvCle + "));" +
                        "bloc.tabEnreg[" + j + "].ajout(); bloc.conteneurTabEnreg[" + j + "].append(bloc.tabEnreg[" + j + "].conteneur);";
                    etape.algorithme = "-> Dernier Enreg de ZD";
                    etapes.push(etape);

                    if (this.fichier_TnOF.ZoneDebord.tabBloc[k].nb == 1) {
                        etape = new Etape();
                        etape.code = nomFichier + " = new Grph_Fichier_TnOF_HachDyn(" + nomFichier + ".fichier_TnOF);" +
                            "$('#fichiersHachage-HachageDynamique-MS_Contenu').empty(); $('#fichiersHachage-HachageDynamique-MS_Contenu').append(" + nomFichier + ".conteneur);" +
                            nomFichier + ".conteneurTabBloc[" + a + "].removeChild(" + nomFichier + ".conteneurTabBloc[" + a + "].childNodes[2]);";
                        etape.algorithme = "Suppression :: Dernier Bloc de ZD";
                        etapes.push(etape);
                    }
                }
            } else {
                let nb = this.fichier_TnOF.ZoneDebord.tabBloc[i].nb,
                    nouvCle = this.fichier_TnOF.ZoneDebord.tabBloc[i].tab[nb - 1].cle,
                    suiv = this.fichier_TnOF.ZoneDebord.tabBloc[i].lien,
                    blc = new Grph_Bloc_TnOF_HachDyn(this.fichier_TnOF.ZoneDebord.tabBloc[i], Bloc_TnOF_HachDyn._b, false),
                    tab = blc.suppression(j, nouvCle, "bloc");

                for (let z = 0; z < tab.length; z++) {
                    etape = new Etape();
                    etape.code =
                        "let bloc = new Grph_Bloc_TnOF_HachDyn(" + nomFichier + ".fichier_TnOF.ZoneDebord.tabBloc[" + i + "], Bloc_TnOF_HachDyn._b, false);" +
                        "$('" + nomBloc + "').empty(); $('" + nomBloc + "').append(bloc.conteneur);";
                    etape.code += tab[z].code;
                    etape.algorithme += tab[z].algorithme;
                    etapes.push(etape);
                }
                etapes[etapes.length - 1].code +=
                    nomFichier + " = new Grph_Fichier_TnOF_HachDyn(" + nomFichier + ".fichier_TnOF);" + "$('#fichiersHachage-HachageDynamique-MS_Contenu').empty();" +
                    "$('#fichiersHachage-HachageDynamique-MS_Contenu').append(" + nomFichier + ".conteneur);" + nomFichier + ".selection(" + a + ", " + m + ");";

                if (this.fichier_TnOF.ZoneDebord.tabBloc[i].nb == 1) {
                    etape = new Etape();
                    etape.code = nomFichier + " = new Grph_Fichier_TnOF_HachDyn(" + nomFichier + ".fichier_TnOF);" +
                        "$('#fichiersHachage-HachageDynamique-MS_Contenu').empty(); $('#fichiersHachage-HachageDynamique-MS_Contenu').append(" + nomFichier + ".conteneur);" +
                        nomFichier + ".conteneurTabBloc[" + a + "].removeChild(" + nomFichier + ".conteneurTabBloc[" + a + "].childNodes[2]);";
                    etape.algorithme = (suiv == -1) ? "Suppression :: Dernier Bloc de ZD" : "Suppression : Bloc de ZD";

                    etapes.push(etape);
                }
            }
        } else {
            etape = new Etape();
            etape.code = "";
            etape.algorithme = "Err >> Clé Introuvable";
            etapes.push(etape);
        }

        return etapes;
    }

    // Méthodes d'Animation
    initAnimation(i, j) {
        $(this._conteneurTabBloc[i].childNodes[j]).removeClass("animated fast shadow-drop-center");
    }

    selection(i, j) {

        $(this._conteneurTabBloc[i].childNodes[j]).addClass("animated fast shadow-drop-center");

    }

    selection2(i, j) {

        $(this._conteneurTabBloc[i].childNodes[j]).addClass("animated fast shadow-drop-center2");

    }

    deselection2(i, j) {

        $(this._conteneurTabBloc[i].childNodes[j]).removeClass("animated fast shadow-drop-center2");

    }
}