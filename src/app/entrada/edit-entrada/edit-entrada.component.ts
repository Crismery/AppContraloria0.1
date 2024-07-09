import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Appcontraloria } from '../../interfaz/appcontraloria';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RegistrosService } from '../../servicios/registros.service';

@Component({
  selector: 'app-edit-entrada',
  templateUrl: './edit-entrada.component.html',
  styleUrl: './edit-entrada.component.scss'
})
export class EditEntradaComponent implements OnInit{

  appcontraloriaeditar!: Appcontraloria;

  constructor(private dialogRef: MatDialogRef<EditEntradaComponent>,
    private formBuilder: FormBuilder,
    private _snackbar: MatSnackBar,
    private registros: RegistrosService,
    @Inject(MAT_DIALOG_DATA) public data: Appcontraloria) { }

    ngOnInit(): void {
      this.appcontraloriaeditar = {...this.data};
    }

    actualizarLugar() {
      if (this.appcontraloriaeditar) {
        this.appcontraloriaeditar.fecha_de_actualizacion = new Date().toISOString().split('T')[0];
        this.dialogRef.close();
        this.registros.updatePlace(this.appcontraloriaeditar)
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
    

  cerrarCentrado(){
    this.dialogRef.close();
  }

}
