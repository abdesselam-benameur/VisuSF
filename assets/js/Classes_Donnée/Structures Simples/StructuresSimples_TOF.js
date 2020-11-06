class EnregTOF{

    // Attributs
    _cle;
    _eff;


    // Constructeur
    constructor(cle,eff){

        this._cle = cle;
        this._eff = eff;
    }

}

class BlocTOF{   
    
    // Attributs
    tab = [];
    nb = 0;
    b = 0;

    constructor(){}
    

    rech(x)
    {
       
        let trouv,trouve = false,stop = false;
        let inf = 0;
        let sup = this.nb-1;
        let p = 0 ,j;
        while (inf <= sup && !trouve && !stop)
        {
            p = Math.trunc((inf + sup ) / 2); 
            if(x === this.tab[p].cle) 
            {

               if(this.tab[p].eff) stop = true;
               else                trouve = true;  
            } 
            else                  
            {
                if(x<this.tab[p].cle)  sup = p - 1;
                else                   inf = p + 1; 
            }       
        }
        if(!trouve && !stop)  p = inf;
        return {
                  trouv : trouve,
                  j : p,
               };
    }

    insert (x)
    {
        let oj = '$';
        let sup = false;
        let r = this.rech(x);
        if(!r.trouv)
        {
            let e = this.tab[this.nb-1];
            if(!this.tab[r.j].eff) // decalage
            {
              for (var i = this.nb; i >= r.j; i--) 
              {
                this.tab[i] = this.tab[i-1];
              }
             if(this.nb < this.b)  this.nb++;
             else oj = e;  
            }  
            else sup = true;              
            this.tab[r.j] = {
                               cle : x,
                               eff : false,
                            };                 
        }

        return {
                obj : oj ,
                supp: sup ,
               };
    }


    delete(x)
    {
        let r = this.rech(x);
        if(r.trouv) 
            {
                this.tab[r.j].eff = true;
                return 1;
            }
            return 0;

    }

    afficher()
    {
        console.log(' nb =',this.nb);
        for(let i=0;i<this.nb;i++)
        {
            console.log('Enrg',i+1,'=','cle : ' ,this.tab[i].cle, '| eff : ',this.tab[i].eff);
        }
    }

}

class FichTOF
{
    entete = { nbEnrg:0,
               nbBLOC : 0,
               nbINS : 0,
               nbSupp : 0,
               plein : false,
              };
    fich = [];
    Bloc ;
    charINIT(nbBloc,nbEnrg,taux)
    {   
        let nbbloc = nbBloc;
        let nbenrg = nbEnrg;
        let max;
        if(nbEnrg*taux - Math.floor(nbEnrg*taux) != 0) max = Math.floor(nbEnrg*taux) + 1;
        else max = nbEnrg*taux;
        let nbins = 0;
        let k = 0;
        let plei = false ;
        if(taux === 1)  plei = true;
        if(nbBloc>= 1 && nbBloc<=10 && nbEnrg>= 1 && nbEnrg<=10)
        {
        for (let i = 0; i < nbBloc; i++) 
        {   
            let b = new BlocTOF();
            b.b = nbEnrg;
            for(let j=0;j<max;j++)
            {
                 b.tab[j] = {
                               cle : k,
                               eff : false,
                            }; 
                 k = k + 100; 
                b.nb++;
                nbins++;
            }
             this.fich[i]=b;         
        }
        let ent={
                    nbEnrg: nbenrg,
                    nbBLOC : nbbloc,
                    nbINS : nbins,
                    nbSupp : 0,
                    plein : plei,
                }
        this.entete = ent;  
        }   
    }

    rech(x)
    {
      let obj = {
        nbLect: 0,
        nbEcrit: 0,
      }
        let k ,p = 0;
        let inf = 0;
        let sup = this.entete.nbBLOC -1 ;
        let trouve = false;
        let stop = false;
        let r;
        while(inf<= sup && !trouve && !stop )
        {
            k = Math.trunc((inf + sup )/2);         
            if ( x >= this.fich[k].tab[0].cle  && x <= this.fich[k].tab[this.fich[k].nb - 1].cle )  
                {
                    r = this.fich[k].rech(x);
                    trouve = r.trouv;
                    p = r.j;
                    stop = true;
                }
            else
            {
                if ( x < this.fich[k].tab[0].cle) sup = k - 1;
                else                              inf = k + 1;
            }
            obj.nbLect++;
        }
        if (!trouve && !stop) k = inf ;
        return {
                  trouv : trouve,
                  i : k,
                  j : p,
                  nbVisites : obj,
                }
    }

    insert(x)
    {
      let nbVisites = {
        nbLect: 0,
        nbEcrit: 0,
      }
       let r = this.rech(x);
       if(!r.trouv)
       {
          this.entete.nbINS++;

          let bl = r.i;
         if(bl > this.entete.nbBLOC - 1)
         {
            this.fich[bl] = new BlocTOF();
            this.fich[bl].b = this.entete.nbEnrg;
            this.fich[bl].tab[0] = {
                                       cle : x,
                                       eff : false,
                                    };
            this.fich[bl].nb = 1;
            this.entete.nbBLOC++; 
            nbVisites.nbLect++;
            nbVisites.nbEcrit++;
         }
         else
         {
         let e = this.fich[bl].insert(x);
         nbVisites.nbEcrit++;
         if(e.obj != '$') bl++;
         if(e.supp) this.entete.nbSupp--;
         while(e.obj != '$' && bl<=this.entete.nbBLOC-1)
         {              
            e = this.fich[bl].insert(e.obj.cle);
            if(e.obj != '$') bl++;
            nbVisites.nbLect++;
            nbVisites.nbEcrit++;
         }
          if(bl > this.entete.nbBLOC - 1 )
          {
            this.fich[bl] = new BlocTOF();
            this.fich[bl].b = this.entete.nbEnrg;
            this.fich[bl].tab[0] = e.obj;
            this.fich[bl].nb = 1;
            this.entete.nbBLOC++; 
            nbVisites.nbLect++;
            nbVisites.nbEcrit++;
          }        
        }        
       }
       return nbVisites;
    }



    delete(x)
    {
       let r = this.rech(x);
       if(r.trouv) 
        {
            this.fich[r.i].delete(x);
            this.entete.nbSupp++;
            this.entete.nbINS--;
            return 1;
        }
        return 0;
    }

    copier(bloc1,bloc2) // copier bloc2 dans bloc1
  {
       bloc1.b = bloc2.b;
      bloc1.nb = bloc2.nb;
    for (var i = 0; i < bloc2.nb; i++) 
    {
      bloc1.tab[i] = bloc2.tab[i];
      }
  }

  fusion(f2) 
  {
    let i,j,n,indic;
    let i1=0, i2=0, i3=0; // les num de blocs 
        let j1=0, j2=0, j3=0; // les num d'enreg 
        let e,e1,e2;
    let continu = true;
    let f3 = new FichTOF();
    f3.entete.nbINS = 0;
    let b,b1 = new BlocTOF(),b2 = new BlocTOF(),b3 = new BlocTOF();
    b1  = this.fich[0],b2 = f2.fich[0];
      b1.b = this.entete.nbEnrg,b2.b = this.entete.nbEnrg,b3.b = this.entete.nbEnrg;
    while(continu)
    {
       if(j1<=b1.nb - 1 && j2<=b2.nb - 1)
       {
          e1 = b1.tab[j1];
          e2 = b2.tab[j2];
          // choisir le plus petit enrg
          if(e1.cle < e2.cle)  
          {
            e = e1; j1++;
          }
          else 
          {
            if(e1.cle === e2.cle) j1++;
            e = e2; j2++;
          } 

          if(j3<= this.entete.nbEnrg - 1)
          {
            b3.tab[j3] = e;
            f3.entete.nbINS++;
            j3++;
          }
          else 
          {
            b3.nb = j3;
                f3.fich[i3] = new BlocTOF();
        this.copier(f3.fich[i3],b3);
                i3++; 
                b3.tab[0] = e ;
                f3.entete.nbINS++;
                j3 = 1;
          }
       }
       else // c-a-d : non ( j1 <= b1.nb et j2 <= b2.nb )
       {
        if(j1>b1.nb - 1)
        {
          if(i1<this.entete.nbBLOC - 1)
          {
            i1++;
            b1 = this.fich[i1];
            j1 = 0;
            }
            else 
            {
              continu = false;
              i = i2;
              j = j2;
              n = f2.entete.nbBLOC;
              b = b2;
              indic = 2;
            }   
        }
        else // c-a-d ( j2 > buf2.NB )
        {
          if(i2<f2.entete.nbBLOC - 1)
          {
            i2++;
                    b2 = f2.fich[i2];
            j2 = 0;
          }
          else // ( donc i2 >= entete(F2, 1) )
          {
            continu = false;
            i = i1;
            j = j1;
            n = this.entete.nbBLOC;
            b = b1;
            indic = 1;//prblm
          }
        }
       }  
    }
    continu = true;
    while(continu)
    {
      if(j <= b.nb - 1) //+
      {
        if(j3<=this.entete.nbEnrg - 1)
        {
          b3.tab[j3] = b.tab[j];
          f3.entete.nbINS++; 
          j3++;   
        }
        else 
        {
          b3.nb = j3;
          f3.fich[i3] = new BlocTOF();
          this.copier(f3.fich[i3],b3);  
          i3++;
          b3.tab[0] = b.tab[j];
          f3.entete.nbINS++;
          j3 = 1;
        }
        j++;
      }
      else // c-a-d non ( j <= b.nb )
      {
        if(i < n - 1)
        {
          i++;
          if(indic === 1) b = this.fich[i];
                else            b = f2.fich[i];
                j = 0;
        }
        else continu = false;
      }
    }
    // Le dernier buffer (b3) n'a pas encore été ecrit ...
    b3.nb = j3;
        f3.fich[i3] = new BlocTOF();
    this.copier(f3.fich[i3],b3);
        f3.entete.nbBLOC = i3 + 1; 
        return f3;
   }

   jointure(f2,M) // jointure de this fichier avec f2 avec M buffers
     {
      let ii,i3 = 0,j3 = 0;
      let buf = [];
      for (let l=0; l < M ; l++) 
                {
                   buf[l] = new BlocTOF();
              }
        let e1,e2; 
        let f3 = new FichTOF();
    f3.entete.nbINS = 0;

         for (let i1 = 0; i1 < this.entete.nbBLOC ; i1 = i1 + M-2) // Boucle Externe : Parcours de F1 … 
         {
                ii = i1;
               for (let i = 0; i < M - 2; i++) 
                {
               this.copier(buf[i],this.fich[ii]); //buf[i]=this.fich[ii];
               ii++;
              }
                
                for (let i2 = 0; i2 < f2.entete.nbBLOC ; i2++) // Boucle Interne : Parcours de F2 … 
                { 
                  this.copier(buf[M-2],f2.fich[i2]);   //buf[M-1] = f2.fich[i2];
                    // jointure en MC entletbenrf[1..Menr2] M - 2Leenrrésultat dans buf[M] 
                    for (let buffer = 0; buffer< M - 2; buffer++) 
                    { 
                      for (let enrg = 0; enrg < buf[buffer].nb; enrg++) 
                      {
                          e1 = buf[buffer].tab[enrg];
                          for (let j2 = 0; j2 < buf[M-2].nb; j2++) 
                          {
                             e2 = buf[M-2].tab[j2];
                             if(e1.cle === e2.cle)
                             {
                                buf[M-1].tab[j3] = e1;
                                f3.entete.nbINS++;
                                j3++;
                                if(j3>=this.entete.nbEnrg) // a modifier
                                {
                                  buf[M-1].nb = this.entete.nbEnrg;
                                  f3.fich[i3] = new BlocTOF();
                                  this.copier(f3.fich[i3],buf[M-1]); //f3.fich[i3] = buf[M-1]
                                  j3 = 0;
                                  i3++;
                                }
                             }
                          }
                      }
                    }
                }
         }
        if(j3<this.entete.nbEnrg)
        {
          buf[M-1].nb = j3;
          f3.entete.nbEnrg++;
          f3.fich[i3] = new BlocTOF();
          this.copier(f3.fich[i3],buf[M-1]); //f3.fich[i3] = buf[M-1];
          i3++;
        }
        f3.entete.nbBLOC = i3;
        return f3;
     }


    afficher ()
    {
        if(this.entete.nbBLOC >= 1 && this.entete.nbBLOC <=10)
        {
        console.log('entete : ');
        console.log('nbEnrg = ',this.entete.nbEnrg);
        console.log('nbBloc = ',this.entete.nbBLOC);
        console.log('nbINS  = ',this.entete.nbINS);
        console.log('nbSupp = ',this.entete.nbSupp);
        console.log('plein  = ',this.entete.plein);
        console.log('-------------------------')
        for (let i = 0; i<this.fich.length; i++) 
        {
            console.log('Bloc',i+1,':');
            this.fich[i].afficher();
            console.log('**********************************');
        }
        }
        else console.log('le fichier n existe pas ');
    }



}