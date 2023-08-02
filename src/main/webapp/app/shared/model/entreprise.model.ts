import { IEmploye } from '@/shared/model/employe.model';
import { IMagasin } from '@/shared/model/magasin.model';

import { Statut } from '@/shared/model/enumerations/statut.model';
export interface IEntreprise {
  id?: number;
  nom?: string | null;
  raisonSociale?: string | null;
  telephone1?: string | null;
  telephone2?: string | null;
  email?: string | null;
  logo?: string | null;
  description?: string | null;
  sitWeb?: string | null;
  statut?: keyof typeof Statut | null;
  employes?: IEmploye[] | null;
  magasins?: IMagasin[] | null;
}

export class Entreprise implements IEntreprise {
  constructor(
    public id?: number,
    public nom?: string | null,
    public raisonSociale?: string | null,
    public telephone1?: string | null,
    public telephone2?: string | null,
    public email?: string | null,
    public logo?: string | null,
    public description?: string | null,
    public sitWeb?: string | null,
    public statut?: keyof typeof Statut | null,
    public employes?: IEmploye[] | null,
    public magasins?: IMagasin[] | null
  ) {}
}
