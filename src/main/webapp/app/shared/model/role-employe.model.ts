export interface IRoleEmploye {
  id?: number;
  roleName?: string | null;
}

export class RoleEmploye implements IRoleEmploye {
  constructor(public id?: number, public roleName?: string | null) {}
}
