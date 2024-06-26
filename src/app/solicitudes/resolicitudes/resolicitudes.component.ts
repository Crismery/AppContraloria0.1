import { Component, OnInit, Inject} from '@angular/core';
import { EncorreoService } from '../../servicios/encorreo.service';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
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

  emailId:string;
  form: FormGroup;

  constructor(
    private correo: EncorreoService,
    private formBuilder: FormBuilder,
    private httpclient: HttpClient,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<ResolicitudesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.emailId= data.id;
      this.form = this.formBuilder.group({
        correo: [data.from || '', [Validators.required, Validators.email]],
        asunto: [data.subject || '', Validators.required],
        mensaje: [data.snippet|| '', Validators.required],
        comentario: ['', Validators.required],
        estatu: ['', Validators.required],
        fecha_solicitud: [data.date || '', Validators.required],
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

    Notiflix.Loading.standard('Cargando...');

    const formValue = this.form.getRawValue();
    let params = {
      emailId: this.emailId,
      asunto: formValue.asunto,
      mensaje: `${formValue.estatu}. \n \n ${formValue.comentario}`
    };
    
    this.httpclient.post('http://localhost:3002/api/respond', params).subscribe(resp => {
      console.log(resp);
      Notiflix.Loading.remove();
      Notiflix.Notify.success('Correo enviado correctamente');
      this.dialogRef.close();
      this.correo.notifyCorreoActualizado();
    });
  }
  cerrarCentrado() {
    this.dialogRef.close();
  }
}
