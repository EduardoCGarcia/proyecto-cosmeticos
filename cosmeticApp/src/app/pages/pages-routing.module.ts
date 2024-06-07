import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { LogInComponent } from './auth/log-in/log-in.component';

const routes: Routes = [
  {
    path:'auth',
    loadChildren:() => import("./auth/auth.module").then(m => m.AuthModule)
  },
  {
    path:'', redirectTo:'auth', pathMatch:'full'
  },
  {
    path:'**', redirectTo:'error404', pathMatch:'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
