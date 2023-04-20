export interface IUser {
  id: number;
  picture: string;
  name: string;
  surname: string;
  fullName: string;
  gender?: string;
  phone?: string;
  city?: string;
  street?: string;
  email?: string;
}

export interface IFilter {
  gender: boolean;
  city: boolean;
  street: boolean;
  email: boolean;
  phone: boolean;
}

