import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';

export interface Articulo {
  _id: string,
  codigo: string,
  nombre: string,
  cantidad: number,
  precio: number,
  marca: string,
  modelo: string,
  num_serie: string,
  estado: string,
  caracteristicas: string,
  ubicacion: string,
  imagen_url: string
}

@Injectable({
  providedIn: 'root'
})
export class ArticuloService {
  private apiUrl = "http://localhost:3000/api/article";

  constructor(private http: HttpClient) { }

  obtenerInventario(): Observable<Articulo[]> {
    return this.http.get<Articulo[]>(this.apiUrl);
  }

  crearArticulo(articulo: Articulo): Observable<Articulo> {
    return this.http.post<Articulo>(this.apiUrl, articulo)
      .pipe(
        map((res: Articulo) => {
          return res;
        }),
        catchError((error) => this.handleError(error))
      )
  }

  eliminarArticulo(_id: string): Observable<Articulo>{
    return this.http.delete<Articulo>(`${this.apiUrl}/${_id}`);
  }

  actualizarArticulo(articulo: Articulo): Observable<Articulo>{
    return this.http.put<Articulo>(`${this.apiUrl}/${articulo._id}`,articulo);
  }

  /**
   * Maneja los errores de las promesas
   * @param error Error en una promesa
   * @returns una excepción
   */
  private handleError(error: any): Observable<never> {
    let errorMessage = 'Algo sucedio';
    if (error) {
      errorMessage = `Error: code ${error.message}`;
    }
    //window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
