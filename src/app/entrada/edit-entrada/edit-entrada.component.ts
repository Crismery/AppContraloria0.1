import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Appcontraloria } from '../../interfaz/appcontraloria';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-entrada',
  templateUrl: './edit-entrada.component.html',
  styleUrl: './edit-entrada.component.scss'
})
export class EditEntradaComponent implements OnInit{

  appcontraloriaedit!: Appcontraloria;

  constructor(private dialogRef: MatDialogRef<EditEntradaComponent>,
    private formBuilder: FormBuilder,
    private _snackbar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: Appcontraloria) { }

    ngOnInit(): void {
      this.appcontraloriaedit = {...this.data};
    }

  cerrarCentrado(){
    this.dialogRef.close();
  }

}
