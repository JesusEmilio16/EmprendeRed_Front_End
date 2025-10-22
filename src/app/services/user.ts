import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class User {
  httpClient = inject(HttpClient);
  register(userData: any) {
    this.httpClient.post('http://localhost:8080/usuarios2', userData).subscribe(response => {
      console.log('User registered successfully', response);
    }, error => {
      console.error('Error registering user', error);
    });
  }
}
