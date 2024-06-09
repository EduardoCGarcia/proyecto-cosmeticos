import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Articulo } from '../../articulos/services/articulo.service';

export interface CarritoItem {
  articulo: Articulo; // Tipo del ID del artículo
  cantidad: number;
  precio_unitario: number;
}

export interface ArticuloItem {
  articulo: string; // Tipo del ID del artículo
  cantidad: number;
  precio_unitario: number;
}

export interface CarritoVenta {
  codigo_venta: string;
  fecha: Date;
  cliente: string;
  articulos: CarritoItem[] | ArticuloItem[];
  total: number;
}

export interface Venta {
  codigo_venta: string;
  fecha: Date;
  cliente: string;
  articulos: ArticuloItem[];
  total: number;
}

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private carrito: CarritoItem[] = [];
  private carritoSubject = new BehaviorSubject<CarritoItem[]>([]);

  constructor() { }

  agregarAlCarrito(articulo: Articulo): void {
    // Verificar si el artículo ya está en el carrito
    const itemExistente = this.carrito.find(item => item.articulo._id === articulo._id);
    
    if (itemExistente) {
      // Si el artículo ya está en el carrito, aumentar la cantidad en 1
      itemExistente.cantidad++;
    } else {
      // Si el artículo no está en el carrito, agregarlo con una cantidad inicial de 1
      const carritoItem: CarritoItem ={
        articulo: articulo,
        cantidad: 1,
        precio_unitario: articulo.precio
      }
      this.carrito.push(carritoItem);
    }
    
    // Emitir el nuevo estado del carrito
    this.carritoSubject.next(this.carrito);
}

actualizarCarrito(carrito: CarritoItem[]): void {
  this.carrito = carrito;
  this.carritoSubject.next(this.carrito);
}

  obtenerCarrito(): BehaviorSubject<CarritoItem[]> {
    return this.carritoSubject;
  }
}
