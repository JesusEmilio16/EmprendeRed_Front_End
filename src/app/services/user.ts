import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class User {
  private httpClient = inject(HttpClient);
  // private baseUrl = 'https://emprenderedbackend-production.up.railway.app/usuarios2';
  private baseUrl = `${environment.apiUrl}/usuarios2`;

  register(userData: any): Observable<any> {
    return this.httpClient.post(this.baseUrl, userData);
  }
}
