import { Component, ViewContainerRef, OnInit } from '@angular/core';
import { RegistrosService } from '../servicios/registros.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Appcontraloria } from '../interfaz/appcontraloria';
import { Observable } from 'rxjs';
import Notiflix from 'notiflix';


@Component({
  selector: 'app-almacen',
  templateUrl: './almacen.component.html',
  styleUrl: './almacen.component.scss'
})
export class AlmacenComponent implements OnInit {

  appcontraloria: Appcontraloria[] = [];
  query: string = '';
  resultados$!: Observable<Appcontraloria[]>;

  filteredResults: Appcontraloria[] = [];
  idFrozen: boolean = false;

  startIndex: number = 0;
  endIndex: number = 0;
  totalItems: number = 0;
  itemsPerPage: number = 5;

  constructor(private registrosService: RegistrosService,
    private viewContainerRef: ViewContainerRef,
    private _snackbar: MatSnackBar,
    private dialog: MatDialog,) { }

  ngOnInit() {
    this.registrosService.getPlaces().subscribe(appcontraloria => {
      this.appcontraloria = appcontraloria.filter(item =>
        !item.cedula && !item.usuario && !item.Departamento && !item.fecha_de_borrados && !item.fecha_de_descargoBN && !item.fechacorreoenviode
      );
      this.filteredResults = this.appcontraloria;
    });
  }

  agregarFechaMomento(appcontraloria: Appcontraloria) {
    Notiflix.Confirm.prompt(
      'Enviar a descargo de bienes nacionales.',
      '¿Esta seguro/a de que quiere enviar este dispositivo a descargo de bienes nacionales? Escriba la razon.',
      '',
      'Aceptar',
      'Cancel',
      (reason) => {
        if (appcontraloria) {

          appcontraloria.fecha_de_descargoBN = new Date().toISOString();
          appcontraloria.comentariodescargoAlma = reason;
          
          this.registrosService.updatePlace(appcontraloria)
            .then(() => {
              this._snackbar.open('Registro enviado a descargo de bienes nacionales', 'Cerrar', {
                duration: 3000,
                horizontalPosition: 'center',
                verticalPosition: 'bottom'
              });
            })
            .catch(error => {
              console.error('Error al agregar la fecha del momento al registro:', error);
              this._snackbar.open('Error al actualizar el registro', 'Cerrar', {
                duration: 3000,
                horizontalPosition: 'center',
                verticalPosition: 'bottom'
              });
            });
        } else {
          console.error('Registro no válido.');
          this._snackbar.open('Registro no válido', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          });
        }
      },
      () => {
      });
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
        (place.fecha_de_entrada && place.fecha_de_entrada.toLowerCase().includes(queryLower)) ||
        (place.fecha_de_actualizacion && place.fecha_de_actualizacion.toLowerCase().includes(queryLower))
      );
    } else {
      this.registrosService.getPlaces().subscribe(appcontraloria => {
        this.appcontraloria = appcontraloria.filter(item =>
          !item.cedula && !item.usuario && !item.Departamento && !item.fecha_de_borrados && !item.fecha_de_descargoBN && !item.fechacorreoenviode
        );
      });
    }
  }
}