import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ImageModule } from 'primeng/image';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';


@NgModule({
  exports:[
    CardModule,
    ImageModule,
    PasswordModule,
    ButtonModule,
    MenubarModule
  ]
})
export class PrimeNgModule { }
