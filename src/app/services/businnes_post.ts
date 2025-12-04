import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class BusinessService {
  private apiUrl = `${environment.apiUrl}/api/business`; // tu endpoint backend

  constructor(private http: HttpClient) {}

 
  getAll(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/all`);
  }

  getByUser(id_user: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/user/${id_user}`);
  }

  create(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/create`, formData);
  }

  delete(id_business: number, id_user: number): Observable<any> {
    // return this.http.delete(`${this.apiUrl}/${id_business}/${id_user}`);
    return this.http.delete(`${this.apiUrl}/${id_business}/${id_user}`);
  }

  update(id_business: number, id_user: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id_business}/${id_user}`, data);
  }

  // --- MÉTODOS NUEVOS PARA EXPORTAR ---
  
  exportExcel(): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/export/excel`, { responseType: 'blob' });
  }

  exportPdf(): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/export/pdf`, { responseType: 'blob' });
  }


}
