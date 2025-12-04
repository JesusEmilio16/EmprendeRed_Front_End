import { Component, OnInit } from '@angular/core';
import { BusinessService } from '../../services/businnes_post';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ReporteComponent } from '../reporte/reporte';

@Component({
  selector: 'app-main-page',
  imports: [HttpClientModule,CommonModule,ReporteComponent ],
  templateUrl: './main-page.html',
  styleUrl: './main-page.css',
})
export class MainPage implements OnInit {
  businesses: any[] = [];

  constructor(private businessService: BusinessService) {}

  ngOnInit(): void {
    this.loadBusinesses();
  }

  loadBusinesses(): void {
    this.businessService.getAll().subscribe({
      next: (data) => {
        this.businesses = data;
        console.log('Datos cargados:', this.businesses);
      },
      error: (err) => {
        console.error('Error al obtener los negocios', err);
      },
    });
  }
}
