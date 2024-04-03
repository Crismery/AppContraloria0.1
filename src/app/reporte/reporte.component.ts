import { Component } from '@angular/core';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrl: './reporte.component.scss'
})
export class ReporteComponent {

  asignacion: boolean = false;
  mantenimiento: boolean= false;
  entrada: boolean= false;
  registros: boolean = false;
  todo: boolean = false;

  constructor() { }

  toggleasignacion(event: any) {
    this.asignacion = event.checked;
  }
  togglematenimiento(event: any) {
    this.mantenimiento = event.checked;
  }
  toggleentrada(event: any) {
    this.entrada = event.checked;
  }
  toggleregistros(event: any) {
    this.registros = event.checked;
}
  toggletodo(event: any) {
    this.todo = event.checked;
  }
}