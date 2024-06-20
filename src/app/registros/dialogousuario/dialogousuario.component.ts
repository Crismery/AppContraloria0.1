import { Component,Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Appcontraloria } from '../../interfaz/appcontraloria';
import { RegistrosService } from '../../servicios/registros.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dialogousuario',
  templateUrl: './dialogousuario.component.html',
  styleUrl: './dialogousuario.component.scss'
})
export class DialogousuarioComponent implements OnInit {
 
  appcontraloriamostrar!: Appcontraloria;

constructor(public dialogRef: MatDialogRef<DialogousuarioComponent>,
private registrosService:RegistrosService,
private _snackbar: MatSnackBar,
@Inject(MAT_DIALOG_DATA) public data: Appcontraloria
){}

ngOnInit(): void {
  this.appcontraloriamostrar = { ...this.data };
}
 async onClickDeleteFields(appcontraloria: Appcontraloria) {
  if (this.appcontraloriamostrar) {

    this.appcontraloriamostrar.fecha_de_elimusuario = new Date().toISOString();
    this.registrosService.updatePlace(this.appcontraloriamostrar)
  }
    try {

      const response = await this.registrosService.deleteFields(appcontraloria);
      console.log('Usuarios eliminados y registro actualizado.');
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
