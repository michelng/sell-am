import { IMagasin } from '@/shared/model/magasin.model';
import { ICategorie } from '@/shared/model/categorie.model';

export interface IArticle {
  id?: number;
  code?: string | null;
  designation?: string | null;
  prixUnitaireHt?: number | null;
  tauxTva?: number | null;
  prixUnitaireTtc?: number | null;
  photo?: string | null;
  quantiteEnStock?: number | null;
  seuilDeReapprovisionnement?: number | null;
  magasin?: IMagasin | null;
  categorie?: ICategorie | null;
}

export class Article implements IArticle {
  constructor(
    public id?: number,
    public code?: string | null,
    public designation?: string | null,
    public prixUnitaireHt?: number | null,
    public tauxTva?: number | null,
    public prixUnitaireTtc?: number | null,
    public photo?: string | null,
    public quantiteEnStock?: number | null,
    public seuilDeReapprovisionnement?: number | null,
    public magasin?: IMagasin | null,
    public categorie?: ICategorie | null
  ) {}
}
