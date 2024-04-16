import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { RegistrosService } from '../servicios/registros.service';
import { Appcontraloria } from '../interfaz/appcontraloria';
import { MatDialog } from '@angular/material/dialog';
import { AddRegistrosComponent } from './add-registros/add-registros.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

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
    
  ngOnInit() {
    this.registrosService.getPlaces().subscribe(appcontraloria => {
      this.appcontraloria = appcontraloria.filter(item =>
        item.cedula && item.usuario && item.Departamento && !item.fecha_de_borrados
      );
      this.filteredResults = this.appcontraloria;

      this.loadData();
    });
  }
  agregarFechaMomento(appcontraloria: Appcontraloria) {
    if (appcontraloria) {
      appcontraloria.fecha_de_borrados = new Date().toISOString();
      this.registrosService.updatePlace(appcontraloria)
        .then(() => {
          this._snackbar.open('Registro eliminado con éxito', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          });
        })
        .catch(error => {
          console.error('Error al agregar la fecha del momento al registro:', error);
        });
    } else {
      console.error('Registro no válido.');
    }
  }

  async onClickDeleteFields(appcontraloria: Appcontraloria) {
    try {

      const response = await this.registrosService.deleteFields(appcontraloria);
      console.log('Usuarios eliminados.');

      this._snackbar.open('Usuarios eliminados.', 'Cerrar', {
          duration: 3000,
      });
    } catch (error) {
      console.error('Error al borrar los usuarios:', error);

      this._snackbar.open('Error al borrar los usuarios.', 'Cerrar', {
          duration: 3000,
      });
    }
  }
  buscar(): void {
    if (this.query.trim() !== '') {
      this.filteredResults = this.appcontraloria.filter(place => 
        place.dispositivo.toLowerCase().includes(this.query.trim().toLowerCase())
      );
    } else {
      this.filteredResults = this.appcontraloria;
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