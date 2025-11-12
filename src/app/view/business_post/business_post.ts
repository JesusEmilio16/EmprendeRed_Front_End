import { Component, OnInit } from '@angular/core';
import { Footer } from '../footer/footer';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BusinessService } from '../../services/businnes_post';

@Component({
  selector: 'app-business_post',
  imports: [Footer, FormsModule, CommonModule],
  templateUrl: './business_post.html',
  styleUrl: './business_post.css',
})
export class Business_Post implements OnInit {
  newBusiness = {
    name: '',
    direccion: '',
    barrio: '',
    description: '',
  };

  selectedFile: File | null = null;

  constructor(private businessService: BusinessService) {}

  ngOnInit(): void {
    // Verificamos si hay usuario logueado
    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert('Debes iniciar sesión antes de publicar un negocio.');
      window.location.href = '/login'; // o redirige según tus rutas
    }
  }

  // Manejar selección de imagen
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  // Guardar negocio
  saveBusiness(): void {
    if (
      !this.newBusiness.name ||
      !this.newBusiness.direccion ||
      !this.newBusiness.description
    ) {
      alert('Por favor llena todos los campos requeridos.');
      return;
    }

    const userId = Number(localStorage.getItem('userId'));
    if (!userId) {
      alert('No se encontró el usuario logueado. Inicia sesión nuevamente.');
      return;
    }

    
    const businessData = {
      name: this.newBusiness.name,
      direccion: this.newBusiness.direccion,
      barrio: this.newBusiness.barrio,
      description: this.newBusiness.description,
      user: { id: userId }, // 👈 Relación con el usuario logueado
    };

    //imagen vía multipart/form-data:
    const formData = new FormData();
    formData.append('name', this.newBusiness.name);
    formData.append('direccion', this.newBusiness.direccion);
    formData.append('barrio', this.newBusiness.barrio);
    formData.append('description', this.newBusiness.description);
    formData.append('userId', userId.toString()); 
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    console.log('Datos enviados:', formData);

    // Enviar al servicio
    this.businessService.create(formData).subscribe({
      next: (res) => {
        console.log('✅ Negocio guardado:', res);
        alert('Emprendimiento guardado correctamente.');
        this.resetForm();
      },
      error: (err) => {
        console.error('❌ Error al guardar:', err);
        alert('Error al guardar el emprendimiento..');
      },
    });
  }

  resetForm(): void {
    this.newBusiness = {
      name: '',
      direccion: '',
      barrio: '',
      description: '',
    };
    this.selectedFile = null;
  }
 
}
