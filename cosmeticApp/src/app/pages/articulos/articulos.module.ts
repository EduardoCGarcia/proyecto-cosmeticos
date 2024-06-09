import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticulosRoutingModule } from './articulos-routing.module';
import { ArticulosComponent } from './articulos.component';
import { ListComponent } from './list/list.component';


@NgModule({
  declarations: [
    ArticulosComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    ArticulosRoutingModule
  ]
})
export class ArticulosModule { }
