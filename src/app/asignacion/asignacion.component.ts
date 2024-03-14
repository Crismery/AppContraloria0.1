import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddAsignacionComponent } from './add-asignacion/add-asignacion.component';
import { RegistrosService } from '../servicios/registros.service';
import { Appcontraloria } from '../interfaz/appcontraloria';
import { EditAsignacionComponent } from './edit-asignacion/edit-asignacion.component';

@Component({
  selector: 'app-asignacion',
  templateUrl: './asignacion.component.html',
  styleUrl: './asignacion.component.scss'
})
export class AsignacionComponent implements OnInit{

  appcontraloria: Appcontraloria[]=[];

 
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
  mostrarComponenteedit(): void {
    const dialogRef = this.dialog.open(EditAsignacionComponent, {
      width: '500px',
      height: '380px',
      viewContainerRef: this.viewContainerRef,
      panelClass: 'dialog-container-edit',
      disableClose: true
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialogo cerrado:', result);
    });
  }

  ngOnInit() {
    this.registrosService.getPlaces().subscribe(appcontraloria => {
      // Filtrar los documentos con campos de usuario, cédula y departamento vacíos
      this.appcontraloria = appcontraloria.filter(item =>
        !item.cedula && !item.usuario && !item.Departamento
      );
    });
  }

}
