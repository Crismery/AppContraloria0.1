import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Appcontraloria } from '../../interfaz/appcontraloria';
import { RegistrosService } from '../../servicios/registros.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  osSeleccionada: boolean = false;


  appcontraloriaedit: any = {};

  constructor( private dialogRef: MatDialogRef<AddMantenimientoComponent>,
    private registros: RegistrosService,
    private _snackbar: MatSnackBar ) { }
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
  toggleos(event: any) {
    this.osSeleccionada = event.checked;
  }

  actualizarLugar() {
    if (this.appcontraloriaedit) {
      this.registros.updatePlace(this.appcontraloriaedit)
        .then(() => {
          this._snackbar.open('Se editó con éxito.', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
          });
        })
        .catch(error => console.error('Error al actualizar el lugar:', error));
    } else {
      console.error('No hay información para actualizar');
    }
  }
}
