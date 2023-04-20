import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { IFilter, IUser } from "src/models/user-info.model";
import { UserFilterService } from "./user-filter-service";

@Injectable({ providedIn: 'root' })
export class UserDataService {
  private _seed = 'users';

  private readonly _necessaryInfo: string[] = [
    'picture', 'name', 'surname', 'gender', 'phone', 'location', 'email',
  ]

  constructor(
    private _http: HttpClient,
    private _userFilterService: UserFilterService,
  ) {}

  public fetchUsers(): Observable<IUser[]> {
    const filterValue = this._userFilterService.filterValues.getValue();
    const includingFields: string = this._defineNecessaryInfo(this._necessaryInfo, filterValue).join(',');

    return this._http.get<{results: any[], info: any}>(`https://randomuser.me/api/?results=100&seed=${this._seed}&inc=${includingFields}`)
    .pipe(
      map((res) => {
        return res.results.map((item, index) => {
          const street: string | undefined = item.location ? `${item.location?.street?.name}, ${item.location?.street?.number}` : undefined;

          return <IUser> {
            id: index + 1,
            picture: item.picture?.medium,
            name: item.name?.first,
            surname: item.name?.last,
            fullName: `${item.name?.first} ${item.name?.last}`,
            gender: item.gender,
            phone: item.phone,
            city: item.location?.city,
            street: street,
            email: item.email,
          };
        });
      })
    );
  }

  private _defineNecessaryInfo(allInfo: string[], filterValues: IFilter): string[] {
    const res: string[] = [];
    allInfo.forEach((item) => {
      if (!Object.hasOwnProperty.call(filterValues, item) && (item !== 'location') || (filterValues[item as keyof IFilter])) {
        res.push(item);
      }
      if (item === 'location') {
        if (filterValues.city || filterValues.street) res.push(item);
      }
    })
    return res;
  }
}
