import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService, LoginResponse } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,   // componente standalone (no necesidad de declararlo en un NgModule)
  imports: [FormsModule, NgIf],  // módulos que usa el template (ngModel, *ngIf)
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  // inyección con función utilitaria (Angular 16+)
  private authService = inject(AuthService);
  private router = inject(Router);
  // propiedades ligadas al template con [(ngModel)]
  email = '';
  password = '';
  // estado UI
  loading = false;
  errorMessage: string | null = null;

  login() {
    // validación básica en frontend
    if (!this.email || !this.password) {
      this.errorMessage = 'Completa email y contraseña';
      return;
    }

    this.loading = true;

    // Llamada al servicio; queda tipada como LoginResponse
    this.authService.login(this.email, this.password).subscribe({
      next: (res: LoginResponse) => {
        this.loading = false;

        // Guardamos token y user en localStorage para persistir la sesión
        // res.token ?? '' => guarda string vacío si no viene token (evita null)
        localStorage.setItem('token', res.token ?? '');
        localStorage.setItem('user', JSON.stringify(res));

        // redirigir al home o dashboardddd
        this.router.navigate(['/']);
      },
      error: () => {
        this.loading = false;
        this.errorMessage = 'Credenciales inválidas';
      }
    });
  }
}
