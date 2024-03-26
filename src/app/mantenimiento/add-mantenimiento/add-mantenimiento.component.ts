import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-mantenimiento',
  templateUrl: './add-mantenimiento.component.html',
  styleUrl: './add-mantenimiento.component.scss'
})
export class AddMantenimientoComponent {

  tipomantenimiento: string='';

  memoriaSeleccionada: boolean = false;
  discoSeleccionada: boolean = false;
  limpiezaSeleccionada: boolean = false;

  constructor( private dialogRef: MatDialogRef<AddMantenimientoComponent>) { }
  cerrarCentrado(){
    this.dialogRef.close();
  }
  toggleMemoria(event: any) {
    this.memoriaSeleccionada = event.checked;
  }
  toggledisco(event: any) {
    this.discoSeleccionada = event.checked;
  }
  togglelimpieza(event: any) {
    this.limpiezaSeleccionada = event.checked;
  }
}
