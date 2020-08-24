export interface Sale {
  _id?: string;
  cpf_cnpj?: string;
  pageName?: string;
  cpf?: number;
  name?: string;
  email?: string;
  phone?: number;
  birthDate?: any;
  address?: {
    street?: string;
    postalCode?: string;
    district?: string;
    city?: string;
    state?: string;
    complement?: string;
    number?: number;
  };
  plan_id?: string;
  max_parcel?: number;
  value_plan?: number;
  membershipFee?: number;
  discount?: Array<number>;
  modulesArray?: Array<any>;
  comments?: string;
  userFlag?: number;
}
