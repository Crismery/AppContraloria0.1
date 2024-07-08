import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RegistrosService } from '../../servicios/registros.service';
import { Appcontraloria } from '../../interfaz/appcontraloria';
import { ActivatedRoute} from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-add-registros',
  templateUrl: './add-registros.component.html',
  styleUrl: './add-registros.component.scss'
})
export class AddRegistrosComponent implements OnInit{

  appcontraloriaedit!: Appcontraloria;

  constructor(public dialogRef: MatDialogRef<AddRegistrosComponent>,
    private registros: RegistrosService,
    private _snackbar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: Appcontraloria){
  }

 
 ngOnInit(): void {
  this.appcontraloriaedit = {...this.data};
}
actualizarLugar() {
  if (this.appcontraloriaedit) {

    this.appcontraloriaedit.fecha_de_actualizacion = new Date().toISOString().split('T')[0];
    this.dialogRef.close();
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

  cerrarCentrado(){
    this.dialogRef.close();
  }
}
