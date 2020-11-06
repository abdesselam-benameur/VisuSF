class IndexNonDense {
    tableIndexMC;
    
    chargIndex(f) {
       
        this.tableIndexMC = [];

        for (let i = 0; i < f.entete.nbBLOC; i++)
                this.tableIndexMC.push({
                    cle: f.fich[i].tab[f.fich[i].nb-1].cle,
                    bloc: i
                });
    }

    rechercher(cle) {
        
        let k,
            inf = 0,
            sup = this.tableIndexMC.length - 1,
            stop = false,
            s = [];

        if (this.tableIndexMC.length > 0) {

              while (inf <= sup && !stop) 
             {
                k = Math.trunc((sup + inf) / 2);
                s.push({ inf: inf, milieu: k, sup: sup });
          
                if (cle <= this.tableIndexMC[k].cle )
                {
                    if(k === 0) stop = true;
                    else  if(cle>this.tableIndexMC[k-1].cle) stop = true;  
                } 
                if(!stop){
                if (cle < this.tableIndexMC[k].cle) sup = k - 1;
                else inf = k + 1;
                }
             }
        }

        if (inf > sup) {
            k = this.tableIndexMC.length - 1;
        }
       

        return {
            i: k,
            tabSteps: s
        };
    }


    miseAjour(i){
        if(i>this.tableIndexMC[this.tableIndexMC.length-1].cle)
        {
           this.tableIndexMC[this.tableIndexMC.length-1].cle = i;   
        }
    }

  
}


function rechercher(cle, index, f) {

    let bloc = index.rechercher(cle).i;
    let r = f.fich[bloc].rech(cle);
    return {
             trouv : r.trouv,
             j : r.j,
             i : bloc
      }
}


function supprimer(cle, index, f){

    let bloc = index.rechercher(cle).i;
    let res = f.fich[bloc].delete(cle);

    if(res != 0){
        f.entete.nbINS--;
        f.entete.nbSupp++;
    }

    return res;
}

function inserer(cle, index, f){
    let bloc = index.rechercher(cle).i;
    let r = f.fich[bloc].rech(cle);
    let trouv = r.trouv;
    let j = r.j;

    if(!trouv){
        f.entete.nbINS++;

        if(f.fich[bloc].nb < f.fich[bloc].b || f.fich[bloc].tab[j].eff)
        {   
            if(cle <= index.tableIndexMC[index.tableIndexMC.length-1].cle){
                let res = f.fich[bloc].insert(cle);
                if(res.supp) f.entete.nbSupp--;

                return res;
            }
            else {
                f.fich[bloc].tab[f.fich[bloc].nb] = {cle: cle, eff: false};
                f.fich[bloc].nb++;
                index.miseAjour(cle);
            }

        }
    }
    else return false;

}
