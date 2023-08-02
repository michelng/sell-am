import { IClient } from '@/shared/model/client.model';
import { IEmploye } from '@/shared/model/employe.model';

import { StatutPaiement } from '@/shared/model/enumerations/statut-paiement.model';
export interface IVente {
  id?: number;
  code?: string | null;
  dateVente?: Date | null;
  commentaire?: string | null;
  montantTotal?: number | null;
  statutPaiement?: keyof typeof StatutPaiement | null;
  client?: IClient | null;
  employe?: IEmploye | null;
}

export class Vente implements IVente {
  constructor(
    public id?: number,
    public code?: string | null,
    public dateVente?: Date | null,
    public commentaire?: string | null,
    public montantTotal?: number | null,
    public statutPaiement?: keyof typeof StatutPaiement | null,
    public client?: IClient | null,
    public employe?: IEmploye | null
  ) {}
}
