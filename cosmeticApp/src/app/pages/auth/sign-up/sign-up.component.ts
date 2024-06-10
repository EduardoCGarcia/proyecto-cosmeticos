import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { User, UserResponse } from '../usuario';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      num_cuenta: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const formValues = this.registerForm.value;
      const user: UserResponse = {
        token: '',
        user: {
          name: formValues.name,
          lastname: formValues.lastname,
          num_cuenta: formValues.num_cuenta,
          email: formValues.email,
          password: formValues.password,
          token: '',
          expiresIn: '',
          userId: 0,
          role: 'user',
          avatar: ''
        },
        email: '',
        password: ''
      };
      this.authService.register(user.user).subscribe({
        next: (response) => {
          console.log('Registration successful', response);
          this.router.navigate(['pages/auth/login']); // Redirigir a la página de inicio de sesión después de un registro exitoso
        },
        error: (err) => {
          console.error('Registration error', err);
        }
      });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}
