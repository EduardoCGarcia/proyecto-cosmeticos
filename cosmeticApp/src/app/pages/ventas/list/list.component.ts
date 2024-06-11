import { Component } from '@angular/core';
import { Venta, VentasService } from '../services/ventas.service';
import { AuthService } from '../../auth/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ImpresionService } from '../services/impresion.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  ventas: Venta[] = [];
  ventasTotales: Venta[] = [];
  clienteId: string | null = null;
  rolUser: any;
  filteredVentas: any[] = [];
  filterForm: FormGroup | any;
  fechaFilter: any;

  constructor(private ventasService: VentasService, private authService: AuthService, private fb: FormBuilder, private srvImpresion: ImpresionService) {
    this.filterForm = this.fb.group({
      fecha:['']
    });
  }

  ngOnInit(): void {
    
    // Obtener el clienteId del servicio de autenticación
    this.authService.user$.subscribe(user => {
      if (user && user.user._id) {
        this.clienteId = user.user._id;
        this.rolUser = user.user.role;
        this.obtenerVentas();
        this.obtenerVentasTotales();
      }
    });
  }

  obtenerVentas(): void {
    
    if (this.clienteId && this.rolUser[0] === 'user') {
      console.log(this.rolUser[0]);
      this.ventasService.getVentasPorCliente(this.clienteId).subscribe(
        ventas => {
          this.ventas = ventas;
          console.log(this.ventas);
        },
        error => {
          console.error('Error al obtener las ventas:', error);
        }
      );
    }
  }

  obtenerVentasTotales(): void{
    this.ventasService.getVentasTotal().subscribe(
      ventas => {
        this.ventasTotales = ventas;
      },
      error => {
        console.error('Error al obtener las ventas:', error);
      }
    );
  }

  cargarVentasTotales(): void{
    this.ventas = this.ventasTotales;
    const encabezado = ['Código Venta', 'Fecha', 'Cliente', 'Artículos', 'Total'];

    this.srvImpresion.imprimir("Essence Cosmetics", encabezado, this.ventas, "Bienes Patrimoniales", "Nombre del Servidor Universitario: VARGAS PEÑA MARCELA MARGARITA","Organismo Académico o Dependencia: FACULTAD DE INGENIERÍA",  true);
  

  }

  onSubmit() {
    const fechaSeleccionada: Date = new Date(this.filterForm.value.fecha);
    
    // Obtener componentes de fecha
    const dia = (fechaSeleccionada.getDate() + 1).toString().padStart(2, '0');
    const mes = (fechaSeleccionada.getMonth() + 1).toString().padStart(2, '0'); // Sumar 1 porque los meses son base 0
    const year = fechaSeleccionada.getFullYear().toString(); // Obtener los últimos dos dígitos del año
  
    const fechaFormateada = `${year}-${mes}-${dia}`;

    this.ventasService.getVentasPorFecha(fechaFormateada).subscribe(data => {
      console.log(data);
    this.ventas = data;
    })
  }

}
