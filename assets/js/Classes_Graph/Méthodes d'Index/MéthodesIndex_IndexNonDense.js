class Grph_IndexNonDense {
    conteneur;
    rows = [];
    index;

    constructor(index, animation) {
         this.index = index;

        this.conteneur = document.createElement('table');
        this.conteneur.innerHTML = '<thead><tr><th>Cle</th><th>   Bloc</th></tr></thead><tbody></tbody>';

        for (let i = 0; i < index.tableIndexMC.length; i++) {
            let tr = document.createElement('tr');
            let cle = document.createElement('td');
            let bloc = document.createElement('td');
            cle.innerHTML = index.tableIndexMC[i].cle;
            bloc.innerHTML = (parseInt(index.tableIndexMC[i].bloc)+1);
            cle.setAttribute('class', 'pleine');
            bloc.setAttribute('class', 'pleine');
            tr.setAttribute('class', 'animated fast bounceInDown');
            tr.appendChild(cle);
            tr.appendChild(bloc);
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


     rechercher(cle, nomVar) {
         let { i, tabSteps } = this.index.rechercher(cle),
            t = [], etape;   

        if (tabSteps.length > 0) {
            let j;
            for (j = 0; j < tabSteps.length; j++) {
                etape = new Etape();
                etape.code = nomVar + ".selection(" + tabSteps[j].inf + ");" + nomVar + ".selection(" + tabSteps[j].sup + ");";
                etape.code += nomVar + ".deselection(" + tabSteps[j].milieu + ");";
                etape.algorithme = "Selection >> bornes : Inf "+(tabSteps[j].inf+1)+", Sup "+(tabSteps[j].sup+1);

                if (j > 0) {
                    etape.code += nomVar + ".deselection(" + tabSteps[j-1].milieu + ");";
                }
                t.push(etape);

                etape = new Etape();
                etape.code = nomVar + ".selection(" + tabSteps[j].milieu + ");";
                etape.code += nomVar + ".deselection(" + tabSteps[j].inf + ");" + nomVar + ".deselection(" + tabSteps[j].sup + ");";
                etape.algorithme = "Test >> Bloc "+(tabSteps[j].milieu+1);

                if (j+1 < tabSteps.length) {
                    etape.code += nomVar + ".deselection(" + tabSteps[j+1].inf + ");" + nomVar + ".deselection(" + tabSteps[j+1].sup + ");";
                }
                t.push(etape);
            }

                etape = new Etape();
                etape.code = nomVar + ".validation(" + i + ");";
                etape.algorithme = "Selection >> Bloc "+(i+1);

                t.push(etape);

        }
        return t;

     }

      miseAjourIndex(i, nomVar) {
        
        let t = [], etape,pos =this.index.tableIndexMC.length-1;
        let ancienneCle = this.index.tableIndexMC[pos].cle;
         if(i>pos){

                etape = new Etape();
                etape.code =  nomVar + ".conteneur.childNodes[1].childNodes["+pos+"].childNodes[0].innerHTML = "+ancienneCle+";"+
                "$(" + nomVar + ".conteneur.childNodes[1].childNodes["+pos+"].childNodes[0]).removeClass('animated fast bounceIn');";
                t.push(etape);

                etape = new Etape();
                etape.code =  nomVar + ".conteneur.childNodes[1].childNodes["+pos+"].childNodes[0].innerHTML ="+i+" ;"+
                             "$(" + nomVar + ".conteneur.childNodes[1].childNodes["+pos+"].childNodes[0]).addClass('animated fast bounceIn');";
                etape.algorithme = "Mise À Jour : "+ancienneCle+" ~> "+i;
                             
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

class Grph_Fich_IndexNonDense {

    _fichier;
    _index;
    _Grph_fichier;
    _Grph_index;

    constructor(fichier,nbBlocMAX){
        this._fichier = fichier;
        this._index = new IndexNonDense();
        this._index.chargIndex(fichier);

        this._Grph_index = new Grph_IndexNonDense(this._index,true);
       this._Grph_fichier = new Grph_Fich_TOF(fichier,nbBlocMAX);
    }

    //getters && setters


     get fichier(){

        return this._fichier;

    }

     set fichier(fichier){

       this._fichier = fichier;

    }


     get index(){

        return this._index;

    }

     set index(index){

       this._index =  index;

    }

     get Grph_fichier(){

        return this._Grph_fichier;

    }

     set Grph_fichier(Grph_fichier){

       this._Grph_fichier =  Grph_fichier;

    }

     get Grph_index(){

        return this._Grph_index;

    }

     set Grph_index(Grph_index){

       this._Grph_index =  Grph_index;

    }

    // Methodes

     rechercher(cle, nomVar,nomIndex,nomFich, divBloc) {

         divBloc = '"'+divBloc+'"';

         let t = [], etape;

         let i = this._index.rechercher(cle).i;
         let etapesrechIndex = this._Grph_index.rechercher(cle,nomIndex);
         let trouv = this._fichier.fich[i].rech(cle).trouv;

         for (let j = 0; j < etapesrechIndex.length ; j++) {
             t.push(etapesrechIndex[j]);
         }
         
         t[t.length-1].code = t[t.length-1].code +  
                              nomFich +".Tab_Rep_Bloc["+i+"].initAnimationBloc();"+
                              "$("+divBloc+").empty();";
         etape = new Etape();
         etape.code = 
                nomFich +".Tab_Rep_Bloc["+i+"].selectionBloc();"+
                nomFich +".TabBloc["+i+"] = new Grph_BlocTOF_MC("+nomFich+".Fich_TOF.fich["+i+"]);"+
                "$("+divBloc+").empty();"+
                "$("+divBloc+").append("+nomFich +".TabBloc["+i+"].conteneur);";
         etape.algorithme = "Lecture >> Bloc "+(i+1); 

         t.push(etape);

         let etapesrechBloc = this._Grph_fichier.TabBloc[i].recherche(cle, nomFich +".TabBloc["+i+"]");

         for (let j = 0; j < etapesrechBloc.length ; j++) {
             t.push(etapesrechBloc[j]);
         }  

         t[t.length-2].code = t[t.length-2].code +   nomFich +".Tab_Rep_Bloc["+i+"].selectionBloc();";
         etape = new Etape();  

         if(trouv){

            t[t.length-1].code = t[t.length-1].code + nomFich+ ".Tab_Rep_Bloc["+i+"].validationBloc();";
         } 
         else{

            t[t.length-1].code = t[t.length-1].code + nomFich+".Tab_Rep_Bloc["+i+"].nonvalidationBloc();"; 

         }

         return t;

     }

     supprimer(cle, nomVar,nomIndex,nomFich, divBloc){

          divBloc = '"'+divBloc+'"';

         let t = [], etape;

         let i = this._index.rechercher(cle).i;
         let trouv = this._fichier.fich[i].rech(cle).trouv;
         
        
       if(trouv){

         let etapesrechIndex = this._Grph_index.rechercher(cle,nomIndex);
         for (let j = 0; j < etapesrechIndex.length ; j++) {
             t.push(etapesrechIndex[j]);
         }
         
         t[t.length-1].code = t[t.length-1].code +  
                              nomFich +".Tab_Rep_Bloc["+i+"].initAnimationBloc();"+
                              "$("+divBloc+").empty();";
         etape = new Etape();
         etape.code = 
                nomFich +".Tab_Rep_Bloc["+i+"].selectionBloc();"+
                nomFich + ".TabBloc["+i+"] = new Grph_BlocTOF_MC("+nomFich+".Fich_TOF.fich["+i+"]);"+
                "$("+divBloc+").empty();"+
                "$("+divBloc+").append("+nomFich + ".TabBloc["+i+"].conteneur);";
         etape.algorithme = "Lecture >> Bloc "+(i+1); 
                 
         t.push(etape);

         let etapesSuppBloc = this._Grph_fichier.TabBloc[i].suppression(cle,nomFich + ".TabBloc["+i+"]");

         for (let j = 0; j < etapesSuppBloc.length ; j++) {
             t.push(etapesSuppBloc[j]);
         }  

         t[t.length-2].code = t[t.length-2].code +   nomFich +".Tab_Rep_Bloc["+i+"].selectionBloc();";
         t[t.length-1].code = t[t.length-1].code +   nomFich +".Tab_Rep_Bloc["+i+"].initAnimationBloc();";
      }
      else {
        etape = new Etape();
        etape.code = '';
        etape.algorithme = "Err : Clé Introuvable";

        t.push(etape);
      }
         return t;

     }


      inserer(cle, nomVar,nomIndex,nomFich, divBloc){

         divBloc = '"'+divBloc+'"';

         let t = [], etape;

         let i = this._index.rechercher(cle).i;
         let r = this._fichier.fich[i].rech(cle);
         let trouv = this._fichier.fich[i].rech(cle).trouv;
         let j = r.j;

        if(!trouv){

          let etapesrechIndex = this._Grph_index.rechercher(cle,nomIndex);
        

           for (let j = 0; j < etapesrechIndex.length ; j++) {
             t.push(etapesrechIndex[j]);
            }
          
        if((this._fichier.fich[i].nb < this._fichier.fich[i].b)||(this._fichier.fich[i].tab[j].eff)){

         t[t.length-1].code = t[t.length-1].code +  
                              nomFich +".Tab_Rep_Bloc["+i+"].initAnimationBloc();"+
                              "$("+divBloc+").empty();";
         etape = new Etape();
         etape.code = 
                nomFich +".Tab_Rep_Bloc["+i+"].selectionBloc();"+
                nomFich + ".TabBloc["+i+"] = new Grph_BlocTOF_MC("+nomFich+".Fich_TOF.fich["+i+"]);"+
                "$("+divBloc+").empty();"+
                "$("+divBloc+").append("+nomFich + ".TabBloc["+i+"].conteneur);";
         etape.algorithme = "Lecture >> Bloc "+(i+1);        
                
         t.push(etape);
          
         if(cle <= this._index.tableIndexMC[this._index.tableIndexMC.length-1].cle){ 

         let etapesInserBloc = this._Grph_fichier.TabBloc[i].insertion(cle,nomFich + ".TabBloc["+i+"]").etp;

         for (let j = 0; j < etapesInserBloc.length ; j++) {
             t.push(etapesInserBloc[j]);
         }  

        }
        else{

            let etapesMiseAjour = this._Grph_index.miseAjourIndex(cle,nomIndex);

            etape = new Etape();
            etape.code = 
            "if(!"+nomFich + ".TabBloc["+i+"].tabEnreg["+this._fichier.fich[i].nb+"]){"+
              nomFich + ".TabBloc["+i+"].tabEnreg["+this._fichier.fich[i].nb+"] = new Grph_EnregTOF("+cle+",false);"+
              nomFich + ".TabBloc["+i+"].tabEnreg["+this._fichier.fich[i].nb+"].ajout();"+
              nomFich + ".TabBloc["+i+"].conteneurTabEnreg["+this._fichier.fich[i].nb+"].append("+nomFich + ".TabBloc["+i+"].tabEnreg["+this._fichier.fich[i].nb+"].conteneur);"+
              nomFich + ".TabBloc["+i+"].conteneur.childNodes[1].childNodes[1].innerHTML++;"+
              nomFich + ".TabBloc["+i+"].conteneur.childNodes[1].append("+nomFich + ".TabBloc["+i+"].conteneur.childNodes[1].childNodes[1]);}"+
              etapesMiseAjour[etapesMiseAjour.length-2].code;
            etape.algorithme = "Insertion Enreg de cle >> "+cle;  

             t.push(etape);

             t.push( etapesMiseAjour[etapesMiseAjour.length-1]);

        }

         t[t.length-2].code = t[t.length-2].code +   nomFich +".Tab_Rep_Bloc["+i+"].selectionBloc();";
         t[t.length-1].code = t[t.length-1].code +   nomFich +".Tab_Rep_Bloc["+i+"].initAnimationBloc();";
        }
        else{
           etape = new Etape();
           etape.code = '';
           etape.algorithme = "Err >> insertion impossible .";

           t.push(etape);
        }

        }
        else {
           etape = new Etape();
           etape.code = '';
           etape.algorithme = "Err : La Clé Existe";

           t.push(etape);

        }
         
         return t;

      }

}