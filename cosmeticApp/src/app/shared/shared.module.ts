import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { Error404Component } from './error404/error404.component';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { AuthService } from '../pages/auth/auth.service';



@NgModule({
  declarations: [
    HeaderComponent,
    Error404Component
  ],
  imports: [
    CommonModule,
    PrimeNgModule,
  ],
  exports: [
    HeaderComponent
  ],
})
export class SharedModule { }
