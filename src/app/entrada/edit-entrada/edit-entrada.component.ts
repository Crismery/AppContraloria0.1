import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-entrada',
  templateUrl: './edit-entrada.component.html',
  styleUrl: './edit-entrada.component.scss'
})
export class EditEntradaComponent {

  constructor(private dialogRef: MatDialogRef<EditEntradaComponent>,
    private formBuilder: FormBuilder,
    private _snackbar: MatSnackBar) { }

  cerrarCentrado(){
    this.dialogRef.close();
  }

}
