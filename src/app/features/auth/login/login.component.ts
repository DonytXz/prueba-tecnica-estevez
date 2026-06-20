import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  errorMessage = '';
  isLoading = signal(false);

  loginForm = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', Validators.required]
  });

  // Accepts either a valid email or a phone number (+ optional country code, 7-15 digits)
//   emailOrPhoneValidator(control: AbstractControl): ValidationErrors | null {
//     const value = control.value as string | null;
//     if (!value) return null;
//     const emailValid = Validators.email(control) == null;
//     const phoneRegex = /^\+?\d{7,15}$/;
//     const phoneValid = phoneRegex.test(value);
//     return emailValid || phoneValid ? null : { emailOrPhone: true };
//   }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading.set(true);
      this.errorMessage = '';

      const { username, password } = this.loginForm.value;

      this.authService.login(username!, password!).subscribe({
        next: (user) => {
          this.isLoading.set(false);
          if (user) {
            this.router.navigate(['/clients']);
          } else {
            this.errorMessage = 'Credenciales inválidas. Usuario de prueba: emilys / emilyspass';
          }
        },
        error: () => {
          this.isLoading.set(false);
          this.errorMessage = 'Error de conexión con el servidor.';
        }
      });
    }
  }
}
