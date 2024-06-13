import { Component, OnInit, Inject, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Correos } from '../interfaz/correos';
import { EncorreoService } from '../servicios/encorreo.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import Notiflix from 'notiflix';
import { ResolicitudesComponent } from './resolicitudes/resolicitudes.component';

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrl: './solicitudes.component.scss'
})
export class SolicitudesComponent implements OnInit {

  form: FormGroup;
  Correos: Correos[] = [];
  idFrozen: boolean = false;
  loaded: boolean = false;

  query: string = '';
  resultados$!: Observable<Correos[]>;
  filteredResults: Correos[] = [];

  title = 'enviarrespuesta';
  //resivir correo
  emails: any[] = [];

  constructor(private correo: EncorreoService,
    private dialog:MatDialog, 
    private viewContainerRef: ViewContainerRef,
    private formBuilder: FormBuilder,
    private httpclient: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: Correos
  ) {
    this.form = this.formBuilder.group({
      correo: [''],
      asunto: ['', Validators.required],
      mensaje: ['', Validators.required],
      comentario: ['', Validators.required],
      fecha_solicitud: [''],
      fecha_respuesta: [''],
      estatu: ['', Validators.required],
    });
  }

  mostrarComponente(email: any): void {
    const dialogRef = this.dialog.open(ResolicitudesComponent, {
      width: '550px',
      height: '580px',
      viewContainerRef: this.viewContainerRef,
      panelClass: 'dialog-container',
      disableClose: true,
      data: email
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialogo cerrado:', result);
    });
  }
  ngOnInit(): void {
    this.correo.getPlaces().subscribe(Correos => {
      this.Correos = Correos;
      this.loaded = true;
      this.filteredResults = this.Correos;
    });
    this.getEmails();
  }
  
  getSeverity(estatu: string){
    switch(estatu) {
      case 'Aprobado':
        return 'success';
      case 'En espera':
        return 'warning';
      case 'Rechazado':
        return 'danger';
      default:
        return undefined;
    }
  }
  buscar(): void {
    if (this.query.trim() !== '') {
      const queryLower = this.query.trim().toLowerCase();
      this.Correos = this.Correos.filter(place =>
        (place.correo && place.correo.toLowerCase().includes(queryLower)) ||
      (place.asunto && place.asunto.toLowerCase().includes(queryLower)) ||
      (place.mensaje && place.mensaje.toLowerCase().includes(queryLower)) ||
      (place.comentario && place.comentario.toLowerCase().includes(queryLower)) ||
      (place.fecha_solicitud && place.fecha_solicitud.toLowerCase().includes(queryLower)) ||
      (place.fecha_respuesta && place.fecha_respuesta.toLowerCase().includes(queryLower)) ||
      (place.estatu && place.estatu.toLowerCase().includes(queryLower))
      );
    } else {
      this.correo.getPlaces().subscribe(Correos => {
        this.Correos = Correos;
      });
    }
  }
  getEmails() {
    this.correo.getEmails().subscribe(
      response => {
        this.emails = response;
      },
      error => {
        console.error('Error al obtener los correos', error);
      }
    );
  }
}
