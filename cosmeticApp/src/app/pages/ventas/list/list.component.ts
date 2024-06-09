import { Component } from '@angular/core';
import { Venta, VentasService } from '../services/ventas.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  ventas: Venta[] = [];
  clienteId: string | null = null;

  constructor(private ventasService: VentasService, private authService: AuthService) {}

  ngOnInit(): void {
    // Obtener el clienteId del servicio de autenticación
    this.authService.user$.subscribe(user => {
      if (user && user.user._id) {
        this.clienteId = user.user._id;
        this.obtenerVentas();
      }
    });
  }

  obtenerVentas(): void {
    if (this.clienteId) {
      this.ventasService.getVentasPorCliente(this.clienteId).subscribe(
        ventas => {
          this.ventas = ventas;
        },
        error => {
          console.error('Error al obtener las ventas:', error);
        }
      );
    }
  }
}
