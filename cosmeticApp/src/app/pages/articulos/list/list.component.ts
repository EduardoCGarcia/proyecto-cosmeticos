import { Component, OnInit } from '@angular/core';
import { Articulo, ArticuloService } from '../services/articulo.service';
import { CarritoItem, CarritoService } from '../../carrito/services/carrito.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit{

  public listaDeArticulos !: Articulo[]

  constructor(private artService:ArticuloService, private carritoService: CarritoService) {}

  ngOnInit(): void {
      this.artService.obtenerInventario().subscribe(articulos => {
        this.listaDeArticulos = articulos
      })
  }

  agregarAlCarrito(articulo: Articulo): void {
    console.log(articulo)
    this.carritoService.agregarAlCarrito(articulo);
  }
}
