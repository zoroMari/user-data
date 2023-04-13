import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { IndexComponent } from "./index.component";
import { UserDetailComponent } from "./users-table/user-details/user-detail.component";
import { UsersComponent } from "./users-table/users-table.component";
import { DxCheckBoxModule, DxDataGridModule, DxSelectBoxModule } from 'devextreme-angular';


@NgModule({
  declarations: [
    IndexComponent,
    UsersComponent,
    UserDetailComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: 'index', component: IndexComponent }]),
    DxDataGridModule,
    DxCheckBoxModule,
    DxSelectBoxModule,
  ],
  exports: [
    RouterModule,
  ],
})
export class IndexModule {

}
