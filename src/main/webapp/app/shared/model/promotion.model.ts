export interface IPromotion {
  id?: number;
  code?: string | null;
  description?: string | null;
  dateDebut?: Date | null;
  dateFin?: Date | null;
}

export class Promotion implements IPromotion {
  constructor(
    public id?: number,
    public code?: string | null,
    public description?: string | null,
    public dateDebut?: Date | null,
    public dateFin?: Date | null
  ) {}
}
