import { IFournisseur } from '@/shared/model/fournisseur.model';

import { StatutCmd } from '@/shared/model/enumerations/statut-cmd.model';
export interface ICmdFournisseur {
  id?: number;
  code?: string | null;
  dateCommande?: Date | null;
  dateLivraisonPrevue?: Date | null;
  montantTotal?: number | null;
  commentaire?: string | null;
  statutCmd?: keyof typeof StatutCmd | null;
  fournisseur?: IFournisseur | null;
}

export class CmdFournisseur implements ICmdFournisseur {
  constructor(
    public id?: number,
    public code?: string | null,
    public dateCommande?: Date | null,
    public dateLivraisonPrevue?: Date | null,
    public montantTotal?: number | null,
    public commentaire?: string | null,
    public statutCmd?: keyof typeof StatutCmd | null,
    public fournisseur?: IFournisseur | null
  ) {}
}
