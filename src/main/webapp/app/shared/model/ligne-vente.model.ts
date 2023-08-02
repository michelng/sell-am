import { IVente } from '@/shared/model/vente.model';
import { IArticle } from '@/shared/model/article.model';

import { StatutVente } from '@/shared/model/enumerations/statut-vente.model';
export interface ILigneVente {
  id?: number;
  quantite?: number | null;
  prixUnitaire?: number | null;
  montantRemise?: number | null;
  montantTotal?: number | null;
  taxe?: number | null;
  commentaire?: string | null;
  statutVente?: keyof typeof StatutVente | null;
  vente?: IVente | null;
  article?: IArticle | null;
}

export class LigneVente implements ILigneVente {
  constructor(
    public id?: number,
    public quantite?: number | null,
    public prixUnitaire?: number | null,
    public montantRemise?: number | null,
    public montantTotal?: number | null,
    public taxe?: number | null,
    public commentaire?: string | null,
    public statutVente?: keyof typeof StatutVente | null,
    public vente?: IVente | null,
    public article?: IArticle | null
  ) {}
}
