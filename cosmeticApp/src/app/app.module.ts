import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './pages/auth/auth.service';
import { CarritoService } from './pages/carrito/services/carrito.service';
import { VentasService } from './pages/ventas/services/ventas.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule
  ],
  providers: [AuthService, CarritoService, VentasService],
  bootstrap: [AppComponent]
})
export class AppModule { }
