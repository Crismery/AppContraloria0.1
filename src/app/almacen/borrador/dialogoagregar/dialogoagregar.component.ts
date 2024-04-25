import { Component,Inject } from '@angular/core';
import { Appcontraloria } from '../../../interfaz/appcontraloria';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RegistrosService } from '../../../servicios/registros.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dialogoagregar',
  templateUrl: './dialogoagregar.component.html',
  styleUrl: './dialogoagregar.component.scss'
})
export class DialogoagregarComponent {

  constructor(public dialogRef: MatDialogRef<DialogoagregarComponent>,
    private registrosService: RegistrosService,
    private _snackbar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: Appcontraloria){}

  agregarFechaMomento(appcontraloria: Appcontraloria) {
    if (appcontraloria) {

      appcontraloria.fecha_de_descargoBN = '';
  
      appcontraloria.fecha_de_reingreso = new Date().toISOString();
    this.dialogRef.close();
      this.registrosService.updatePlace(appcontraloria)
        .then(() => {
          this._snackbar.open('Registro enviado a descargo de bienes nacionales', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          });
        })
        .catch(error => {
          console.error('Error al agregar la fecha del momento al registro:', error);
          this._snackbar.open('Error al actualizar el registro', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          });
        });
    } else {
      console.error('Registro no válido.');
      this._snackbar.open('Registro no válido', 'Cerrar', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });
    }
  }
  cerrarCentrado(){
    this.dialogRef.close();
  }
}
