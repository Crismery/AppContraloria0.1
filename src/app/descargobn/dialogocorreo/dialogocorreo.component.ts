import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialogocorreo',
  templateUrl: './dialogocorreo.component.html',
  styleUrl: './dialogocorreo.component.scss'
})
export class DialogocorreoComponent {
 constructor(public dialogRef: MatDialogRef<DialogocorreoComponent>){}

 cerrarCentrado(){
  this.dialogRef.close();
}
}
