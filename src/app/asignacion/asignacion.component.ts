import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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

  async mostrarComponenteedit(appcontraloria: Appcontraloria): Promise<void> {
    try {
      const registro = await this.registrosService.getPlaceById(appcontraloria);

      const dialogRef = this.dialog.open(EditAsignacionComponent, {
        data: registro,
        width: '550px',
        height: '450px',
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
    });
  }
  buscar(): void {
    if (this.query.trim() !== '') {
      const queryLower = this.query.trim().toLowerCase();
      this.appcontraloria = this.appcontraloria.filter(place =>
        (place.dispositivo && place.dispositivo.toLowerCase().includes(queryLower)) ||
      (place.os && place.os.toLowerCase().includes(queryLower)) ||
      (place.serial && place.serial.toLowerCase().includes(queryLower)) ||
      (place.cpu && place.cpu.toLowerCase().includes(queryLower)) ||
      (place.memoria && place.memoria.toLowerCase().includes(queryLower)) ||
      (place.almacenamiento && place.almacenamiento.toLowerCase().includes(queryLower)) ||
      (place.mantenimiento && place.mantenimiento.toLowerCase().includes(queryLower))
      );
    } else {
      this.registrosService.getPlaces().subscribe(appcontraloria => {
        this.appcontraloria = appcontraloria.filter(item =>
          !item.cedula && !item.usuario && !item.Departamento && !item.fecha_de_borrados && !item.fecha_de_descargoBN
        );
      });
    }
  }
}