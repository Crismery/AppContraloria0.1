import { Component,Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Appcontraloria } from '../../interfaz/appcontraloria';
import { RegistrosService } from '../../servicios/registros.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dialogousuario',
  templateUrl: './dialogousuario.component.html',
  styleUrl: './dialogousuario.component.scss'
})
export class DialogousuarioComponent {
 
constructor(public dialogRef: MatDialogRef<DialogousuarioComponent>,
private registrosService:RegistrosService,
private _snackbar: MatSnackBar,
@Inject(MAT_DIALOG_DATA) public data: Appcontraloria
){}

 async onClickDeleteFields(appcontraloria: Appcontraloria) {
    try {

      const response = await this.registrosService.deleteFields(appcontraloria);
      console.log('Usuarios eliminados.');
      this.dialogRef.close();
      this._snackbar.open('Usuarios eliminados.', 'Cerrar', {
          duration: 3000,
      });
    } catch (error) {
      console.error('Error al borrar los usuarios:', error);

      this._snackbar.open('Error al borrar los usuarios.', 'Cerrar', {
          duration: 3000,
      });
    }
  }
cerrarCentrado(){
  this.dialogRef.close();
}
}
