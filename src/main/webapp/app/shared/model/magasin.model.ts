import { IEntreprise } from '@/shared/model/entreprise.model';

export interface IMagasin {
  id?: number;
  nom?: string | null;
  raisonSociale?: string | null;
  telephone1?: string | null;
  telephone2?: string | null;
  email?: string | null;
  logo?: string | null;
  description?: string | null;
  entreprise?: IEntreprise | null;
}

export class Magasin implements IMagasin {
  constructor(
    public id?: number,
    public nom?: string | null,
    public raisonSociale?: string | null,
    public telephone1?: string | null,
    public telephone2?: string | null,
    public email?: string | null,
    public logo?: string | null,
    public description?: string | null,
    public entreprise?: IEntreprise | null
  ) {}
}
