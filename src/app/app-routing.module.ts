import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AboutComponent } from "./about/about.component";
import { UsersComponent } from "./users/users.component";

const routes: Routes = [
  // { path: '', redirectTo: 'index', pathMatch: 'full' },
  { path: 'index', component: UsersComponent },
  { path: 'about', component: AboutComponent },
  { path: '**', redirectTo: '' },
]


@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule,
  ]
})
export class AppRoutingModule {

}
