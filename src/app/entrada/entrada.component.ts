import { Component, OnInit, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import { AddEntradaComponent } from './add-entrada/add-entrada.component';
import { Appcontraloria } from '../interfaz/appcontraloria';
import { RegistrosService } from '../servicios/registros.service';
import { EditEntradaComponent } from './edit-entrada/edit-entrada.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { DialogoentradaComponent } from './dialogoentrada/dialogoentrada.component';

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
      height: '500px',
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
  async dialogoregistro(appcontraloria: Appcontraloria): Promise<void> {
    try {
      const registro = await this.registrosService.getPlaceById(appcontraloria);
      
      const dialogRef = this.dialog.open(DialogoentradaComponent, {
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
      this.appcontraloria = appcontraloria.filter(registro => !registro.fecha_de_borrados && !registro.fecha_de_descargoBN);
  
      this.filteredResults = this.appcontraloria;
  
      this.loadData();
    });
  } 

  // agregarFechaMomento(appcontraloria: Appcontraloria) {
  //   if (appcontraloria) {
  //     appcontraloria.fecha_de_borrados = new Date().toISOString();
  //     this.registrosService.updatePlace(appcontraloria)
  //       .then(() => {
  //         this._snackbar.open('Registro eliminado con éxito', 'Cerrar', {
  //           duration: 3000,
  //           horizontalPosition: 'center',
  //           verticalPosition: 'bottom'
  //         });
  //       })
  //       .catch(error => {
  //         console.error('Error al agregar la fecha del momento al registro:', error);
  //       });
  //   } else {
  //     console.error('Registro no válido.');
  //   }
  // }

  buscar(): void {
    if (this.query.trim() !== '') {
      this.appcontraloria = this.appcontraloria.filter(place =>
        Object.values(place).some(value =>
          value && typeof value === 'string' && value.toLowerCase().includes(this.query.trim().toLowerCase())
        )
      );
    } else {
      this.registrosService.getPlaces().subscribe(Correos => {
        this.appcontraloria = Correos;
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