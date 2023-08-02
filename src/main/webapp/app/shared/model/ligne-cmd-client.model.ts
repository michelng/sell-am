import { ICmdClient } from '@/shared/model/cmd-client.model';
import { IArticle } from '@/shared/model/article.model';

import { StatutCmd } from '@/shared/model/enumerations/statut-cmd.model';
export interface ILigneCmdClient {
  id?: number;
  quantite?: number | null;
  prixUnitaire?: number | null;
  dateLivraisonPrevue?: Date | null;
  montantTotal?: number | null;
  commentaire?: string | null;
  statutCmd?: keyof typeof StatutCmd | null;
  cmdClient?: ICmdClient | null;
  article?: IArticle | null;
}

export class LigneCmdClient implements ILigneCmdClient {
  constructor(
    public id?: number,
    public quantite?: number | null,
    public prixUnitaire?: number | null,
    public dateLivraisonPrevue?: Date | null,
    public montantTotal?: number | null,
    public commentaire?: string | null,
    public statutCmd?: keyof typeof StatutCmd | null,
    public cmdClient?: ICmdClient | null,
    public article?: IArticle | null
  ) {}
}
