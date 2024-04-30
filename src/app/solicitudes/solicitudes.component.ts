import { Component } from '@angular/core';

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrl: './solicitudes.component.scss'
})
export class SolicitudesComponent {

  tiposolicitud: string='';
  
  devices: string[] = [
    'Desktop',
    'Laptop',
    'Monitor',
    'Teléfono',
    'Impresora',
    'Mouse',
    'Teclado',
    'Proyector',
    'Audífonos',
    'Puntero'
  ];

  // deviceQuantities: number[] = new Array(this.devices.length).fill(0);

  constructor(){}

}
