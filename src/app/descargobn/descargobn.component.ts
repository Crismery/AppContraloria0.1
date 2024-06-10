import { Component, ViewContainerRef, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { RegistrosService } from '../servicios/registros.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Appcontraloria } from '../interfaz/appcontraloria';
import { Observable } from 'rxjs';
import { DialogocorreoComponent } from './dialogocorreo/dialogocorreo.component';
import { DialogoBNComponent } from './dialogo-bn/dialogo-bn.component';
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
  // resultados$!: Observable<Appcontraloria[]>;

  // filteredResults: Appcontraloria[] = [];
  appcontraloria: Appcontraloria[] = [];
  idFrozen: boolean = false;

  dialogVisible: boolean = false;

  title = 'enviarcorreo';

  datos: FormGroup;
  mensajeOriginal: string ='';

  appcontraloriacorreo!: Appcontraloria;
  constructor(private dialog:MatDialog, 
    private viewContainerRef: ViewContainerRef,
    private registrosService: RegistrosService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private httpclient: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: Appcontraloria){
      this.datos = new FormGroup({
        correo: new FormControl('', [Validators.required, Validators.email]),
        asunto: new FormControl('', Validators.required),
        mensaje: new FormControl('', Validators.required)
      });
    }

    // async mostrarComponente(registros: Appcontraloria[]): Promise<void> {
    //   try {
    //     const dialogRef = this.dialog.open(DialogocorreoComponent, {
    //       data: registros,
    //       width: '550px',
    //       height: '500px',
    //       viewContainerRef: this.viewContainerRef,
    //       panelClass: 'dialog-container',
    //       disableClose: true
    //     });
    
    //     dialogRef.afterClosed().subscribe(result => {
    //       console.log('Dialogo cerrado:', result);
    //     });
    //   } catch (error) {
    //     console.error('Error al obtener la información del registro:', error);
    //   }
    // }    
    
  async mostrarComponenteagre(appcontraloria: Appcontraloria): Promise<void> {
    try {
      const registro = await this.registrosService.getPlaceById(appcontraloria);
    
      const dialogRef = this.dialog.open(DialogoBNComponent, {
        data: registro, 
        width: '300px',
        height: '150px',
        viewContainerRef: this.viewContainerRef,
        panelClass: 'dialog-container',
        disableClose: true
      });
      dialogRef.afterClosed().subscribe(result => {
        console.log('Dialogo cerrado:', result);
      });
    } catch (error) {
      console.error('Error al obtener la información del registro:', error);
    }
  }
  ngOnInit() {
    this.registrosService.getPlaces().subscribe(appcontraloria => {
      this.appcontraloria = appcontraloria.filter(item =>
        item.fecha_de_descargoBN && !item.fecha_de_borrados
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
    if (appcontraloria) {
      
      appcontraloria.fecha_de_descargoBN = '';
  
      appcontraloria.fecha_de_reingreso = new Date().toISOString();
      
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
  }
  private construirFormulario(): void {
    this.datos = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      asunto: ['', Validators.required],
      mensaje: [this.updateTextarea()]
    });
  }
  agregarTexto() {
    this.mensajeOriginal += '\nTexto adicional';
  }
  updateTextarea() {
    console.log(this.appcontraloria); 
    const dispositivosMensaje = this.appcontraloria.map(item => `-Dispositivo: ${item.dispositivo}, Modelo: ${item.modelo}, Serial: ${item.serial}, Placa: ${item.placa}`).join('\n');
    this.mensajeOriginal = `Estos Dispositivo serán enviados al descargo de bienes nacionales:\n${dispositivosMensaje}`;
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
    })
  }
  buscar(): void {
    if (this.query.trim() !== '') {
      
      this.appcontraloria = this.appcontraloria.filter(place =>
        place.dispositivo.toLowerCase().includes(this.query.trim().toLowerCase())
      );
    } else {
      this.registrosService.getPlaces().subscribe(appcontraloria => {
        this.appcontraloria = appcontraloria.filter(item =>
          item.fecha_de_descargoBN
        );
      });
    }
  }
}