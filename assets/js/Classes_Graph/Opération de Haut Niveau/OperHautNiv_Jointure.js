class Jointure{

  _fichier1;
  _fichier2;
  _fichier3;
  _Buf1 = [];
  _Buf2 = [];
  _Buf3 = [];
  _Grph_fichier1;
  _Grph_fichier2;
  _Grph_fichier3;
  _table = [];
   constructor(){


    for (let  p = 0; p < 5; p++) {
      this._table[p] = false;
    }
    
    let tabVal1 = [];
    for(let p = 0; p < 20; p++) tabVal1[p] = p*10;

    let tabVal2 = [];
    for(let p = 0; p < 20; p++) tabVal2[p] = p*10;

     let k;
     let tab1 = [];
     for (let i = 0; i < 9; i++) {
       tab1[i] = tabVal1.splice(Math.floor(Math.random() * tabVal1.length), 1);       
     }           
     tab1.sort(function(a,b){ return a-b } );

     console.log(tab1);


     let tab2 = [];
     for (let i = 0; i < 12; i++) {
       tab2[i] = tabVal2.splice(Math.floor(Math.random() * tabVal2.length), 1); 
       
     }

     tab2.sort(function(a,b){ return a-b } );
 
    console.log(tab2);
   
    let fichier1 = new FichTOF(); fichier1.charINIT(3,3,1);
    let fichier2 = new FichTOF(); fichier2.charINIT(4,3,1);


     k = 0;
    for (let i = 0; i < 3; i++)
    {
      for (let j = 0; j < 3; j++) 
      {
        fichier1.fich[i].tab[j] = {
                                      cle :parseInt(tab1[k]),
                                      eff : false,
                                    };
         k++; 
      }    
    }


     k = 0;
    for (let i = 0; i < 4; i++)
    {
      for (let j = 0; j < 3; j++) 
      {
        fichier2.fich[i].tab[j] = {
                                      cle :parseInt(tab2[k]),
                                      eff : false,
                                    };
         k++; 
      }     
    }

    this._fichier1 = fichier1;
    this._fichier2 = fichier2;
    this._fichier3 = new FichTOF();
     
    this._Grph_fichier1 = new Grph_Fich_TOF(this._fichier1,3);
    this._Grph_fichier2 = new Grph_Fich_TOF(this._fichier2,4);
    this._Grph_fichier3 = new Grph_Fich_TOF(this._fichier3,4); 

   }

    // Setters et Getters
   set fichier1(fichier1){

    this._fichier1 = fichier1;

    }

   get fichier1(){

    return this._fichier1;

 }

 set fichier2(fichier2){

    this._fichier2 = fichier2;

    }

   get fichier2(){

    return this._fichier2;

 }

  set fichier3(fichier3){

    this._fichier3 = fichier3;

    }

   get fichier3(){

    return this._fichier3;

 }



 set Grph_fichier1(Grph_fichier1){

    this._Grph_fichier1 = Grph_fichier1;

    }

   get Grph_fichier1(){

    return this._Grph_fichier1;

 }


  set Grph_fichier2(Grph_fichier2){

    this._Grph_fichier2 = Grph_fichier2;

    }

   get Grph_fichier2(){

    return this._Grph_fichier2;

 }



  set Grph_fichier3(Grph_fichier2){

    this._Grph_fichier3 = Grph_fichier3;

    }

   get Grph_fichier3(){

    return this._Grph_fichier3;

 }


  set Buf1(Buf1){

    this._Buf1 = Buf1;

    }

   get Buf1(){

    return this._Buf1;

 }


  set Buf2(Buf2){

    this._Buf2 = Buf2;

    }

   get Buf2(){

    return this._Buf2;
  }

  set Buf3(Buf3){

    this._Buf3 = Buf3;

    }

   get Buf3(){

    return this._Buf3;


 }

 set table(table){
     this._table = table;
 }

 get table(){

     return this._table;
 }

 operation(nomVar,div1,div2,div3,divNouveauFich) // avec 3 buffers
 {
    div1 = '"'+div1+'"';
    div2 = '"'+div2+'"';
    div3 = '"'+div3+'"';
    divNouveauFich = '"'+divNouveauFich+'"';
   
    let k = 0;
    let etp = 0;
    let etapes = [];

    let i3 = 0,j3 = 0;
    let e1,e2;

   etapes[etp] = new Etape();
   etapes[etp].code =
                nomVar + ".Grph_fichier1.Tab_Rep_Bloc[0].initAnimationBloc();"+
                "$("+div1+").empty();";
   etp++;             

    for(let i1 = 0;i1<this._fichier1.entete.nbBLOC;i1++)
    {
      etapes[etp-1].code = etapes[etp-1].code +  nomVar + ".Grph_fichier1.Tab_Rep_Bloc["+i1+"].initAnimationBloc();";

      if(i1 != 0)
      {
        etapes[etp-1].code = etapes[etp-1].code + 
                             nomVar + ".Grph_fichier1.Tab_Rep_Bloc["+(i1-1)+"].validationBloc();"+

                             "$("+div1+").empty();"+
                             "$("+div1+").append("+nomVar+".Buf1["+(i1-1)+"].conteneur);";
      }

      etapes[etp] = new Etape();
      etapes[etp].code = 
             nomVar + ".Grph_fichier1.Tab_Rep_Bloc["+i1+"].validationBloc();"+
             nomVar + ".Buf1["+i1+"] = new Grph_BlocTOF_MC("+nomVar+".fichier1.fich["+i1+"]);"+
             "$("+div1+").empty();"+
             "$("+div1+").append("+nomVar+".Buf1["+i1+"].conteneur);";
      etapes[etp].algorithme = "Lecture : Bloc "+(i1+1)+" de F1";           

       if((i1-1) >= 0)    etapes[etp].code = etapes[etp].code +  nomVar + ".Grph_fichier1.Tab_Rep_Bloc["+(i1-1)+"].initAnimationBloc();";
       k++;
             
      etp++;       

            for (let i2 = 0; i2 <this._fichier2.entete.nbBLOC ; i2++)
            {
               if(i2 === 0)
               {
                if(i1 === 0)
                {
                   etapes[etp-1].code = etapes[etp-1].code + 
                                             nomVar + ".Grph_fichier2.Tab_Rep_Bloc[0].initAnimationBloc();"+
                                             "$("+div2+").empty();";
                 }  
                 else
                 {
                    etapes[etp-1].code = etapes[etp-1].code +
                                       nomVar + ".Grph_fichier2.Tab_Rep_Bloc["+(this._fichier2.entete.nbBLOC-1)+"].validationBloc();"+
                                        "$("+div2+").empty();"+
                                        "$("+div2+").append("+nomVar+".Buf2["+(this._fichier2.entete.nbBLOC-1)+"].conteneur);"+
                                        nomVar + ".Buf2["+(this._fichier2.entete.nbBLOC-1)+"].tabEnreg["+(this._fichier2.fich[this._fichier2.entete.nbBLOC-1].nb-1)+"].selection();";


                 }                      
                }
                else
                {
                   etapes[etp-1].code = etapes[etp-1].code + 
                                       nomVar + ".Grph_fichier2.Tab_Rep_Bloc["+(i2-1)+"].validationBloc();"+

                                        nomVar + ".Buf1["+i1+"].tabEnreg["+(this._fichier1.fich[i1].nb-1)+"].selection();"+

                                        "$("+div2+").empty();"+
                                        "$("+div2+").append("+nomVar+".Buf2["+(i2-1)+"].conteneur);";
                }

               etapes[etp-1].code = etapes[etp-1].code + 
                                    nomVar + ".Grph_fichier2.Tab_Rep_Bloc["+i2+"].initAnimationBloc();";
                                        
                                          
               etapes[etp] = new Etape();
               etapes[etp].code = 
                      nomVar + ".Buf1["+i1+"].tabEnreg["+(this._fichier1.fich[i1].nb-1)+"].initAnimation();"+
                      nomVar + ".Grph_fichier2.Tab_Rep_Bloc["+i2+"].validationBloc();"+
                      nomVar + ".Buf2["+i2+"] = new Grph_BlocTOF_MC("+nomVar+".fichier2.fich["+i2+"]);"+
                      "$("+div2+").empty();"+
                      "$("+div2+").append("+nomVar+".Buf2["+i2+"].conteneur);";
               etapes[etp].algorithme = "Lecture : Bloc "+(i2+1)+" de F2";
                     
                if(i2 != this._fichier2.entete.nbBLOC - 1 )
                {
                  etapes[etp].code = etapes[etp].code +
                    nomVar + ".Grph_fichier2.Tab_Rep_Bloc["+(this._fichier2.entete.nbBLOC - 1)+"].initAnimationBloc();";

                }      

               if((i2-1) >= 0)    etapes[etp].code = etapes[etp].code +  nomVar + ".Grph_fichier2.Tab_Rep_Bloc["+(i2-1)+"].initAnimationBloc();";   
                etp++;
                
                  for (let j1 = 0; j1 < this._fichier1.fich[i1].nb; j1++) 
                  {
                       e1 = this._fichier1.fich[i1].tab[j1];

                        etapes[etp-1].code = etapes[etp-1].code +  nomVar + ".Buf1["+i1+"].tabEnreg["+j1+"].initAnimation();";

                        if(j1 != 0)
                        {
                          etapes[etp-1].code = etapes[etp-1].code +
                                               nomVar + ".Buf1["+i1+"].tabEnreg["+(j1-1)+"].selection();";
                        }

                        
                       etapes[etp] = new Etape();
                       etapes[etp].code = 
                            nomVar + ".Buf2["+i2+"].tabEnreg["+(this._fichier2.fich[i2].nb-1)+"].initAnimation();"+
                            nomVar + ".Buf1["+i1+"].tabEnreg["+j1+"].selection();";
                       etapes[etp].algorithme = "Selection : Enreg "+(j1+1)+" de Buf1 ";     

                        if((j1-1) >= 0)    etapes[etp].code = etapes[etp].code +  nomVar + ".Buf1["+i1+"].tabEnreg["+(j1-1)+"].initAnimation();";    

                       etp++;
                         for (let  j2 = 0; j2 < this._fichier2.fich[i2].nb; j2++)
                         {
                             e2 = this._fichier2.fich[i2].tab[j2];

                             etapes[etp-1].code = etapes[etp-1].code +  nomVar + ".Buf2["+i2+"].tabEnreg["+j2+"].initAnimation();";
                          
                             etapes[etp] = new Etape();
                             etapes[etp].code = 
                                  nomVar + ".Buf2["+i2+"].tabEnreg["+j2+"].selection();";
                             etapes[etp].algorithme = "Selection : Enreg "+(j2+1)+" de Buf2 ";      

                            if((j2-1) >= 0)    etapes[etp].code = etapes[etp].code +  nomVar + ".Buf2["+i2+"].tabEnreg["+(j2-1)+"].initAnimation();";    
                             etp++;

                             if(e1.cle === e2.cle)
                             { 
                 
                                 etapes[etp] = new Etape();
                                 etapes[etp].code = 
                                       nomVar + ".Buf2["+i2+"].tabEnreg["+j2+"].validation();";
                                 etapes[etp].algorithme = "--> Enreg "+(j2+1)+" de Buf2 (Egalite)";       
                                 etp++;     
                                
                                  if(j3 <= this._fichier1.entete.nbEnrg - 1)
                                  {
                                     etapes[etp] = new Etape();
                                     if(i3 === 0 && j3 === 0)
                                     {
                                        this._fichier3.fich[i3] = new BlocTOF();
                                        this._fichier3.fich[i3].tab[j3] = e2;
                                        this._fichier3.fich[i3].nb = 1;
                                        this._fichier3.fich[i3].b = this._fichier1.entete.nbEnrg;

                                       etapes[etp-1].code = etapes[etp-1].code +
                                                            "$("+div3+").empty();";
                                       etapes[etp].code =
                                          nomVar + ".Buf2["+i2+"].tabEnreg["+j2+"].initAnimation();"+
                                          nomVar + ".Buf3["+i3+"] = new Grph_BlocTOF_MC("+nomVar+".fichier3.fich["+i3+"]);"+
                                          "$("+div3+").empty();"+
                                          "$("+div3+").append("+nomVar+".Buf3["+i3+"].conteneur);";
                                       etapes[etp].algorithme = "Création : Nouveau Buffer";              
                                     }
                                     else
                                     {
                                     
                                      etapes[etp-1].code = etapes[etp-1].code +
                                         "if("+nomVar+".Buf3["+i3+"]){"+
                                         "if("+nomVar+".Buf3["+i3+"].conteneurTabEnreg["+j3+"].childNodes[2]){"+
                                          nomVar + ".Buf3["+i3+"].tabEnreg["+j3+"].disparition();"+
                                          nomVar +".Buf3["+i3+"].conteneurTabEnreg["+j3+"].removeChild("+nomVar+".Buf3["+i3+"].conteneurTabEnreg["+j3+"].childNodes[2]);"+
                                          nomVar + ".Buf3["+i3+"].conteneur.childNodes[1].childNodes[1].innerHTML--;"+
                                          nomVar + ".Buf3["+i3+"].conteneur.childNodes[1].append("+nomVar+".Buf3["+i3+"].conteneur.childNodes[1].childNodes[1]);}}";
                   
                     
                                     etapes[etp].code = 
                                     nomVar + ".Buf2["+i2+"].tabEnreg["+j2+"].initAnimation();"+ 
                                    "if("+nomVar+".Buf3["+i3+"]){"+
                                    "if("+nomVar+".Buf3["+i3+"].conteneurTabEnreg["+j3+"].childNodes[2]){"+
                                    nomVar + ".Buf3["+i3+"].tabEnreg["+j3+"].disparition();"+
                                    nomVar +".Buf3["+i3+"].conteneurTabEnreg["+j3+"].removeChild("+nomVar+".Buf3["+i3+"].conteneurTabEnreg["+j3+"].childNodes[2]);"+
                                    nomVar + ".Buf3["+i3+"].conteneur.childNodes[1].childNodes[1].innerHTML--;}"+

                                    nomVar + ".Buf3["+i3+"].tabEnreg["+j3+"] = new Grph_EnregTOF("+e2.cle+",false);"+
                                    nomVar + ".Buf3["+i3+"].tabEnreg["+j3+"].ajout();"+
                                    nomVar + ".Buf3["+i3+"].conteneurTabEnreg["+j3+"].append("+nomVar+".Buf3["+i3+"].tabEnreg["+j3+"].conteneur);"+
                                    nomVar + ".Buf3["+i3+"].conteneur.childNodes[1].childNodes[1].innerHTML++;"+
                                    nomVar + ".Buf3["+i3+"].conteneur.childNodes[1].append("+nomVar+".Buf3["+i3+"].conteneur.childNodes[1].childNodes[1]);}";
                                    etapes[etp].algorithme = "Insertion >> Buf Résultat"; 
                                     }
                                     j3++;
                                     etp++;     
                                  }
                                  else
                                  {
                                      i3++; j3 = 1;

                                      this._fichier3.fich[i3] = new BlocTOF();
                                      this._fichier3.fich[i3].tab[0] = e2;
                                      this._fichier3.fich[i3].nb = 1;
                                      this._fichier3.fich[i3].b = this._fichier1.entete.nbEnrg;

                                        
                                     etapes[etp-2].code = etapes[etp-2].code + nomVar + ".table["+k+"] = false;";
                                     etapes[etp-1].code = etapes[etp-1].code + 
                                     "if("+nomVar+".table["+k+"]){"+

                                     nomVar + ".Buf2["+i2+"].tabEnreg["+j2+"].validation();"+
                                     "let  conteneurVide = document.createElement('div');"+
                                     'conteneurVide.setAttribute("class", "blocTOF_conteneurVide");'+
                                     nomVar +".Grph_fichier3.conteneurTabBloc["+(i3-1)+"].removeChild("+  nomVar +".Grph_fichier3.conteneurTabBloc["+(i3-1)+"].childNodes[1]);"+
                                     nomVar +".Grph_fichier3.conteneurTabBloc["+(i3-1)+"].append(conteneurVide);"+
                                     "$("+nomVar + ".Grph_fichier3.conteneurTabBloc["+(i3-1)+']).removeClass("animated fast bounceIn");'+

                                    "$("+div3+").empty();"+
                                    "$("+div3+").append("+nomVar+".Buf3["+(i3-1)+"].conteneur);"+
                                    nomVar + ".table["+(k+1)+"] = false ;}else{"+

                                   nomVar + ".table["+k+"] = true;}"; k++;
                
               
                                   etapes[etp] = new Etape();
                                   etapes[etp].code = 
                                   "if(!"+nomVar+".table["+k+"]){"+
                                  
                                   nomVar + ".Buf2["+i2+"].tabEnreg["+j2+"].initAnimation();"+
                                   nomVar + ".Buf3["+i3+"] = new Grph_BlocTOF_MC("+nomVar+".fichier3.fich["+i3+"]);"+
                                   "$("+div3+").empty();"+
                                   "$("+div3+").append("+nomVar+".Buf3["+i3+"].conteneur);"+

                                   nomVar +".Grph_fichier3.Tab_Rep_Bloc["+(i3-1)+"] = new Grph_BlocTOF_MS();"+
                                   nomVar +".Grph_fichier3.conteneurTabBloc["+(i3-1)+"].removeChild("+  nomVar +".Grph_fichier3.conteneurTabBloc["+(i3-1)+"].childNodes[1]);"+
                                   nomVar +".Grph_fichier3.conteneurTabBloc["+(i3-1)+"].append("+ nomVar +".Grph_fichier3.Tab_Rep_Bloc["+(i3-1)+"].conteneur);"+
                                  "$("+nomVar + ".Grph_fichier3.conteneurTabBloc["+(i3-1)+']).addClass("animated fast bounceIn");'+
              
                                   nomVar + ".table["+k+"] = true ;}";
                                   etapes[etp].algorithme = "Ecriture + Création : Buffer Résultat";

                                     etp++;  
                                  }
                                
                                 
                             }


                         }    
                  }     
            } 

    }

     // Le dernier bloc n'a pas encore été ecrit ...
     
      i3++;

      etapes[etp-2].code = etapes[etp-2].code + nomVar + ".table["+k+"] = false;";
      etapes[etp-1].code = etapes[etp-1].code + 
                     "if("+nomVar+".table["+k+"]){"+
                       nomVar + ".Buf1["+(this._fichier1.entete.nbBLOC-1)+"].tabEnreg["+(this._fichier1.fich[this._fichier1.entete.nbBLOC-1].nb-1)+"].selection();"+
                       nomVar + ".Buf2["+(this._fichier2.entete.nbBLOC-1)+"].tabEnreg["+(this._fichier2.fich[this._fichier2.entete.nbBLOC-1].nb-1)+"].selection();"+ 


                      "let  conteneurVide = document.createElement('div');"+
                      'conteneurVide.setAttribute("class", "blocTOF_conteneurVide");'+
                       nomVar +".Grph_fichier3.conteneurTabBloc["+(i3-1)+"].removeChild("+  nomVar +".Grph_fichier3.conteneurTabBloc["+(i3-1)+"].childNodes[1]);"+
                       nomVar +".Grph_fichier3.conteneurTabBloc["+(i3-1)+"].append(conteneurVide);"+
                      "$("+nomVar + ".Grph_fichier3.conteneurTabBloc["+(i3-1)+']).removeClass("animated fast bounceIn");'+

                       nomVar + ".table["+(k+1)+"] = false ;}else{"+

                      nomVar + ".table["+k+"] = true;}"; k++;
                
               
      etapes[etp] = new Etape();
      etapes[etp].code = 
         "if(!"+nomVar+".table["+k+"]){"+ 
         nomVar + ".Buf1["+(this._fichier1.entete.nbBLOC-1)+"].tabEnreg["+(this._fichier1.fich[this._fichier1.entete.nbBLOC-1].nb-1)+"].initAnimation();"+
         nomVar + ".Buf2["+(this._fichier2.entete.nbBLOC-1)+"].tabEnreg["+(this._fichier2.fich[this._fichier2.entete.nbBLOC-1].nb-1)+"].initAnimation();"+ 

         nomVar +".Grph_fichier3.Tab_Rep_Bloc["+(i3-1)+"] = new Grph_BlocTOF_MS();"+
         nomVar +".Grph_fichier3.conteneurTabBloc["+(i3-1)+"].removeChild("+  nomVar +".Grph_fichier3.conteneurTabBloc["+(i3-1)+"].childNodes[1]);"+
         nomVar +".Grph_fichier3.conteneurTabBloc["+(i3-1)+"].append("+ nomVar +".Grph_fichier3.Tab_Rep_Bloc["+(i3-1)+"].conteneur);"+
         "$("+nomVar + ".Grph_fichier3.conteneurTabBloc["+(i3-1)+']).addClass("animated fast bounceIn");'+
               
         nomVar + ".table["+k+"] = true ;}"; 
      etapes[etp].algorithme = "Ecriture : Dernier Bloc";    

      let z = etapes.length;
      etapes[z] = new Etape();
      etapes[z].code = "";
      etapes[z].algorithme = "Fin de la Jointure";
    return etapes;
 }


 

}