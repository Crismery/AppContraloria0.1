import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddAsignacionComponent } from './add-asignacion/add-asignacion.component';
import { RegistrosService } from '../servicios/registros.service';
import { Appcontraloria } from '../interfaz/appcontraloria';
import { EditAsignacionComponent } from './edit-asignacion/edit-asignacion.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-asignacion',
  templateUrl: './asignacion.component.html',
  styleUrl: './asignacion.component.scss'
})
export class AsignacionComponent implements OnInit {

  appcontraloria: Appcontraloria[] = [];
  query: string = '';
  resultados$!: Observable<Appcontraloria[]>;

  filteredResults: Appcontraloria[] = [];
  idFrozen: boolean = false;

  startIndex: number = 0;
  endIndex: number = 0;
  totalItems: number = 0;
  itemsPerPage: number = 5;


  constructor(private dialog: MatDialog,
    private viewContainerRef: ViewContainerRef,
    private registrosService: RegistrosService) { }

  mostrarComponente(): void {
    const dialogRef = this.dialog.open(AddAsignacionComponent, {
      width: '500px',
      height: '380px',
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

      const dialogRef = this.dialog.open(EditAsignacionComponent, {
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
        !item.cedula && !item.usuario && !item.Departamento && !item.fecha_de_borrados && !item.fecha_de_descargoBN
      );
      this.filteredResults = this.appcontraloria;

      this.loadData();
    });
  }
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