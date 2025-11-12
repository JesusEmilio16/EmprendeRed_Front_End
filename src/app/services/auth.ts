import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// ✅ Interfaz correcta para que Angular sepa qué devuelve el backend
export interface LoginResponse {
  idUser: number;
  name: string;
  email: string;
  token?: string; // el JWT que genera tu backend (opcional)
}

@Injectable({
  providedIn: 'root'  // hace el servicio singleton y disponible en toda la app
})
export class AuthService {

  // URL del endpoint de login de tu backend
  private apiUrl = 'https://emprenderedbackend-production.up.railway.app/auth/login';

  // HttpClient inyectado para hacer peticiones HTTP
  constructor(private http: HttpClient) {}

   /**
   * login(email, password)
   * - Envía POST { email, password } a tu backend
   * - Retorna un Observable tipado como LoginResponse
   * - El componente que llame a este método debe suscribirse (.subscribe)
   */
  login(email: string, password: string): Observable<LoginResponse> {
    const body = { email, password };
    return this.http.post<LoginResponse>(this.apiUrl, body);
  }
}
