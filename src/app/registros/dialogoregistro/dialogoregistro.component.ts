import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Appcontraloria } from '../../interfaz/appcontraloria';
import { RegistrosService } from '../../servicios/registros.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dialogoregistro',
  templateUrl: './dialogoregistro.component.html',
  styleUrl: './dialogoregistro.component.scss'
})
export class DialogoregistroComponent {
  

  constructor(public dialogRef: MatDialogRef<DialogoregistroComponent>,
    private registrosService: RegistrosService,
    private _snackbar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: Appcontraloria
  ) { }

  agregarFechaMomento(appcontraloria: Appcontraloria) {
    if (appcontraloria) {
      appcontraloria.fecha_de_borrados = new Date().toISOString();
      this.registrosService.updatePlace(appcontraloria)
        .then(() => {
          this._snackbar.open('Registro eliminado con éxito', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          });
        })
        .catch(error => {
          console.error('Error al agregar la fecha del momento al registro:', error);
        });
    } else {
      console.error('Registro no válido.');
    }
  }
  cerrarCentrado(){
    this.dialogRef.close();
  }
}
