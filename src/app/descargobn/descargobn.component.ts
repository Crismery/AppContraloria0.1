import { Component, ViewContainerRef, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { RegistrosService } from '../servicios/registros.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Appcontraloria } from '../interfaz/appcontraloria';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Notiflix from 'notiflix';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-descargobn',
  templateUrl: './descargobn.component.html',
  styleUrl: './descargobn.component.scss'
})
export class DescargobnComponent implements OnInit {

  query: string = '';

  appcontraloria: Appcontraloria[] = [];
  idFrozen: boolean = false;

  dialogVisible: boolean = false;

  title = 'enviarcorreo';

  datos: FormGroup;
  mensajeOriginal: string = '';

  appcontraloriacorreo!: Appcontraloria;
  constructor(
    private registrosService: RegistrosService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private httpclient: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: Appcontraloria) {
    this.datos = new FormGroup({
      correo: new FormControl('', [Validators.required, Validators.email]),
      asunto: new FormControl('', Validators.required),
      mensaje: new FormControl(''),
      textoadicional: new FormControl('')
    });
  }

  ngOnInit() {
    this.registrosService.getPlaces().subscribe(appcontraloria => {
      this.appcontraloria = appcontraloria.filter(item =>
        item.fecha_de_descargoBN && !item.fecha_de_borrados && !item.fechacorreoenviode
      );
      this.updateTextarea();
    });
    this.construirFormulario();
    this.appcontraloriacorreo = { ...this.data };
  }
  showDialog() {
    this.dialogVisible = true;
  }
  agregarFechaMomento(appcontraloria: Appcontraloria) {
    Notiflix.Confirm.prompt(
      'Agregar nuevamente a registro.',
      '¿Esta seguro/a de que quiere agregar nuevamente este registro? Escriba la razón.',
      '',
      'Aceptar',
      'Cancelar',
      (reason) => { 
        if (appcontraloria) {
          appcontraloria.fecha_de_descargoBN = '';
          appcontraloria.fecha_de_reingreso = new Date().toISOString();
          appcontraloria.comentarioreingresoDE = reason;  
  
          this.registrosService.updatePlace(appcontraloria)
            .then(() => {
              this.snackBar.open('Registro agregado nuevamente', 'Cerrar', {
                duration: 3000,
                horizontalPosition: 'center',
                verticalPosition: 'bottom'
              });
            })
            .catch(error => {
              console.error('Error al agregar la fecha del momento al registro:', error);
              this.snackBar.open('Error al actualizar el registro', 'Cerrar', {
                duration: 3000,
                horizontalPosition: 'center',
                verticalPosition: 'bottom'
              });
            });
        } else {
          console.error('Registro no válido.');
          this.snackBar.open('Registro no válido', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          });
        }
      },
    );
  }
  
  private construirFormulario(): void {
    this.datos = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      asunto: ['', Validators.required],
      mensaje: [this.mensajeOriginal],
      textoadicional: ['']
    });
  }
  agregarTexto() {
    const textoadicional = this.datos.get('textoadicional')?.value;
    if (textoadicional) {
      this.mensajeOriginal += `\n  \n${textoadicional}`;
      this.datos.get('textoAdicional')?.setValue('');
    }
  }
  updateTextarea() {
    console.log(this.appcontraloria);
    const dispositivosMensaje = this.appcontraloria.map(item => `-Dispositivo: ${item.dispositivo}, Modelo: ${item.modelo}, Serial: ${item.serial}, Placa: ${item.placa}`).join('\n');
    this.mensajeOriginal = `Descargo de bienes nacionales de la contraloria general de la republica. \n \n Estos Dispositivo serán enviados al descargo de bienes nacionales:\n${dispositivosMensaje}`;
    console.log(this.mensajeOriginal);
  }
  enviarcorreo() {
    if (this.datos.invalid) {
      this.snackBar.open('Correo es obligatorio', 'Cerrar', {
        duration: 3000,
        verticalPosition: 'top'
      });
      return;
    }
    this.appcontraloria.forEach(item => {
      item.fechacorreoenviode = new Date().toISOString().split('T')[0];
      this.registrosService.updatePlace(item)
    });
    const params = {
      email: this.datos.value.correo,
      asunto: this.datos.value.asunto,
      mensaje: this.mensajeOriginal
    };
    Notiflix.Loading.standard('Cargando...');
    this.httpclient.post('http://localhost:3000/envio', params).subscribe(
      resp => {
        console.log(resp);
        Notiflix.Loading.remove();
        Notiflix.Notify.success('Correo enviado correctamente');
        this.datos.reset();
        this.dialogVisible = false;
      },
      error => {
        console.error('Error al enviar el correo:', error);
        Notiflix.Loading.remove();
        Notiflix.Notify.failure('Error al enviar el correo');
      }
    );
  }  
  buscar(): void {
    if (this.query.trim() !== '') {
      const queryLower = this.query.trim().toLowerCase();
      this.appcontraloria = this.appcontraloria.filter(place =>
        (place.dispositivo && place.dispositivo.toLowerCase().includes(queryLower)) ||
        (place.modelo && place.modelo.toLowerCase().includes(queryLower)) ||
        (place.serial && place.serial.toLowerCase().includes(queryLower)) ||
        (place.placa && place.placa.toLowerCase().includes(queryLower)) ||
        (place.bienes_nacionales && place.bienes_nacionales.toLowerCase().includes(queryLower)) ||
        (place.fecha_de_descargoBN && place.fecha_de_descargoBN.toLowerCase().includes(queryLower))
      );
    } else {
      this.registrosService.getPlaces().subscribe(appcontraloria => {
        this.appcontraloria = appcontraloria.filter(item =>
          item.fecha_de_descargoBN && !item.fecha_de_borrados && !item.fechacorreoenviode
        );
      });
    }
  }
}