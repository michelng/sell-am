export interface IDiscount {
  id?: number;
  code?: string | null;
  description?: string | null;
  montant?: number | null;
}

export class Discount implements IDiscount {
  constructor(public id?: number, public code?: string | null, public description?: string | null, public montant?: number | null) {}
}
