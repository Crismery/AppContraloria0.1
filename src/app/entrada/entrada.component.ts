import { Component, OnInit, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import { AddEntradaComponent } from './add-entrada/add-entrada.component';
import { Appcontraloria } from '../interfaz/appcontraloria';
import { RegistrosService } from '../servicios/registros.service';
import { EditEntradaComponent } from './edit-entrada/edit-entrada.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-entrada',
  templateUrl: './entrada.component.html',
  styleUrl: './entrada.component.scss',
})
export class EntradaComponent implements OnInit {

  appcontraloria: Appcontraloria[]=[];
  
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
  mostrarComponenteedit(): void {
    const dialogRef = this.dialog.open(EditEntradaComponent, {
      width: '550px',
      height: '500px',
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
      this.appcontraloria = appcontraloria;
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
}
