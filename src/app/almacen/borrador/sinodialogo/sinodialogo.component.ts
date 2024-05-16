import { Component,Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { RegistrosService } from '../../../servicios/registros.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Appcontraloria } from '../../../interfaz/appcontraloria';

@Component({
  selector: 'app-sinodialogo',
  templateUrl: './sinodialogo.component.html',
  styleUrl: './sinodialogo.component.scss'
})
export class SinodialogoComponent implements OnInit{

  appcontraloriamostrar!: Appcontraloria;

  constructor(public dialogRef: MatDialogRef<SinodialogoComponent>,
    private dialog: MatDialog,
    private registrosService: RegistrosService,
    private _snackbar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: Appcontraloria
  ) {
  }
  // async onClickDelete(appcontraloria: Appcontraloria) {
  //   const response = await this.registrosService.deletePlaces(appcontraloria);
  //   console.log(response);
  //   this.dialogRef.close();
  //   if (response.success) {
  //     this._snackbar.open('Registro eliminado', 'Cerrar', {
  //       duration: 3000,
  //     });
  //   } else {
  //     this._snackbar.open('Error al eliminar el registro', 'Cerrar', {
  //       duration: 3000,
  //     });
  //   }
  // }
  ngOnInit(): void {
    this.appcontraloriamostrar = {...this.data};
  }
  actualizarLugar() {
    if (this.appcontraloriamostrar) {

      this.appcontraloriamostrar.fecha_de_borrados = new Date().toISOString();
      this.dialogRef.close();
      this.registrosService.updatePlace(this.appcontraloriamostrar)
        .then(() => {
          this._snackbar.open('La eliminacion ocurrio adecuadamente.', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
          });
        })
        .catch(error => console.error('Error al eliminar el lugar:', error));
    } else {
      console.error('No hay información para eliminar');
    }
  }
  cerrarCentrado(){
    this.dialogRef.close();
  }
}
