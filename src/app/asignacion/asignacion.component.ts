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
export class AsignacionComponent implements OnInit{

  appcontraloria: Appcontraloria[]=[];
  query: string='';
  resultados$!: Observable<Appcontraloria[]>;

  filteredResults: Appcontraloria[]=[];

 
  constructor(private dialog:MatDialog, 
    private viewContainerRef:ViewContainerRef,
    private registrosService: RegistrosService){}

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
  
      // Suscribirse al evento de cierre del diálogo
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
        !item.cedula && !item.usuario && !item.Departamento
      );
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

}
