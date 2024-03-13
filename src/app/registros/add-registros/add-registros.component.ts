import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-add-registros',
  templateUrl: './add-registros.component.html',
  styleUrl: './add-registros.component.scss'
})
export class AddRegistrosComponent {

  constructor(public dialogRef: MatDialogRef<AddRegistrosComponent>){

  }
  cerrarCentrado(){
    this.dialogRef.close();
  }
}
