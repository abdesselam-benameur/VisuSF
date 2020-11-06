class Grph_EnregFixeZD{

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
        this._conteneurValeur.setAttribute("class", "enregTOF_conteneurValeur");
        this._conteneurValeur.innerHTML = this._enregFixe;
        
        let conteneurDecor = document.createElement('div');
        conteneurDecor.setAttribute("class", "enregTOF_conteneurDecor");
        
        let rectDecor1 = document.createElement('div');
        rectDecor1.setAttribute("class", "enregTOF_rectDecor2");

        conteneurDecor.append(rectDecor1);

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

class Grph_Bloc_LnOFzd{

    // Attributs
    _bloc_LnOF;
    _nbEnregMax;
    _conteneur;
    _conteneurTabEnreg = [];
    _tabEnreg = [];
    _conteneurNb_Valeur;
    _conteneurSuiv_Valeur;


    // Constructeur
    constructor(bloc_LnOF, b, animation){
        
        this._bloc_LnOF = bloc_LnOF;
        this._nbEnregMax = b;

        this._conteneur = document.createElement('div');
        this._conteneur.setAttribute("class", "bloc_LnOF_conteneur");
        
        // Création du Conteneur du Tableau d'Enregistrements
        let conteneurTab = document.createElement('div');
        conteneurTab.setAttribute("class", "bloc_LnOF_conteneurTab"); 

        let conteneurTabText = document.createElement('p');
        conteneurTabText.setAttribute("class", "bloc_LnOF_conteneurTabText"); 
        conteneurTabText.innerHTML = 'Tab :';

        let conteneurListeEnreg = document.createElement('ul');
        conteneurListeEnreg.setAttribute("class", "bloc_LnOF_conteneurListeEnreg");

        for(let i = 0; i < b; i++){
            let conteneurEnreg = document.createElement('li');
            conteneurEnreg.setAttribute("class", "bloc_LnOF_conteneurEnreg");
            conteneurEnreg.style.margin = "0px calc(100% / "+b+" - 4.1vw) 0px 0px ";
            conteneurEnreg.innerHTML = (i+1 < 10) ? ("E::0" + (i+1)) : ("E::" + (i+1));
            conteneurEnreg.append(Grph_EnregFixeZD.conteneurVide());
            conteneurListeEnreg.append(conteneurEnreg);

            this._conteneurTabEnreg[i] = conteneurEnreg;
        }

        for(let i = 0; i < this._bloc_LnOF.nb; i++){
            
            let grphEnreg = new Grph_EnregFixeZD(this._bloc_LnOF.tabEnreg[i]);
            let conteneurEnreg = this._conteneurTabEnreg[i];      

            if(animation == false) conteneurEnreg.append(grphEnreg.conteneur);
            else {
                setTimeout(function(){
                grphEnreg.apparition();
                conteneurEnreg.append(grphEnreg.conteneur);
                }, i*125);
            }
            
            this._tabEnreg[i] = grphEnreg;
        }
        
        conteneurTab.append(conteneurTabText, conteneurListeEnreg);

        // Création du Conteneur de l'attribut 'nb'
        let conteneurNb = document.createElement('div');
        conteneurNb.setAttribute("class", "bloc_LnOF_conteneurNb");
        conteneurNb.innerHTML = "Nb : ";

        this._conteneurNb_Valeur = document.createElement('p');
        this._conteneurNb_Valeur.setAttribute("class", "bloc_LnOF_conteneurNb_Valeur");

        for(let i = 0; i <= this._bloc_LnOF.nb; i++){     
            if(animation == false) this._conteneurNb_Valeur.innerHTML = i;
            else{
                let x = this._conteneurNb_Valeur;
                setTimeout(function(){
                    x.innerHTML = i;
                }, i * 125);
            }
        }
        conteneurNb.append(this._conteneurNb_Valeur);

        // Création du Conteneur de l'attribut 'suiv'
        let conteneurSuiv = document.createElement('div');
        conteneurSuiv.setAttribute("class", "bloc_LnOF_conteneurSuiv");
        conteneurSuiv.innerHTML = "Suiv : ";

        this._conteneurSuiv_Valeur = document.createElement('p');
        this._conteneurSuiv_Valeur.setAttribute("class", "bloc_LnOF_conteneurSuiv_Valeur");

        if(this._bloc_LnOF.zd != -1) this._conteneurSuiv_Valeur.innerHTML = parseInt(this._bloc_LnOF.zd) + 1;
        else this._conteneurSuiv_Valeur.innerHTML = this._bloc_LnOF.zd;
        conteneurSuiv.append(this._conteneurSuiv_Valeur);
        
        this._conteneur.append(conteneurTab, conteneurNb, conteneurSuiv);

    }


    // Setters et Getters
     set bloc_LnOF(enregFixe){

        this._bloc_LnOF = bloc_LnOF;

    }

    get bloc_LnOF(){

        return this._bloc_LnOF;

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

    set conteneurTabEnreg(conteneurTabEnreg){

        this._conteneurTabEnreg = conteneurTabEnreg;

    }

    get conteneurTabEnreg(){

        return this._conteneurTabEnreg;

    }

    set tabEnreg(tabEnreg){

        this.tabEnreg = tabEnreg;

    }

    get tabEnreg(){

        return this._tabEnreg;

    }

    set conteneurNb_Valeur(conteneurNb_Valeur){
        this._conteneurNb_Valeur = conteneurNb_Valeur;
    }

    get conteneurNb_Valeur(){
        return this._conteneurNb_Valeur;
    }

    initNb(val){
        this._conteneurNb_Valeur.innerHTML = parseInt(val);
    }
     initSuiv(val){
        this._conteneurSuiv_Valeur.innerHTML = parseInt(val);
    }

    // Méthodes
    recherche(cle, nomVar){

        // Récupération du Résultat de la Recherche
        let indiceFin = this._bloc_LnOF.rechzd(cle).j;
        let nb = this._bloc_LnOF.nb;

        // Remplissage de la table d'Etapes
        let etapes = [];

        for(let i = 0; i < (indiceFin+nb)%nb; i++){
            etapes[i] = new Etape();
            etapes[i].code = nomVar + ".tabEnreg["+i+"].selection();";
            if(i > 0) etapes[i].code += nomVar + ".tabEnreg["+(i-1)+"].initAnimation();";
            etapes[i].code += nomVar + ".tabEnreg["+(i+1)+"].initAnimation();";

            etapes[i].algorithme = "Enreg :: " +(i+1)+" >> Non Trouvé";
        }
        
        etapes[(indiceFin+nb)%nb] = new Etape();
        if((indiceFin+nb)%nb > 0) {
            etapes[(indiceFin+nb)%nb].code = 
            nomVar + ".tabEnreg["+((indiceFin+nb)%nb-1)+"].initAnimation();"+
            nomVar + ".tabEnreg["+(indiceFin+nb)%nb+"].selection();";
        }
        else {
            etapes[(indiceFin+nb)%nb].code = nomVar + ".tabEnreg["+(indiceFin+nb)%nb+"].selection();";
        }

        if(indiceFin != -1){
            etapes[indiceFin+1] = new Etape();
            etapes[indiceFin+1].code = nomVar + ".tabEnreg["+(indiceFin)+"].validation();";

            etapes[indiceFin+1].algorithme = "Enreg :: " +(indiceFin+1)+" >> Succès";
        }
        else{
            etapes[nb] = new Etape();
            if(nb > 0) etapes[nb].code = nomVar + ".tabEnreg["+(nb-1)+"].initAnimation();";

            etapes[nb].algorithme = "Enreg :: " +nb+" >> Non Trouvé";
        }
        return etapes;
    }

    insertion(enregFixe, nomVar){

        // Récupération du Résultat de la Recherche
        let indiceFin = this._bloc_LnOF.rechzd(enregFixe).j;
        let nb = this._bloc_LnOF.nb;

        // Remplissage de la table d'Etapes
        let etapes = [];
        
        for(let i = 0; i < (indiceFin+nb)%nb; i++){
            etapes[i] = new Etape();
            etapes[i].code = nomVar + ".tabEnreg["+i+"].selection();";
            if(i > 0) etapes[i].code += nomVar + ".tabEnreg["+(i-1)+"].initAnimation();";
            etapes[i].code += nomVar + ".tabEnreg["+(i+1)+"].initAnimation();";

            let v = parseInt(i)+1
            etapes[i].algorithme = "Enreg :: "+v+" >> Non Trouvé";
        }
        
        etapes[(indiceFin+nb)%nb] = new Etape();
        if((indiceFin+nb)%nb > 0) {
            etapes[(indiceFin+nb)%nb].code = 
            nomVar + ".tabEnreg["+((indiceFin+nb)%nb-1)+"].initAnimation();"+
            nomVar + ".tabEnreg["+(indiceFin+nb)%nb+"].selection();";

            let u = parseInt(((indiceFin+nb)%nb))+1;
            etapes[(indiceFin+nb)%nb].algorithme = "Enreg :: "+u+" >> Non Trouvé";
        }
        else {
            etapes[(indiceFin+nb)%nb].code = nomVar + ".tabEnreg["+(indiceFin+nb)%nb+"].selection();";
        }

        etapes[(indiceFin+nb)%nb].code += 
            "if("+ nomVar + ".tabEnreg["+ nb +"] != null){"+
            "delete "+ nomVar + ".tabEnreg["+ nb +"];"+
            nomVar + ".initNb("+ nb +");"+
            nomVar + ".conteneurTabEnreg["+ nb +"].removeChild("+nomVar + ".conteneurTabEnreg["+ nb +"].childNodes[2]);}";

        if(indiceFin != -1){
            etapes[indiceFin+1] = new Etape();
            etapes[indiceFin+1].code = nomVar + ".tabEnreg["+(indiceFin)+"].validation();";
        }
        else{
            if(nb < this.nbEnregMax){
                if(nb == 0){
                    etapes[nb] = new Etape();
                    etapes[nb].code = 
                        "if("+ nomVar + ".tabEnreg["+ nb +"] != null){"+
                        "delete "+ nomVar + ".tabEnreg["+ nb +"];"+
                        nomVar + ".initNb("+ nb +");"+
                        nomVar + ".conteneurTabEnreg["+ nb +"].removeChild("+nomVar + ".conteneurTabEnreg["+ nb +"].childNodes[2]);}";

                    etapes[nb+1] = new Etape();
                    etapes[nb+1].code = 
                        nomVar + ".tabEnreg["+ nb +"] = new Grph_EnregFixeZD("+ enregFixe +");"+
                        nomVar + ".tabEnreg["+ nb +"].ajout();"+
                        nomVar + ".conteneurTabEnreg["+ nb +"].append("+nomVar+".tabEnreg["+ nb +"].conteneur);"+
                        nomVar + ".initNb("+ (nb+1) +");";
                    if(nb > 0) etapes[nb].code += nomVar + ".tabEnreg["+ (nb-1) +"].initAnimation();";
                }
                else{
                    etapes[nb] = new Etape();
                    etapes[nb].code = 
                        nomVar + ".tabEnreg["+ nb +"] = new Grph_EnregFixeZD("+ enregFixe +");"+
                        nomVar + ".tabEnreg["+ nb +"].ajout();"+
                        nomVar + ".conteneurTabEnreg["+ nb +"].append("+nomVar+".tabEnreg["+ nb +"].conteneur);"+
                        nomVar + ".initNb("+ (nb+1) +");";
                    if(nb > 0) etapes[nb].code += nomVar + ".tabEnreg["+ (nb-1) +"].initAnimation();";
                }    

                let k = parseInt(nb)+1;
                etapes[nb].algorithme = "Insertion >> Enreg :: "+k;     
            }
        }
        return etapes;
    }

    suppression(cle, nouvCle , nomVar){

        // Récupération du Résultat de la Recherche
        let indiceFin = this._bloc_LnOF.rechzd(cle).j;
        let nb = this._bloc_LnOF.nb;

        // Remplissage de la table d'Etapes
        let etapes = [];

        for(let i = 0; i < (indiceFin+nb)%nb; i++){
            etapes[i] = new Etape();
            etapes[i].code = nomVar + ".tabEnreg["+i+"].selection();";
            if(i > 0) etapes[i].code += nomVar + ".tabEnreg["+(i-1)+"].initAnimation();";
            etapes[i].code += 
                nomVar + ".tabEnreg["+(i+1)+"].initAnimation();";

            let v = parseInt(i)+1
            etapes[i].algorithme = "Enreg :: "+v+" >> Non Trouvé";
        }
        
        etapes[(indiceFin+nb)%nb] = new Etape();
        if((indiceFin+nb)%nb > 0) {
            etapes[(indiceFin+nb)%nb].code = 
            nomVar + ".tabEnreg["+((indiceFin+nb)%nb-1)+"].initAnimation();"+
            nomVar + ".tabEnreg["+(indiceFin+nb)%nb+"].selection();";
        }
        else {
            etapes[(indiceFin+nb)%nb].code = nomVar + ".tabEnreg["+(indiceFin+nb)%nb+"].selection();";
        }

     
        if(indiceFin != -1){
            etapes[indiceFin+1] = new Etape();
            etapes[indiceFin+1].code = 
                "if("+ nomVar + ".tabEnreg["+ (indiceFin) +"].enregFixe == " +nouvCle+"){"+
                "delete "+ nomVar + ".tabEnreg["+ (indiceFin) +"];"+
                nomVar + ".conteneurTabEnreg["+ (indiceFin) +"].removeChild("+nomVar + ".conteneurTabEnreg["+ (indiceFin) +"].childNodes[2]);"+
                nomVar + ".tabEnreg["+ (indiceFin) +"] = new Grph_EnregFixeZD("+cle+");"+
                nomVar + ".conteneurTabEnreg["+ (indiceFin) +"].append("+nomVar+".tabEnreg["+ (indiceFin) +"].conteneur);}"+
                nomVar + ".tabEnreg["+(indiceFin)+"].validation();";

            let y = parseInt(indiceFin)+1;
            etapes[indiceFin+1].algorithme = "Enreg :: "+y+" >> Succès";

            etapes[indiceFin+2] = new Etape();
            etapes[indiceFin+2].code = 
                nomVar + ".tabEnreg["+(indiceFin)+"].disparition();";

            etapes[indiceFin+2].algorithme = "Remplacement ...";  
                

            etapes[indiceFin+3] = new Etape();
            etapes[indiceFin+3].code = 
                "delete "+ nomVar + ".tabEnreg["+ (indiceFin) +"];"+
                nomVar + ".conteneurTabEnreg["+ (indiceFin) +"].removeChild("+nomVar + ".conteneurTabEnreg["+ (indiceFin) +"].childNodes[2]);"+
                nomVar + ".tabEnreg["+ (indiceFin) +"] = new Grph_EnregFixeZD("+ nouvCle +");"+
                nomVar + ".tabEnreg["+ (indiceFin) +"].ajout();"+
                nomVar + ".conteneurTabEnreg["+ (indiceFin) +"].append("+nomVar+".tabEnreg["+ (indiceFin) +"].conteneur);";

            etapes[indiceFin+3].algorithme = "-> Dernier Enreg de la Queue"; 
        }
        else{
            etapes[nb] = new Etape();
            if(nb > 0) etapes[nb].code = nomVar + ".tabEnreg["+(nb-1)+"].initAnimation();";
        }

        return etapes;
    }

}

class Grph_BlocTOFzd_MC
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
            conteneurEnreg.style.margin = "0px  calc(100% / "+this._nbEnregMax+" - 4.5vw) " + "0px " + "0px ";
            conteneurEnreg.innerHTML = (i+1 < 10) ? ("E::0" + (i+1)) : ("E::" + (i+1));
            conteneurEnreg.append(Grph_EnregTOF.conteneurVide());
            conteneurListeEnreg.append(conteneurEnreg);

            this._conteneurTabEnreg[i] = conteneurEnreg;
        }


         for(let i = 0; i < this._bloc_TOF.nb; i++){
          
            let grphEnreg = new Grph_EnregTOF(this._bloc_TOF.tabEnreg[i].cle,this._bloc_TOF.tabEnreg[i].eff);

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
        conteneurNb.setAttribute("class", "bloc_LnOF_conteneurNb");
        conteneurNb.innerHTML = "Nb : ";

        let conteneurNb_Valeur = document.createElement('p');
        conteneurNb_Valeur.setAttribute("class", "bloc_LnOF_conteneurNb_Valeur");

      
        for(let i = 0; i <= this._bloc_TOF.nb; i++){     
            setTimeout(function(){
                conteneurNb_Valeur.innerHTML = i;
            }, i * 125);
            

        }
        conteneurNb.append(conteneurNb_Valeur);

        // Création du Conteneur de l'attribut 'ZD'
        let conteneurZD = document.createElement('div');
        conteneurZD.setAttribute("class", "bloc_LnOF_conteneurSuiv");
        conteneurZD.innerHTML = "ZD : "; 

        let conteneurZD_Valeur = document.createElement('p');
        conteneurZD_Valeur.setAttribute("class", "bloc_LnOF_conteneurSuiv_Valeur");
        conteneurZD_Valeur.innerHTML = (this._bloc_TOF.zd == -1) ? -1 : (parseInt(this._bloc_TOF.zd)+1);
        conteneurZD.append(conteneurZD_Valeur);

        this._conteneur.append(conteneurTab, conteneurNb,conteneurZD);
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
        if(cle < this._bloc_TOF.tabEnreg[index].cle)  supp = index - 1;
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
         if(cle < this._bloc_TOF.tabEnreg[index].cle)  sup = index - 1;
         else                                     inf = index + 1; 

         if(cle < this._bloc_TOF.tabEnreg[proc].cle)  supp = proc - 1;
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
                if(cle < this._bloc_TOF.tabEnreg[index].cle)  sup = index - 1;
                else                                     inf = index + 1; 

                if(cle < this._bloc_TOF.tabEnreg[proc].cle)  supp = proc - 1;
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
        etapes[i].algorithme = "~> Suppression logique de Enreg "+(r.j+1);

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
            if(this._bloc_TOF.tabEnreg[r.j].eff)
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

                    let enregr = this._bloc_TOF.tabEnreg[this._bloc_TOF.nb-1];
                    if(!enregr.eff)   enregsortant = enregr.cle;
                    else              enregsortant =  '$';
                    
                    indiceDebut = this._bloc_TOF.nb-1;
                     
                   etapes[i].code =
                   "if(!"+nomVar+".tableInsert["+k+"]){"+
                   nomVar + ".tabEnreg["+r.j+"].initAnimation();"+
                   nomVar+".tableInsert["+k+"] = true;}else{"+
                   
           
                   nomVar + ".tabEnreg["+indiceDebut+"] = new Grph_EnregTOF("+nomVar+".bloc_TOF.tabEnreg["+indiceDebut+"].cle,"+nomVar+".bloc_TOF.tabEnreg["+indiceDebut+"].eff);"+
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

class Grph_BlocTOFzd_MS{
    _conteneur;
    _rectDecor1;
    _rectDecor2;
    _rectDecor3;

      constructor(){

        this._conteneur = document.createElement('div');
        this._conteneur.setAttribute("class", "Grph_BlocTOF");

        this._rectDecor1 = document.createElement('div');
        this._rectDecor1.setAttribute("class", "Grph_BlocTOF_rectDecor1");

        this._rectDecor2 = document.createElement('div');
        this._rectDecor2.setAttribute("class", "Grph_BlocTOF_rectDecor2");

        this._rectDecor3 = document.createElement('div');
        this._rectDecor3.setAttribute("class", "Grph_BlocTOF_rectDecor2");

        this._conteneur.append(this._rectDecor1,this._rectDecor2,this._rectDecor3); 

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
      set rectDecor3(rectDecor3){

        this._crectDecor3 = rectDecor3;

      }

      get rectDecor3(){

        return this._rectDecor3;

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

class Grph_Fich_TOFzd
{
     // Attributs
    _NbBlocMAX;
    _conteneur;
    _Fich_TOF;
    _conteneurTabBloc = [];
    _TabBloc = [];
    _Tab_Rep_Bloc = [];
    _variableInsert = [];
    constructor(fich_TOFzd,nbBlocMAX)
    {

        this._NbBlocMAX = nbBlocMAX;
        this._Fich_TOF = fich_TOFzd;

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
            conteneurBloc.style.margin = "0px " +" calc(100% / 10 - 6.22vw) "+ "px " + "0px " + "0px ";
            conteneurBloc.innerHTML = (i+1 < 10) ? (" Bloc 0" + (i+1)) : (" Bloc " + (i+1));
            this._TabBloc[i] = new Grph_BlocTOFzd_MC(this._Fich_TOF.fich[i]); 
            let grphBloc = new Grph_BlocTOFzd_MS(); 
            this._Tab_Rep_Bloc[i] = grphBloc;
            conteneurBloc.append(grphBloc.conteneur);
            conteneurListeBloc.append(conteneurBloc);
            this._conteneurTabBloc[i] = conteneurBloc;
        }
        for(let i = nbBlocMAX; i < 10; i++){
            let conteneurBloc = document.createElement('li');
            conteneurBloc.setAttribute("class", "fichier_LnOF_conteneurBloc");
            conteneurBloc.style.margin = "0px " +" calc(100% / 10 - 6.22vw) "+ "px " + "0px " + "0px ";
            conteneurBloc.innerHTML = (i+1 < 10) ? ("ZD 0" + (i+1) + "") : ("ZD " + (i+1) + "");
            
            let conteneurBlocVide = document.createElement('div');
            conteneurBlocVide.setAttribute("class", "fichier_LnOF_conteneurBlocVide");
            conteneurBloc.append(conteneurBlocVide);
            conteneurListeBloc.append(conteneurBloc);
            this._conteneurTabBloc[i] = conteneurBloc;
           
        }

        for(let i = nbBlocMAX; i < this.Fich_TOF.entete.numZD-1; i++){
            let conteneurBlocPlein = document.createElement('div');
            conteneurBlocPlein.setAttribute("class", "fichier_LnOF_conteneurBlocPlein");

            let blocPlein_GrandRect = document.createElement('div');
            blocPlein_GrandRect.setAttribute("class", "fichier_LnOF_conteneurBlocPlein_grandRect");
            let blocPlein_PetitRect1 = document.createElement('div');
            blocPlein_PetitRect1.setAttribute("class", "fichier_LnOF_conteneurBlocPlein_petitRect1");
            let blocPlein_PetitRect2 = document.createElement('div');
            blocPlein_PetitRect2.setAttribute("class", "fichier_LnOF_conteneurBlocPlein_petitRect2");

            conteneurBlocPlein.append(blocPlein_GrandRect, blocPlein_PetitRect1, blocPlein_PetitRect2);
            this._conteneurTabBloc[i].removeChild(this._conteneurTabBloc[i].childNodes[1]);
            this._conteneurTabBloc[i].append(conteneurBlocPlein);
        }
      
        this._conteneur.append(conteneurListeBloc);

    
}


    //les setters et les getters

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
       rechercher(cle,nomVar,blocResultat,div){ // nous sert dans l'insertion evite la répétition de la recherche dans le
        div = '"'+div+'"';

        // Récupération du Résultat de la Recherche
        let r = this._Fich_TOF.rech(cle);
        let indiceFin = r.i;

        let inf = 0,inff = 0;

        let sup = this._Fich_TOF.entete.nbBLOC - 1,supp = this._Fich_TOF.entete.nbBLOC - 1;

        let index = Math.trunc((inf + sup ) / 2);
        let  prec ,proc ;
        if(indiceFin != index){
           if(cle < this._Fich_TOF.fich[index].tabEnreg[0].cle)  supp = index - 1;
           else {
               if(cle > this._Fich_TOF.fich[index].tabEnreg[this._Fich_TOF.fich[index].nb-1].cle)  inff = index + 1; 
               }                                        
            proc = Math.trunc((inff + supp ) / 2);}
           else proc = index - 1;

        // Remplissage de la table d'Etapes
        let etapes = [];
         etapes[0] = new Etape();
                    etapes[0].code = 
                    nomVar + ".Tab_Rep_Bloc["+index+"].initAnimationBloc();";
          etapes[1] =  new Etape();
                    etapes[1].code = 
                    nomVar + ".Tab_Rep_Bloc["+index+"].selectionBloc();"+
                    nomVar + ".Tab_Rep_Bloc["+proc+"].initAnimationBloc();"; 
          etapes[1].algorithme = "Selection >> Bloc "+(index+1);   

         prec = index;
           if(cle < this._Fich_TOF.fich[index].tabEnreg[0].cle)  sup = index - 1;
           else {
                  if(cle > this._Fich_TOF.fich[index].tabEnreg[this._Fich_TOF.fich[index].nb-1].cle)  inf = index + 1; 
                }  

           if(cle < this._Fich_TOF.fich[proc].tabEnreg[0].cle)  supp = proc - 1;
           else {
                   if(cle > this._Fich_TOF.fich[proc].tabEnreg[this._Fich_TOF.fich[proc].nb-1].cle)  inff = proc + 1; 
                }         

        let i = 2;
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
                if(cle < this._Fich_TOF.fich[index].tabEnreg[0].cle)  sup = index - 1;
           else {
                  if(cle > this._Fich_TOF.fich[index].tabEnreg[this._Fich_TOF.fich[index].nb-1].cle)  inf = index + 1; 
                }  

           if(cle < this._Fich_TOF.fich[proc].tabEnreg[0].cle)  supp = proc - 1;
           else {
                   if(cle > this._Fich_TOF.fich[proc].tabEnreg[this._Fich_TOF.fich[proc].nb-1].cle)  inff = proc + 1; 
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
                 blocResultat+"= new Grph_BlocTOFzd_MC("+nomVar+".Fich_TOF.fich["+indiceFin+"]);"+
                 "$("+div+").empty();"+
                 "$("+div+").append("+blocResultat+".conteneur);";
                etapes[i].algorithme =  "Lecture >> Bloc "+(indiceFin+1);  
                 
               i++;

             let etapesrechBloc = this._TabBloc[r.i].recherche(cle,blocResultat);

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
      
       if(!r.trouve ){
         etapes[i-1].code = etapes[i-1].code+
                nomVar + ".Tab_Rep_Bloc["+prec+"].initAnimationBloc();"+
                nomVar + ".Tab_Rep_Bloc["+indiceFin+"].nonvalidationBloc();";
       }

        
    }
   return etapes;
    }

    recherche(cle,nomVar,blocResultat,div){
        div = '"'+div+'"';
        let etapes = [];
        // Récupération du Résultat de la Recherche
        let r = this._Fich_TOF.rech(cle);
        if (r!=-1){
        let indiceFin = r.i;

        let inf = 0,inff = 0;

        let sup = this._Fich_TOF.entete.nbBLOC - 1,supp = this._Fich_TOF.entete.nbBLOC - 1;

        let index = Math.trunc((inf + sup ) / 2);
        let  prec ,proc ;
        if(indiceFin != index){
           if(cle < this._Fich_TOF.fich[index].tabEnreg[0].cle)  supp = index - 1;
           else {
               if(cle > this._Fich_TOF.fich[index].tabEnreg[this._Fich_TOF.fich[index].nb-1].cle)  inff = index + 1; 
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
           if(cle < this._Fich_TOF.fich[index].tabEnreg[0].cle)  sup = index - 1;
           else {
                  if(cle > this._Fich_TOF.fich[index].tabEnreg[this._Fich_TOF.fich[index].nb-1].cle)  inf = index + 1; 
                }  

           if(cle < this._Fich_TOF.fich[proc].tabEnreg[0].cle)  supp = proc - 1;
           else {
                   if(cle > this._Fich_TOF.fich[proc].tabEnreg[this._Fich_TOF.fich[proc].nb-1].cle)  inff = proc + 1; 
                }         

        let i = 2;
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
                if(cle < this._Fich_TOF.fich[index].tabEnreg[0].cle)  sup = index - 1;
           else {
                  if(cle > this._Fich_TOF.fich[index].tabEnreg[this._Fich_TOF.fich[index].nb-1].cle)  inf = index + 1; 
                }  

           if(cle < this._Fich_TOF.fich[proc].tabEnreg[0].cle)  supp = proc - 1;
           else {
                   if(cle > this._Fich_TOF.fich[proc].tabEnreg[this._Fich_TOF.fich[proc].nb-1].cle)  inff = proc + 1; 
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
                 blocResultat+"= new Grph_BlocTOFzd_MC("+nomVar+".Fich_TOF.fich["+indiceFin+"]);"+
                 "$("+div+").empty();"+
                 "$("+div+").append("+blocResultat+".conteneur);";
            etapes[i].algorithme =  "Lecture >> Bloc "+(indiceFin+1);    
                 
               i++;

             let etapesrechBloc = this._TabBloc[r.i].recherche(cle,blocResultat);

             for (let j = 1; j < etapesrechBloc.length; j++) {
                 etapes[i] = etapesrechBloc[j];i++;
              } 


              etapes[i-2].code = etapes[i-2].code +
                                 nomVar + ".Tab_Rep_Bloc["+r.i+"].initAnimationBloc();"+
                                  nomVar + ".Tab_Rep_Bloc["+indiceFin+"].selectionBloc();";

         
        if(r.trouv && (!r.z))
        {
                etapes[i-1].code = etapes[i-1].code+
                nomVar + ".Tab_Rep_Bloc["+prec+"].initAnimationBloc();"+
                nomVar + ".Tab_Rep_Bloc["+indiceFin+"].validationBloc();";
       }
        if(r.z){
               etapes[i-1].code = etapes[i-1].code+
                nomVar + ".Tab_Rep_Bloc["+prec+"].initAnimationBloc();"+
                nomVar + ".Tab_Rep_Bloc["+indiceFin+"].nonvalidationBloc();";
                let k=i;
                    let indiceFinn = [];
                    indiceFinn[0]=r.nbl; 
                    indiceFinn[1]=r.nbe;
                    let nbIter = 0;
                    let t = this._Fich_TOF.fich[r.i].zd;
                        let x=(!r.trouv) ? -1 : indiceFinn[0];
                         while(t != x) {
                                     nbIter++;
                                     t = this._Fich_TOF.fich[t].zd;
                                } if (x== indiceFinn[0]) nbIter++;
                             
        let j = this._Fich_TOF.fich[r.i].zd;
        let precc = -1;
        etapes[k-1].code+= nomVar + ".initAnimation("+ j +");";
        for(let i = 0; i < nbIter; i++){

            let blocResultatt="#structuresSimples-TOFzd-MC_Contenu"; 
            etapes[k] = new Etape();
            etapes[k].code = nomVar + ".selection("+ j +");" + "$('"+ blocResultatt +"').empty();";
            if(precc != -1) etapes[k].code += nomVar + ".initAnimation("+ precc +");";
            etapes[k].algorithme = "Selection >> Bloc "+(j+1);  
            k++;
            
            etapes[k] = new Etape();
            etapes[k].code = 
                "let blocc = new Grph_Bloc_LnOFzd("+ nomVar +"._Fich_TOF.fich["+ j +"], "+ nomVar +"._Fich_TOF.entete.nbEnrg, true);"+
                "$('"+ blocResultatt +"').empty();"+
                "$('"+ blocResultatt +"').append(blocc.conteneur);";
            etapes[k].algorithme = "Lecture >> Bloc "+(j+1);  
            k++;
 
            let blc = new Grph_Bloc_LnOFzd(this._Fich_TOF.fich[j], this._Fich_TOF.entete.nbEnrg,false);
            let tab = blc.recherche(cle, "blocc");
            for(let z = 0; z < tab.length; z++){
                etapes[k] = new Etape();
                etapes[k].code = nomVar + ".selection("+ j +");";
                let suiv = this._Fich_TOF.fich[j].zd;
                if(suiv != -1) etapes[k].code += nomVar + ".initAnimation("+ suiv +");";

                etapes[k].code += 
                    "let blocc = new Grph_Bloc_LnOFzd("+ nomVar +"._Fich_TOF.fich["+ j +"], "+ nomVar +"._Fich_TOF.entete.nbEnrg, false);"+
                    "$('"+ blocResultatt +"').empty();"+
                    "$('"+ blocResultatt +"').append(blocc.conteneur);";
                
                etapes[k].code += tab[z].code;
                etapes[k].algorithme += tab[z].algorithme;
                k++;
            }

            precc = j;
            j = this._Fich_TOF.fich[j].zd;
        }
            
        if((precc != -1)&&(indiceFinn == -1)){
            etapes[k] = new Etape();
            etapes[k].code = nomVar + ".initAnimation("+ precc +");";
        }

        return etapes;     
                     
                

        }

      
       if(!r.trouve && (!r.z)){
         etapes[i-1].code = etapes[i-1].code+
                nomVar + ".Tab_Rep_Bloc["+prec+"].initAnimationBloc();"+
                nomVar + ".Tab_Rep_Bloc["+indiceFin+"].nonvalidationBloc();";
       }

        
    }
    }
   return etapes;
    }

    suppression(cle,nomVar,blocResultat,div){

           div = '"'+div+'"';
           let etapes = [];
           let i;let k = 0;
        // Récupération du Résultat de la Recherche
        let r = this._Fich_TOF.rech(cle);
        if(!r.trouv) {
            etapes[0] = new Etape();
           etapes[0].code =  "";
           etapes[0].algorithme = "Echec >> Clé Introuvable";
            return etapes;
           }
        if(r.i==this._Fich_TOF.entete.nbBLOC) 
        {
            let rech = this.recherche(cle,nomVar,blocResultat,div);
            for ( i = 0; i < rech.length; i++) {
                etapes[i] =rech[i];
            }
            
            etapes[rech.length] = new Etape();
            etapes[rech.length].code = 
            "$("+nomVar + ".conteneurTabBloc["+r.i+']).removeClass("animated fast shadow-drop-center2");';
            etapes[0].algorithme = "Rech. Dichitomique dans MS";

        }
        else{
        let indiceFin = r.i;

        let inf = 0,inff = 0;
        let sup = this._Fich_TOF.entete.nbBLOC - 1,supp = this._Fich_TOF.entete.nbBLOC - 1;
        let index = Math.trunc((inf + sup ) / 2);
        let  prec ,proc ;
        if(indiceFin != index){
           if(cle < this._Fich_TOF.fich[index].tabEnreg[0].cle)  supp = index - 1;
           else {
               if(cle > this._Fich_TOF.fich[index].tabEnreg[this._Fich_TOF.fich[index].nb-1].cle)  inff = index + 1; 
               }                                        
            proc = Math.trunc((inff + supp ) / 2);}
           else proc = index - 1;

        // Remplissage de la table d'Etapes
         etapes[0] = new Etape();
                    etapes[0].code = 
                    nomVar + ".Tab_Rep_Bloc["+index+"].initAnimationBloc();";   
            etapes[0].algorithme = "Rech. Dichitomique dans MS";
          etapes[1] =  new Etape();
                    etapes[1].code = 
                    nomVar + ".Tab_Rep_Bloc["+index+"].selectionBloc();"+
                    nomVar + ".Tab_Rep_Bloc["+proc+"].initAnimationBloc();"; 
        etapes[1].algorithme = "Selection >> Bloc "+(index+1); 

         prec = index;
           if(cle < this._Fich_TOF.fich[index].tabEnreg[0].cle)  sup = index - 1;
           else {
                  if(cle > this._Fich_TOF.fich[index].tabEnreg[this._Fich_TOF.fich[index].nb-1].cle)  inf = index + 1; 
                }  

           if(cle < this._Fich_TOF.fich[proc].tabEnreg[0].cle)  supp = proc - 1;
           else {
                   if(cle > this._Fich_TOF.fich[proc].tabEnreg[this._Fich_TOF.fich[proc].nb-1].cle)  inff = proc + 1; 
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
                if(cle < this._Fich_TOF.fich[index].tabEnreg[0].cle)  sup = index - 1;
           else {
                  if(cle > this._Fich_TOF.fich[index].tabEnreg[this._Fich_TOF.fich[index].nb-1].cle)  inf = index + 1; 
                }  

           if(cle < this._Fich_TOF.fich[proc].tabEnreg[0].cle)  supp = proc - 1;
           else {
                   if(cle > this._Fich_TOF.fich[proc].tabEnreg[this._Fich_TOF.fich[proc].nb-1].cle)  inff = proc + 1; 
                }   

                i++;   
        }
             etapes[i-1].code = etapes[i-1].code + "$("+div+").empty();";            
             etapes[i] = new Etape();
             etapes[i].code = 
                 blocResultat+"= new Grph_BlocTOFzd_MC("+nomVar+".Fich_TOF.fich["+indiceFin+"]);"+
                 "$("+div+").empty();"+
                 "$("+div+").append("+blocResultat+".conteneur);";
             etapes[i].algorithme =  "Lecture >> Bloc "+(indiceFin+1);  
                 
               i++;
                
             let etapesrechBloc = this._TabBloc[r.i].suppression(cle,blocResultat);

             for (let j = 1; j < etapesrechBloc.length; j++) {
                 etapes[i] = etapesrechBloc[j];i++;
              } 

              etapes[i-1].code = etapes[i-1].code +  nomVar + ".Tab_Rep_Bloc["+r.i+"].initAnimationBloc();";
             
             if(r.trouv && (!r.z))
             {                  
                etapes[i-4].code = etapes[i-4].code +
                                   nomVar + ".Tab_Rep_Bloc["+r.i+"].initAnimationBloc();"+
                                   nomVar + ".Tab_Rep_Bloc["+r.i+"].selectionBloc();";  
                etapes[i-4].algorithme = "Selection >> Bloc "+(r.i+1); 

                etapes[i-3].code = etapes[i-3].code +
                nomVar + ".Tab_Rep_Bloc["+prec+"].initAnimationBloc();"+
                nomVar + ".Tab_Rep_Bloc["+indiceFin+"].validationBloc();";
           }

            
          if (r.z && r.trouv){

                etapes[i-3].code = etapes[i-3].code +
                                   nomVar + ".Tab_Rep_Bloc["+r.i+"].initAnimationBloc();"+
                                   nomVar + ".Tab_Rep_Bloc["+r.i+"].selectionBloc();"; 
                etapes[i-3].algorithme = "Selection >> Bloc "+(r.i+1); 

                etapes[i-2].code = etapes[i-2].code +
                nomVar + ".Tab_Rep_Bloc["+prec+"].initAnimationBloc();"+
                nomVar + ".Tab_Rep_Bloc["+indiceFin+"].nonvalidationBloc();";

        // Récupération du Résultat de la Recherche ZD
        let indiceFinn= [];
         indiceFinn[0] = r.nbl;
         indiceFinn[1]=r.nbe;  let t = this._Fich_TOF.fich[r.i].zd;
        let blocResultatt="#structuresSimples-TOFzd-MC_Contenu";          
        
        
        if(indiceFinn != -1) {

            let nbIter = 0;
            let t = this._Fich_TOF.fich[r.i].zd;
            while(t != indiceFinn[0]) {
                nbIter++;
                t =this._Fich_TOF.fich[t].zd;
            }
            nbIter++;

            let j =this._Fich_TOF.fich[r.i].zd;
            let precc = -1;
            let k = i;
            etapes[k-1].code+=nomVar + ".initAnimation("+ j +");";
            for(let i = 0; i < nbIter; i++){
                
                etapes[k] = new Etape();
                etapes[k].code = nomVar + ".selection("+ j +");" + "$('"+ blocResultatt +"').empty();";
                etapes[k].algorithme = "Selection >> Bloc "+(j+1); 
                if(precc != -1) etapes[k].code += nomVar + ".initAnimation("+ precc +");";
                let suiv =  this._Fich_TOF.fich[j].zd;
                if(suiv != -1) etapes[k].code += nomVar + ".initAnimation("+ suiv +");";
                k++;
                
                precc = j;
                j = this._Fich_TOF.fich[j].zd;
            }
            
            j = precc;

            // Récupération du dernier Enreg du dernier Bloc
            let dernBloc = this._Fich_TOF.fich[r.i].zd;
            let dernBlocNb = this._Fich_TOF.fich[this._Fich_TOF.fich[r.i].zd].nb;
            let dernEnreg = this._Fich_TOF.fich[this._Fich_TOF.fich[r.i].zd].tabEnreg[this._Fich_TOF.fich[this._Fich_TOF.fich[r.i].zd].nb-1];

            etapes[k] = new Etape();
            etapes[k].code = 
                "let blocc = new Grph_Bloc_LnOFzd("+ nomVar +"._Fich_TOF.fich["+ j +"], "+ nomVar +"._Fich_TOF.entete.nbEnrg, true);"+
                "$('"+ blocResultatt +"').empty();"+
                "$('"+ blocResultatt +"').append(blocc.conteneur);";
            etapes[k].code += 
                "let conteneurBlocPlein = document.createElement('div');"+
                "conteneurBlocPlein.setAttribute('class', 'fichier_LnOF_conteneurBlocPlein');"+
                "let blocPlein_GrandRect = document.createElement('div');"+
                "blocPlein_GrandRect.setAttribute('class', 'fichier_LnOF_conteneurBlocPlein_grandRect');"+
                "let blocPlein_PetitRect1 = document.createElement('div');"+
                'blocPlein_PetitRect1.setAttribute("class", "fichier_LnOF_conteneurBlocPlein_petitRect1");'+
                "let blocPlein_PetitRect2 = document.createElement('div');"+
                'blocPlein_PetitRect2.setAttribute("class", "fichier_LnOF_conteneurBlocPlein_petitRect2");'+
                "conteneurBlocPlein.append(blocPlein_GrandRect, blocPlein_PetitRect1, blocPlein_PetitRect2);"+
                nomVar + ".conteneurTabBloc["+ j +"].removeChild("+nomVar+".conteneurTabBloc["+ j +"].childNodes[1]);"+
                nomVar + ".conteneurTabBloc["+ j +"].append(conteneurBlocPlein);"+
                nomVar + ".selection("+ j +");";

            let f = parseInt(j)+1;
            etapes[k].algorithme = "Lecture >> Bloc " + f; 
            k++;

            if(dernEnreg != cle){
                let blc = new Grph_Bloc_LnOFzd(this._Fich_TOF.fich[j], this._Fich_TOF.entete.nbEnrg,false);
                let tab = blc.suppression(cle, dernEnreg, "blocc");
                for(let z = 0; z < tab.length; z++){
                    etapes[k] = new Etape();
                    etapes[k].code = nomVar + ".selection("+ j +");";
                    let suiv = this._Fich_TOF.fich[j].zd;
                    if(suiv != -1) etapes[k].code += nomVar + ".initAnimation("+ suiv +");";

                    etapes[k].code += 
                    "let blocc = new Grph_Bloc_LnOFzd("+ nomVar +"._Fich_TOF.fich["+ j +"], "+ nomVar +"._Fich_TOF.entete.nbEnrg, false);"+
                    "$('"+ blocResultatt +"').empty();"+
                    "$('"+ blocResultatt +"').append(blocc.conteneur);";
                    if(j == dernBloc) etapes[k].code += 
                                            "blocc.tabEnreg["+(dernBlocNb-1)+"].suppression();"+
                                            "blocc.initNb("+ (dernBlocNb-1) +");";
                    etapes[k].code += tab[z].code;
                    etapes[k].algorithme += tab[z].algorithme;
                    k++;
                }
            }
            else{
                etapes[k] = new Etape();
                etapes[k].code = 
                         "let blocc = new Grph_Bloc_LnOFzd("+ nomVar +"._Fich_TOF.fich["+ j +"], "+ nomVar +"._Fich_TOF.entete.nbEnrg, false);"+
                         "$('"+ blocResultatt +"').empty();"+
                         "$('"+ blocResultatt +"').append(blocc.conteneur);";
                if(j == dernBloc) {
                    etapes[k].code += 
                                        "blocc.tabEnreg["+(dernBlocNb-1)+"].suppression();"+
                                        "blocc.initNb("+ (dernBlocNb-1) +");";
                    etapes[k].algorithme = "Suppression :: Dernier Enreg";
                }

                k++;
            }
        }
        
            
        return etapes;

           }
        }

        
              return etapes;
    }


   insertion(cle,nomVar,blocResultat,div){
        
        let etapes = [];
        let i;let cleInsert = [];
        // Récupération du Résultat de la Recherche
        let r = this._Fich_TOF.rech(cle);
        if(cle>this.Fich_TOF.fich[this.Fich_TOF.entete.nbBLOC-1].tabEnreg[this.Fich_TOF.fich[this.Fich_TOF.entete.nbBLOC-1].nb-1].cle){
            alert("Insérer une cle Inf ou Egale à "+this.Fich_TOF.fich[this.Fich_TOF.entete.nbBLOC-1].tabEnreg[this.Fich_TOF.fich[this.Fich_TOF.entete.nbBLOC-1].nb-1].cle);
            etapes[0] = new Etape();
            etapes[0].code =  "";
            etapes[0].algorithme = ">> Erreur";
            return etapes;
        }

        let indiceFin = r.i;
        if (r.trouv) {
            etapes[0] = new Etape();
            etapes[0].code =  "";
            etapes[0].algorithme = "Echec >> La Clé Existe";
            return etapes;
        }
        else {
                etapes=etapes.concat(this.rechercher(cle,nomVar,blocResultat,div));
                i=etapes.length;
                div = '"'+div+'"';
                let Insert = this._TabBloc[r.i].insertion(cle,blocResultat);
                cleInsert = Insert.enreg;

           if(!r.z && cleInsert=='$'){

            etapes[i-1].code +=  "$("+div+").empty();";            
            etapes[i] = new Etape();
            etapes[i].code = 
                 blocResultat+"= new Grph_BlocTOFzd_MC("+nomVar+".Fich_TOF.fich["+indiceFin+"]);"+
                 "$("+div+").empty();"+
                 "$("+div+").append("+blocResultat+".conteneur);";  
            etapes[i].algorithme = "Lecture >> Bloc "+(indiceFin+1);         
               i++;
             let etapesInsertBloc = Insert.etp;
            
       
              for (let j = 1; j < etapesInsertBloc.length; j++) {
                 etapes[i-3] = etapesInsertBloc[j];i++;
              } 
          }
          if(!r.z && cleInsert!='$'){
             let blocResultatt="#structuresSimples-TOFzd-MC_Contenu";
             let k=i;
             let blc = new Grph_Bloc_LnOFzd(new BlocTOFzd(), this._Fich_TOF.entete.nbEnrg,false);
                if(this._Fich_TOF.entete.numZD == 11) {
                    etapes[k] = new Etape();
                    etapes[k].code =  "";
                    etapes[k].algorithme = "Err >> Pas d'Espace Mémoire";
                    
                    return etapes;
                }
                else {
                   let j = this._Fich_TOF.entete.numZD-1;
                    etapes[k] = new Etape();
                    etapes[k].code =
                        "let conteneurBlocVide = document.createElement('div');"+
                        "conteneurBlocVide.setAttribute('class', 'fichier_LnOF_conteneurBlocVide');"+
                        nomVar + "._conteneurTabBloc["+ j +"].removeChild("+nomVar+"._conteneurTabBloc["+ j +"].childNodes[1]);"+
                        nomVar + "._conteneurTabBloc["+ j +"].append(conteneurBlocVide);"+
                        "$('"+ blocResultatt +"').empty();"+
                        "$('"+ blocResultatt +"').append(conteneurBlocVide.conteneur);";
                  
                    k++;

                    etapes[k] = new Etape();
                    etapes[k].code = 
                        "$('"+ blocResultatt +"').empty();"+
                        "let conteneurBlocPlein = document.createElement('div');"+
                        "conteneurBlocPlein.setAttribute('class', 'fichier_LnOF_conteneurBlocPlein');"+
                        "let blocPlein_GrandRect = document.createElement('div');"+
                        "blocPlein_GrandRect.setAttribute('class', 'fichier_LnOF_conteneurBlocPlein_grandRect');"+
                        "let blocPlein_PetitRect1 = document.createElement('div');"+
                        'blocPlein_PetitRect1.setAttribute("class", "fichier_LnOF_conteneurBlocPlein_petitRect1");'+
                        "let blocPlein_PetitRect2 = document.createElement('div');"+
                        'blocPlein_PetitRect2.setAttribute("class", "fichier_LnOF_conteneurBlocPlein_petitRect2");'+
                        "conteneurBlocPlein.append(blocPlein_GrandRect, blocPlein_PetitRect1, blocPlein_PetitRect2);"+
                        nomVar + "._conteneurTabBloc["+ j +"].removeChild("+nomVar+"._conteneurTabBloc["+ j +"].childNodes[1]);"+
                        nomVar + "._conteneurTabBloc["+ j +"].append(conteneurBlocPlein);"+
                        nomVar + ".selection("+ j +");";
                    etapes[k].algorithme = "Création > Bloc dans ZD";
                    k++;
                    

                    etapes[k] = new Etape();
                    etapes[k].code = 
                        "let blocc = new Grph_Bloc_LnOFzd(new BlocTOFzd(), "+ nomVar +"._Fich_TOF.entete.nbEnrg, true);"+
                       "blocc.initSuiv("+-1+");"+
                       "$('"+ blocResultatt +"').empty();"+
                       "$('"+ blocResultatt +"').append(blocc.conteneur);";
                    k++;

                    let tab = blc.insertion(cle, "blocc");
                    for(let z = 0; z < tab.length; z++){
                        etapes[k] = new Etape();
                        etapes[k].code = 
                            "let blocc = new Grph_Bloc_LnOFzd(new BlocTOFzd(), "+ nomVar +"._Fich_TOF.entete.nbEnrg, false);"+
                            "blocc.initSuiv("+-1+");"+
                            "$('"+ blocResultatt +"').empty();"+
                            "$('"+ blocResultatt +"').append(blocc.conteneur);";
                            
                        etapes[k].code += tab[z].code;
                        etapes[k].algorithme += tab[z].algorithme;
                        k++;
                    }
                }

          }
           
       

          if(r.z && cleInsert != '$' && !this._Fich_TOF.fich[r.nbl].plein()) {
        
       
                   
            let j = this._Fich_TOF.fich[r.i].zd;
            let k = i;
           
                let blocResultatt="#structuresSimples-TOFzd-MC_Contenu";
                etapes[k-1].code+=nomVar + ".initAnimation("+ j +");" + "$('"+ blocResultatt +"').empty();";
                etapes[k] = new Etape();
                etapes[k].code = nomVar + ".selection("+ j +");" + "$('"+ blocResultatt +"').empty();";
                etapes[k].algorithme = "Accés > Bloc"+ (j+1);
                k++;

            etapes[k] = new Etape();
            etapes[k].code = 
                    "let blocc = new Grph_Bloc_LnOFzd("+ nomVar +"._Fich_TOF.fich["+ j +"], "+ nomVar +"._Fich_TOF.entete.nbEnrg, true);"+
                    "$('"+ blocResultatt +"').empty();"+
                    "$('"+ blocResultatt +"').append(blocc.conteneur);";
                    k++;

               
                let blc = new Grph_Bloc_LnOFzd(this._Fich_TOF.fich[j], this._Fich_TOF.entete.nbEnrg,false);
                let tab = blc.insertion(cle, "blocc");
                for(let z = 0; z < tab.length; z++){ 
                    etapes[k] = new Etape();

                    etapes[k].code = 
                        "let blocc = new Grph_Bloc_LnOFzd("+ nomVar +"._Fich_TOF.fich["+ j +"], "+ nomVar +"._Fich_TOF.entete.nbEnrg, false);"+
                        "$('"+ blocResultatt +"').empty();"+
                        "$('"+ blocResultatt +"').append(blocc.conteneur);";
                        
                    etapes[k].code += tab[z].code;
                    etapes[k].algorithme += tab[z].algorithme;
                    k++;
                }
            
        }
        if(r.z && cleInsert != '$' && this._Fich_TOF.fich[r.nbl].plein()) {
            if(this._Fich_TOF.fich[r.i].nbZd<2){
            let blocResultatt="#structuresSimples-TOFzd-MC_Contenu";
            let k=i;
             let blc = new Grph_Bloc_LnOFzd(new BlocTOFzd(), this._Fich_TOF.entete.nbEnrg,false);
                if(this._Fich_TOF.entete.numZD == 11) {
                    etapes[k] = new Etape();
                    etapes[k].code =  "";
                    etapes[k].algorithme = "Err >> Pas d'Espace Mémoire";
                    
                    return etapes;
                }
                else {
                   let j = this._Fich_TOF.entete.numZD-1;
                    etapes[k] = new Etape();
                    etapes[k].code =
                        "let conteneurBlocVide = document.createElement('div');"+
                        "conteneurBlocVide.setAttribute('class', 'fichier_LnOF_conteneurBlocVide');"+
                        nomVar + "._conteneurTabBloc["+ j +"].removeChild("+nomVar+"._conteneurTabBloc["+ j +"].childNodes[1]);"+
                        nomVar + "._conteneurTabBloc["+ j +"].append(conteneurBlocVide);";
                    etapes[k].algorithme = "Accés > Bloc"+ (j+1);
                  
                    k++;

                    etapes[k] = new Etape();
                    etapes[k].code = 
                        "$('"+ blocResultatt +"').empty();"+
                        "let conteneurBlocPlein = document.createElement('div');"+
                        "conteneurBlocPlein.setAttribute('class', 'fichier_LnOF_conteneurBlocPlein');"+
                        "let blocPlein_GrandRect = document.createElement('div');"+
                        "blocPlein_GrandRect.setAttribute('class', 'fichier_LnOF_conteneurBlocPlein_grandRect');"+
                        "let blocPlein_PetitRect1 = document.createElement('div');"+
                        'blocPlein_PetitRect1.setAttribute("class", "fichier_LnOF_conteneurBlocPlein_petitRect1");'+
                        "let blocPlein_PetitRect2 = document.createElement('div');"+
                        'blocPlein_PetitRect2.setAttribute("class", "fichier_LnOF_conteneurBlocPlein_petitRect2");'+
                        "conteneurBlocPlein.append(blocPlein_GrandRect, blocPlein_PetitRect1, blocPlein_PetitRect2);"+
                        nomVar + "._conteneurTabBloc["+ j +"].removeChild("+nomVar+"._conteneurTabBloc["+ j +"].childNodes[1]);"+
                        nomVar + "._conteneurTabBloc["+ j +"].append(conteneurBlocPlein);"+
                        nomVar + ".selection("+ j +");";
                        
                    k++;
                    

                    etapes[k] = new Etape();
                    etapes[k].code = 
                        "let blocc = new Grph_Bloc_LnOFzd(new BlocTOFzd(), "+ nomVar +"._Fich_TOF.entete.nbEnrg, true);"+
                        "$('"+ blocResultatt +"').empty();"+
                        "$('"+ blocResultatt +"').append(blocc.conteneur);"+
                        "blocc.initSuiv("+(r.nbl+1)+");";
                    k++;

                    let tab = blc.insertion(cle, "blocc");
                    for(let z = 0; z < tab.length; z++){
                        etapes[k] = new Etape();
                        etapes[k].code = 
                            "let blocc = new Grph_Bloc_LnOFzd(new BlocTOFzd(), "+ nomVar +"._Fich_TOF.entete.nbEnrg, false);"+
                            "$('"+ blocResultatt +"').empty();"+
                            "$('"+ blocResultatt +"').append(blocc.conteneur);"+
                            "blocc.initSuiv("+(r.nbl+1)+");";
                            
                        etapes[k].code += tab[z].code;
                        etapes[k].algorithme += tab[z].algorithme;
                        k++;
                    }
                }

                }
                else {
                    let z = etapes.length;
                    etapes[z] = new Etape();
                    etapes[z].code =  "";
                    etapes[z].algorithme = "Err >> Deux ZD au Max";
                }
            }


        }

             

           

            return etapes;

        }
        selection(j){

        $(this._conteneurTabBloc[j].childNodes[1]).addClass("animated fast shadow-drop-center");

    }

    initAnimation(j){

        $(this._conteneurTabBloc[j].childNodes[1]).removeClass("animated fast shadow-drop-center");

    }

      
}