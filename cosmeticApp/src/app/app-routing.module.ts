import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404Component } from './shared/error404/error404.component';

const routes: Routes = [
  {
    path:'pages',
    loadChildren:() => import("./pages/pages.module").then(m => m.PagesModule)
  },
  {
    path:'error404',
    component:Error404Component
  },
  {
    path:'**', redirectTo:'error404', pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
