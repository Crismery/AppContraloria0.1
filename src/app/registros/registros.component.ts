import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { RegistrosService } from '../servicios/registros.service';
import { Appcontraloria } from '../interfaz/appcontraloria';
import { MatDialog } from '@angular/material/dialog';
import { AddRegistrosComponent } from './add-registros/add-registros.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DialogoregistroComponent } from './dialogoregistro/dialogoregistro.component';
import { DialogousuarioComponent } from './dialogousuario/dialogousuario.component';

@Component({
  selector: 'app-registros',
  templateUrl: './registros.component.html',
  styleUrl: './registros.component.scss'
})
export class RegistrosComponent implements OnInit {

  appcontraloria: Appcontraloria[] = [];
  query: string='';
  resultados$!: Observable<Appcontraloria[]>;

  filteredResults: Appcontraloria[]=[];

  idFrozen: boolean = false;

  startIndex: number = 0;
  endIndex: number = 0;
  totalItems: number = 0;
  itemsPerPage: number = 5;

  constructor(private registrosService: RegistrosService,
    private dialog: MatDialog,
    private viewContainerRef: ViewContainerRef,
    private _snackbar: MatSnackBar,
    private router: Router) {}

  async mostrarComponente(appcontraloria: Appcontraloria): Promise<void> {
    try {
      const registro = await this.registrosService.getPlaceById(appcontraloria);
      
      const dialogRef = this.dialog.open(AddRegistrosComponent, {
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
  async dialogousuario(appcontraloria: Appcontraloria): Promise<void> {
    try {
      const registro = await this.registrosService.getPlaceById(appcontraloria);
      
      const dialogRef = this.dialog.open(DialogousuarioComponent, {
        data: registro, 
        width: '560px',
        height: '580px',
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
  async dialogoregistro(appcontraloria: Appcontraloria): Promise<void> {
    try {
      const registro = await this.registrosService.getPlaceById(appcontraloria);
      
      const dialogRef = this.dialog.open(DialogoregistroComponent, {
        data: registro, 
        width: '250px',
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
        item.cedula && item.usuario && item.Departamento && !item.fecha_de_descargoBN && !item.fecha_de_borrados
      );
      this.filteredResults = this.appcontraloria;

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
      (place.usuario && place.usuario.toLowerCase().includes(queryLower))||
      (place.Departamento && place.Departamento.toLowerCase().includes(queryLower))||
      (place.mantenimiento && place.mantenimiento.toLowerCase().includes(queryLower))||
      (place.fecha_de_actualizacion && place.fecha_de_actualizacion.toLowerCase().includes(queryLower))||
      (place.fecha_de_asignacion && place.fecha_de_asignacion.toLowerCase().includes(queryLower))
      );
    } else {
      this.registrosService.getPlaces().subscribe(appcontraloria => {
        this.appcontraloria = appcontraloria.filter(item =>
          item.cedula && item.usuario && item.Departamento && !item.fecha_de_descargoBN && !item.fecha_de_borrados
        );
      });
    }
  } 
}