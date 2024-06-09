import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../usuario';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const formValues = this.loginForm.value;
      const user: User = {
        email: formValues.email,
        password: formValues.password
      };
      this.authService.login(user).subscribe({
        next: (response) => {
          console.log('Login successful', response);
          this.router.navigate(['/pages/articulos']); // Redirigir a la página de dashboard después de un inicio de sesión exitoso
        },
        error: (err) => {
          console.error('Login error', err);
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
  
}
