import { Component, ViewContainerRef, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { RegistrosService } from '../servicios/registros.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Appcontraloria } from '../interfaz/appcontraloria';
import { Observable } from 'rxjs';
import { DialogocorreoComponent } from './dialogocorreo/dialogocorreo.component';
import { DialogoBNComponent } from './dialogo-bn/dialogo-bn.component';


@Component({
  selector: 'app-descargobn',
  templateUrl: './descargobn.component.html',
  styleUrl: './descargobn.component.scss'
})
export class DescargobnComponent implements OnInit {

  query: string = '';
  resultados$!: Observable<Appcontraloria[]>;

  filteredResults: Appcontraloria[] = [];
  appcontraloria: Appcontraloria[] = [];

  constructor(private dialog:MatDialog, 
    private viewContainerRef: ViewContainerRef,
    private registrosService: RegistrosService,
    private _snackbar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: Appcontraloria){}

  // async dialogoregistro(appcontraloria: Appcontraloria): Promise<void> {
  //   try {
  //     const registro = await this.registrosService.getPlaceById(appcontraloria);
      
  //     const dialogRef = this.dialog.open(BNcorreosComponent, {
  //       data: registro, 
  //       width: '500px',
  //       height: '500px',
  //       viewContainerRef: this.viewContainerRef,
  //       panelClass: 'dialog-container',
  //       disableClose: true
  //     });
  
  //     dialogRef.afterClosed().subscribe(result => {
  //       console.log('Dialogo cerrado:', result);
  //     });
  //   } catch (error) {
  //     console.error('Error al obtener la información del registro:', error);
  //   }
  // }
  mostrarComponente(): void {
    const dialogRef = this.dialog.open(DialogocorreoComponent, {
      width: '700px',
      height: '600px',
      viewContainerRef: this.viewContainerRef,
      panelClass: 'dialog-container',
      disableClose: true
    });
  
    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialogo cerrado:', result);
    });
  }

  async mostrarComponenteagre(appcontraloria: Appcontraloria): Promise<void> {
    try {
      const registro = await this.registrosService.getPlaceById(appcontraloria);
    
      const dialogRef = this.dialog.open(DialogoBNComponent, {
        data: registro, 
        width: '300px',
        height: '150px',
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
        item.fecha_de_descargoBN
      );
      this.filteredResults = this.appcontraloria;
    });
  }
  agregarFechaMomento(appcontraloria: Appcontraloria) {
    if (appcontraloria) {
      
      appcontraloria.fecha_de_descargoBN = '';
  
      appcontraloria.fecha_de_reingreso = new Date().toISOString();
      
      this.registrosService.updatePlace(appcontraloria)
        .then(() => {
          this._snackbar.open('Registro agregado nuevamente', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          });
        })
        .catch(error => {
          console.error('Error al agregar la fecha del momento al registro:', error);
          this._snackbar.open('Error al actualizar el registro', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          });
        });
    } else {
      console.error('Registro no válido.');
      this._snackbar.open('Registro no válido', 'Cerrar', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });
    }
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
