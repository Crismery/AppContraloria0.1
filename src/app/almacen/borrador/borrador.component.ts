import { Component, ViewContainerRef, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { RegistrosService } from '../../servicios/registros.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Appcontraloria } from '../../interfaz/appcontraloria';
import { Observable } from 'rxjs';
import { SinodialogoComponent } from './sinodialogo/sinodialogo.component';
import Notiflix from 'notiflix';

@Component({
  selector: 'app-borrador',
  templateUrl: './borrador.component.html',
  styleUrl: './borrador.component.scss'
})
export class BorradorComponent implements OnInit {

  appcontraloria: Appcontraloria[] = [];
  appcontraloriaeditar!: Appcontraloria;

  query: string='';
  resultados$!: Observable<Appcontraloria[]>;
  filteredResults: Appcontraloria[]=[];
  idFrozen: boolean = false;

  startIndex: number = 0;
  endIndex: number = 0;
  totalItems: number = 0;
  itemsPerPage: number = 5;

  registroSeleccionado!: Appcontraloria;


  constructor(private dialog: MatDialog,
    private viewContainerRef: ViewContainerRef,
    private registrosService: RegistrosService,
    private _snackbar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: Appcontraloria) {
  }

  async mostrarComponente(appcontraloria: Appcontraloria): Promise<void> {
    try {
      const registro = await this.registrosService.getPlaceById(appcontraloria);
    
      const dialogRef = this.dialog.open(SinodialogoComponent, {
        data: registro, 
        width: '550px',
        height: '500px',
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
  ngOnInit(): void {
    this.registrosService.getPlaces().subscribe(appcontraloria => {
      this.appcontraloria = appcontraloria.filter(registro => registro.fechacorreoenviode && !registro.fecha_de_borrados && !registro.fecha_de_descargoBN);

      this.filteredResults = this.appcontraloria;
    });

    this.appcontraloriaeditar = { ...this.data };
  }
  agregarFechaMomento(appcontraloria: Appcontraloria) {
    Notiflix.Confirm.show(
      'Agregar nuevamente a registro.',
      '¿Esta seguro/a de que quiere agregar nuevamente este registro?',
      'Si',
      'No',
      () => {
        if (appcontraloria) {

          appcontraloria.fecha_de_descargoBN = '';
      
          appcontraloria.fecha_de_reingreso = new Date().toISOString();
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
      (place.fecha_de_descargoBN && place.fecha_de_descargoBN.toLowerCase().includes(queryLower))
      );
    } else {
      this.registrosService.getPlaces().subscribe(appcontraloria => {
        this.appcontraloria = appcontraloria.filter(registro => !registro.fecha_de_descargoBN && !registro.fecha_de_borrados && registro.fechacorreoenviode);
      });
    }
  } 
}