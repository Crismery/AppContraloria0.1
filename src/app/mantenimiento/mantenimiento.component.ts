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

  idFrozen: boolean = false;

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
      this.appcontraloria = appcontraloria.filter(registro => !registro.fecha_de_borrados && !registro.fecha_de_descargoBN);

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
      (place.tipo_de_mantenimiento && place.tipo_de_mantenimiento.toLowerCase().includes(queryLower)) ||
      (place.mantenimiento && place.mantenimiento.toLowerCase().includes(queryLower)) ||
      (place.memoria && place.memoria.toLowerCase().includes(queryLower)) ||
      (place.almacenamiento && place.almacenamiento.toLowerCase().includes(queryLower)) ||
      (place.limpieza && place.limpieza.toLowerCase().includes(queryLower)) ||
      (place.os && place.os.toLowerCase().includes(queryLower)) ||
      (place.defragmentacion&& place.defragmentacion.toLowerCase().includes(queryLower)) ||
      (place.fecha_de_mantenimiento && place.fecha_de_mantenimiento.toLowerCase().includes(queryLower))
      );
    } else {
      this.registrosService.getPlaces().subscribe(appcontraloria => {
        this.appcontraloria = appcontraloria.filter(registro => 
          !registro.fecha_de_borrados && !registro.fecha_de_descargoBN);
      });
    }
  }
}
