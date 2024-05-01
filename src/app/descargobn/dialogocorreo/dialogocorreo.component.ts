import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialogocorreo',
  templateUrl: './dialogocorreo.component.html',
  styleUrl: './dialogocorreo.component.scss'
})
export class DialogocorreoComponent {

  datos: FormGroup;

 constructor(public dialogRef: MatDialogRef<DialogocorreoComponent>){
  this.datos = new FormGroup({
  
  });
 }

 cerrarCentrado(){
  this.dialogRef.close();
}
}
