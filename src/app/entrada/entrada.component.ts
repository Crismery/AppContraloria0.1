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

  startIndex: number = 0;
  endIndex: number = 0;
  totalItems: number = 0;
  itemsPerPage: number = 5;
  
  constructor(private router:Router, 
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


  ngOnInit() {
    this.registrosService.getPlaces().subscribe(appcontraloria => {
      this.appcontraloria = appcontraloria;

      this.filteredResults = this.appcontraloria;

      this.loadData();
    });
  }  


 async onClickDelete(appcontraloria: Appcontraloria){
    const response = await this.registrosService.deletePlaces(appcontraloria);
    console.log(response);
    if (response.success) {
      this._snackbar.open('Registro eliminado', 'Cerrar', {
        duration: 3000,
      });
    } else {
      this._snackbar.open('Error al eliminar el registro', 'Cerrar', {
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