import { Injectable } from '@angular/core';

export interface IUser {
  id: number;
  picture: string;
  name: string;
  surname: string;
  fullName: string;
  gender: string;
  phone: string;
  city: string;
  street: string;
  email: string;
}


@Injectable({ providedIn: 'root' })
export class UserService {
  public users: IUser[] = [];
}
