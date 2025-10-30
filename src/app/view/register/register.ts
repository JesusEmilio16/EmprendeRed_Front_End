import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../services/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class Register {
  userService = inject(User);
  router = inject(Router);

  async handleSubmit(event: Event) {
    event.preventDefault();
    const form = event.target as HTMLFormElement; //indicar que el target es un formulario

    // Usa validación nativa del navegador (required, pattern, minlength, email, etc.)
    if (!form.reportValidity()) {
      // reportValidity muestra mensajes nativos si hay error
      return;
    }

    const dataForm = new FormData(form);
    const formValues = Object.fromEntries(dataForm) as any;

    // Validación custom: confirm password
    const password = formValues.password as string;
    const confirmPassword = formValues.confirmPassword as string;
    if (password !== confirmPassword) {
      // Podemos usar alert simple o mostrar mensaje en la UI
      alert('Las contraseñas no coinciden.');
      return;
    }

    // Remover confirmPassword antes de enviar
    delete formValues.confirmPassword;

    // Llamar servicio y esperar resultado
    this.userService.register(formValues).subscribe({
      next: (res) => {
        console.log('User registered successfully', res);
        // redirigir al login o al home
        this.router.navigate(['/login']);
        alert('Registro exitoso. Por favor inicia sesión.');
      },
      error: (err) => {
        console.error('Error registering user', err);
        // Mostrar error amable
        if (err?.error?.message) alert('Error: ' + err.error.message);
        else if (err?.status === 400) alert('Datos inválidos, revisa el formulario.');
        else alert('Error al registrar. Intenta más tarde.');
      }
    });
  }
}
