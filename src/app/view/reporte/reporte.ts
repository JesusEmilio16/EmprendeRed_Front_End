import { Component } from '@angular/core';
import { ReportesService } from '../../services/reportes';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.html',
    styleUrls: ['./reporte.css']
})
export class ReporteComponent {

  constructor(private reportesService: ReportesService) {}

  descargarPDF() {
    this.reportesService.descargarPDF().subscribe((data: Blob) => {
      const archivo = new Blob([data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(archivo);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Usuarios_EmprendeRed.pdf';
      a.click();
      URL.revokeObjectURL(url);
    });
  }

  descargarExcel() {
    this.reportesService.descargarExcel().subscribe((data: Blob) => {
      const archivo = new Blob([data], {
        type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      });
      const url = window.URL.createObjectURL(archivo);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Usuarios_EmprendeRed.xlsx';
      a.click();
      URL.revokeObjectURL(url);
    });
  }
}
