import { ICmdFournisseur } from '@/shared/model/cmd-fournisseur.model';
import { IArticle } from '@/shared/model/article.model';

import { StatutCmd } from '@/shared/model/enumerations/statut-cmd.model';
export interface ILigneCmdFournisseur {
  id?: number;
  quantite?: number | null;
  prixUnitaire?: number | null;
  dateLivraisonPrevu?: Date | null;
  montantTotal?: number | null;
  commentaire?: string | null;
  statutCmd?: keyof typeof StatutCmd | null;
  cmdFournisseur?: ICmdFournisseur | null;
  article?: IArticle | null;
}

export class LigneCmdFournisseur implements ILigneCmdFournisseur {
  constructor(
    public id?: number,
    public quantite?: number | null,
    public prixUnitaire?: number | null,
    public dateLivraisonPrevu?: Date | null,
    public montantTotal?: number | null,
    public commentaire?: string | null,
    public statutCmd?: keyof typeof StatutCmd | null,
    public cmdFournisseur?: ICmdFournisseur | null,
    public article?: IArticle | null
  ) {}
}
