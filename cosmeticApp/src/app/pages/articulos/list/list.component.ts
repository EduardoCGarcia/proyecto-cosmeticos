import { Component, OnInit } from '@angular/core';
import { Articulo, ArticuloService } from '../services/articulo.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit{

  public listaDeArticulos !: Articulo[]

  constructor(private artService:ArticuloService) {}

  ngOnInit(): void {
      this.artService.obtenerInventario().subscribe(articulos => {
        this.listaDeArticulos = articulos
      })
  }
}
