class Grph_EnregTOF{

    // Attributs
    _enregTOF = {
                    cle :0,
                    eff : false,
                 };
    _conteneur;
    _conteneurValeur;
    _conteneurEff;

    // Constructeur
    constructor(cle,eff){

        this._enregTOF.cle = cle;
        this._enregTOF.eff = eff;

        this._conteneur = document.createElement('div');
        this._conteneur.setAttribute("class", "enregTOF_conteneur");
        
        this._conteneurValeur = document.createElement('div');
        this._conteneurValeur.setAttribute("class", "enregTOF_conteneurValeur");
        this._conteneurValeur.innerHTML = this._enregTOF.cle;
        

        this._conteneurEff = document.createElement('div');
        this._conteneurEff.setAttribute("class", "enregTOF_conteneurEff");
    
        (this._enregTOF.eff == false) ? this._conteneurEff.innerHTML = "F": this._conteneurEff.innerHTML = "V";

        let conteneurDecor = document.createElement('div');
        conteneurDecor.setAttribute("class", "enregTOF_conteneurDecor");
        
        let rectDecor1 = document.createElement('div');
        rectDecor1.setAttribute("class", "enregTOF_rectDecor1");
        let rectDecor2 = document.createElement('div');
        rectDecor2.setAttribute("class", "TOF_rectDecor2");
        let rectDecor3 = document.createElement('div');
        rectDecor3.setAttribute("class", "enregTOF_rectDecor3");

        conteneurDecor.append(rectDecor1, rectDecor2, rectDecor3);

        this._conteneur.append(this._conteneurValeur,this._conteneurEff,conteneurDecor);

    }



     // Setters et Getters
    set enregTOF(enregTOF){

        this._enregTOF = enregTOF;

    }

    get enregTOF(){

        return this._enregTOF;

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


    set conteneurEff(conteneurEff){

        this._conteneurEff = conteneurEff;

    }

    get conteneurEff(){

        return this._conteneurEff;

    }

 


     // Méthodes
    modifierEnreg(enregTOF){

        this._enregTOF = enregTOF;
        this._conteneurValeur.innerHTML = enregTOF.cle;
        this._conteneurEff.innerHTML = enregTOF.eff;

    }

    static conteneurVide(){

        let conteneurVide = document.createElement('div');
        conteneurVide.setAttribute("class", "enregTOF_conteneurVide");
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

    supp_logique(){

        this.initAnimation();

        this._conteneurEff.innerHTML = "V";      
        $(this._conteneurEff).addClass("animated fast bounceIn");

    }

    insert_logique(){
       this.initAnimation();

       this._conteneurEff.innerHTML = "F";
       $(this._conteneurEff).addClass("animated fast bounceIn");


    }

    selection(){

        this.initAnimation();

        $(this._conteneur).addClass(" shadow-pop-tr");

    }

    validation(){

         this.initAnimation();

        $(this._conteneur).addClass("animated fast shadow-drop-center");

    }

     nonvalidation(){

         this.initAnimation();

        $(this._conteneur).addClass("animated fast shadow-drop-center2");

    }


    insertDecalage1(){

        this.initAnimation();

        $(this._conteneur).addClass("slide-in-right");
    }

    insertDecalage2(){
        this.initAnimation();

        $(this._conteneur).addClass("slide-in-left");
    }


    insertDecalage3(){
        this.initAnimation();

        $(this._conteneur).addClass("slide-in-br");
    }



    initAnimation(){

        $(this._conteneur).removeClass("slide-in-br");

         $(this._conteneur).removeClass("slide-out-right");
          
        $(this._conteneur).removeClass("slide-in-right");

        $(this._conteneur).removeClass("slide-in-left");

        $(this._conteneurEff).removeClass("animated fast bounceIn");

        $(this._conteneur).removeClass("shadow-pop-tr");

         $(this._conteneur).removeClass("animated fast slide-in-blurred-left");

        $(this._conteneur).children().removeClass("animated fast fadeOut");
        $(this._conteneur).css("opacity", "1");

        $(this._conteneur).removeClass("animated fast bounceIn");

        $(this._conteneur).removeClass("animated fast shadow-drop-center");

        $(this._conteneur).removeClass("animated fast shadow-drop-center2");

    }

}

class Grph_BlocTOF_MC
{

    // Attributs
    _bloc_TOF;
    _nbEnregMax;
    _conteneur;
    _conteneurTabEnreg = [];
    _tabEnreg = [];
    _tableInsert = [];


    // Constructeur
    constructor(bloc_TOF){
        
        this._bloc_TOF = bloc_TOF;
        this._nbEnregMax = bloc_TOF.b;

        for (let k = 0; k < this._bloc_TOF.b; k++) {
            this._tableInsert[k] = false;
        }

        this._conteneur = document.createElement('div');
        this._conteneur.setAttribute("class", "bloc_TOF_conteneur");
       
        // Création du Conteneur du Tableau d'Enregistrements
        let conteneurTab = document.createElement('div');
        conteneurTab.setAttribute("class", "bloc_TOF_conteneurTab"); 

        let conteneurTabText = document.createElement('p');
        conteneurTabText.setAttribute("class", "bloc_TOF_conteneurTabText"); 
        conteneurTabText.innerHTML = 'Tab :';

        let conteneurListeEnreg = document.createElement('ul');
        conteneurListeEnreg.setAttribute("class", "bloc_TOF_conteneurListeEnreg");

       for(let i = 0; i < this._nbEnregMax; i++){
            let conteneurEnreg = document.createElement('li');
            conteneurEnreg.setAttribute("class", "bloc_TOF_conteneurEnreg");
            conteneurEnreg.style.margin = "0px calc(100% / "+this._nbEnregMax+" - 4.5vw) 0px 0px ";
            conteneurEnreg.innerHTML = (i+1 < 10) ? ("E::0" + (i+1)) : ("E::" + (i+1));
            conteneurEnreg.append(Grph_EnregTOF.conteneurVide());
            conteneurListeEnreg.append(conteneurEnreg);

            this._conteneurTabEnreg[i] = conteneurEnreg;
        }


         for(let i = 0; i < this._bloc_TOF.nb; i++){
          
            let grphEnreg = new Grph_EnregTOF(this._bloc_TOF.tab[i].cle,this._bloc_TOF.tab[i].eff);

              let conteneurEnreg = this._conteneurTabEnreg[i];      

            setTimeout(function(){
                grphEnreg.apparition();
                conteneurEnreg.append(grphEnreg.conteneur);
            }, i*125);
            
            this._tabEnreg[i] = grphEnreg;
        }

         conteneurTab.append(conteneurTabText, conteneurListeEnreg);


        // Création du Conteneur de l'attribut 'nb'
        let conteneurNb = document.createElement('div');
        conteneurNb.setAttribute("class", "bloc_TOF_conteneurNb");
        conteneurNb.innerHTML = "Nb : ";

        let conteneurNb_Valeur = document.createElement('p');
        conteneurNb_Valeur.setAttribute("class", "bloc_TOF_conteneurNb_Valeur");

      
        for(let i = 0; i <= this._bloc_TOF.nb; i++){     
            setTimeout(function(){
                conteneurNb_Valeur.innerHTML = i;
            }, i * 125);
            

        }
        conteneurNb.append(conteneurNb_Valeur);

        this._conteneur.append(conteneurTab, conteneurNb);
    }



    // Setters et Getters
     set bloc_TOF(bloc_TOF){

        this._bloc_TOF = bloc_TOF;

    }

    get bloc_TOF(){

        return this._bloc_TOF;

    }

    set nbEnregMax(nbEnregMax){

        this._nbEnregMax = nbEnregMax;

    }

    get nbEnregMax(){

        return this._nbEnregMax;

    }

    set conteneur(conteneur){

        this._conteneur = conteneur;

    }

    get conteneur(){

        return this._conteneur;

    }

    set tabEnreg(tabEnreg){

        this._tabEnreg = tabEnreg;

    }

    get tabEnreg(){

        return this._tabEnreg;

    }

    set conteneurTabEnreg(conteneurTabEnreg){

        this._conteneurTabEnreg = conteneurTabEnreg;
    }

    get conteneurTabEnreg(){

        return this._conteneurTabEnreg;

    }

    set tableInsert(tableInsert){

        this._tableInsert = tableInsert;
    }

    get tableInsert(){

        return this._tableInsert;

    }


    //Méthodes

    disparitionTabEnreg()
    {
        for (let i = 0; i < this._bloc_TOF.nb; i++) 
        {
           let Enreg = this._tabEnreg[i];      

            setTimeout(function(){
                Enreg.disparition();
            }, i*200);
        }
    }

    recherche(cle,nomVar){
        // Récupération du Résultat de la Recherche
        let r = this._bloc_TOF.rech(cle);
        let indiceFin = r.j;
        let inf = 0,inff = 0;
        let sup = this._bloc_TOF.nb - 1,supp = this._bloc_TOF.nb - 1;
        let index = Math.trunc((inf + sup ) / 2);
        let  prec  ;
        if(cle < this._bloc_TOF.tab[index].cle)  supp = index - 1;
        else                                     inff = index + 1; 
        let proc = Math.trunc((inff + supp ) / 2);

        // Remplissage de la table d'Etapes
        let etapes = [];
         etapes[0] = new Etape();
         etapes[0].code = 
                    nomVar + ".tabEnreg["+index+"].initAnimation();";
          etapes[1] =  new Etape();
          etapes[1].code = 
                    nomVar + ".tabEnreg["+index+"].selection();"+
                    nomVar + ".tabEnreg["+proc+"].initAnimation();";
          etapes[1].algorithme = "Selection >> Enreg "+(index+1);                  

         prec = index;
         if(cle < this._bloc_TOF.tab[index].cle)  sup = index - 1;
         else                                     inf = index + 1; 

         if(cle < this._bloc_TOF.tab[proc].cle)  supp = proc - 1;
         else                                     inff = proc + 1; 

        let i = 2;
        while( index != indiceFin){
           index  = Math.trunc((inf + sup ) / 2); 
           proc = Math.trunc((inff + supp ) / 2);
           etapes[i] = new Etape();
           if(index === proc || prec === proc)
           {
            etapes[i].code =
                    nomVar + ".tabEnreg["+prec+"].initAnimation();"+
                    nomVar + ".tabEnreg["+index+"].selection();";
            etapes[i].algorithme = "Selection >> Enreg "+(index+1);        
           }
           else
           {
               etapes[i].code =
                    nomVar + ".tabEnreg["+indiceFin+"].initAnimation();"+
                    nomVar + ".tabEnreg["+prec+"].initAnimation();"+
                    nomVar + ".tabEnreg["+index+"].selection();"+
                    nomVar + ".tabEnreg["+proc+"].initAnimation();";
               etapes[i].algorithme = "Selection >> Enreg "+(index+1);      
           }
           
          
                prec = index;
                if(cle < this._bloc_TOF.tab[index].cle)  sup = index - 1;
                else                                     inf = index + 1; 

                if(cle < this._bloc_TOF.tab[proc].cle)  supp = proc - 1;
                else                                     inff = proc + 1; 
                i++;
        }
        
        if(r.trouv)
        {
              
             etapes[i] = new Etape();
             etapes[i].code = 
                nomVar + ".tabEnreg["+prec+"].initAnimation();"+
                nomVar + ".tabEnreg["+indiceFin+"].validation();";
             etapes[i].algorithme = ">>> Clé Trouvée ";     
       }
        else{

             etapes[i] = new Etape();
             etapes[i].code = 
                nomVar + ".tabEnreg["+prec+"].initAnimation();"+
                nomVar + ".tabEnreg["+indiceFin+"].nonvalidation();";
             etapes[i].algorithme = ">>> Clé Introuvable ";   

        }

        return etapes;
    }

    suppression(cle,nomVar){
      // Récupération du Résultat de la Recherche
      let r = this._bloc_TOF.rech(cle);
      let etapes = [];

      if(r.trouv){ 
        
        let etapesrech = this.recherche(cle,nomVar);

        for (let j = 0; j < etapesrech.length; j++) {
            etapes[j] = etapesrech[j];
        }

        let i = etapesrech.length;

        etapes[i] = new Etape();
        etapes[i].code = 
               nomVar + ".tabEnreg["+r.j+"].conteneurEff.innerHTML = 'F';"+
               nomVar + ".tabEnreg["+r.j+"].initAnimation();"; 
        i++;              

        etapes[i] = new Etape();
        etapes[i].code = 
                nomVar + ".tabEnreg["+r.j+"].supp_logique();";
        etapes[i].algorithme = ">>> Suppression logique de Enreg "+(r.j+1);

     } 

         return etapes;    
        
    }

     insertion(cle,nomVar){

        // Récupération du Résultat de la Recherche
    
        let r = this._bloc_TOF.rech(cle);
        let k = 0; let enregsortant;
        let etapes = [];
        let etapesrech = this.recherche(cle,nomVar);

        for (let j = 0; j < etapesrech.length; j++) {
            etapes[j] = etapesrech[j];
        }

        let i = etapesrech.length;

        etapes[i-1].code = etapes[i-1].code +  nomVar+".tableInsert["+(k+1)+"] = false;";k++;

        etapes[i] = new Etape();

        if(!r.trouv)
        {
            if(this._bloc_TOF.tab[r.j].eff)
            {
              enregsortant = '$';
              etapes[i].code =
                 nomVar + ".tabEnreg["+r.j+"].conteneurEff.innerHTML = 'V';"+
                 nomVar + ".tabEnreg["+r.j+"].initAnimation();"; 
                i++;
              etapes[i] = new Etape();
              etapes[i].code = 
                 nomVar + ".tabEnreg["+r.j+"].insert_logique();";
              etapes[i].algorithme = ">>> Insertion logique de Enreg "+(r.j+1);   
            }
            else
            {
               
               let indiceDebut;
               if(this._bloc_TOF.nb === this._bloc_TOF.b)  
                {

                    let enregr = this._bloc_TOF.tab[this._bloc_TOF.nb-1];
                    if(!enregr.eff)   enregsortant = enregr.cle;
                    else              enregsortant =  '$';
                    
                    indiceDebut = this._bloc_TOF.nb-1;
                     
                   etapes[i].code =
                   "if(!"+nomVar+".tableInsert["+k+"]){"+
                   nomVar + ".tabEnreg["+r.j+"].initAnimation();"+
                   nomVar+".tableInsert["+k+"] = true;}else{"+
                   
           
                   nomVar + ".tabEnreg["+indiceDebut+"] = new Grph_EnregTOF("+nomVar+".bloc_TOF.tab["+indiceDebut+"].cle,"+nomVar+".bloc_TOF.tab["+indiceDebut+"].eff);"+
                   nomVar + ".tabEnreg["+indiceDebut+"].ajout();"+
                   nomVar + ".conteneurTabEnreg["+indiceDebut+"].append("+nomVar+".tabEnreg["+indiceDebut+"].conteneur);"+
                   nomVar+".tableInsert["+(k+1)+"] = false;}";
                                                              
                    k++;i++;
                  if(r.j+1 > this._bloc_TOF.b-1){

                    etapes[i] = new Etape();
                    etapes[i].code =
                      "if(!"+nomVar+".tableInsert["+k+"]){"+
                      nomVar +".conteneurTabEnreg["+indiceDebut+"].removeChild("+nomVar+".conteneurTabEnreg["+indiceDebut+"].childNodes[2]);"+
                      nomVar+".tableInsert["+k+"] = true;}else{"+

                      nomVar + ".tabEnreg["+r.j+"].disparition();"+
                      nomVar +".conteneurTabEnreg["+r.j+"].removeChild("+nomVar+".conteneurTabEnreg["+r.j+"].childNodes[2]);"+
                      nomVar+".tableInsert["+(k+1)+"]= false;}";
                    etapes[i].algorithme = ">>> Retirer Enreg "+(indiceDebut+1); 
                  }
                  else{
                    etapes[i] = new Etape();
                    etapes[i].code =
                       "if(!"+nomVar+".tableInsert["+k+"]){"+
                       nomVar +".conteneurTabEnreg["+indiceDebut+"].removeChild("+nomVar+".conteneurTabEnreg["+indiceDebut+"].childNodes[2]);"+
                       nomVar+".tableInsert["+k+"] = true;}else{"+

                       nomVar + ".tabEnreg["+(indiceDebut-1)+"] = "+nomVar+".tabEnreg["+indiceDebut+"];"+
                       nomVar + ".conteneurTabEnreg["+(indiceDebut-1)+"].append("+nomVar+".tabEnreg["+indiceDebut+"].conteneur);"+
                       nomVar + ".tabEnreg["+(indiceDebut-1)+"].insertDecalage1();"+
                       nomVar+".tableInsert["+(k+1)+"]= false;}";
                    etapes[i].algorithme = ">>> Retirer Enreg "+(indiceDebut+1);   

                 }
                     k++;
                 
               }
               else {

                   enregsortant = '$';
                   indiceDebut = this._bloc_TOF.nb;
                   etapes[i].code =
                      "if(!"+nomVar+".tableInsert["+k+"]){"+
                      nomVar + ".tabEnreg["+r.j+"].initAnimation();"+
                      nomVar+".tableInsert["+k+"] = true;}else{"+

                      nomVar + ".tabEnreg["+(indiceDebut-1)+"] = "+nomVar+".tabEnreg["+indiceDebut+"];"+
                      nomVar + ".conteneurTabEnreg["+(indiceDebut-1)+"].append("+nomVar+".tabEnreg["+indiceDebut+"].conteneur);"+
                      nomVar + ".tabEnreg["+(indiceDebut-1)+"].insertDecalage1();"+
                      nomVar+".tableInsert["+(k+1)+"]= false;"+
                      nomVar + ".conteneur.childNodes[1].childNodes[1].innerHTML--;"+
                      nomVar + ".conteneur.childNodes[1].append("+nomVar+".conteneur.childNodes[1].childNodes[1]);}";   
                   k++;

               }      
                 i++;
              
               for (let index = indiceDebut; index > (r.j+1) ; index--) {
                etapes[i] = new Etape();
                etapes[i].code =
                   "if(!"+nomVar+".tableInsert["+k+"]){"+
                   nomVar + ".tabEnreg["+ index +"] = "+nomVar+".tabEnreg["+(index-1)+"];"+
                   nomVar + ".conteneurTabEnreg["+index+"].append("+nomVar+".tabEnreg["+(index-1)+"].conteneur);"+
                   nomVar + ".tabEnreg["+index+"].insertDecalage2();"+
                   "if("+index+" =="+nomVar+".bloc_TOF.nb) {"+
                   nomVar + ".conteneur.childNodes[1].childNodes[1].innerHTML++;"+
                   nomVar + ".conteneur.childNodes[1].append("+nomVar+".conteneur.childNodes[1].childNodes[1]);}"+
                 
                   nomVar+".tableInsert["+k+"] = true;}else{"+


                   nomVar + ".tabEnreg["+(index-2)+"] = "+nomVar+".tabEnreg["+(index-1)+"];"+
                   nomVar + ".conteneurTabEnreg["+(index-2)+"].append("+nomVar+".tabEnreg["+(index-1)+"].conteneur);"+
                   nomVar + ".tabEnreg["+(index-2)+"].insertDecalage1();"+
                   nomVar+".tableInsert["+(k+1)+"]= false;}";
                etapes[i].algorithme = ">>> Decalage";   
                k++;
                i++;
               }

                if(r.j+1 <= this._bloc_TOF.b-1){ 
                 etapes[i] = new Etape();
                 etapes[i].code =
                    "if(!"+nomVar+".tableInsert["+k+"]){"+
                    nomVar + ".tabEnreg["+(r.j+1)+"] = "+nomVar+".tabEnreg["+r.j+"];"+
                    nomVar + ".conteneurTabEnreg["+(r.j+1)+"].append("+nomVar+".tabEnreg["+r.j+"].conteneur);"+
                    nomVar + ".tabEnreg["+(r.j+1)+"].insertDecalage2();"+
                    "if("+(r.j+1)+" =="+nomVar+".bloc_TOF.nb) {"+
                    nomVar + ".conteneur.childNodes[1].childNodes[1].innerHTML++;"+
                    nomVar + ".conteneur.childNodes[1].append("+nomVar+".conteneur.childNodes[1].childNodes[1]);}"+

                    nomVar+".tableInsert["+k+"] = true;}else{"+


                    nomVar + ".tabEnreg["+r.j+"].disparition();"+
                    nomVar +".conteneurTabEnreg["+r.j+"].removeChild("+nomVar+".conteneurTabEnreg["+r.j+"].childNodes[2]);"+
                    nomVar+".tableInsert["+(k+1)+"]= false;}";
                   
                 i++;
               }

                 etapes[i] = new Etape();
                 etapes[i].code =
                    nomVar + ".tabEnreg["+r.j+"] = new Grph_EnregTOF("+cle+",false);"+
                    nomVar + ".tabEnreg["+ r.j +"].ajout();"+
                    nomVar + ".conteneurTabEnreg["+r.j+"].append("+nomVar+".tabEnreg["+r.j+"].conteneur);";
                 etapes[i].algorithme = "Insertion Enreg de cle >> "+cle;   
 
            }            
        }
        else
        {
             etapes[i].code =
             nomVar + ".tabEnreg["+r.j+"].initAnimation();";
        }   

        return {
                   etp :etapes,
                   enreg : enregsortant,
               };


     }
}

class Grph_BlocTOF_MS{
    _conteneur;
    _rectDecor1;
    _rectDecor2;

      constructor(){

        this._conteneur = document.createElement('div');
        this._conteneur.setAttribute("class", "Grph_BlocTOF");

        this._rectDecor1 = document.createElement('div');
        this._rectDecor1.setAttribute("class", "Grph_BlocTOF_rectDecor1");

        this._rectDecor2 = document.createElement('div');
        this._rectDecor2.setAttribute("class", "Grph_BlocTOF_rectDecor2");

        this._conteneur.append(this._rectDecor1,this._rectDecor2); 

      }

       // Setters et Getters
       
       set conteneur(conteneur){

        this._conteneur = conteneur;

      }

      get conteneur(){

        return this._conteneur;

      }


      set rectDecor1(rectDecor1){

        this._crectDecor1 = rectDecor1;

      }

      get rectDecor1(){

        return this._rectDecor1;

      }

      set rectDecor2(rectDecor2){

        this._crectDecor2 = rectDecor2;

      }

      get rectDecor2(){

        return this._rectDecor2;

      }


      // Méthodes

       apparitionBloc(){

        this.initAnimationBloc();

        $(this._conteneur).addClass("animated fast bounceIn");

    }

      disparitionBloc(){

        this.initAnimationBloc();

        $(this._conteneur).children().addClass("animated fast fadeOut");
        $(this._conteneur).fadeTo(800, 0.5);

    }

      ajoutBloc(){

        this.initAnimationBloc();

        $(this._conteneur).addClass("animated fast bounceIn");

    }

    selectionBloc(){

        this.initAnimationBloc();

        $(this._conteneur).addClass(" shadow-pop-tr");

    }

    validationBloc(){

        this.initAnimationBloc();

        $(this._conteneur).addClass("animated fast shadow-drop-center");

    }


      nonvalidationBloc(){

         this.initAnimationBloc();

       $(this._conteneur).addClass("animated fast shadow-drop-center2");

    }



    initAnimationBloc(){


         $(this._conteneur).removeClass(" shadow-pop-tr");

        $(this._conteneur).children().removeClass("animated fast fadeOut");
        $(this._conteneur).css("opacity", "1");

        $(this._conteneur).removeClass("animated fast bounceIn");

        $(this._conteneur).removeClass("animated fast shadow-drop-center");

        $(this._conteneur).removeClass("animated fast shadow-drop-center2");

    }


}

class Grph_Fich_TOF
{
     // Attributs
    _NbBlocMAX;
    _conteneur;
    _Fich_TOF;
    _conteneurTabBloc = [];
    _TabBloc = [];
    _Tab_Rep_Bloc = [];
    _variableInsert = [];
    constructor(fich_TOF,nbBlocMAX)
    {

        this._NbBlocMAX = nbBlocMAX;
        this._Fich_TOF = fich_TOF;

        for (let k = 0; k < nbBlocMAX; k++) {
            this._variableInsert[k] = false; 
        }

        this._conteneur = document.createElement('div');
        this._conteneur.setAttribute("class", "fich_TOF_conteneur");

        // Création de la liste des blocs

        let conteneurListeBloc = document.createElement('ul');
        conteneurListeBloc.setAttribute("class", "fich_TOF_conteneurListeBloc");

       for(let i = 0; i < this._NbBlocMAX; i++){
   
            let conteneurBloc = document.createElement('li');
            conteneurBloc.setAttribute("class", "fich_TOF_conteneurBloc");
            conteneurBloc.style.margin = "0px calc(100% / "+this._NbBlocMAX+" - 6.22vw) 0px 0px ";
            conteneurBloc.innerHTML = (i+1 < 10) ? (" Bloc 0" + (i+1)) : (" Bloc " + (i+1));

            let conteneurVide = document.createElement('div');
            conteneurVide.setAttribute("class", "blocTOF_conteneurVide");

            conteneurBloc.append(conteneurVide);
            conteneurListeBloc.append(conteneurBloc);

            this._conteneurTabBloc[i] = conteneurBloc;
        }

        for(let i = 0; i < this._Fich_TOF.entete.nbBLOC; i++){
            this._TabBloc[i] = new Grph_BlocTOF_MC(this._Fich_TOF.fich[i]); 
            let grphBloc = new Grph_BlocTOF_MS();

            this._Tab_Rep_Bloc[i] = grphBloc;


            this._conteneurTabBloc[i].removeChild( this._conteneurTabBloc[i].childNodes[1]);
            this._conteneurTabBloc[i].append(grphBloc.conteneur);
        
        }
           

        this._conteneur.append(conteneurListeBloc);
    }

    //les seters et les geters

    set conteneur(conteneur){

        this._conteneur = conteneur;

    }

    get conteneur(){

        return this._conteneur;

    }


    set NbBlocMAX(nbBlocMAX){

       this._NbBlocMAX =  nbBlocMAX;

    }

    get NbBlocMAX(){

        return this._NbBlocMAX;

    }

     set Fich_TOF(fich_TOF){

       this._Fich_TOF =  fich_TOF;

    }

    get Fich_TOF(){

        return this._Fich_TOF;

    }

     set conteneurTabBloc(conteneurTabBloc){

       this._conteneurTabBloc =  conteneurTabBloc;

    }

    get conteneurTabBloc(){

        return this._conteneurTabBloc;

    }

    set TabBloc(TabBloc){

       this._TabBloc =  TabBloc;

    }

    get TabBloc(){

        return this._TabBloc;

    }

    

    set Tab_Rep_Bloc(tab_Rep_Bloc){

       this._Tab_Rep_Bloc =  tab_Rep_Bloc;

    }

    get Tab_Rep_Bloc(){

        return this._Tab_Rep_Bloc;

    }

    set variableInsert(variableInsert){

       this._variableInsert =  variableInsert;

    }

    get variableInsert(){

        return this._variableInsert;

    }




    //Méthode

    recherche(cle,nomVar,div){
        div = '"'+div+'"';
        let i; 
        let etapes = [];
        // Récupération du Résultat de la Recherche
        let r = this._Fich_TOF.rech(cle);
        let indiceFin = r.i;
       if(this._Fich_TOF.entete.nbBLOC === 2 && indiceFin != this._Fich_TOF.entete.nbBLOC)
       {
         i = 0;
         etapes[i] = new Etape();
         etapes[i].code =  nomVar + ".Tab_Rep_Bloc["+indiceFin+"].initAnimationBloc();"+
                          "$("+div+").empty();";
         i++;

        etapes[i] = new Etape();
        etapes[i].code =  nomVar + ".Tab_Rep_Bloc["+indiceFin+"].selectionBloc();"+
                          nomVar + ".TabBloc["+indiceFin+"] = new Grph_BlocTOF_MC("+nomVar+".Fich_TOF.fich["+indiceFin+"]);"+
                          "$("+div+").empty();"+
                          "$("+div+").append("+nomVar + ".TabBloc["+indiceFin+"].conteneur);";
        etapes[i].algorithme =  "Lecture >> Bloc "+(indiceFin+1);
        i++;

        let etapesrechBloc = this._TabBloc[indiceFin].recherche(cle,blocResultat);

             for (let j = 1; j < etapesrechBloc.length ; j++) {
                 etapes[i] = etapesrechBloc[j];i++;
              } 

               etapes[i-2].code = etapes[i-2].code +
                                  nomVar + ".Tab_Rep_Bloc["+indiceFin+"].selectionBloc();";

            if(r.trouv)
            {
                etapes[i-1].code = etapes[i-1].code+
                nomVar + ".Tab_Rep_Bloc["+indiceFin+"].validationBloc();";
            }
            else{
               etapes[i-1].code = etapes[i-1].code+
                nomVar + ".Tab_Rep_Bloc["+indiceFin+"].nonvalidationBloc();";

              }

       }
       else{
        let inf = 0,inff = 0;

        let sup = this._Fich_TOF.entete.nbBLOC - 1,supp = this._Fich_TOF.entete.nbBLOC - 1;

        let index = Math.trunc((inf + sup ) / 2);
        let  prec ,proc ;
        if(indiceFin != index){
           if(cle < this._Fich_TOF.fich[index].tab[0].cle)  supp = index - 1;
           else {
               if(cle > this._Fich_TOF.fich[index].tab[this._Fich_TOF.fich[index].nb-1].cle)  inff = index + 1; 
               }                                        
            proc = Math.trunc((inff + supp ) / 2);}
           else proc = index - 1;

        // Remplissage de la table d'Etapes
    
         etapes[0] = new Etape();
                    etapes[0].code = 
                    nomVar + ".Tab_Rep_Bloc["+index+"].initAnimationBloc();";
          etapes[1] =  new Etape();
                    etapes[1].code = 
                    nomVar + ".Tab_Rep_Bloc["+index+"].selectionBloc();"+
                    nomVar + ".Tab_Rep_Bloc["+proc+"].initAnimationBloc();";
          etapes[1].algorithme = "Selection >> Bloc "+(index+1);          

         prec = index;
           if(cle < this._Fich_TOF.fich[index].tab[0].cle)  sup = index - 1;
           else {
                  if(cle > this._Fich_TOF.fich[index].tab[this._Fich_TOF.fich[index].nb-1].cle)  inf = index + 1; 
                }
       
           
           if(cle < this._Fich_TOF.fich[proc].tab[0].cle)  supp = proc - 1;
           else {
                   if(cle > this._Fich_TOF.fich[proc].tab[this._Fich_TOF.fich[proc].nb-1].cle)  inff = proc + 1; 
                }         

         i = 2;
        if(r.i == this._Fich_TOF.entete.nbBLOC)  indiceFin = indiceFin - 1;
        while( index != indiceFin){

           index  = Math.trunc((inf + sup ) / 2); 
           proc = Math.trunc((inff + supp ) / 2);
           etapes[i] = new Etape();
           if(index === proc || prec === proc)
           {
            etapes[i].code =
                    nomVar + ".Tab_Rep_Bloc["+prec+"].initAnimationBloc();"+
                    nomVar + ".Tab_Rep_Bloc["+index+"].selectionBloc();";
            etapes[i].algorithme = "Selection >> Bloc "+(index+1);        
            if(r.i == this._Fich_TOF.entete.nbBLOC)  etapes[i].code = etapes[i].code +"$("+nomVar + ".conteneurTabBloc["+r.i+']).removeClass("animated fast shadow-drop-center2");';     
           }
           else
           {
               etapes[i].code =
                    nomVar + ".Tab_Rep_Bloc["+indiceFin+"].initAnimationBloc();"+
                    nomVar + ".Tab_Rep_Bloc["+prec+"].initAnimationBloc();"+
                    nomVar + ".Tab_Rep_Bloc["+index+"].selectionBloc();"+
                    nomVar + ".Tab_Rep_Bloc["+proc+"].initAnimationBloc();";
               etapes[i].algorithme = "Selection >> Bloc "+(index+1);    
           }
                     
                prec = index;
                if(cle < this._Fich_TOF.fich[index].tab[0].cle)  sup = index - 1;
           else {
                  if(cle > this._Fich_TOF.fich[index].tab[this._Fich_TOF.fich[index].nb-1].cle)  inf = index + 1; 
                }  

           if(cle < this._Fich_TOF.fich[proc].tab[0].cle)  supp = proc - 1;
           else {
                   if(cle > this._Fich_TOF.fich[proc].tab[this._Fich_TOF.fich[proc].nb-1].cle)  inff = proc + 1; 
                }   

                i++;   
        }

            if(r.i == this._Fich_TOF.entete.nbBLOC)
            {
                etapes[i] = new Etape();
                etapes[i].code = 
                 nomVar + ".Tab_Rep_Bloc["+indiceFin+"].initAnimationBloc();"+
                 "$("+nomVar + ".conteneurTabBloc["+r.i+']).addClass("animated fast shadow-drop-center2");';
                etapes[i].algorithme = ">>> Cle Introuvable ";  
            }
            else{

             etapes[i-1].code = etapes[i-1].code + "$("+div+").empty();";   
             etapes[i] = new Etape();
             etapes[i].code = 
                 nomVar + ".TabBloc["+indiceFin+"] = new Grph_BlocTOF_MC("+nomVar+".Fich_TOF.fich["+indiceFin+"]);"+
                 "$("+div+").empty();"+
                 "$("+div+").append("+nomVar+ ".TabBloc["+indiceFin+"].conteneur);";
             etapes[i].algorithme =  "Lecture >> Bloc "+(indiceFin+1);    
                 
               i++;

             let etapesrechBloc = this._TabBloc[r.i].recherche(cle,nomVar + ".TabBloc["+indiceFin+"]");

             for (let j = 1; j < etapesrechBloc.length; j++) {
                 etapes[i] = etapesrechBloc[j];i++;
              } 


              etapes[i-2].code = etapes[i-2].code +
                                 nomVar + ".Tab_Rep_Bloc["+r.i+"].initAnimationBloc();"+
                                  nomVar + ".Tab_Rep_Bloc["+indiceFin+"].selectionBloc();";

        
        if(r.trouv)
        {
                etapes[i-1].code = etapes[i-1].code+
                nomVar + ".Tab_Rep_Bloc["+prec+"].initAnimationBloc();"+
                nomVar + ".Tab_Rep_Bloc["+indiceFin+"].validationBloc();";
       }
        else{
               etapes[i-1].code = etapes[i-1].code+
                nomVar + ".Tab_Rep_Bloc["+prec+"].initAnimationBloc();"+
                nomVar + ".Tab_Rep_Bloc["+indiceFin+"].nonvalidationBloc();";

        }
      }
   }

        return etapes;
    }

    suppression(cle,nomVar,div){

           div = '"'+div+'"';
           let etapes = [];
           let i;let k = 0;
        // Récupération du Résultat de la Recherche
        let r = this._Fich_TOF.rech(cle);
        if(r.trouv){
        if(this._Fich_TOF.entete.nbBLOC === 2 && r.i != this._Fich_TOF.entete.nbBLOC)
        {
             i = 0;
            etapes[i] = new Etape();
            etapes[i].code =  nomVar + ".Tab_Rep_Bloc["+r.i+"].initAnimationBloc();"+
                              "$("+div+").empty();";
            i++;

           etapes[i] = new Etape();
           etapes[i].code = nomVar + ".Tab_Rep_Bloc["+r.i+"].selectionBloc();"+
                            nomVar + ".TabBloc["+r.i+"] = new Grph_BlocTOF_MC("+nomVar+".Fich_TOF.fich["+r.i+"]);"+
                            "$("+div+").empty();"+
                            "$("+div+").append("+nomVar + ".TabBloc["+r.i+"].conteneur);"; 
           etapes[i].algorithme =  "Lecture >> Bloc "+(r.i+1);                    
           i++;

          let etapesSuppBloc = this._TabBloc[r.i].suppression(cle,nomVar + ".TabBloc["+r.i+"]");

             for (let j = 1; j < etapesSuppBloc.length ; j++) {
                 etapes[i] = etapesSuppBloc[j];i++;
              } 

              etapes[i-2].code = etapes[i-2].code +  nomVar + ".Tab_Rep_Bloc["+r.i+"].initAnimationBloc();";

                               
              etapes[i-4].code = etapes[i-4].code +
                                   nomVar + ".Tab_Rep_Bloc["+r.i+"].selectionBloc();";  

             etapes[i-3].code = etapes[i-3].code + nomVar + ".Tab_Rep_Bloc["+r.i+"].validationBloc();";

        }
        else{
    
        let indiceFin = r.i;
        let inf = 0,inff = 0;
        let sup = this._Fich_TOF.entete.nbBLOC - 1,supp = this._Fich_TOF.entete.nbBLOC - 1;
        let index = Math.trunc((inf + sup ) / 2);
        let  prec ,proc ;
        if(indiceFin != index){
           if(cle < this._Fich_TOF.fich[index].tab[0].cle)  supp = index - 1;
           else {
               if(cle > this._Fich_TOF.fich[index].tab[this._Fich_TOF.fich[index].nb-1].cle)  inff = index + 1; 
               }                                        
            proc = Math.trunc((inff + supp ) / 2);}
           else proc = index - 1;

        // Remplissage de la table d'Etapes
          etapes[0] = new Etape();
                    etapes[0].code = 
                    nomVar + ".Tab_Rep_Bloc["+index+"].initAnimationBloc();";
          etapes[1] =  new Etape();
                    etapes[1].code = 
                    nomVar + ".Tab_Rep_Bloc["+index+"].selectionBloc();"+
                    nomVar + ".Tab_Rep_Bloc["+proc+"].initAnimationBloc();"; 
          etapes[1].algorithme = "Selection >> Bloc "+(index+1);           

         prec = index;
           if(cle < this._Fich_TOF.fich[index].tab[0].cle)  sup = index - 1;
           else {
                  if(cle > this._Fich_TOF.fich[index].tab[this._Fich_TOF.fich[index].nb-1].cle)  inf = index + 1; 
                }  

           if(cle < this._Fich_TOF.fich[proc].tab[0].cle)  supp = proc - 1;
           else {
                   if(cle > this._Fich_TOF.fich[proc].tab[this._Fich_TOF.fich[proc].nb-1].cle)  inff = proc + 1; 
                }         

         i = 2;

        while( index != indiceFin){

           index  = Math.trunc((inf + sup ) / 2); 
           proc = Math.trunc((inff + supp ) / 2);
           etapes[i] = new Etape();
           if(index === proc || prec === proc)
           {
            etapes[i].code =
                    nomVar + ".Tab_Rep_Bloc["+prec+"].initAnimationBloc();"+
                    nomVar + ".Tab_Rep_Bloc["+index+"].selectionBloc();";
            etapes[i].algorithme = "Selection >> Bloc "+(index+1);        
           }
           else
           {
               etapes[i].code =
                    nomVar + ".Tab_Rep_Bloc["+indiceFin+"].initAnimationBloc();"+
                    nomVar + ".Tab_Rep_Bloc["+prec+"].initAnimationBloc();"+
                    nomVar + ".Tab_Rep_Bloc["+index+"].selectionBloc();"+
                    nomVar + ".Tab_Rep_Bloc["+proc+"].initAnimationBloc();";
               etapes[i].algorithme = "Selection >> Bloc "+(index+1);     
           }
                     
                prec = index;
                if(cle < this._Fich_TOF.fich[index].tab[0].cle)  sup = index - 1;
           else {
                  if(cle > this._Fich_TOF.fich[index].tab[this._Fich_TOF.fich[index].nb-1].cle)  inf = index + 1; 
                }  

           if(cle < this._Fich_TOF.fich[proc].tab[0].cle)  supp = proc - 1;
           else {
                   if(cle > this._Fich_TOF.fich[proc].tab[this._Fich_TOF.fich[proc].nb-1].cle)  inff = proc + 1; 
                }   

                i++;   
        }

             etapes[i-1].code = etapes[i-1].code + "$("+div+").empty();";            
             etapes[i] = new Etape();
             etapes[i].code = 
                 nomVar + ".TabBloc["+indiceFin+"] = new Grph_BlocTOF_MC("+nomVar+".Fich_TOF.fich["+indiceFin+"]);"+
                 "$("+div+").empty();"+
                 "$("+div+").append("+nomVar + ".TabBloc["+indiceFin+"].conteneur);";
             etapes[i].algorithme =  "Lecture >> Bloc "+(indiceFin+1);    
                 
               i++;

             let etapesSuppBloc = this._TabBloc[r.i].suppression(cle,nomVar + ".TabBloc["+indiceFin+"]");

             for (let j = 1; j < etapesSuppBloc.length; j++) {
                 etapes[i] = etapesSuppBloc[j];i++;
              } 

               etapes[i-2].code = etapes[i-2].code +  nomVar + ".Tab_Rep_Bloc["+r.i+"].initAnimationBloc();";
                 
               etapes[i-4].code = etapes[i-4].code +
                                   nomVar + ".Tab_Rep_Bloc["+r.i+"].initAnimationBloc();"+
                                   nomVar + ".Tab_Rep_Bloc["+r.i+"].selectionBloc();";  

               etapes[i-3].code = etapes[i-3].code +
                 nomVar + ".Tab_Rep_Bloc["+prec+"].initAnimationBloc();"+
                 nomVar + ".Tab_Rep_Bloc["+indiceFin+"].validationBloc();";
        
        }

     }
     else {
        etapes[0] = new Etape();
        etapes[0].code =  "";
        etapes[0].algorithme = "Echec >> Clé Introuvable";

     }
       
        return etapes;
    }


    insertion(cle,nomVar,div){
   
         div = '"'+div+'"'; 
        let etapes = [];let b;
        let i;let k1 = 0;let k2 = 0;let k3 = 0;let cleInsert = [];
        // Récupération du Résultat de la Recherche
        let r = this._Fich_TOF.rech(cle);
        let indiceFin = r.i;
        if(r.trouv) {
            etapes[0] = new Etape();
            etapes[0].code =  "";
            etapes[0].algorithme = "Echec >> La Clé Existe";
        }
        else{
        if(r.i == this._Fich_TOF.entete.nbBLOC ){
            let rech = this.recherche(cle,nomVar,div);

            for ( i = 0; i < rech.length; i++) {
                etapes[i] = rech[i];
            }

             if(r.i<=this._NbBlocMAX-1){  
               
                etapes[rech.length] = new Etape();
                etapes[rech.length].code = 
                "let bloc = document.createElement('div');"+
                'bloc.setAttribute("class", "blocTOF_conteneurVide");'+
                "$("+div+").empty();"+
                 nomVar +".conteneurTabBloc["+r.i+"].removeChild("+  nomVar +".conteneurTabBloc["+r.i+"].childNodes[1]);"+
                 nomVar +".conteneurTabBloc["+r.i+"].append(bloc);"+
                "$("+nomVar + ".conteneurTabBloc["+r.i+']).removeClass("animated fast shadow-drop-center2");'+
                "$("+nomVar + ".conteneurTabBloc["+r.i+']).removeClass("animated fast bounceIn");';
                etapes[rech.length].algorithme = ">>> Cle Introuvable "; 

              if(r.i<=this._Fich_TOF.entete.nbBLOC){  
                  i = etapes.length;
                  b = new BlocTOF();let x = cle
                  b.tab[0] = {
                                cle : x,
                                eff : false,
                              };
                  b.b = this._Fich_TOF.entete.nbEnrg;
                  b.nb = 1;
                  this._TabBloc[r.i] = new Grph_BlocTOF_MC(b);
         
                  etapes[i] = new Etape();
                  etapes[i].code = 
                       nomVar +".Tab_Rep_Bloc["+r.i+"] = new Grph_BlocTOF_MS();"+
                       nomVar +".conteneurTabBloc["+r.i+"].removeChild("+  nomVar +".conteneurTabBloc["+r.i+"].childNodes[1]);"+
                       nomVar +".conteneurTabBloc["+r.i+"].append("+ nomVar +".Tab_Rep_Bloc["+r.i+"].conteneur);"+
                       "$("+nomVar + ".conteneurTabBloc["+r.i+']).addClass("animated fast bounceIn");'+
                       "$("+div+").empty();"+
                       "$("+div+").append("+nomVar+".TabBloc["+r.i+"].conteneur);";
                  etapes[i].algorithme = ">>> Insertion nouveau Bloc ("+(r.i+1)+")";         
                }
            }
            else{
                let z = etapes.length;
                etapes[z] = new Etape();
                etapes[z].code = '';
                etapes[z].algorithme = '>> Insertion Impossible';
                return etapes;
            }
            
        }
        else{
            
         if(this._Fich_TOF.entete.nbBLOC === 2 )
          {
             i = 0;
            etapes[i] = new Etape();
            etapes[i].code =  nomVar + ".Tab_Rep_Bloc["+r.i+"].initAnimationBloc();"+
                              "$("+div+").empty();"; 
            i++; 
            etapes[i] = new Etape();
            etapes[i].code = 
                 nomVar + ".Tab_Rep_Bloc["+r.i+"].selectionBloc();"+
                 nomVar + ".TabBloc["+r.i+"] = new Grph_BlocTOF_MC("+nomVar+".Fich_TOF.fich["+r.i+"]);"+
                 "$("+div+").empty();"+
                 "$("+div+").append("+nomVar + ".TabBloc["+r.i+"].conteneur);";
            etapes[i].algorithme =  "Lecture >> Bloc "+(r.i+1);      
            i++;         
        }
        else{

            let inf = 0,inff = 0;
            let sup = this._Fich_TOF.entete.nbBLOC - 1,supp = this._Fich_TOF.entete.nbBLOC - 1;
            let index = Math.trunc((inf + sup ) / 2);
            let  prec ,proc ;

             if(indiceFin != index){
             if(cle < this._Fich_TOF.fich[index].tab[0].cle)  supp = index - 1;
              else {
               if(cle > this._Fich_TOF.fich[index].tab[this._Fich_TOF.fich[index].nb-1].cle)  inff = index + 1; 
               }                                        
              proc = Math.trunc((inff + supp ) / 2);}
              else proc = index - 1;
        // Remplissage de la table d'Etapes
          etapes[0] = new Etape();
                    etapes[0].code = 
                    nomVar + ".Tab_Rep_Bloc["+index+"].initAnimationBloc();";
          etapes[1] =  new Etape();
                    etapes[1].code = 
                    nomVar + ".Tab_Rep_Bloc["+index+"].selectionBloc();"+
                    nomVar + ".Tab_Rep_Bloc["+proc+"].initAnimationBloc();";
          etapes[1].algorithme = "Selection >> Bloc "+(index+1);                      

         prec = index;
           if(cle < this._Fich_TOF.fich[index].tab[0].cle)  sup = index - 1;
           else {
                  if(cle > this._Fich_TOF.fich[index].tab[this._Fich_TOF.fich[index].nb-1].cle)  inf = index + 1; 
                }  

           if(cle < this._Fich_TOF.fich[proc].tab[0].cle)  supp = proc - 1;
           else {
                   if(cle > this._Fich_TOF.fich[proc].tab[this._Fich_TOF.fich[proc].nb-1].cle)  inff = proc + 1; 
                }         

         i = 2;
    
        while( index != indiceFin){

           index  = Math.trunc((inf + sup ) / 2); 
           proc = Math.trunc((inff + supp ) / 2);
           etapes[i] = new Etape();
           if(index === proc || prec === proc)
           {
            etapes[i].code =
                    nomVar + ".Tab_Rep_Bloc["+prec+"].initAnimationBloc();"+
                    nomVar + ".Tab_Rep_Bloc["+index+"].selectionBloc();";
            etapes[i].algorithme = "Selection >> Bloc "+(index+1); 
                  
            if(r.i == this._Fich_TOF.entete.nbBLOC)  etapes[i].code = etapes[i].code +"$("+nomVar + ".conteneurTabBloc["+r.i+']).removeClass("animated fast shadow-drop-center2");';     
           }
           else
           {
               etapes[i].code =
                    nomVar + ".Tab_Rep_Bloc["+indiceFin+"].initAnimationBloc();"+
                    nomVar + ".Tab_Rep_Bloc["+prec+"].initAnimationBloc();"+
                    nomVar + ".Tab_Rep_Bloc["+index+"].selectionBloc();"+
                    nomVar + ".Tab_Rep_Bloc["+proc+"].initAnimationBloc();";
               etapes[i].algorithme = "Selection >> Bloc "+(index+1);    
           }
                     
                prec = index;
                if(cle < this._Fich_TOF.fich[index].tab[0].cle)  sup = index - 1;
           else {
                  if(cle > this._Fich_TOF.fich[index].tab[this._Fich_TOF.fich[index].nb-1].cle)  inf = index + 1; 
                }  

           if(cle < this._Fich_TOF.fich[proc].tab[0].cle)  supp = proc - 1;
           else {
                   if(cle > this._Fich_TOF.fich[proc].tab[this._Fich_TOF.fich[proc].nb-1].cle)  inff = proc + 1; 
                }   

                i++;   
           }


           etapes[i-1].code = etapes[i-1].code + "$("+div+").empty();";            
           etapes[i] = new Etape();
           etapes[i].code = 
                 nomVar+".TabBloc["+r.i+"] = new Grph_BlocTOF_MC("+nomVar+".Fich_TOF.fich["+r.i+"]);"+
                 "$("+div+").empty();"+
                 "$("+div+").append("+nomVar+".TabBloc["+r.i+"].conteneur);";
           etapes[i].algorithme =  "Lecture >> Bloc "+(r.i+1);                  
           i++;
        
          }     
             let Insert = this._TabBloc[r.i].insertion(cle,nomVar+".TabBloc["+r.i+"]");
             let etapesInsertBloc = Insert.etp;
              cleInsert[k3] = Insert.enreg;
       
              for (let j = 1; j < etapesInsertBloc.length; j++) {
                 etapes[i] = etapesInsertBloc[j];i++;
              } 
              if(cleInsert[k3] != '$') {

                etapes[i-2].code = etapes[i-2].code +  nomVar+".variableInsert["+k2+"] = false";

                 etapes[i-1].code = 
               "if(!"+nomVar+".variableInsert["+k2+"]){"+
                 nomVar+".TabBloc["+r.i+"].tabEnreg["+r.j+"] = new Grph_EnregTOF("+cle+",false);"+
                 nomVar+".TabBloc["+r.i+"].tabEnreg["+ r.j +"].ajout();"+
                 nomVar+".TabBloc["+r.i+"].conteneurTabEnreg["+r.j+"].append("+nomVar+".TabBloc["+r.i+"].tabEnreg["+r.j+"].conteneur);"+
                 nomVar+".variableInsert["+k2+"] = true;}else{"+


                 nomVar+".variableInsert["+(k2+1)+"] = false;}";k2++;

                   indiceFin++;

                  if(indiceFin < this._NbBlocMAX){ 
                   etapes[i] = new Etape();
                   etapes[i].code = 
                    "if(!"+nomVar+".variableInsert["+k2+"]){"+
                         nomVar + ".Tab_Rep_Bloc["+indiceFin+"].initAnimationBloc();"+
                         nomVar + ".Tab_Rep_Bloc["+(indiceFin-1)+"].selectionBloc();"+
                          nomVar+".variableInsert["+k2+"] = true;}else{"+


                         nomVar + ".Tab_Rep_Bloc["+(indiceFin-1)+"].selectionBloc();"+  
                         nomVar + ".Tab_Rep_Bloc["+indiceFin+"].initAnimationBloc();"+
                         "$("+div+").empty();"+
                         "$("+div+").append("+nomVar+".TabBloc["+r.i+"].conteneur);"+
                          nomVar+".variableInsert["+(k2+1)+"] = false;}";k2++;

                    i++;   k1++;        
                   etapes[i] = new Etape();
                   etapes[i].code =
                      nomVar + ".Tab_Rep_Bloc["+(indiceFin-1)+"].initAnimationBloc();"+  
                      nomVar + ".Tab_Rep_Bloc["+indiceFin+"].selectionBloc();"+
                      nomVar+".TabBloc["+indiceFin+"] = new Grph_BlocTOF_MC("+nomVar+".Fich_TOF.fich["+indiceFin+"]);"+
                      "$("+div+").empty();"+
                      "$("+div+").append("+nomVar+".TabBloc["+indiceFin+"].conteneur);";
                   etapes[i].algorithme =  "Lecture >> Bloc "+(indiceFin+1);

                   i++;
                  }
                    else{
                        let z = etapes.length;
                         etapes[z] = new Etape();
                         etapes[z].code = '';
                         etapes[z].algorithme = '>> Insertion Impossible';
                         return etapes;

                       }
               }

               while(cleInsert[k3] != '$' && indiceFin<this._Fich_TOF.entete.nbBLOC )
                {
                    Insert = this._TabBloc[indiceFin].insertion(cleInsert[k3],nomVar+".TabBloc["+indiceFin+"]");k3++;
                    etapesInsertBloc = Insert.etp;
                    cleInsert[k3] = Insert.enreg;
                    let debut =  etapesInsertBloc.length-(this._Fich_TOF.fich[indiceFin].nb+3);
                   for (let j = debut; j < etapesInsertBloc.length; j++) {
                      etapes[i] = etapesInsertBloc[j];i++;
                    } 

                if(cleInsert[k3] != '$') { 

                 etapes[i-2].code = etapes[i-2].code +  nomVar+".variableInsert["+k2+"] = false";  
        
                 etapes[i-1].code = 
                 "if(!"+nomVar+".variableInsert["+k2+"]){"+
                 nomVar+".TabBloc["+indiceFin+"].tabEnreg[0] = new Grph_EnregTOF("+cleInsert[k3-1]+",false);"+
                 nomVar+".TabBloc["+indiceFin+"].tabEnreg[0].ajout();"+
                 nomVar+".TabBloc["+indiceFin+"].conteneurTabEnreg[0].append("+nomVar+".TabBloc["+indiceFin+"].tabEnreg[0].conteneur);"+
                 nomVar+".variableInsert["+k2+"] = true;}else{"+

                 nomVar+".variableInsert["+(k2+1)+"] = false;}";k2++;

                   indiceFin++;
                  if(indiceFin<this._NbBlocMAX ){ 
                   etapes[i] = new Etape();
                   etapes[i].code = 
                    "if(!"+nomVar+".variableInsert["+k2+"]){"+
                         nomVar + ".Tab_Rep_Bloc["+indiceFin+"].initAnimationBloc();"+
                         nomVar + ".Tab_Rep_Bloc["+(indiceFin-1)+"].selectionBloc();"+
                         nomVar+".variableInsert["+k2+"] = true;}else{"+


                         nomVar + ".Tab_Rep_Bloc["+(indiceFin-1)+"].selectionBloc();"+  
                         nomVar + ".Tab_Rep_Bloc["+indiceFin+"].initAnimationBloc();"+
                         "$("+div+").empty();"+
                         "$("+div+").append("+nomVar+".TabBloc["+(indiceFin-1)+"].conteneur);"+
                          nomVar+".variableInsert["+(k2+1)+"] = false;}";k2++;

                    i++; k1++;
                     
                   etapes[i] = new Etape();
                   etapes[i].code =
                      nomVar + ".Tab_Rep_Bloc["+(indiceFin-1)+"].initAnimationBloc();"+  
                      nomVar + ".Tab_Rep_Bloc["+indiceFin+"].selectionBloc();"+
                      nomVar+".TabBloc["+indiceFin+"] = new Grph_BlocTOF_MC("+nomVar+".Fich_TOF.fich["+indiceFin+"]);"+
                      "$("+div+").empty();"+
                      "$("+div+").append("+nomVar+".TabBloc["+indiceFin+"].conteneur);";
                   etapes[i].algorithme =  "Lecture >> Bloc "+(indiceFin+1);   

                   i++; 
                }
                    else {
                            etapes[i] = new Etape();
                            etapes[i].code = nomVar+".variableInsert["+k2+"] = true;";
                            etapes[i].algorithme = "Err >> Pas d'Espace Mémoire";                 
                         }
               }
                }
                
                if(indiceFin >= this._Fich_TOF.entete.nbBLOC && indiceFin<this._NbBlocMAX){ 
                  
              
                  k2--;
                
                  etapes[i-3].code = etapes[i-3].code + 
                  "$("+nomVar + ".conteneurTabBloc["+indiceFin+']).removeClass("animated fast shadow-drop-center2");'+
                   nomVar + ".Tab_Rep_Bloc["+(indiceFin-1)+"].selectionBloc();";

                  etapes[i-2].code  =  

                  "$("+nomVar + ".conteneurTabBloc["+indiceFin+']).addClass("animated fast shadow-drop-center2");'+
                  nomVar + ".Tab_Rep_Bloc["+(indiceFin-1)+"].initAnimationBloc();"+              


                 "if("+nomVar+".variableInsert["+k2+"]){"+

                  "let bloc = document.createElement('div');"+
                  'bloc.setAttribute("class", "blocTOF_conteneurVide");'+
                  "$("+div+").empty();"+
                  nomVar +".conteneurTabBloc["+indiceFin+"].removeChild("+  nomVar +".conteneurTabBloc["+indiceFin+"].childNodes[1]);"+
                  nomVar +".conteneurTabBloc["+indiceFin+"].append(bloc);"+

                  nomVar + ".Tab_Rep_Bloc["+indiceFin+"].initAnimationBloc();"+
                  "$("+nomVar + ".conteneurTabBloc["+indiceFin+']).removeClass("animated fast bounceIn");'+ 

                  "$("+div+").empty();"+
                  "$("+div+").append("+nomVar+".TabBloc["+(indiceFin-1)+"].conteneur);"+
                  nomVar+".variableInsert["+(k2+1)+"] = false;}else{"+
                                          
                  nomVar+".variableInsert["+k2+"] = true;}";k2++;
    
                  b = new BlocTOF();
                  b.tab[0] = {
                                cle : cleInsert[k3],
                                eff : false,
                              };
                  b.b = this._Fich_TOF.entete.nbEnrg;
                  b.nb = 1;
                  this._TabBloc[indiceFin] = new Grph_BlocTOF_MC(b);
         

                  etapes[i-1].code = 
                  nomVar + ".Tab_Rep_Bloc["+(indiceFin-1)+"].initAnimationBloc();"+
                 "$("+nomVar + ".conteneurTabBloc["+indiceFin+']).removeClass("animated fast shadow-drop-center2");'+
               

                 nomVar +".Tab_Rep_Bloc["+indiceFin+"] = new Grph_BlocTOF_MS();"+
                 nomVar +".conteneurTabBloc["+indiceFin+"].removeChild("+  nomVar +".conteneurTabBloc["+indiceFin+"].childNodes[1]);"+
                 nomVar +".conteneurTabBloc["+indiceFin+"].append("+ nomVar +".Tab_Rep_Bloc["+indiceFin+"].conteneur);"+
                 "$("+nomVar + ".conteneurTabBloc["+indiceFin+']).addClass("animated fast bounceIn");'+
                 "$("+div+").empty();"+
                 "$("+div+").append("+nomVar+".TabBloc["+indiceFin+"].conteneur);"; 

                 etapes[i-1].algorithme = ">>> Insertion nouveau Bloc ("+(indiceFin+1)+")";
                }
        } 
    }
              return etapes;
    }

      
}
