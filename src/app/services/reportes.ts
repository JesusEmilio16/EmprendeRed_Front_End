import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {

  private baseUrl = '${environment.apiUrl}/usuarios2'; // Ajusta a tu backend

  constructor(private http: HttpClient) {}

  descargarPDF() {
    return this.http.get(`${this.baseUrl}/reporte/pdf`, {
      responseType: 'blob'
    });
  }

  descargarExcel() {
    return this.http.get(`${this.baseUrl}/export/excel`, {
      responseType: 'blob'
    });
  }

}
