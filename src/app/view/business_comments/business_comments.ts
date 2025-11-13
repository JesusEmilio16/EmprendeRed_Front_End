import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

interface UserCommentResponse {
  id: number;
  content: string;
  createdAt: string;
  rating: number;
  userId: number;
  userName: string;
  userLastName: string;
  businessId: number;
  businessName: string;
}

interface UserCommentRequest {
  content: string;
  userId: number;
  businessId: number;
  rating: number;
}

interface Business {
  idBusiness: number;
  name: string;
  description: string;
}

@Component({
  selector: 'app-business-comments',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './business_comments.html',
  styleUrls: ['./business_comments.css']
})
export class BusinessComments implements OnInit {
  comments: UserCommentResponse[] = [];
  businesses: Business[] = [];

  selectedBusinessId: number = 0;
  newCommentContent: string = '';
  newCommentRating: number = 5;

  currentUserId: number = 0;

  isLoading: boolean = false;
  isSaving: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';

  private apiUrl = `${environment.apiUrl}/comments`;
  private businessApiUrl = `${environment.apiUrl}/api/business/all`;

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    // 🔐 Obtener usuario desde localStorage
    this.loadCurrentUser();

    if (this.currentUserId === 0) {
      this.errorMessage = 'Debes iniciar sesión para comentar';
      // Opcional: redirigir al login después de 2 segundos
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 2000);
      return;
    }

    this.loadBusinesses();
  }

  // 🔐 Método para cargar el usuario actual
loadCurrentUser(): void {
  try {
    // Intenta obtener el userId directamente
    const userIdStr = localStorage.getItem('userId');
    if (userIdStr) {
      this.currentUserId = parseInt(userIdStr);
      console.log('Usuario cargado:', this.currentUserId); // Para debug
      return;
    }

    // Si no está, intenta desde el objeto user
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const user = JSON.parse(userStr);
      this.currentUserId = user.idUser || user.id || user.userId;
      console.log('Usuario cargado desde user:', this.currentUserId); // Para debug
      return;
    }

    // Si no encuentra nada, queda en 0
    this.currentUserId = 0;
    console.warn('No se encontró usuario en localStorage');
  } catch (error) {
    console.error('Error al cargar usuario:', error);
    this.currentUserId = 0;
  }
}

  // Cargar lista de negocios
  loadBusinesses(): void {
    this.http.get<Business[]>(this.businessApiUrl).subscribe({
      next: (data) => {
        this.businesses = data;

        if (data.length === 0) {
          this.errorMessage = 'No hay negocios disponibles';
        } else if (data.length === 1) {
          this.selectedBusinessId = data[0].idBusiness;
          this.onBusinessSelected();
        }
      },
      error: (err) => {
        this.errorMessage = 'Error al cargar los negocios';
        console.error('Error:', err);
      }
    });
  }

  // Cuando se selecciona un negocio
  onBusinessSelected(): void {
    if (this.selectedBusinessId > 0) {
      this.loadComments();
    }
  }

  // Cargar comentarios del negocio seleccionado
  loadComments(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.http.get<UserCommentResponse[]>(`${this.apiUrl}/business/${this.selectedBusinessId}`).subscribe({
      next: (data) => {
        this.comments = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = 'Error al cargar comentarios';
        this.isLoading = false;
        console.error('Error:', err);
      }
    });
  }

  // Agregar comentario
  addComment(): void {
    // Verificar que el usuario esté logueado
    if (this.currentUserId === 0) {
      this.errorMessage = 'Debes iniciar sesión para comentar';
      return;
    }

    if (this.selectedBusinessId === 0) {
      this.errorMessage = 'Selecciona un negocio';
      return;
    }

    if (this.newCommentContent.trim().length < 10) {
      this.errorMessage = 'El comentario debe tener al menos 10 caracteres';
      return;
    }

    this.isSaving = true;
    this.errorMessage = '';

    const request: UserCommentRequest = {
      content: this.newCommentContent,
      rating: this.newCommentRating,
      businessId: this.selectedBusinessId,
      userId: this.currentUserId
    };

    this.http.post<UserCommentResponse>(this.apiUrl, request).subscribe({
      next: (comment) => {
        this.comments.unshift(comment);
        this.newCommentContent = '';
        this.newCommentRating = 5;
        this.successMessage = '¡Comentario publicado!';
        this.isSaving = false;

        setTimeout(() => this.successMessage = '', 3000);
      },
      error: (err) => {
        this.errorMessage = err.error?.error || 'Error al publicar comentario';
        this.isSaving = false;
        console.error('Error:', err);
      }
    });
  }

  // Eliminar comentario
  deleteComment(commentId: number): void {
    if (!confirm('¿Eliminar este comentario?')) return;

    this.http.delete(`${this.apiUrl}/${commentId}`).subscribe({
      next: () => {
        this.comments = this.comments.filter(c => c.id !== commentId);
        this.successMessage = 'Comentario eliminado';
        setTimeout(() => this.successMessage = '', 3000);
      },
      error: (err) => {
        this.errorMessage = 'Error al eliminar';
        console.error('Error:', err);
      }
    });
  }

  // Validar formulario
  isFormValid(): boolean {
    return this.currentUserId > 0 &&
           this.selectedBusinessId > 0 &&
           this.newCommentContent.trim().length >= 10 &&
           !this.isSaving;
  }

  // Verificar si es dueño del comentario
  isOwner(comment: UserCommentResponse): boolean {
    return comment.userId === this.currentUserId;
  }

  // Estrellas
  getStars(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
  }

  hasHalfStar(rating: number): boolean {
    return rating % 1 >= 0.5;
  }

  getEmptyStars(rating: number): number[] {
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.5;
    return Array(5 - fullStars - (hasHalf ? 1 : 0)).fill(0);
  }
}
