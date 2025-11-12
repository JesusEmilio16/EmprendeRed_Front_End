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
  userId: number | null = null;

  constructor(private businessService: BusinessService) {}

  ngOnInit(): void {
    // Leer el ID del usuario logueado desde localStorage
    const storedId = localStorage.getItem('userId');
    this.userId = storedId ? Number(storedId) : null;

    this.loadAllBusinesses();
    
  }


  //Cargar todos los negocios disponibles
  loadAllBusinesses(): void {
    this.businessService.getAll().subscribe({
      next: (data) => {
        this.businesses = data;
        console.log('Negocios cargados correctamente:', this.businesses);
      },
      error: (err) => {
        console.error('Error al obtener los negocios:', err);
      }
    });
  }

   //Eliminar un negocio
  deleteBusiness(id_business: number): void {
    if (!this.userId) {
      alert('Debes iniciar sesión para eliminar un negocio.');
      return;
    }

    const confirmDelete = confirm('¿Estás seguro de eliminar este negocio?');
    if (!confirmDelete) return;
    console.log(id_business);
    console.log(this.userId);
    
    this.businessService.delete(id_business, this.userId).subscribe({
      
      
      next: () => {
        alert('Negocio eliminado correctamente.');
        this.loadAllBusinesses(); // recarga la lista
      },
      error: (err) => {
        console.error('Error al eliminar el negocio:', err);
        alert('No tienes permisos para eliminar este negocio o ocurrió un error.');
      }
    });
  }

  
}
