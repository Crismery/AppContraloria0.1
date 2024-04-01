import { Component, ViewContainerRef, OnInit } from '@angular/core';
import { AddMantenimientoComponent } from './add-mantenimiento/add-mantenimiento.component';
import { MatDialog } from '@angular/material/dialog';
import { RegistrosService } from '../servicios/registros.service';
import { Appcontraloria } from '../interfaz/appcontraloria';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-mantenimiento',
  templateUrl: './mantenimiento.component.html',
  styleUrl: './mantenimiento.component.scss'
})
export class MantenimientoComponent  implements OnInit{

  appcontraloria: Appcontraloria[]=[];

  query: string='';
  resultados$!: Observable<Appcontraloria[]>;
  filteredResults: Appcontraloria[]=[];

  startIndex: number = 0;
  endIndex: number = 0;
  totalItems: number = 0;
  itemsPerPage: number = 5;

  constructor( private dialog: MatDialog,
    private registrosService: RegistrosService,
    private viewContainerRef:ViewContainerRef){
  }
  async  mostrarComponente(appcontraloria: Appcontraloria): Promise<void> {
    try {
      const registro = await this.registrosService.getPlaceById(appcontraloria);
    
      const dialogRef = this.dialog.open(AddMantenimientoComponent, {
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
    });
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
