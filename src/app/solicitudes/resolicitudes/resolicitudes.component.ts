import { Component, OnInit, Inject, ViewContainerRef } from '@angular/core';
import { Correos } from '../../interfaz/correos';
import { EncorreoService } from '../../servicios/encorreo.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import Notiflix from 'notiflix';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-resolicitudes',
  templateUrl: './resolicitudes.component.html',
  styleUrl: './resolicitudes.component.scss'
})
export class ResolicitudesComponent implements OnInit {

  form: FormGroup;
  correos!: Correos;

  title = 'enviarrespuesta';

  emails: any[] = [];

  constructor(private correo: EncorreoService,
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
        fecha_respuesta: [''],
      });

    this.form = new FormGroup({
      correo: new FormControl('', [Validators.required, Validators.email]),
      asunto: new FormControl('', Validators.required),
      mensaje: new FormControl('', Validators.required),
      comentario: new FormControl('', Validators.required),
      estatu: new FormControl('', Validators.required),
    });

  }

  ngOnInit(): void {
    // this.getEmails();
  }

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
    let params = {
      email: this.form.value.correo,
      asunto: this.form.value.asunto,
      mensaje: `${this.form.value.estatu} \n \n - ${this.form.value.comentario}`
    }
    console.log(params)
    this.httpclient.post('http://localhost:3001/solicitudes', params).subscribe(resp => {
      console.log(resp)
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

  // getEmails() {
  //   this.correo.getEmails().subscribe(
  //     response => {
  //       this.emails = response;
  //       if (this.emails.length > 0) {
  //         this.form.patchValue({
  //           correo: this.emails[0].from,
  //           asunto: this.emails[0].subject,
  //           mensaje: this.emails[0].snippet
  //         });
  //       }
  //     },
  //     error => {
  //       console.error('Error al obtener los correos', error);
  //     }
  //   );
  // }
  cerrarCentrado() {
    this.dialogRef.close();
  }
}