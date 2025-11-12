import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Footer } from "../footer/footer";
import { BusinessService } from '../../services/businnes_post';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-business_show',
  imports: [CommonModule, Footer, HttpClientModule],
  templateUrl: './business_show.html',
  styleUrl: './business_show.css'
})
export class BusinessShow implements OnInit {

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
      }
    });
  }
}
