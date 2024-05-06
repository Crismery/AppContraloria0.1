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

  constructor(public dialogRef: MatDialogRef<DialogocorreoComponent>,
    private httpclient: HttpClient,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.datos = new FormGroup({
      correo: new FormControl('', [Validators.required, Validators.email]),
      asunto: new FormControl('', Validators.required),
      mensaje: new FormControl('')
    });
  }


  ngOnInit(): void {
    this.construirFormulario();
  }

  private construirFormulario(): void {
    this.datos = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      asunto: ['', Validators.required],
      mensaje: [this.data ? this.obtenerdispositivos(this.data) : '']
    });
  }

  // obtenerInformacion(registro: Appcontraloria): string {
  //   // Aquí construyes la cadena de información usando las propiedades de registro
  //   return `Dispositivo: ${registro.dispositivo}, Modelo: ${registro.modelo}, Serial: ${registro.serial}, Placa: ${registro.placa}`;
  // }
  obtenerdispositivos(registros: Appcontraloria[]): string {
    if (!registros || registros.length === 0) {
      return 'No hay dispositivos para enviar al descargo de bienes.';
    }
  
    let informacion = 'Estos Dispositivos serán enviados al descargo de bienes:\n';
    informacion += registros
      .filter(registro => registro.fecha_de_descargoBN) // Filtra los registros que cumplen la condición
      .map(registro =>
        `Dispositivo: ${registro.dispositivo}, Modelo: ${registro.modelo}, Serial: ${registro.serial}, Placa: ${registro.placa}`
      )
      .join('\n');
  
    return informacion;
  }
  
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
