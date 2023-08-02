import { IArticle } from '@/shared/model/article.model';

import { TypeMvt } from '@/shared/model/enumerations/type-mvt.model';
export interface IMvtStck {
  id?: number;
  dateMvnt?: Date | null;
  quantite?: number | null;
  typeMvt?: keyof typeof TypeMvt | null;
  article?: IArticle | null;
}

export class MvtStck implements IMvtStck {
  constructor(
    public id?: number,
    public dateMvnt?: Date | null,
    public quantite?: number | null,
    public typeMvt?: keyof typeof TypeMvt | null,
    public article?: IArticle | null
  ) {}
}
