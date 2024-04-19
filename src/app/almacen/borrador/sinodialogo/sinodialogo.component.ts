import { Component,Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { RegistrosService } from '../../../servicios/registros.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Appcontraloria } from '../../../interfaz/appcontraloria';

@Component({
  selector: 'app-sinodialogo',
  templateUrl: './sinodialogo.component.html',
  styleUrl: './sinodialogo.component.scss'
})
export class SinodialogoComponent {

  constructor(public dialogRef: MatDialogRef<SinodialogoComponent>,
    private dialog: MatDialog,
    private registrosService: RegistrosService,
    private _snackbar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: Appcontraloria
  ) {
  }
  async onClickDelete(appcontraloria: Appcontraloria) {
    const response = await this.registrosService.deletePlaces(appcontraloria);
    console.log(response);
    if (response.success) {
      this._snackbar.open('Registro eliminado', 'Cerrar', {
        duration: 3000,
      });
    } else {
      this._snackbar.open('Error al eliminar el registro', 'Cerrar', {
        duration: 3000,
      });
    }
  }
  cerrarCentrado(){
    this.dialogRef.close();
  }
}
