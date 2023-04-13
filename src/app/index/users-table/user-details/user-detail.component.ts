import { AfterViewInit, Component, Input, OnInit } from "@angular/core";
import ArrayStore from "devextreme/data/array_store";
import DataSource from "devextreme/data/data_source";
import { IUser, UserService } from "../../../services/users-repository.service";

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.sass'],
})
export class UserDetailComponent implements OnInit, AfterViewInit {
  @Input() key!: number;
  public userDataSource!: DataSource;
  private _users!: IUser[];

  constructor(
    private _service: UserService,
  ) {}

  ngOnInit(): void {
    this._users = this._service.users;
  }

  ngAfterViewInit() {
    this.userDataSource = new DataSource({
      store: new ArrayStore({
        data: this._users,
        key: 'id',
      }),
      filter: ['id', '=', this.key],
    });
  }
}
