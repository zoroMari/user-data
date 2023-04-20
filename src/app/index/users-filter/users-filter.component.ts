import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { debounceTime, Subscription } from "rxjs";
import { IFilter } from "src/models/user-info.model";
import { UserFilterService } from "../../services/user-filter-service";

@Component({
  selector: 'app-users-filter',
  templateUrl: './users-filter.component.html',
  styleUrls: ['./users-filter.component.sass'],
})
export class UsersFilterComponent implements OnInit, OnDestroy {
  public form!: FormGroup;
  private _sub!: Subscription;

  constructor(
    private _filterService: UserFilterService,
  ) {}

  ngOnInit() {
    this._filterService.updateFilterValues();
    this._formInitialization(this._filterService.filterValues.getValue());

    this._sub = this.form.valueChanges
      .pipe(debounceTime(500))
      .subscribe(
        (res) => this._filterService.changeFilterValues(res)
    )
  }

  ngOnDestroy(): void {
    this._sub.unsubscribe();
  }

  private _formInitialization(value: IFilter): void {
    this.form = new FormGroup({
      gender: new FormControl(value.gender),
      city: new FormControl(value.city),
      street: new FormControl(value.street),
      email: new FormControl(value.email),
      phone: new FormControl(value.phone),
    })
  }
}
