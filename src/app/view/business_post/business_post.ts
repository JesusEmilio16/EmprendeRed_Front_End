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
    nombreUsuario: '',
    name: '',
    direccion: '',
    barrio: '',
    description: '',
  };

  selectedFile: File | null = null;


  constructor(private businessService: BusinessService) {}

  ngOnInit(): void {}

  //proceso de crear emprendimeitno

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  saveBusiness(): void {
    if (
      !this.newBusiness.name ||
      !this.newBusiness.direccion ||
      !this.newBusiness.description
    ) {
      alert('Por favor llena todos los campos requeridos.');
      return;
    }

    const formData = new FormData();
    formData.append('nombreUsuario', this.newBusiness.nombreUsuario);
    formData.append('name', this.newBusiness.name);
    formData.append('direccion', this.newBusiness.direccion);
    formData.append('barrio', this.newBusiness.barrio);
    formData.append('description', this.newBusiness.description);

    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }
    
    console.log(this.newBusiness.nombreUsuario)
    console.log(this.newBusiness.name)
    console.log(this.newBusiness.direccion)
    console.log(this.newBusiness.barrio)
    console.log(this.newBusiness.description)

    this.businessService.create(formData).subscribe({
      next: (res) => {
        console.log('✅ Negocio guardado:', res);
        alert('Emprendimiento guardado correctamente');
        this.resetForm();
      },
      error: (err) => {
        console.error('❌ Error al guardar:', err);
        alert('Error al guardar el emprendimiento');
      },
    });
  }

  resetForm(): void {
    this.newBusiness = {
      nombreUsuario: '',
      name: '',
      direccion: '',
      barrio: '',
      description: '',
    };
    this.selectedFile = null;
  }
}
