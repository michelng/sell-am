import { IVente } from '@/shared/model/vente.model';
import { IClient } from '@/shared/model/client.model';

import { StatutPaiement } from '@/shared/model/enumerations/statut-paiement.model';
export interface IFacture {
  id?: number;
  numero?: string | null;
  dateFacture?: Date | null;
  dateEcheance?: Date | null;
  montantTotal?: number | null;
  commentaire?: string | null;
  statutPaiement?: keyof typeof StatutPaiement | null;
  vente?: IVente | null;
  client?: IClient | null;
}

export class Facture implements IFacture {
  constructor(
    public id?: number,
    public numero?: string | null,
    public dateFacture?: Date | null,
    public dateEcheance?: Date | null,
    public montantTotal?: number | null,
    public commentaire?: string | null,
    public statutPaiement?: keyof typeof StatutPaiement | null,
    public vente?: IVente | null,
    public client?: IClient | null
  ) {}
}
