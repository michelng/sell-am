import { IFacture } from '@/shared/model/facture.model';

import { TypeClient } from '@/shared/model/enumerations/type-client.model';
import { Statut } from '@/shared/model/enumerations/statut.model';
export interface IClient {
  id?: number;
  identifiant?: string | null;
  nom?: string | null;
  prenom?: string | null;
  telephone1?: string | null;
  telephone2?: string | null;
  email?: string | null;
  photo?: string | null;
  description?: string | null;
  typeClient?: keyof typeof TypeClient | null;
  statut?: keyof typeof Statut | null;
  carteCredit?: string | null;
  factures?: IFacture[] | null;
}

export class Client implements IClient {
  constructor(
    public id?: number,
    public identifiant?: string | null,
    public nom?: string | null,
    public prenom?: string | null,
    public telephone1?: string | null,
    public telephone2?: string | null,
    public email?: string | null,
    public photo?: string | null,
    public description?: string | null,
    public typeClient?: keyof typeof TypeClient | null,
    public statut?: keyof typeof Statut | null,
    public carteCredit?: string | null,
    public factures?: IFacture[] | null
  ) {}
}
