import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  {
    path:'list',
    component: ListComponent
  },
  {
    path:'', redirectTo:'list', pathMatch:'full'
  },
  {
    path:'**', redirectTo:'error404', pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticulosRoutingModule { }
