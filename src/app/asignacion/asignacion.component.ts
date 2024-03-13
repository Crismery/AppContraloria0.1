import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddAsignacionComponent } from './add-asignacion/add-asignacion.component';
import { RegistrosService } from '../servicios/registros.service';
import { Appcontraloria } from '../interfaz/appcontraloria';

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
      height: '500px',
      viewContainerRef: this.viewContainerRef,
      panelClass: 'dialog-container',
      disableClose: true
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialogo cerrado:', result);
    });
  }

  ngOnInit() {
    this.registrosService.getPlaces().subscribe(appcontraloria => {
      this.appcontraloria = appcontraloria;
    });
  }

}
