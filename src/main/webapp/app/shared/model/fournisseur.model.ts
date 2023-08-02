import { Statut } from '@/shared/model/enumerations/statut.model';
export interface IFournisseur {
  id?: number;
  identifiant?: string | null;
  nomResponsable?: string | null;
  raisonSociale?: string | null;
  telephone1?: string | null;
  telephone2?: string | null;
  email?: string | null;
  logo?: string | null;
  description?: string | null;
  statut?: keyof typeof Statut | null;
}

export class Fournisseur implements IFournisseur {
  constructor(
    public id?: number,
    public identifiant?: string | null,
    public nomResponsable?: string | null,
    public raisonSociale?: string | null,
    public telephone1?: string | null,
    public telephone2?: string | null,
    public email?: string | null,
    public logo?: string | null,
    public description?: string | null,
    public statut?: keyof typeof Statut | null
  ) {}
}
