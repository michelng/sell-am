import { IClient } from '@/shared/model/client.model';

import { StatutCmd } from '@/shared/model/enumerations/statut-cmd.model';
export interface ICmdClient {
  id?: number;
  code?: string | null;
  dateCommande?: Date | null;
  dateLivraisonPrevue?: Date | null;
  montantTotal?: number | null;
  commentaire?: string | null;
  statutCmd?: keyof typeof StatutCmd | null;
  client?: IClient | null;
}

export class CmdClient implements ICmdClient {
  constructor(
    public id?: number,
    public code?: string | null,
    public dateCommande?: Date | null,
    public dateLivraisonPrevue?: Date | null,
    public montantTotal?: number | null,
    public commentaire?: string | null,
    public statutCmd?: keyof typeof StatutCmd | null,
    public client?: IClient | null
  ) {}
}
