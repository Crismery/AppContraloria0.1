import { Component, OnInit, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import { AddEntradaComponent } from './add-entrada/add-entrada.component';
import { Appcontraloria } from '../interfaz/appcontraloria';
import { RegistrosService } from '../servicios/registros.service';
import { EditEntradaComponent } from './edit-entrada/edit-entrada.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-entrada',
  templateUrl: './entrada.component.html',
  styleUrl: './entrada.component.scss',
})
export class EntradaComponent implements OnInit {

  appcontraloria: Appcontraloria[]=[];

  query: string='';
  resultados$!: Observable<Appcontraloria[]>;
  filteredResults: Appcontraloria[]=[];

  idFrozen: boolean = false;

  startIndex: number = 0;
  endIndex: number = 0;
  totalItems: number = 0;
  itemsPerPage: number = 5;
  
  constructor(
    private dialog:MatDialog, 
    private viewContainerRef: ViewContainerRef,
    private registrosService: RegistrosService,
    private _snackbar: MatSnackBar ) { }

  mostrarComponente(): void {
    const dialogRef = this.dialog.open(AddEntradaComponent, {
      width: '550px',
      height: '550px',
      viewContainerRef: this.viewContainerRef,
      panelClass: 'dialog-container',
      disableClose: true
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialogo cerrado:', result);
    });
  }
  async mostrarComponenteedit(appcontraloria: Appcontraloria): Promise<void> {
    try {
      const registro = await this.registrosService.getPlaceById(appcontraloria);
    
      const dialogRef = this.dialog.open(EditEntradaComponent, {
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

  ngOnInit() {
    this.registrosService.getPlaces().subscribe(appcontraloria => {
      this.appcontraloria = appcontraloria.filter(registro => !registro.fecha_de_borrados && !registro.fecha_de_descargoBN && !registro.fechacorreoenviode);
  
      this.filteredResults = this.appcontraloria;
  
      this.loadData();
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
      (place.mantenimiento && place.mantenimiento.toLowerCase().includes(queryLower)) ||
      (place.fecha_de_entrada && place.fecha_de_entrada.toLowerCase().includes(queryLower)) ||
      (place.fecha_de_actualizacion && place.fecha_de_actualizacion.toLowerCase().includes(queryLower))
      );
    } else {
      this.registrosService.getPlaces().subscribe(appcontraloria => {
        this.appcontraloria = appcontraloria.filter(registro => !registro.fecha_de_borrados && !registro.fecha_de_descargoBN && !registro.fechacorreoenviode);  
      });
    }
  }
loadData(): void {
  this.totalItems = this.filteredResults.length; 
  this.endIndex = Math.min(this.startIndex + this.itemsPerPage, this.totalItems);
}
changeItemsPerPage(event: any): void {
  const value = (event.target as HTMLSelectElement).value;
  if (value !== null && value !== undefined) {
    this.itemsPerPage = +value;
    this.startIndex = 0; 
    this.filteredResults = this.appcontraloria.slice(0, this.itemsPerPage);

    this.loadData();
  }
}
prevPage(): void {
  this.startIndex = Math.max(0, this.startIndex - this.itemsPerPage);
  this.loadData();
}
nextPage(): void {
  this.startIndex = Math.min(this.startIndex + this.itemsPerPage, this.totalItems - this.itemsPerPage);
  this.loadData();
}
}