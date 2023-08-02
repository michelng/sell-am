import { IVente } from '@/shared/model/vente.model';
import { IEntreprise } from '@/shared/model/entreprise.model';

import { StatutEmploi } from '@/shared/model/enumerations/statut-emploi.model';
import { Statut } from '@/shared/model/enumerations/statut.model';
export interface IEmploye {
  id?: number;
  identifiant?: string | null;
  nom?: string | null;
  prenom?: string | null;
  dateNaissance?: Date | null;
  dateEmbauche?: Date | null;
  telephone1?: string | null;
  telephone2?: string | null;
  email?: string | null;
  salaire?: number | null;
  photo?: string | null;
  fonction?: string | null;
  statutEmploi?: keyof typeof StatutEmploi | null;
  statut?: keyof typeof Statut | null;
  ventes?: IVente[] | null;
  entreprise?: IEntreprise | null;
}

export class Employe implements IEmploye {
  constructor(
    public id?: number,
    public identifiant?: string | null,
    public nom?: string | null,
    public prenom?: string | null,
    public dateNaissance?: Date | null,
    public dateEmbauche?: Date | null,
    public telephone1?: string | null,
    public telephone2?: string | null,
    public email?: string | null,
    public salaire?: number | null,
    public photo?: string | null,
    public fonction?: string | null,
    public statutEmploi?: keyof typeof StatutEmploi | null,
    public statut?: keyof typeof Statut | null,
    public ventes?: IVente[] | null,
    public entreprise?: IEntreprise | null
  ) {}
}
