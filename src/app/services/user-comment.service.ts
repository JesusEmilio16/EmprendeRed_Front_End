import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserCommentRequest, UserCommentResponse, AverageRatingResponse } from '../interfaces/user-comment.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserCommentService {
    private apiUrl = `${environment.apiUrl}/comments`;

  constructor(private http: HttpClient) {}

  // Obtener todos los comentarios
  getAllComments(): Observable<UserCommentResponse[]> {
    return this.http.get<UserCommentResponse[]>(this.apiUrl)
      .pipe(catchError(this.handleError));
  }

  // Obtener comentario por ID
  getCommentById(id: number): Observable<UserCommentResponse> {
    return this.http.get<UserCommentResponse>(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  // Obtener comentarios por negocio
  getCommentsByBusiness(businessId: number): Observable<UserCommentResponse[]> {
    return this.http.get<UserCommentResponse[]>(`${this.apiUrl}/business/${businessId}`)
      .pipe(catchError(this.handleError));
  }

  // Obtener comentarios por usuario
  getCommentsByUser(userId: number): Observable<UserCommentResponse[]> {
    return this.http.get<UserCommentResponse[]>(`${this.apiUrl}/user/${userId}`)
      .pipe(catchError(this.handleError));
  }

  // Crear comentario
  createComment(request: UserCommentRequest): Observable<UserCommentResponse> {
    return this.http.post<UserCommentResponse>(this.apiUrl, request)
      .pipe(catchError(this.handleError));
  }

  // Actualizar comentario
  updateComment(id: number, request: UserCommentRequest): Observable<UserCommentResponse> {
    return this.http.put<UserCommentResponse>(`${this.apiUrl}/${id}`, request)
      .pipe(catchError(this.handleError));
  }

  // Eliminar comentario
  deleteComment(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`)
      .pipe(catchError(this.handleError));
  }

  // Obtener promedio de rating
  getAverageRating(businessId: number): Observable<AverageRatingResponse> {
    return this.http.get<AverageRatingResponse>(`${this.apiUrl}/business/${businessId}/average-rating`)
      .pipe(catchError(this.handleError));
  }

  // Manejo de errores
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ocurrió un error desconocido';

    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error del lado del servidor
      if (error.error && error.error.error) {
        errorMessage = error.error.error;
      } else {
        errorMessage = `Código de error: ${error.status}\nMensaje: ${error.message}`;
      }
    }

    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
