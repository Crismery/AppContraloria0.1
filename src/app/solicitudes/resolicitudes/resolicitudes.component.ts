import { Component, OnInit, Inject, ViewContainerRef } from '@angular/core';
import { Correos } from '../../interfaz/correos';
import { EncorreoService } from '../../servicios/encorreo.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import Notiflix from 'notiflix';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-resolicitudes',
  templateUrl: './resolicitudes.component.html',
  styleUrls: ['./resolicitudes.component.scss']
})
export class ResolicitudesComponent implements OnInit {

  form: FormGroup;

  constructor(
    private correo: EncorreoService,
    private formBuilder: FormBuilder,
    private httpclient: HttpClient,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<ResolicitudesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.form = this.formBuilder.group({
        correo: [data.from || '', [Validators.required, Validators.email]],
        asunto: [data.subject || '', Validators.required],
        mensaje: [data.snippet || '', Validators.required],
        comentario: ['', Validators.required],
        estatu: ['', Validators.required],
        fecha_solicitud: [''],
        fecha_respuesta: ['']
      });
  }

  ngOnInit(): void {}

  enviar() {
    if (this.form.valid) {

      console.log(this.form.value);
      const response = this.correo.addPlace(this.form.value);

      console.log(response);
    }
    if (this.form.invalid) {
      this.snackBar.open('Correo es obligatorio', 'Cerrar', {
        duration: 3000,
        verticalPosition: 'top'
      });
      return;
    }

    Notiflix.Loading.hourglass('Cargando...');

    // Capturar los valores del formulario, incluyendo los campos deshabilitados
    const formValue = this.form.getRawValue();

    let params = {
      email: formValue.correo,
      asunto: formValue.asunto,
      mensaje: `${formValue.estatu} \n \n ${formValue.comentario}`
    }

    this.httpclient.post('http://localhost:3001/solicitudes', params).subscribe(resp => {
      console.log(resp);
      Notiflix.Loading.remove();
      Notiflix.Report.success(
        'Correo enviado',
        'El correo se envió con éxito',
        'Aceptar'
      );
      this.dialogRef.close();
    }, error => {
      Notiflix.Loading.remove();
      Notiflix.Report.failure(
        'Error',
        'No se pudo enviar el correo. Inténtalo de nuevo.',
        'Aceptar'
      );
      console.error('Error al enviar el correo:', error);
    });
  }

  cerrarCentrado() {
    this.dialogRef.close();
  }
}
