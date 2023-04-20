import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription, switchMap } from "rxjs";
import { tap } from 'rxjs/operators';
import { UserFilterService } from "src/app/services/user-filter-service";
import { UserDataService } from "src/app/services/users-data.service";
import { IFilter, IUser } from "src/models/user-info.model";

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.sass'],
})
export class UsersComponent implements OnInit, OnDestroy {
  public isDetails = true;
  public isFetched = true;
  public users: IUser[] = [];
  public userColumns!: string[];
  public userDatailInfo!: string[];
  private _sub!: Subscription;
  private readonly _userNecessaryInfo = ['picture', 'fullName', 'gender', 'phone'];
  private readonly _userDetailsNecessaryInfo = ['city', 'street', 'email'];

  constructor(
    private _userFilterService: UserFilterService,
    private _userDataService: UserDataService,
  ) { }

  ngOnInit(): void {
    this._sub = this._userFilterService.filterValues
      .pipe(
        tap(() => this.isFetched = false),
        switchMap(() => this._userDataService.fetchUsers())
      )
      .subscribe(
        (fetchedUsers) => {
          const filteredItems: IFilter = this._userFilterService.filterValues.getValue();
          this.isDetails = filteredItems.city || filteredItems.street || filteredItems.email;
          this.users = fetchedUsers;
          this.userColumns = this._defineInfoToShow(filteredItems, this._userNecessaryInfo);
          this.userDatailInfo = this._defineInfoToShow(filteredItems, this._userDetailsNecessaryInfo);
          this.isFetched = true;
        },
        (err) => {
          console.error('Failed to fetch users', err.message);
          this.isFetched = true;
        }
      )
  }

  private _defineInfoToShow(filters: IFilter, info: string[]): string[] {
    const result: string[] = [];
    info.forEach((item) => {
      if (!Object.hasOwnProperty.call(filters, item) || filters[item as keyof IFilter]) result.push(item);
    });
    return result;
  }

  ngOnDestroy(): void {
    this._sub.unsubscribe();
  }

  public addCaption(col: string): string {
    if (col === 'fullName') return 'Name';
    if (col === 'picture') return 'Photo';
    else return col[0].toUpperCase()+col.slice(1);
  }
}
