import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class User {
  private httpClient = inject(HttpClient);
  private baseUrl = 'http://localhost:8080/usuarios2';

  register(userData: any): Observable<any> {
    return this.httpClient.post(this.baseUrl, userData);
  }
}
