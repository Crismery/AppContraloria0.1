import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { RegistrosService } from '../servicios/registros.service';
import { Appcontraloria } from '../interfaz/appcontraloria';
import { MatDialog } from '@angular/material/dialog';
import { AddRegistrosComponent } from './add-registros/add-registros.component';


@Component({
  selector: 'app-registros',
  templateUrl: './registros.component.html',
  styleUrl: './registros.component.scss'
})
export class RegistrosComponent implements OnInit {

  appcontraloria: Appcontraloria[] = [];

  constructor(private registrosService: RegistrosService,
    private dialog: MatDialog,
    private viewContainerRef: ViewContainerRef) {}

  mostrarComponente(): void {
    const dialogRef = this.dialog.open(AddRegistrosComponent, {
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

  ngOnInit() {
    this.registrosService.getPlaces().subscribe(appcontraloria => {
      this.appcontraloria = appcontraloria;
    });
  }
  async onClickDelete(appcontraloria: Appcontraloria){
    const response = await this.registrosService.deletePlaces(appcontraloria);
    console.log(response);
  }
  async onClickDeleteFields(appcontraloria: Appcontraloria) {
    try {
        await this.registrosService.deleteFields(appcontraloria);
        console.log('Campos borrados correctamente.');
    } catch (error) {
        console.error('Error al borrar los campos:', error);
    }
}
}