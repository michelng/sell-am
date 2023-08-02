export interface ICategorie {
  id?: number;
  code?: string | null;
  designation?: string | null;
  description?: string | null;
}

export class Categorie implements ICategorie {
  constructor(public id?: number, public code?: string | null, public designation?: string | null, public description?: string | null) {}
}
