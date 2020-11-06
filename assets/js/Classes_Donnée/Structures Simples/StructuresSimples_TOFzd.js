class BlocTOFzd
{
    tabEnreg = [];
    nb = 0;
    b = 0;
    zd=-1;
    nbZd=0;
    

    rech(x)
    {
        let trouv,trouve = false,stop = false;
        let inf = 0;
        let sup = this.nb-1;
        let p = 0 ,j;
        while (inf <= sup && !trouve && !stop)
        {
            p = Math.trunc((inf + sup ) / 2);
            if(x === this.tabEnreg[p].cle) 
            {
               if(this.tabEnreg[p].eff) stop = true;
               else                trouve = true;   
            } 
            else                  
            {
                if(x<this.tabEnreg[p].cle)  sup = p - 1;
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
            let e = this.tabEnreg[this.nb-1];
            if(!this.tabEnreg[r.j].eff) // decalage
            {
              for (var i = this.nb; i >= r.j; i--) 
              {
                this.tabEnreg[i] = this.tabEnreg[i-1];
              }
             if(this.nb < this.b)  this.nb++;
             else oj = e;  
            }  
            else sup = true;              
            this.tabEnreg[r.j] = {
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
                this.tabEnreg[r.j].eff = true;
            }

    }
    plein(){
        if(this.nb==this.b){
            return true;
        }
        else{
            return false;
        }
    }
    rechzd(x){
        for (let i = 0; i < this.nb; i++) {
            if (this.tabEnreg[i]==x){ return {
                 trouv : true,
                 j : i,
                };
            }
        }
        return {
            trouv : false,
            j :-1,
        }

    }
    insertzd(x){
        this.tabEnreg[this.nb]=x;
        this.nb++;

    }
    deletezd(p,n){
        let i= this.rechzd(p);
        if(i.trouv==true){
            this.tabEnreg[i.j]=n;
        }
    }

    afficher()
    {
        console.log(' nb =',this.nb);
        for(let i=0;i<this.nb;i++)
        {
            console.log('Enrg',i+1,'=','cle : ' ,this.tabEnreg[i].cle, '| eff : ',this.tabEnreg[i].eff);
        }
    }
    afficherzd(){
        console.log(' nb =',this.nb);
        for(let i=0;i<this.nb;i++)
        {
            console.log('Enrg',i+1,'=','cle : ' ,this.tabEnreg[i]);
        }

    }
}



class FichTOFzd
{
    entete = { nbEnrg:0,
               nbBLOC : 0,
               numZD : 0,
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
        let nbins = 0;
        let k = 0;
        let plei = false ;
        if(taux === 1)  plei = true;
        if(nbBloc>= 1 && nbBloc<=10 && nbEnrg>= 1 && nbEnrg<=10)
        {
        for (let i = 0; i < nbBloc; i++) 
        {   
            let b = new BlocTOFzd();
            b.b = nbEnrg;
            for(let j=0;j<nbEnrg*taux;j++)
            {
                 b.tabEnreg[j] = {
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
                    numZD : nbbloc+1,
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

        let zd=false;
        let k ,p = 0;
        let inf = 0;
        let sup = this.entete.nbBLOC -1 ;
        let trouve = false;
        let stop = false;
        let r;
        let nBL,nBE;
        if(x>this.fich[this.entete.nbBLOC-1].tabEnreg[this.fich[this.entete.nbBLOC-1].nb-1].cle){
            return {nbVisites: obj,};   
        }
        while(inf<= sup && !trouve && !stop )
        {
            k = Math.trunc((inf + sup )/2);    
            if ( x >= this.fich[k].tabEnreg[0].cle  && x <= this.fich[k].tabEnreg[this.fich[k].nb - 1].cle ) {  
                   
                    r = this.fich[k].rech(x);
                    trouve = r.trouv;
                    p = r.j;
                    stop = true;
                }
            else
            {
                if ( x < this.fich[k].tabEnreg[0].cle) sup = k - 1;
                else                              inf = k + 1;
            }

            obj.nbLect++;
        }
        if (!trouve && !stop ) k = inf ;
        if (!trouve && this.fich[k].zd!=-1){
            r=this.rechzd(this.fich[k].zd,x);
            obj.nbLect += r.nbLect;
            if (r.trouv){
                nBL=r.i;
                nBE=r.j;
                trouve=r.trouv;
                zd=true;
            }
            else{
                let op=this.fich[k].zd;
                nBL=op;
                nBE=this.entete.nbEnrg;
                trouve=r.trouv;
                zd=true;
            }
        }
        return {
                   trouv : trouve,
                  i : k,
                  j : p,
                  z : zd,
                  nbl :nBL,
                  nbe : nBE,
                  nbVisites: obj,
                }
    }
    rechzd(i,x){
        let nbL = 0;
        let l;let y=i;
        let r=this.fich[y].rechzd(x);
        while ((this.fich[y].zd!=-1) && (!r.trouv)){
            y=this.fich[y].zd;
            r=this.fich[y].rechzd(x);
            nbL++;
        }
        if(!r.trouv){
        return{
            trouv : false,
            j : -1,
            i : i,
            nbLect: nbL,
            }
        }
        return {
            trouv : true,
            j : r.j,
            i : y,
            nbLect: nbL,
        }
    }

    insert(x)
    {
       let r = this.rech(x);
       if(!r.trouv)
       {
          this.entete.nbINS++;
          let bl = r.i;
         if(bl >= this.entete.nbBLOC )
         { 
            if (this.fich[this.entete.nbBLOC -1].zd!=-1){
                if (!this.fich[this.fich[this.entete.nbBLOC-1].zd].plein()) 
                {
                    this.fich[this.fich[this.entete.nbBLOC-1].zd].insertzd(x);
                }
                
                else{
                    if (this.fich[this.entete.nbBLOC-1].nbZd<2){
                    this.fich[this.fich[this.entete.nbBLOC-1].zd].zd=-1;this.fich[this.entete.nbBLOC-1].nbZd++;
                    let s = new BlocTOFzd();
                    s.b=this.entete.nbEnrg;
                    s.zd=this.fich[this.entete.nbBLOC-1].zd;
                    this.fich[this.entete.nbBLOC-1].zd=this.entete.numZD-1;
                    this.entete.numZD++;
                    this.fich[this.fich[this.entete.nbBLOC-1].zd]=s;
                    this.fich[this.fich[this.entete.nbBLOC-1].zd].insertzd(x);

                }
                else  console.log("2 zd pleine ");
                }
            }
            else{
             if (this.entete.numZD<=10) {
                this.fich[this.entete.nbBLOC-1].nbZd++;
                this.fich[this.entete.nbBLOC-1].zd=this.entete.numZD-1; 
                this.entete.numZD++;
                let s = new BlocTOFzd();
                s.b=this.entete.nbEnrg;
                this.fich[this.fich[this.entete.nbBLOC-1].zd]=s;
                this.fich[this.fich[this.entete.nbBLOC-1].zd].insertzd(x);
             }
             else{} // graphiquement impo inserer
            }
         }
         else
         {
         let p = this.fich[bl].plein();
        if(p){
            if (this.fich[bl].zd!=-1 ){ 
                if (!this.fich[this.fich[bl].zd].plein()) 
                {
                    this.fich[this.fich[bl].zd].insertzd(x);
                }
                
               else { if(this.fich[bl].nbZd<2 ){
                    this.fich[bl].nbZd++;
                    this.fich[this.fich[bl].zd].zd=-1;
                    let s = new BlocTOFzd();
                    s.b=this.entete.nbEnrg;
                    s.zd=this.fich[bl].zd;
                    this.fich[bl].zd=this.entete.numZD-1;
                    this.entete.numZD++;
                    this.fich[this.fich[bl].zd]=s;
                    this.fich[this.fich[bl].zd].insertzd(x);
                }
                else console.log("2 zd pleine ");
            }

            }
            else{
                if (this.entete.numZD<=10) {
                this.fich[bl].nbZd++;
                this.fich[bl].zd=this.entete.numZD-1;
                this.entete.numZD++;
                let s = new BlocTOFzd();
                s.b=this.entete.nbEnrg;
                this.fich[this.fich[bl].zd]=s;
                this.fich[this.fich[bl].zd].insertzd(x);
                }
                else{ } // graphiquement impo d'ajouter nbr maxi 
            }
         }
        else{
            let e = this.fich[bl].insert(x);
            if(e.supp) this.entete.nbSupp--;
         
        }
          
        }        
       }
    }


    delete(x)
    {
       let r = this.rech(x);
       if(r.trouv){
        if (!r.z) 
        {
            this.fich[r.i].delete(x);
            this.entete.nbSupp++;
            this.entete.nbINS--;
            this.plein();
        }
        else{
            if(this.fich[this.fich[r.i].zd].tabEnreg[this.fich[this.fich[r.i].zd].nb-1]==x){ this.fich[this.fich[r.i].zd].tabEnreg.splice(this.fich[this.fich[r.i].zd].nb-1, 1);}
            else{let n = this.fich[this.fich[r.i].zd].tabEnreg[this.fich[this.fich[r.i].zd].nb-1];
            this.fich[this.fich[r.i].zd].tabEnreg.splice(this.fich[this.fich[r.i].zd].nb-1, 1);
            this.fich[r.nbl].deletezd(x,n);
            this.entete.nbSupp++;
            this.entete.nbINS--;
            this.plein();
            }
            this.fich[this.fich[r.i].zd].nb--;
            }

        }
    }


   

    plein()
    {
        let bool = false;
        let i = 1;
        if(this.fich[0].nb == this.fich[0].b)  bool = true;
        while(i< this.entete.nbBLOC && bool)
        {
            if(this.fich[i].nb == this.fich[i].b)    bool = true;
            else                                     bool = false;
            i++;   
        }
        /*if(bool && this.entete.nbSupp === 0) bool = true;
        else                                 bool = false;*/
        return this.entete.plein = bool;    
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
        for (let i = 0; i<this.entete.nbBLOC; i++) 
        {
            console.log('Bloc',i+1,':');
            this.fich[i].afficher();
            console.log('**********************************');
        }
        }
        else console.log('le fichier n existe pas ');
    }
    afficherZd ()
    {
        
        for (let i = this.entete.nbBLOC; i<this.entete.numZD-1; i++) 
        { let j=0;
            while(j<this.entete.nbBLOC){
                if (this.fich[j].zd==i) {
                    console.log("ZD relative au bloc :",j+1);
            }
            j++;    
            }
            console.log('ZD',i+1,':');
            this.fich[i].afficherzd();
            console.log('**********************************');
        }
        
        
    }
}