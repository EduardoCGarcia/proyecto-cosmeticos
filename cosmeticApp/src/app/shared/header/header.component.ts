import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/pages/auth/auth.service';
import { UserResponse } from 'src/app/pages/auth/usuario';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  items: MenuItem[] = [];
  isLoggedIn: boolean = false;
  isAdmin: any;

  constructor(public authService: AuthService) { }

  ngOnInit() {
    this.authService.user$.subscribe((user: UserResponse | null) => {
      this.isLoggedIn = !!user;
      this.isAdmin = user?.user.role[0];
      this.updateMenuItems();
    });
  }

  updateMenuItems() {
    this.items = [
      { label: 'Productos', icon: 'pi pi-box', routerLink: ['pages/articulos'] },
      ...(!this.isLoggedIn ? [
        { label: 'Registrar', icon: 'pi pi-user-plus', routerLink: ['pages/auth/signup'] },
        { label: 'Login', icon: 'pi pi-sign-in', routerLink: ['pages/auth/login'] },
      ] : [
        ...(this.isAdmin == 'admin' ? [
        { label: 'Ventas', icon: 'pi pi-wallet', routerLink: ['pages/ventas'] },
        { label: 'LogOut', icon: 'pi pi-sign-out', command: () => this.logout() },
        ] : [
          { label: 'Carrito', icon: 'pi pi-shopping-cart', routerLink: ['pages/carrito'] },
          { label: 'Compras', icon: 'pi pi-wallet', routerLink: ['pages/ventas'] },
          { label: 'LogOut', icon: 'pi pi-sign-out', command: () => this.logout() },
        ]),
      ]),
    ];
  }

  logout() {
    this.authService.logout();
  }
}
