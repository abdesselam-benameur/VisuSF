class Graph_IndexDense {

    conteneur;
    rows = [];
    index;
    

    constructor(index, animation) {
        this.index = index;

        this.conteneur = document.createElement('table');
        this.conteneur.innerHTML = '<thead><tr><th>Clé</th><th>Adresse (Bloc, Enreg)</th></tr></thead><tbody></tbody>';

        for (let i = 0; i < index.tableIndexMC.length; i++) {
            let tr = document.createElement('tr');
            let cle = document.createElement('td');
            let adr = document.createElement('td');
            cle.innerHTML = index.tableIndexMC[i].cle;
            adr.innerHTML = (parseInt(index.tableIndexMC[i].adr.i)+1) + ", " + (parseInt(index.tableIndexMC[i].adr.j)+1);
            cle.setAttribute('class', 'pleine');
            adr.setAttribute('class', 'pleine');
            tr.setAttribute('class', 'animated fast bounceInDown');
            tr.appendChild(cle);
            tr.appendChild(adr);
            this.rows.push(tr);
        }

        let i = 0;
        while (i < this.rows.length) {
            let r = this.rows[i];
            i++;
            if(animation){
                setTimeout(function(){
                    $('tbody').append(r);
                }, i*125);
            }
            else{
                r.setAttribute('class', '');
                setTimeout(function(){
                    $('tbody').append(r);
                }, 0);
            }
            
        }
    
        for (let i = this.rows.length; i < this.index.maxLength; i++) {
            let tr = document.createElement('tr');
            tr.innerHTML = '<td></td><td></td>';
            tr.setAttribute('class', 'animated fast bounceInDown');
            let r = tr;
            let t = this.conteneur;
            if(animation){
                setTimeout(function(){
                    $('tbody').append(r);
                }, i*125);
            }
            else{
                tr.setAttribute('class', '');
                setTimeout(function(){
                    $('tbody').append(r);
                }, 0);
            }
        }
        
    }

    rechercher(cle, nomVar, nomFich, nomBloc) {
        let { trouv, i, tabSteps } = this.index.rechercher(cle),
            t = [], etape;

        if (tabSteps.length > 0) {
            let j;
            for (j = 0; j < tabSteps.length; j++) {
                etape = new Etape();
                etape.code = nomVar + ".selection(" + tabSteps[j].inf + ");" + nomVar + ".selection(" + tabSteps[j].sup + ");";
                etape.code += nomVar + ".deselection(" + tabSteps[j].milieu + ");";
                if (j > 0) {
                    etape.code += nomVar + ".deselection(" + tabSteps[j-1].milieu + ");";
                }
                t.push(etape);

                etape = new Etape();
                etape.code = nomVar + ".selection(" + tabSteps[j].milieu + ");";
                etape.code += nomVar + ".deselection(" + tabSteps[j].inf + ");" + nomVar + ".deselection(" + tabSteps[j].sup + ");";
                if (j+1 < tabSteps.length) {
                    etape.code += nomVar + ".deselection(" + tabSteps[j+1].inf + ");" + nomVar + ".deselection(" + tabSteps[j+1].sup + ");";
                }
                t.push(etape);
            }

            etape = new Etape();
            if (trouv) {
                etape.code = nomVar + ".validation(" + i + ");";
                etape.algorithme = ">>> Clé Trouvée";

                etape.code += nomFich + ".initAnimation("+this.index.tableIndexMC[i].adr.i+");";
            } 
            else {
                if (i < this.index.tableIndexMC.length) etape.code = nomVar + ".devalidation(" + i + ");";
                etape.algorithme = ">>> Clé Introuvable";
            }
            t.push(etape);

            if (trouv){
                etape = new Etape();
                etape._code = nomFich + ".selection("+this.index.tableIndexMC[i].adr.i+");";
                etape.code += "$('"+ nomBloc +"').empty();";
                etape.algorithme = "Sélection >> Bloc "+(parseInt(this.index.tableIndexMC[i].adr.i)+1);
                t.push(etape);

                etape = new Etape();
                etape.code = 
                    "let bloc = new Grph_Bloc_TnOF("+ nomFich +".fichier_TnOF.tabBloc["+this.index.tableIndexMC[i].adr.i+"], "+ nomFich +".fichier_TnOF.entete.nbEnregMax, true);"+
                    "$('"+ nomBloc +"').empty();"+
                    "$('"+ nomBloc +"').append(bloc.conteneur);";
                etape.algorithme = "Lecture >> Bloc "+(parseInt(this.index.tableIndexMC[i].adr.i)+1);
                t.push(etape);

                etape = new Etape();
                etape.code = 
                    "let bloc = new Grph_Bloc_TnOF("+ nomFich +".fichier_TnOF.tabBloc["+this.index.tableIndexMC[i].adr.i+"], "+ nomFich +".fichier_TnOF.entete.nbEnregMax, false);"+
                    "$('"+ nomBloc +"').empty();"+
                    "$('"+ nomBloc +"').append(bloc.conteneur);";
                etape.code += "bloc.tabEnreg["+this.index.tableIndexMC[i].adr.j+"].selection();";
                etape.algorithme = "Sélection >> Enreg. "+(parseInt(this.index.tableIndexMC[i].adr.j)+1);
                t.push(etape);
            }
        }
        return t;
    }

    supprimer(cle, nomVar, nomFich, nomBloc) {
        let t = this.rechercher(cle, nomVar, nomFich, nomBloc);
        let { trouv, i } = this.index.rechercher(cle);
        if (trouv) {
            let numBlc = this.index.tableIndexMC[i].adr.i;
            let numEnreg = this.index.tableIndexMC[i].adr.j;

            // Récupération du dernier Enreg du dernier Bloc
            let dernBloc = this.index.fichier_TnOF.entete.dernBlocNonVide;
            if(this.index.fichier_TnOF.tabBloc[dernBloc].nb == 0){
                dernBloc--;
                if(dernBloc < 0) dernBloc = 0;
            }
            let dernBlocNb = this.index.fichier_TnOF.tabBloc[dernBloc].nb;
            let dernEnreg = this.index.fichier_TnOF.tabBloc[dernBloc].tab[dernBlocNb-1];

            if(dernEnreg.cle != cle){
                let etape = new Etape();
                etape.code = 
                    "let bloc = new Grph_Bloc_TnOF("+ nomFich +".fichier_TnOF.tabBloc["+ numBlc +"], "+ nomFich +".fichier_TnOF.entete.nbEnregMax, false);"+
                    "$('"+ nomBloc +"').empty();"+
                    "$('"+ nomBloc +"').append(bloc.conteneur);";

                etape.code += 
                    "if(bloc.tabEnreg["+ numEnreg +"].enregFixe.cle == " +dernEnreg.cle+"){"+
                    "delete bloc.tabEnreg["+ numEnreg +"];"+
                    "bloc.conteneurTabEnreg["+ numEnreg +"].removeChild(bloc.conteneurTabEnreg["+ numEnreg +"].childNodes[2]);"+
                    "bloc.tabEnreg["+ numEnreg +"] = new Grph_EnregFixe(new EnregFixe("+ cle +"));"+
                    "bloc.conteneurTabEnreg["+ numEnreg +"].append(bloc.tabEnreg["+ numEnreg +"].conteneur);}"+
                    "bloc.tabEnreg["+numEnreg+"].validation();";
                t.push(etape);

                etape = new Etape();
                etape.code = 
                    "let bloc = new Grph_Bloc_TnOF("+ nomFich +".fichier_TnOF.tabBloc["+ numBlc +"], "+ nomFich +".fichier_TnOF.entete.nbEnregMax, false);"+
                    "$('"+ nomBloc +"').empty();"+
                    "$('"+ nomBloc +"').append(bloc.conteneur);";
                etape.code += "bloc.tabEnreg["+numEnreg+"].disparition();";
                etape.algorithme = "Remplacement ...";    
                t.push(etape);            

                etape = new Etape();
                etape.code = 
                    "let bloc = new Grph_Bloc_TnOF("+ nomFich +".fichier_TnOF.tabBloc["+ numBlc +"], "+ nomFich +".fichier_TnOF.entete.nbEnregMax, false);"+
                    "$('"+ nomBloc +"').empty();"+
                    "$('"+ nomBloc +"').append(bloc.conteneur);";
                etape.code += 
                    "delete bloc.tabEnreg["+ numEnreg +"];"+
                    "bloc.conteneurTabEnreg["+ numEnreg +"].removeChild(bloc.conteneurTabEnreg["+ numEnreg +"].childNodes[2]);"+
                    "bloc.tabEnreg["+ numEnreg +"] = new Grph_EnregFixe(new EnregFixe("+ dernEnreg.cle +"));"+
                    "bloc.tabEnreg["+ numEnreg +"].ajout();"+
                    "bloc.conteneurTabEnreg["+ numEnreg +"].append(bloc.tabEnreg["+ numEnreg +"].conteneur);";
                etape.algorithme = "--> Dernier Enreg du Fichier"; 
                if(numBlc == dernBloc) {
                    etape.code += 
                        "bloc.tabEnreg["+(dernBlocNb-1)+"].suppression();"+
                        "bloc.initNb("+ (dernBlocNb-1) +");";
                }
                t.push(etape);
            }
            else{
                let etape = new Etape();
                etape.code = 
                        "let bloc = new Grph_Bloc_TnOF("+ nomFich +".fichier_TnOF.tabBloc["+ numBlc +"], "+ nomFich +".fichier_TnOF.entete.nbEnregMax, false);"+
                        "$('"+ nomBloc +"').empty();"+
                        "$('"+ nomBloc +"').append(bloc.conteneur);";
                if(numBlc == dernBloc) {
                    etape.code += 
                            "bloc.tabEnreg["+(dernBlocNb-1)+"].suppression();"+
                            "bloc.initNb("+ (dernBlocNb-1) +");";
                    etape.algorithme = "Suppression :: Dernier Enreg";
                }

                t.push(etape);
            }

            t[t.length-1].code += nomVar + ".initAnimation(" + i + ");";
            let etape = new Etape();
            etape.code = nomVar + ".disparition(" + i + ");";
            etape.code += nomVar + ".initAnimation(" + (i+1) + ");";
            etape.algorithme = "Index >>> Suppression de la Clé";
            t.push(etape);

            // les decalages
            for (let j = i + 1; j < this.index.tableIndexMC.length; j++) {
                etape = new Etape();
                etape.code = nomVar + '.decalerHaut(' + j + ');';
                if(j+1 < this.index.tableIndexMC.length) etape.code += nomVar + '.initAnimation(' + (j+1) + ');';
                if(j == i + 1) etape.algorithme = "Index >>> Décalages...";
                t.push(etape);
            }

        } return t;
    }

    inserer(cle, nomVar, nomFich, nomBloc) {
        let grph = new Grph_Fichier_TnOF(this.index.fichier_TnOF);
        let t = grph.insertion(new EnregFixe(cle), nomFich, nomBloc);

        let res = this.index.rechercher(parseInt(this.val));
        let blc; let enreg;
        if(!res.trouv) {
            blc = grph.fichier_TnOF.entete.dernBlocNonVide;
            enreg = grph.fichier_TnOF.tabBloc[blc].nb;
        }

        let { trouv, i, tabSteps } = this.index.rechercher(cle);
        t[t.length-1].code += nomVar + ".deselection(" + tabSteps[0].inf + ");" + nomVar + ".deselection(" + tabSteps[0].sup + ");";
        let p = t.length;
        t = t.concat(this.rechercher(cle, nomVar));
        t[p].algorithme = "Rech. Dichotomique dans Index";
        if (!trouv) {
            t.pop();
            t[t.length-1].code += nomVar + '.initAnimation(' + (this.index.tableIndexMC.length - 1) + ');';
            let etape;

            // les decalages
            for (let j = this.index.tableIndexMC.length - 1; j >= i; j--) {
                etape = new Etape();
                etape.code = nomVar + '.decalerBas(' + j + ');';
                if(j-1 >= i) etape.code += nomVar + '.initAnimation(' + (j-1) + ');';
                etape.code += `$('tbody').children()[${j}].style.transform = "translateY(0)";`; 
                if(j == this.index.tableIndexMC.length - 1) etape.algorithme = "Index >>> Décalages...";
                t.push(etape);
            }

            etape = new Etape();
            etape.code = `$('tbody').children()[${i}].style.transform = "translateY(0)";if($('tbody').children()[${i}].innerHTML == '<td></td><td></td>'){`;
            for (let j = i; j < this.index.tableIndexMC.length; j++) {
                etape.code += `$('tbody').children()[${j}].innerHTML = $('tbody').children()[${j + 1}].innerHTML;
                $('tbody').children()[${j}].classList.remove('slide-bottom');
                $('tbody').children()[${j}].style.transform = "translateY(1.5vw)";`; 
            }
            etape.code += `$('tbody').children()[${this.index.tableIndexMC.length}].innerHTML = '<td></td><td></td>';
                $('tbody').children()[${this.index.tableIndexMC.length}].classList.remove('slide-bottom');
                $('tbody').children()[${this.index.tableIndexMC.length}].style.transform = "translateY(0)";}`;
            t.push(etape);
            
            etape = new Etape();
            etape.code = `if($('tbody').children()[${i}].innerHTML != '<td class="pleine">${cle}</td><td class="pleine">${blc+1}, ${enreg+1}</td>'){`;
            for (let j = this.index.tableIndexMC.length; j > i; j--) {
                etape.code += `$('tbody').children()[${j}].innerHTML = $('tbody').children()[${j - 1}].innerHTML;
                $('tbody').children()[${j - 1}].classList.remove('slide-bottom');
                $('tbody').children()[${j - 1}].style.transform = "translateY(0)";`;
            }
            etape.code += `} $('tbody').children()[${i}].innerHTML = '<td></td><td></td>';
                $('tbody').children()[${i}].classList.remove('slide-bottom');
                $('tbody').children()[${i}].style.transform = "translateY(0)";`;
            t.push(etape);

            etape = new Etape();
            etape._code = `$('tbody').children()[${i}].innerHTML = '<td class="pleine">${cle}</td><td class="pleine">${blc+1}, ${enreg+1}</td>';
            $('tbody').children()[${i}].classList.remove('selected');$('tbody').children()[${i}].classList.remove('slit-out-vertical');
            $('tbody').children()[${i}].classList.add('slit-in-vertical');`;
            etape.algorithme = "Index >>> Insertion de la Clé";
            t.push(etape);

        }
        return t;
    }

    // Méthodes d'Animation
    apparition(n) {
        this.initAnimation(n);
        $('tbody').children()[n].classList.add('scale-in-hor-left');
        $('tbody').children()[n].classList.remove('scale-out-hor-left');
    }

    disparition(n) {
        this.initAnimation(n);
        $('tbody').children()[n].classList.add('scale-out-hor-left');
        $('tbody').children()[n].classList.remove('scale-in-hor-left');
    }

    ajout(n) {
        this.initAnimation(n);
        $('tbody').children()[n].classList.add("animated", "fast", "bounceIn");
    }

    selection(n) {
        this.initAnimation(n);
        $('tbody').children()[n].classList.add('selected');
    }

    deselection(n) {
        this.initAnimation(n);
        $('tbody').children()[n].classList.remove('selected');
    }

    validation(n) {
        this.initAnimation(n);
        $('tbody').children()[n].classList.add('animated', 'fast', 'valid');
    }

    devalidation(n) {
        this.initAnimation(n);
        $('tbody').children()[n].classList.add('animated', 'fast', 'invalid');
    }

    decalerHaut(n) {
        this.initAnimation(n);
        $('tbody').children()[n].classList.remove('annuler-slide-top');
        $('tbody').children()[n].classList.add('slide-top');
    }

    annulerDecalerHaut(n) {
        this.initAnimation(n);
        $('tbody').children()[n].classList.add("annuler-slide-top");
        $('tbody').children()[n].classList.remove("slide-top");
    }

    decalerBas(n) {
        this.initAnimation(n);
        $('tbody').children()[n].classList.remove('annuler-slide-bottom');
        $('tbody').children()[n].classList.add('slide-bottom');
    }

    annulerDecalerBas(n) {
        this.initAnimation(n);
        $('tbody').children()[n].classList.add("annuler-slide-bottom");
        $('tbody').children()[n].classList.remove("slide-bottom");
    }

    initAnimation(n) {
        $('tbody').children()[n].classList = [];
    }
}