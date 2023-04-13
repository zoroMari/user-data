import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs";

@Injectable({ providedIn: 'root' })
export class UserDataService {
  private _seed = 'users';

  constructor(private _http: HttpClient) {

  }

  public fetchUsers() {
    return this._http.get<{results: any[], info: any}>(`https://randomuser.me/api/?results=100&seed=${this._seed}`)
    .pipe(
      map((res) => {
        return res.results.map((item, index) => {
          return {
            'id': index + 1,
            'picture': item.picture.medium,
            'name': item.name?.first,
            'surname': item.name?.last,
            'fullName': `${item.name?.first} ${item.name?.last}`,
            'gender': item.gender,
            'phone': item.phone,
            'city': item.location.city,
            'street': `${item.location?.street?.name}, ${item.location?.street?.number}`,
            'email': item.email,
          }
        });
      })
    );
  }
}
