import { Component } from '@angular/core';
import { CarritoItem, CarritoService, ArticuloItem, CarritoVenta } from './services/carrito.service';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { UserResponse } from '../auth/usuario';
import { VentasService, Venta } from '../ventas/services/ventas.service';
import { ImpresionService } from '../ventas/services/impresion.service';
import { Articulo } from '../articulos/services/articulo.service';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent {
  carrito: CarritoItem[] = [];
  nombreCliente: any; // Variable para almacenar el nombre del cliente
  userSubscription: Subscription | undefined; // Suscripción al observable user$
  role:string = '';
  usuario!:UserResponse
  total:number = 0

  constructor(private carritoService: CarritoService, private authService: AuthService, private ventasService:VentasService, private srvImpresion: ImpresionService) {
    this.userSubscription = this.authService.user$.subscribe(user => {
      console.log(user)
      if (user) {
        this.nombreCliente = user.user?._id;
        console.log(user.user.role)
        this.role = user.user.role;
        this.usuario = user
      } else {
        this.nombreCliente = null;
      }
    });
  }
  ngOnInit(): void {
    // Suscribirse al carrito para obtener los elementos actualizados
    this.carritoService.obtenerCarrito().subscribe(carrito => {
      this.carrito = carrito;
    });

    // Obtener el nombre del cliente del servicio de autenticación
    this.nombreCliente = this.authService.userValue?.user._id ?? null

    // Calcula el total y añade los artículos a la venta
    let contador = 0;
this.carrito.forEach(item => {
  contador += item.cantidad * item.precio_unitario;
});
this.total = parseFloat(contador.toFixed(2)); // Redondear el total a dos dígitos decimales
this.actualizarCarrito();
  }

  ngOnDestroy(): void {
    // Desuscribirse al destruir el componente para evitar memory leaks
    this.userSubscription?.unsubscribe();
  }

  incrementarCantidad(item: CarritoItem): void {
    item.cantidad++;
    let contador = 0;
this.carrito.forEach(item => {
  contador += item.cantidad * item.precio_unitario;
});
this.total = parseFloat(contador.toFixed(2)); // Redondear el total a dos dígitos decimales
this.actualizarCarrito();

    this.actualizarCarrito();
  }

  decrementarCantidad(item: CarritoItem): void {
    if (item.cantidad > 1) {
      item.cantidad--;
      // Calcula el total y añade los artículos a la venta
      let contador = 0;
      this.carrito.forEach(item => {
        contador += item.cantidad * item.precio_unitario;
      });
      this.total = parseFloat(contador.toFixed(2)); // Redondear el total a dos dígitos decimales
      this.actualizarCarrito();
    }
  }

  eliminarItem(item: CarritoItem): void {
    const index = this.carrito.indexOf(item);
    if (index !== -1) {
      this.carrito.splice(index, 1);
      let contador = 0;
this.carrito.forEach(item => {
  contador += item.cantidad * item.precio_unitario;
});
this.total = parseFloat(contador.toFixed(2)); // Redondear el total a dos dígitos decimales
this.actualizarCarrito();
      this.actualizarCarrito();
    }
  }

  private actualizarCarrito(): void {
    this.carritoService.actualizarCarrito(this.carrito);
  }

  realizarVenta(): void {
    // Crea el objeto de venta
    let venta: any = {
      codigo_venta: this.generarCodigoAleatorio(10),
      fecha: new Date(),
      cliente: this.nombreCliente ?? 'Cliente no identificado', // Usa el nombre del cliente o una cadena predeterminada si no está disponible
      articulos: [],
      total: 0
    };

    // Calcula el total y añade los artículos a la venta
    let contador = 0;
    this.carrito.forEach(item => {
      venta.articulos.push({
        articulo: item.articulo._id,
        cantidad: item.cantidad,
        precio_unitario: item.precio_unitario
      });
      contador += item.cantidad * item.precio_unitario;
    });
    venta.total = contador;
    this.total= contador 

    console.log(this.carrito)

    const venta1:any = {
      codigo_venta: venta.codigo_venta,
      fecha: new Date(),
      cliente: this.usuario.user,
      articulos: this.carrito.map(articulo => articulo),
      total: venta.total
    }
    console.log(venta1)

    const doc = new jsPDF();
    this.srvImpresion.imprimirTicket(doc, venta1);

this.ventasService.crearVenta(venta).subscribe(data => {
  console.log(data)
  
})


    this.carritoService.actualizarCarrito([])

    console.log(venta);
  }

  generarCodigoAleatorio(longitud: number): string {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let codigo = '';
    for (let i = 0; i < longitud; i++) {
      const indice = Math.floor(Math.random() * caracteres.length);
      codigo += caracteres.charAt(indice);
    }
    return codigo;
  }
}
