import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarritoComponent } from './carrito.component';

const routes: Routes = [
  {
    path:'list',
    component: CarritoComponent
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
export class CarritoRoutingModule { }
