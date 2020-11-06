class IndexDense {
    tableIndexMC;
    maxLength;
    fichier_TnOF;
    
    chargIndex(f) {
        this.fichier_TnOF = f;
        this.tableIndexMC = [];
        this.maxLength = f.entete.nbBloc*f.entete.nbEnregMax;

        for (let i = 0; i < f.entete.nbBloc; i++)
            for (let j = 0; j < f.tabBloc[i].nb; j++)
                this.tableIndexMC.push({
                    cle: f.tabBloc[i].tab[j].cle,
                    adr: {
                        i: i,
                        j: j,
                    }
                });
        this.tableIndexMC.sort((x, y) => x.cle - y.cle); // trier la table d'index
    }

    rechercher(cle) {
        let k,
            inf = 0,
            sup = this.tableIndexMC.length - 1,
            trv = false,
            s = [];

        if (this.tableIndexMC.length > 0) {
            while (inf <= sup && !trv) {
                k = Math.trunc((sup + inf) / 2);
                s.push({ inf: inf, milieu: k, sup: sup });

                if (cle == this.tableIndexMC[k].cle) trv = true;
                else if (cle < this.tableIndexMC[k].cle) sup = k - 1;
                else inf = k + 1;
            }
        }

        if (inf > sup) {
            k = inf;
        }

        return {
            trouv: trv,
            i: k,
            tabSteps: s,
        };
    }

    inserer(e, i) {
        this.tableIndexMC.splice(i, 0, e);
    }

    supprimer(i) {
        this.tableIndexMC.splice(i, 1);
    }

}