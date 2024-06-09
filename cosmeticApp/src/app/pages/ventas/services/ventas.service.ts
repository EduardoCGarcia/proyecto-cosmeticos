import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../../auth/usuario';
import { Articulo } from '../../articulos/services/articulo.service';
import { CarritoVenta } from '../../carrito/services/carrito.service';

export interface Venta {
  codigo_venta: string;
  fecha: Date;
  cliente: Usuario;
  articulos: {
    articulo: Articulo;
    cantidad: number;
    precio_unitario: number;
  }[];
  total: number;
}


@Injectable({
  providedIn: 'root'
})
export class VentasService {

  private API_URL = 'http://localhost:3000/api/venta';

  constructor(private http: HttpClient) {}

  getVentasPorCliente(clienteId: string): Observable<Venta[]> {
    return this.http.get<Venta[]>(`${this.API_URL}/${clienteId}`);
  }

  crearVenta(venta: CarritoVenta): Observable<Venta> {
    return this.http.post<Venta>(this.API_URL, venta);
  }

}
