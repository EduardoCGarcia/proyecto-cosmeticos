import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VentasRoutingModule } from './ventas-routing.module';
import { VentasComponent } from './ventas.component';
import { ListComponent } from './list/list.component';
import { ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    VentasComponent,
    ListComponent
  ],
  imports: [
    CommonModule,
    VentasRoutingModule,
    ReactiveFormsModule,
  ]
})
export class VentasModule { }
