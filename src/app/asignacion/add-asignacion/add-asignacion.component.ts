import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-asignacion',
  templateUrl: './add-asignacion.component.html',
  styleUrl: './add-asignacion.component.scss'
})
export class AddAsignacionComponent {

  constructor(public dialogRef:MatDialogRef<AddAsignacionComponent>) { }

  cerrarCentrado(){
    this.dialogRef.close();
  }
}
