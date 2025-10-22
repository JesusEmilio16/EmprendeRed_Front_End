import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { User } from '../../services/user';
import { inject } from '@angular/core';

@Component({
  selector: 'app-register',
  imports: [RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  userService = inject(User);

  handleSubmit(event: Event) {
    event.preventDefault();
    const dataForm = new FormData(event.target as HTMLFormElement);
    const formValues = Object.fromEntries(dataForm);
    this.userService.register(formValues);
  }
}
