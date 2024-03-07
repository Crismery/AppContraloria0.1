import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-entrada',
  templateUrl: './add-entrada.component.html',
  styleUrl: './add-entrada.component.scss'
})
export class AddEntradaComponent {

  constructor(public dialogRef: MatDialogRef<AddEntradaComponent>) { }
  cerrarCentrado(){
    this.dialogRef.close();
  }
}
