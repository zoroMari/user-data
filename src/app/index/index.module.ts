import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { IndexComponent } from "./index.component";
import { UsersComponent } from "./users-table/users-table.component";
import { DxCheckBoxModule, DxDataGridModule, DxSelectBoxModule } from 'devextreme-angular';
import { UsersFilterComponent } from "./users-filter/users-filter.component";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    IndexComponent,
    UsersComponent,
    UsersFilterComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: 'index', component: IndexComponent }]),
    DxDataGridModule,
    DxCheckBoxModule,
    DxSelectBoxModule,
    ReactiveFormsModule,
  ],
  exports: [
    RouterModule,
  ],
})
export class IndexModule {

}
