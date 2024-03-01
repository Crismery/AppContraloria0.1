import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(private router: Router,
    private userService: UserService) {

  }
  redirigirARegistros() {
    this.router.navigate(['/registros']);
  }
  redirigirAEntrada() {
    this.router.navigate(['/entrada']);
  }
  redirigirAAsignacion() {
    this.router.navigate(['/asignacion']);
  }
  redirigirAAlmacen() {
    this.router.navigate(['/almacen']);
  }
  redirigirADescargo() {
    this.router.navigate(['/descargo']);
  }
  redirigirADescargoBN() {
    this.router.navigate(['/descargobn']);
  }
  redirigirAMantenimiento() {
    this.router.navigate(['/mantenimiento']);
  }
  redirigirAReporte() {
    this.router.navigate(['/reporte']);
  }
  redirigirASolicitudes() {
    this.router.navigate(['/solicitudes']);
  }
  onClick() {
    this.userService.logout()
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch(error => console.log(error));
  }
 }
