import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Appcontraloria } from '../../interfaz/appcontraloria';
import { RegistrosService } from '../../servicios/registros.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-mantenimiento',
  templateUrl: './add-mantenimiento.component.html',
  styleUrl: './add-mantenimiento.component.scss'
})
export class AddMantenimientoComponent implements OnInit {

  tipomantenimiento: string='';

  memoriaSeleccionada: boolean = false;
  discoSeleccionada: boolean = false;
  limpiezaSeleccionada: boolean = false;
  osSeleccionada: boolean = false;
  defragmentacionChecked: boolean = false;

  appcontraloriaedit!: Appcontraloria;

  constructor( private dialogRef: MatDialogRef<AddMantenimientoComponent>,
    private registros: RegistrosService,
    private _snackbar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: Appcontraloria ) { }

    ngOnInit(): void {
      this.appcontraloriaedit = {...this.data};
    }
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
  toggleDefragmentacion(event: any) {
    this.defragmentacionChecked = event.checked;
    this.appcontraloriaedit.defragmentacion = this.defragmentacionChecked ? 'si' : 'no';
}

  actualizarLugar() {
    if (this.appcontraloriaedit) {

      this.appcontraloriaedit.tipo_de_mantenimiento = this.tipomantenimiento;

      this.appcontraloriaedit.fecha_de_mantenimiento = new Date().toISOString().split('T')[0];
      this.appcontraloriaedit.defragmentacion = this.defragmentacionChecked? 'Si' : 'No';

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
