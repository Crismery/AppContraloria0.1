import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import Notiflix from 'notiflix';
import { Appcontraloria } from '../../interfaz/appcontraloria';

@Component({
  selector: 'app-dialogocorreo',
  templateUrl: './dialogocorreo.component.html',
  styleUrl: './dialogocorreo.component.scss'
})
export class DialogocorreoComponent implements OnInit {

  title = 'enviarcorreo';

  datos: FormGroup;
  appcontraloria: Appcontraloria[] = [];

  appcontraloriacorreo!: Appcontraloria;

  constructor(public dialogRef: MatDialogRef<DialogocorreoComponent>,
    private httpclient: HttpClient,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.datos = new FormGroup({
      correo: new FormControl('', [Validators.required, Validators.email]),
      asunto: new FormControl('', Validators.required),
      mensaje: new FormControl('', Validators.required)
    });
  }


  ngOnInit(): void {
    this.construirFormulario();

    this.appcontraloriacorreo = { ...this.data };
  }

  private construirFormulario(): void {
    this.datos = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      asunto: ['', Validators.required],
      mensaje: [this.obtenerInformacion()]
    });
  }

  obtenerInformacion(): string {
    if (!Array.isArray(this.data)) {
      console.error('El objeto "data" no es un array.');
      return '';
    }

    const mensajeesta = 'Estos Dispositivo seran enviados al decargo de bienes nacionales:  ';
    const informacion = this.data.map(registro =>
      `-Dispositivo: ${registro.dispositivo}, Modelo: ${registro.modelo}, Serial: ${registro.serial}, Placa: ${registro.placa}`
    );

    return mensajeesta +'\n'+'\n'+ informacion.join('\n');
  }
  // obtenerdispositivos(): string {
  //   if (!Array.isArray(this.data)) {
  //     console.error('El objeto "data" no es un array.');
  //     return ''; // Devuelve una cadena vacía u otra acción apropiada
  //   }

  //   const registrosFiltrados = this.data.filter(registro => registro.fecha_de_descargoBN);

  //   const informacion = registrosFiltrados.map(registro =>
  //     `Dispositivo: ${registro.dispositivo}, Modelo: ${registro.modelo}, Serial: ${registro.serial}, Placa: ${registro.placa}`
  //   );

  //   return informacion.join('\n');
  // }

  enviarcorreo() {

    if (this.datos.invalid) {
      this.snackBar.open('Correo es obligatorio', 'Cerrar', {
        duration: 3000,
        verticalPosition: 'top'
      });
      return;
    }
    Notiflix.Loading.hourglass('Cargando...');
    let params = {
      email: this.datos.value.correo,
      asunto: this.datos.value.asunto,
      mensaje: this.datos.value.mensaje
    }
    console.log(params)
    this.httpclient.post('http://localhost:3000/envio', params).subscribe(resp => {
      console.log(resp)
      Notiflix.Loading.remove();
      Notiflix.Notify.success('Correo enviado correctamente');
      this.datos.reset();
      //this.dialogRef.close();
    })
  }

  cerrarCentrado() {
    this.dialogRef.close();
  }
}
