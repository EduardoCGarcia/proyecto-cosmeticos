import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { PrimeNgModule } from 'src/app/prime-ng/prime-ng.module';
import { LogInComponent } from './log-in/log-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './auth.service';


@NgModule({
  declarations: [
    LogInComponent,
    SignUpComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    
    ReactiveFormsModule,

    PrimeNgModule
  ]
})
export class AuthModule { }
