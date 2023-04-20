import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { IFilter } from "src/models/user-info.model";

@Injectable({ providedIn: 'root' })
export class UserFilterService {
  private _key = 'filterValues';

  public filterValues = new BehaviorSubject<IFilter>({
    gender: true,
    city: true,
    street: true,
    email: true,
    phone: true,
  })

  public changeFilterValues(value: IFilter): void {
    this.filterValues.next(value);
    this._saveNewFilterValues(value);
  }

  public updateFilterValues(): void {
    const fromLocStor = localStorage.getItem(this._key);
    if (!fromLocStor) return;
    try {
      this.filterValues.next(JSON.parse(fromLocStor));
    } catch (err) {
      localStorage.removeItem(this._key);
    }
  }

  private _saveNewFilterValues(value: IFilter): void {
    localStorage.setItem(this._key, JSON.stringify(value));
  }
 }
