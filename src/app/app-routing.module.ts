import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full' },
  {
    path: '',
    loadChildren: () => import('./index/index.module').then(m => m.IndexModule),
  },
  {
    path: '',
    loadChildren: () => import('./about/about.module').then(m => m.AboutModule),
  },
  { path: '**', redirectTo: 'index' },
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
