class Fusion{

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
    

    // Tab de Valeurs
    let tabVal = [];
    for(let z = 0; z < 99; z++) tabVal[z] = z;

     let k;
     let tab1 = [];
     for (let i = 0; i < 9; i++) {   
       tab1[i] = tabVal.splice(Math.floor(Math.random() * tabVal.length), 1); 
      
     }           
     tab1.sort(function(a,b){ return a-b } );

     console.log(tab1);

     // Init tabVal
     for(let z = 0; z < 99; z++) tabVal[z] = z;


     let tab2 = [];
     for (let i = 0; i < 6; i++) {
       tab2[i] = tabVal.splice(Math.floor(Math.random() * tabVal.length), 1); 
       
     }
     tab2.sort(function(a,b){ return a-b } );
 
    console.log(tab2);
   
    let fichier1 = new FichTOF(); fichier1.charINIT(3,3,1);
    let fichier2 = new FichTOF(); fichier2.charINIT(2,3,1);


     k = 0;
    for (let i = 0; i < 3; i++)
    {
      for (let j = 0; j < 3; j++) 
      {
        fichier1.fich[i].tab[j] = {
                                      cle :tab1[k],
                                      eff : false,
                                    };
         k++; 
      }    
    }


     k = 0;
    for (let i = 0; i < 2; i++)
    {
      for (let j = 0; j < 3; j++) 
      {
        fichier2.fich[i].tab[j] = {
                                      cle :tab2[k],
                                      eff : false,
                                    };
         k++; 
      }     
    }

    this._fichier1 = fichier1;
    this._fichier2 = fichier2;
    this._fichier3 = new FichTOF();
     
    this._Grph_fichier1 = new Grph_Fich_TOF(this._fichier1,3);
    this._Grph_fichier2 = new Grph_Fich_TOF(this._fichier2,2);
    this._Grph_fichier3 = new Grph_Fich_TOF(this._fichier3,5); 

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


 operation(nomVar,div1,div2,div3,divNouveauFich)
 {
    
   div1 = '"'+div1+'"';
   div2 = '"'+div2+'"';
   div3 = '"'+div3+'"';
   divNouveauFich = '"'+divNouveauFich+'"';

   let k = 0;
   let etp = 0;
   let etapes = [];

   let i,j,n,indic;
   let i1=0, i2=0, i3=0; // les num de blocs 
   let j1=0, j2=0, j3=0; // les num d'enreg 
   let e,e1,e2;
   let continu = true;

   this._fichier3 = new FichTOF();
   let b,b1 = new BlocTOF(),b2 = new BlocTOF(),b3 = new BlocTOF();
   b1  = this._fichier1.fich[0],b2 = this._fichier2.fich[0];

   etapes[etp] = new Etape();
   etapes[etp].code =
                nomVar + ".Grph_fichier1.Tab_Rep_Bloc[0].initAnimationBloc();"+
                nomVar + ".Grph_fichier2.Tab_Rep_Bloc[0].initAnimationBloc();"+
                "$("+div1+").empty();"+
                "$("+div2+").empty();";

   etp++;             
   etapes[etp] = new Etape();
   etapes[etp].code = 
             nomVar + ".Grph_fichier1.Tab_Rep_Bloc[0].validationBloc();"+
             nomVar + ".Buf1[0] = new Grph_BlocTOF_MC("+nomVar+".fichier1.fich[0]);"+
             "$("+div1+").empty();"+
             "$("+div1+").append("+nomVar+".Buf1[0].conteneur);"+

             nomVar + ".Grph_fichier2.Tab_Rep_Bloc[0].validationBloc();"+
             nomVar + ".Buf2[0] = new Grph_BlocTOF_MC("+nomVar+".fichier2.fich[0]);"+
             "$("+div2+").empty();"+
             "$("+div2+").append("+nomVar+".Buf2[0].conteneur);"+

              nomVar + ".Buf1[0].tabEnreg["+j1+"].initAnimation();"+
              nomVar + ".Buf2[0].tabEnreg["+j2+"].initAnimation();";
   etapes[etp].algorithme = "Lecture : Bloc 1 de F1, F2";           

    etp++;
     e1 = b1.tab[j1];
     e2 = b2.tab[j2];

    etapes[etp] = new Etape();
    etapes[etp].code = 
           nomVar + ".Buf1[0].tabEnreg["+j1+"].selection();"+
           nomVar + ".Buf2[0].tabEnreg["+j2+"].selection();"+
           "$("+div3+").empty();";
    etapes[etp].algorithme = "Selection : E1 de Buf1, Buf2";       
    etp++;       

    if(e1.cle < e2.cle)  
    {
      e = e1;
      etapes[etp] = new Etape();
      etapes[etp].code =  
               nomVar + ".Buf1[0].tabEnreg["+j1+"].initAnimation();"+
               nomVar + ".Buf1[0].tabEnreg["+j1+"].validation();";
      etapes[etp].algorithme = "--> E"+(j1+1)+ " de Buf1 (Plus Petit)";

      j1++;        
      etp++;
      etapes[etp] = new Etape();
      etapes[etp].code =  
                 nomVar + ".Buf1[0].tabEnreg["+j1+"].initAnimation();"+ 
                 nomVar + ".Buf1[0].tabEnreg["+(j1-1)+"].initAnimation();";          
    }
    else 
    {
      if(e1.cle === e2.cle) 
        {
          e = e2; 
          etapes[etp] = new Etape();
          etapes[etp].code =  
               nomVar + ".Buf1[0].tabEnreg["+j1+"].initAnimation();"+
               nomVar + ".Buf2[0].tabEnreg["+j2+"].initAnimation();"+
               nomVar + ".Buf1[0].tabEnreg["+j1+"].validation();"+
               nomVar + ".Buf2[0].tabEnreg["+j2+"].validation();";
          etapes[etp].algorithme = "--> E"+(j1+1)+ " de Buf1 = E"+(j2+1)+" de Buf2";
               
          j1++;
          j2++;     
          etp++;
          etapes[etp] = new Etape();
          etapes[etp].code = 
                 nomVar + ".Buf1[0].tabEnreg["+j1+"].initAnimation();"+ 
                 nomVar + ".Buf2[0].tabEnreg["+j2+"].initAnimation();"+
                 nomVar + ".Buf1[0].tabEnreg["+(j1-1)+"].initAnimation();"+ 
                 nomVar + ".Buf2[0].tabEnreg["+(j2-1)+"].initAnimation();";     
         
        }
      else{
            e = e2; 
            etapes[etp] = new Etape();
            etapes[etp].code =  
                 nomVar + ".Buf2[0].tabEnreg["+j2+"].initAnimation();"+
                 nomVar + ".Buf2[0].tabEnreg["+j2+"].validation();";
            etapes[etp].algorithme = "--> E"+(j2+1)+ " de Buf2 (Plus Petit)"; 
                
            j2++;     
            etp++;
            etapes[etp] = new Etape();
            etapes[etp].code = 
                   nomVar + ".Buf2[0].tabEnreg["+j2+"].initAnimation();"+
                   nomVar + ".Buf2[0].tabEnreg["+(j2-1)+"].initAnimation();";    
          }
    } 

     this._fichier3.fich[0] = new BlocTOF();
     this._fichier3.fich[0].tab[0] = e;
     this._fichier3.fich[0].nb = 1;
     this._fichier3.fich[0].b = this._fichier1.entete.nbEnrg;
     this._fichier3.entete.nbBLOC = 1; 
     this._fichier3.entete.nbEnrg = this._fichier1.entete.nbEnrg;
     this._fichier3.entete.nbINS++;
     j3++;

      etapes[etp].code = etapes[etp].code +
               nomVar + ".Buf3[0] = new Grph_BlocTOF_MC("+nomVar+".fichier3.fich[0]);"+
              "$("+div3+").empty();"+
              "$("+div3+").append("+nomVar+".Buf3[0].conteneur);";
      etapes[etp].algorithme = "Création : Nouveau Buffer";          
      etp++;          
    
   while(continu){ 

       
       if(j1<=b1.nb - 1 && j2<=b2.nb - 1)
        {

           etapes[etp] = new Etape();
           etapes[etp].code =              
              nomVar + ".Buf1["+i1+"].tabEnreg["+j1+"].selection();"+
              nomVar + ".Buf2["+i2+"].tabEnreg["+j2+"].selection();";
           etapes[etp].algorithme = "Selection : E"+(j1+1)+" de Buf1, E"+(j2+1)+" de Buf2";    
           etp++;   

           e1 = b1.tab[j1];
           e2 = b2.tab[j2];

           if(e1.cle < e2.cle)  
            {
                e = e1;
                etapes[etp] = new Etape();
                etapes[etp].code =  
                       nomVar + ".Buf1["+i1+"].tabEnreg["+j1+"].initAnimation();"+
                       nomVar + ".Buf1["+i1+"].tabEnreg["+j1+"].validation();";
                etapes[etp].algorithme = "--> E"+(j1+1)+ " de Buf1 (Plus Petit)";       
                j1++;        
                etp++;
                etapes[etp] = new Etape();
                etapes[etp].code =  
                   nomVar + ".Buf1["+i1+"].tabEnreg["+(j1-1)+"].initAnimation();";
                if(j1<=b1.nb - 1){
                      etapes[etp].code = etapes[etp].code +  nomVar +".Buf1["+i1+"].tabEnreg["+j1+"].initAnimation();";
                   } 
              }    
             else 
             {
                if(e1.cle === e2.cle) 
                {
                  e = e2; 
                  etapes[etp] = new Etape();
                  etapes[etp].code =  
                          nomVar + ".Buf1["+i1+"].tabEnreg["+j1+"].initAnimation();"+
                          nomVar + ".Buf2["+i2+"].tabEnreg["+j2+"].initAnimation();"+
                          nomVar + ".Buf1["+i1+"].tabEnreg["+j1+"].validation();"+
                          nomVar + ".Buf2["+i2+"].tabEnreg["+j2+"].validation();";
                  etapes[etp].algorithme = "--> E"+(j1+1)+ " de Buf1 = E"+(j2+1)+" de Buf2";      
                  j1++;
                  j2++;     
                  etp++;
                  etapes[etp] = new Etape();
                  etapes[etp].code = 
                    nomVar + ".Buf1["+i1+"].tabEnreg["+(j1-1)+"].initAnimation();"+ 
                    nomVar + ".Buf2["+i2+"].tabEnreg["+(j2-1)+"].initAnimation();";
                    if(j1<=b1.nb - 1){
                      etapes[etp].code = etapes[etp].code  + nomVar + ".Buf1["+i1+"].tabEnreg["+j1+"].initAnimation();";
                    } 
                    if(j2<=b2.nb - 1){
                     etapes[etp].code = etapes[etp].code  + nomVar +".Buf2["+i2+"].tabEnreg["+j2+"].initAnimation();";
                    }  
                }
                else{
                    e = e2; 
                    etapes[etp] = new Etape();
                    etapes[etp].code =  
                             nomVar + ".Buf2["+i2+"].tabEnreg["+j2+"].initAnimation();"+
                             nomVar + ".Buf2["+i2+"].tabEnreg["+j2+"].validation();";
                    etapes[etp].algorithme = "--> E"+(j2+1)+ " de Buf2 (Plus Petit)";         
                    j2++;     
                    etp++;
                    etapes[etp] = new Etape();
                    etapes[etp].code =  
                             nomVar + ".Buf2["+i2+"].tabEnreg["+(j2-1)+"].initAnimation();";
                    if(j2<=b2.nb - 1){
                     etapes[etp].code = etapes[etp].code + nomVar +".Buf2["+i2+"].tabEnreg["+j2+"].initAnimation();";
                    }            
                }
              }

               if(j3 <= this._fichier3.entete.nbEnrg - 1)
               {

                etapes[etp-1].code = etapes[etp-1].code +
                   "if("+nomVar+".Buf3["+i3+"]){"+
                    "if("+nomVar+".Buf3["+i3+"].conteneurTabEnreg["+j3+"].childNodes[2]){"+
                         nomVar + ".Buf3["+i3+"].tabEnreg["+j3+"].disparition();"+
                         nomVar +".Buf3["+i3+"].conteneurTabEnreg["+j3+"].removeChild("+nomVar+".Buf3["+i3+"].conteneurTabEnreg["+j3+"].childNodes[2]);"+
                         nomVar + ".Buf3["+i3+"].conteneur.childNodes[1].childNodes[1].innerHTML--;"+
                         nomVar + ".Buf3["+i3+"].conteneur.childNodes[1].append("+nomVar+".Buf3["+i3+"].conteneur.childNodes[1].childNodes[1]);}}";
                   
                     
                   etapes[etp].code =  etapes[etp].code +
                  "if("+nomVar+".Buf3["+i3+"]){"+
                    "if("+nomVar+".Buf3["+i3+"].conteneurTabEnreg["+j3+"].childNodes[2]){"+
                      nomVar + ".Buf3["+i3+"].tabEnreg["+j3+"].disparition();"+
                      nomVar +".Buf3["+i3+"].conteneurTabEnreg["+j3+"].removeChild("+nomVar+".Buf3["+i3+"].conteneurTabEnreg["+j3+"].childNodes[2]);"+
                      nomVar + ".Buf3["+i3+"].conteneur.childNodes[1].childNodes[1].innerHTML--;}"+

                      nomVar + ".Buf3["+i3+"].tabEnreg["+j3+"] = new Grph_EnregTOF("+e.cle+",false);"+
                      nomVar + ".Buf3["+i3+"].tabEnreg["+j3+"].ajout();"+
                      nomVar + ".Buf3["+i3+"].conteneurTabEnreg["+j3+"].append("+nomVar+".Buf3["+i3+"].tabEnreg["+j3+"].conteneur);"+
                      nomVar + ".Buf3["+i3+"].conteneur.childNodes[1].childNodes[1].innerHTML++;"+
                      nomVar + ".Buf3["+i3+"].conteneur.childNodes[1].append("+nomVar+".Buf3["+i3+"].conteneur.childNodes[1].childNodes[1]);}";
                   etapes[etp].algorithme = "Insertion >> Buf Résultat";                                
                  etp++;       
                  j3++;
             }
              else{
                i3++; j3 = 1;
                 
                etp++; 
                this._fichier3.fich[i3] = new BlocTOF();
                this._fichier3.fich[i3].tab[0] = e;
                this._fichier3.fich[i3].nb = 1;
                this._fichier3.fich[i3].b = this._fichier1.entete.nbEnrg;
               
               etapes[etp-2].code = etapes[etp-2].code + nomVar + ".table["+k+"] = false;";
               etapes[etp-1].code = etapes[etp-1].code + 
                     "if("+nomVar+".table["+k+"]){"+
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
                 
                nomVar + ".Buf3["+i3+"] = new Grph_BlocTOF_MC("+nomVar+".fichier3.fich["+i3+"]);"+
                "$("+div3+").empty();"+
                "$("+div3+").append("+nomVar+".Buf3["+i3+"].conteneur);"+

                 nomVar +".Grph_fichier3.Tab_Rep_Bloc["+(i3-1)+"] = new Grph_BlocTOF_MS();"+
                 nomVar +".Grph_fichier3.conteneurTabBloc["+(i3-1)+"].removeChild("+  nomVar +".Grph_fichier3.conteneurTabBloc["+(i3-1)+"].childNodes[1]);"+
                 nomVar +".Grph_fichier3.conteneurTabBloc["+(i3-1)+"].append("+ nomVar +".Grph_fichier3.Tab_Rep_Bloc["+(i3-1)+"].conteneur);"+
                 "$("+nomVar + ".Grph_fichier3.conteneurTabBloc["+(i3-1)+']).addClass("animated fast bounceIn");'+
              
                 nomVar + ".table["+k+"] = true ;}";
                 etapes[etp].algorithme = "Ecriture + Création : Buf Résultat";
                 etp++;
              }

       }
       else{  

        if(j1>b1.nb - 1)
        {
           if(i1<this._fichier1.entete.nbBLOC - 1)
           {
              i1++;
              b1 = this._fichier1.fich[i1];
              j1 = 0;
              etp = etapes.length;

               etapes[etp-1].code = etapes[etp-1].code +
                 nomVar + ".Grph_fichier1.Tab_Rep_Bloc["+(i1-1)+"].validationBloc();"+ 
                 nomVar + ".Grph_fichier1.Tab_Rep_Bloc["+i1+"].initAnimationBloc();"+
                 "$("+div1+").empty();"+
                 "$("+div1+").append("+nomVar+".Buf1["+(i1-1)+"].conteneur);";
             

             etapes[etp] = new Etape();
             etapes[etp].code = 
                nomVar + ".Grph_fichier1.Tab_Rep_Bloc["+(i1-1)+"].initAnimationBloc();"+
                nomVar + ".Grph_fichier1.Tab_Rep_Bloc["+i1+"].validationBloc();"+
                nomVar + ".Buf1["+i1+"] = new Grph_BlocTOF_MC("+nomVar+".fichier1.fich["+i1+"]);"+
                 "$("+div1+").empty();"+
                 "$("+div1+").append("+nomVar+".Buf1["+i1+"].conteneur);";
             etapes[etp].algorithme = "Lecture : Bloc "+(i1+1)+" de F1 ";   
             etp++;   
           }
           else{ 
                continu = false;
                 i = i2;
                 j = j2;
                 n = this._fichier2.entete.nbBLOC;
                 b = this._fichier2.fich[i2];
                 indic = 2;
           }
           }   
         
         else // c-a-d ( j2 > b2.nb -1 )
         {
        
            if(i2<this._fichier2.entete.nbBLOC - 1)
            {
              i2++;
              b2 = this._fichier2.fich[i2];
              j2 = 0;

              etp = etapes.length;

               etapes[etp-1].code = etapes[etp-1].code + 
                nomVar + ".Grph_fichier2.Tab_Rep_Bloc["+(i2-1)+"].validationBloc();"+
                nomVar + ".Grph_fichier2.Tab_Rep_Bloc["+i2+"].initAnimationBloc();"+
                 "$("+div2+").empty();"+
                 "$("+div2+").append("+nomVar+".Buf2["+(i2-1)+"].conteneur);";
            
              etapes[etp] = new Etape();
              etapes[etp].code = 
                 nomVar + ".Grph_fichier2.Tab_Rep_Bloc["+(i2-1)+"].initAnimationBloc();"+
                 nomVar + ".Grph_fichier2.Tab_Rep_Bloc["+i2+"].validationBloc();"+
                 nomVar + ".Buf2["+i2+"] = new Grph_BlocTOF_MC("+nomVar+".fichier2.fich["+i2+"]);"+
                 "$("+div2+").empty();"+
                 "$("+div2+").append("+nomVar+".Buf2["+i2+"].conteneur);";
              etapes[etp].algorithme = "Lecture : Bloc "+(i2+1)+" de F2 ";    

               etp++;   

            }
            else {
                     continu = false;
                     i = i1;
                     j = j1;
                     n = this._fichier1.entete.nbBLOC;
                     b = this._fichier1.fich[i1];
                     indic = 1;
             }
            }
         
       }       
   }
    continu = true;
    while(continu){

        if(j <= b.nb - 1)
        {
          e = b.tab[j];
          etp = etapes.length;
          etapes[etp] = new Etape();
          if(indic === 1)
          {
             etapes[etp-1].code = etapes[etp-1].code +
                                  nomVar + ".Buf1["+i+"].tabEnreg["+j+"].initAnimation();"; 
             etapes[etp].code =  
                 nomVar + ".Buf1["+i+"].tabEnreg["+j+"].initAnimation();"+
                 nomVar + ".Buf1["+i+"].tabEnreg["+j+"].validation();";
             etapes[etp].algorithme = "Copie :  Enreg. Restants du F"+indic;     
             j++;    
             etp++;
             etapes[etp] = new Etape();
             etapes[etp].code = 
                    nomVar + ".Buf1["+i+"].tabEnreg["+(j-1)+"].initAnimation();";
          }
          else
          { // ie: indic == 2
             etapes[etp-1].code = etapes[etp-1].code +
                                  nomVar + ".Buf2["+i+"].tabEnreg["+j+"].initAnimation();"; 
             etapes[etp].code =  
                 nomVar + ".Buf2["+i+"].tabEnreg["+j+"].initAnimation();"+
                 nomVar + ".Buf2["+i+"].tabEnreg["+j+"].validation();";
             j++;    
             etp++;
             etapes[etp] = new Etape();
             etapes[etp].code = 
                    nomVar + ".Buf2["+i+"].tabEnreg["+(j-1)+"].initAnimation();";
             etapes[etp].algorithme = "Copie :  Enreg. Restants du F"+indic;               
          }
          /////
            if(j3 <= this._fichier3.entete.nbEnrg - 1)
               {

                etapes[etp-1].code = etapes[etp-1].code +
                   "if("+nomVar+".Buf3["+i3+"]){"+
                    "if("+nomVar+".Buf3["+i3+"].conteneurTabEnreg["+j3+"].childNodes[2]){"+
                         nomVar + ".Buf3["+i3+"].tabEnreg["+j3+"].disparition();"+
                         nomVar +".Buf3["+i3+"].conteneurTabEnreg["+j3+"].removeChild("+nomVar+".Buf3["+i3+"].conteneurTabEnreg["+j3+"].childNodes[2]);"+
                         nomVar + ".Buf3["+i3+"].conteneur.childNodes[1].childNodes[1].innerHTML--;"+
                         nomVar + ".Buf3["+i3+"].conteneur.childNodes[1].append("+nomVar+".Buf3["+i3+"].conteneur.childNodes[1].childNodes[1]);}}";
                   
                     
                   etapes[etp].code =  etapes[etp].code +
                  "if("+nomVar+".Buf3["+i3+"]){"+
                    "if("+nomVar+".Buf3["+i3+"].conteneurTabEnreg["+j3+"].childNodes[2]){"+
                      nomVar + ".Buf3["+i3+"].tabEnreg["+j3+"].disparition();"+
                      nomVar +".Buf3["+i3+"].conteneurTabEnreg["+j3+"].removeChild("+nomVar+".Buf3["+i3+"].conteneurTabEnreg["+j3+"].childNodes[2]);"+
                      nomVar + ".Buf3["+i3+"].conteneur.childNodes[1].childNodes[1].innerHTML--;}"+

                      nomVar + ".Buf3["+i3+"].tabEnreg["+j3+"] = new Grph_EnregTOF("+e.cle+",false);"+
                      nomVar + ".Buf3["+i3+"].tabEnreg["+j3+"].ajout();"+
                      nomVar + ".Buf3["+i3+"].conteneurTabEnreg["+j3+"].append("+nomVar+".Buf3["+i3+"].tabEnreg["+j3+"].conteneur);"+
                      nomVar + ".Buf3["+i3+"].conteneur.childNodes[1].childNodes[1].innerHTML++;"+
                      nomVar + ".Buf3["+i3+"].conteneur.childNodes[1].append("+nomVar+".Buf3["+i3+"].conteneur.childNodes[1].childNodes[1]);}";                            
                  etp++;       
                  j3++;
             }
              else{
                i3++; j3 = 1;
                 
                etp++; 
                this._fichier3.fich[i3] = new BlocTOF();
                this._fichier3.fich[i3].tab[0] = e;
                this._fichier3.fich[i3].nb = 1;
                this._fichier3.fich[i3].b = this._fichier1.entete.nbEnrg;
               
               etapes[etp-2].code = etapes[etp-2].code + nomVar + ".table["+k+"] = false;";
               etapes[etp-1].code = etapes[etp-1].code + 
                     "if("+nomVar+".table["+k+"]){"+
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
                 
                nomVar + ".Buf3["+i3+"] = new Grph_BlocTOF_MC("+nomVar+".fichier3.fich["+i3+"]);"+
                "$("+div3+").empty();"+
                "$("+div3+").append("+nomVar+".Buf3["+i3+"].conteneur);"+

                 nomVar +".Grph_fichier3.Tab_Rep_Bloc["+(i3-1)+"] = new Grph_BlocTOF_MS();"+
                 nomVar +".Grph_fichier3.conteneurTabBloc["+(i3-1)+"].removeChild("+  nomVar +".Grph_fichier3.conteneurTabBloc["+(i3-1)+"].childNodes[1]);"+
                 nomVar +".Grph_fichier3.conteneurTabBloc["+(i3-1)+"].append("+ nomVar +".Grph_fichier3.Tab_Rep_Bloc["+(i3-1)+"].conteneur);"+
                 "$("+nomVar + ".Grph_fichier3.conteneurTabBloc["+(i3-1)+']).addClass("animated fast bounceIn");'+
              
                 nomVar + ".table["+k+"] = true ;}";
                 etp++;
              }               
         ////
        }
        else
        {
            if(i < n - 1)
            {
              //********
              i++;
              j = 0;
              etp = etapes.length;
              if(indic === 1)
              {
                 etapes[etp-1].code = etapes[etp-1].code +
                 nomVar + ".Grph_fichier1.Tab_Rep_Bloc["+(i-1)+"].validationBloc();"+ 
                 nomVar + ".Grph_fichier1.Tab_Rep_Bloc["+i+"].initAnimationBloc();"+
                 "$("+div1+").empty();"+
                 "$("+div1+").append("+nomVar+".Buf1["+(i-1)+"].conteneur);";
             

                 etapes[etp] = new Etape();
                 etapes[etp].code = 
                 nomVar + ".Grph_fichier1.Tab_Rep_Bloc["+(i-1)+"].initAnimationBloc();"+
                 nomVar + ".Grph_fichier1.Tab_Rep_Bloc["+i+"].validationBloc();"+
                 nomVar + ".Buf1["+i+"] = new Grph_BlocTOF_MC("+nomVar+".fichier1.fich["+i+"]);"+
                 "$("+div1+").empty();"+
                 "$("+div1+").append("+nomVar+".Buf1["+i+"].conteneur);";
                 etp++;   
              }  
              else // ie:indic == 2
              {
                etapes[etp-1].code = etapes[etp-1].code +
                 nomVar + ".Grph_fichier2.Tab_Rep_Bloc["+(i-1)+"].validationBloc();"+ 
                 nomVar + ".Grph_fichier2.Tab_Rep_Bloc["+i+"].initAnimationBloc();"+
                 "$("+div2+").empty();"+
                 "$("+div2+").append("+nomVar+".Buf2["+(i-1)+"].conteneur);";
             

                 etapes[etp] = new Etape();
                 etapes[etp].code = 
                 nomVar + ".Grph_fichier2.Tab_Rep_Bloc["+(i-1)+"].initAnimationBloc();"+
                 nomVar + ".Grph_fichier2.Tab_Rep_Bloc["+i+"].validationBloc();"+
                 nomVar + ".Buf2["+i+"] = new Grph_BlocTOF_MC("+nomVar+".fichier2.fich["+i+"]);"+
                 "$("+div2+").empty();"+
                 "$("+div2+").append("+nomVar+".Buf2["+i+"].conteneur);";
                 etp++;   
              }

              //*******
            }
            else continu = false;
        }

    }
    // Le dernier bloc n'a pas encore été ecrit ...
                i3++;   
                etp = etapes.length;
               
               etapes[etp-2].code = etapes[etp-2].code + nomVar + ".table["+k+"] = false;";
               etapes[etp-1].code = etapes[etp-1].code + 
                     "if("+nomVar+".table["+k+"]){"+
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
                 nomVar +".Grph_fichier3.Tab_Rep_Bloc["+(i3-1)+"] = new Grph_BlocTOF_MS();"+
                 nomVar +".Grph_fichier3.conteneurTabBloc["+(i3-1)+"].removeChild("+  nomVar +".Grph_fichier3.conteneurTabBloc["+(i3-1)+"].childNodes[1]);"+
                 nomVar +".Grph_fichier3.conteneurTabBloc["+(i3-1)+"].append("+ nomVar +".Grph_fichier3.Tab_Rep_Bloc["+(i3-1)+"].conteneur);"+
                 "$("+nomVar + ".Grph_fichier3.conteneurTabBloc["+(i3-1)+']).addClass("animated fast bounceIn");'+
              
                 nomVar + ".table["+k+"] = true ;}";
    let z = etapes.length;
    etapes[z] = new Etape();
    etapes[z].code = "";
    etapes[z].algorithme = "Fin de la Fusion";
    
   return etapes;

 
}

}