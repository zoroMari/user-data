import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { UserDataService } from "src/app/services/users-data.service";
import { UserService } from "../../services/users-repository.service";

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.sass'],
})
export class UsersComponent implements OnInit, OnDestroy {
  private _sub!: Subscription;

  constructor(
    public userService: UserService,
    private _userDataService: UserDataService,
  ) {}

  ngOnInit(): void {
    this._sub = this._userDataService.fetchUsers().subscribe(
      (res) => this.userService.users = res
    )
  }

  ngOnDestroy(): void {
    this._sub.unsubscribe();
  }


  // ---------------------------

  readonly displayModes = [
    { text: "Display Mode 'full'", value: 'full' },
    { text: "Display Mode 'compact'", value: 'compact' }
  ];
  public displayMode = 'full';
  public showInfo = true;
  public showNavButtons = true;


  get isCompactMode() {
    return this.displayMode === 'compact';
  }
}
