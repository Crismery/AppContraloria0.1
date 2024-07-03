import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Appcontraloria } from '../../interfaz/appcontraloria';
import { RegistrosService } from '../../servicios/registros.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-dialogousuario',
  templateUrl: './dialogousuario.component.html',
  styleUrls: ['./dialogousuario.component.scss']
})
export class DialogousuarioComponent implements OnInit {
  appcontraloriamostrar!: Appcontraloria;
  borrarUsuarioForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<DialogousuarioComponent>,
    private registrosService: RegistrosService,
    private _snackbar: MatSnackBar,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: Appcontraloria
  ) {
    this.borrarUsuarioForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      comentarioeli: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.appcontraloriamostrar = { ...this.data };
    this.borrarUsuarioForm.patchValue({
      email: this.appcontraloriamostrar.email || '',
      comentarioeli: this.appcontraloriamostrar.comentarioeli || ''
    });
  }

  async onClickDeleteFields() {
    if (this.borrarUsuarioForm.invalid) {
      this._snackbar.open('Por favor, complete todos los campos obligatorios.', 'Cerrar', {
        duration: 3000,
      });
      return;
    }

    this.appcontraloriamostrar.fecha_de_elimusuario = new Date().toISOString();
    this.appcontraloriamostrar.email = this.borrarUsuarioForm.value.email;
    this.appcontraloriamostrar.comentarioeli = this.borrarUsuarioForm.value.comentarioeli;

    try {
      await this.registrosService.updatePlace(this.appcontraloriamostrar);
      await this.registrosService.deleteFields(this.appcontraloriamostrar);
      this._snackbar.open('Usuarios eliminados.', 'Cerrar', {
        duration: 3000,
      });
      this.dialogRef.close();
    } catch (error) {
      console.error('Error al borrar los usuarios:', error);
      this._snackbar.open('Error al borrar los usuarios.', 'Cerrar', {
        duration: 3000,
      });
    }
  }

  cerrarCentrado() {
    this.dialogRef.close();
  }
}