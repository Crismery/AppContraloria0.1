import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { RegistrosService } from '../servicios/registros.service';
import { Appcontraloria } from '../interfaz/appcontraloria';
import { MatDialog } from '@angular/material/dialog';
import { AddRegistrosComponent } from './add-registros/add-registros.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';



@Component({
  selector: 'app-registros',
  templateUrl: './registros.component.html',
  styleUrl: './registros.component.scss'
})
export class RegistrosComponent implements OnInit {

  appcontraloria: Appcontraloria[] = [];

  constructor(private registrosService: RegistrosService,
    private dialog: MatDialog,
    private viewContainerRef: ViewContainerRef,
    private _snackbar: MatSnackBar,
    private router: Router) {}

    async mostrarComponente(appcontraloria: Appcontraloria): Promise<void> {
      try {
        const registro = await this.registrosService.getPlaceById(appcontraloria);
      
        const dialogRef = this.dialog.open(AddRegistrosComponent, {
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
async onClickDeleteFields(appcontraloria: Appcontraloria) {
  try {
      const response = await this.registrosService.deleteFields(appcontraloria);
      console.log('Usuarios eliminandos.');

      this._snackbar.open('Usuarios eliminados.', 'Cerrar', {
          duration: 3000,
      });
  } catch (error) {
      console.error('Error al borrar los usuarios:', error);

      this._snackbar.open('Error al borrar los usuarios.', 'Cerrar', {
          duration: 3000,
      });
  }
}
}