import { Component, ViewContainerRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddAsignacionComponent } from './add-asignacion/add-asignacion.component';

@Component({
  selector: 'app-asignacion',
  templateUrl: './asignacion.component.html',
  styleUrl: './asignacion.component.scss'
})
export class AsignacionComponent {


  constructor(private dialog:MatDialog, private viewContainerRef:ViewContainerRef){}

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

}
