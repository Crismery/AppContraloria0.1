import { Component, ViewContainerRef, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { RegistrosService } from '../servicios/registros.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Appcontraloria } from '../interfaz/appcontraloria';
import { Observable } from 'rxjs';
import { DialogocorreoComponent } from './dialogocorreo/dialogocorreo.component';


@Component({
  selector: 'app-descargobn',
  templateUrl: './descargobn.component.html',
  styleUrl: './descargobn.component.scss'
})
export class DescargobnComponent implements OnInit {

  filteredResults: Appcontraloria[]=[];
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
      this.appcontraloria = appcontraloria.filter(item =>
        item.fecha_de_descargoBN
      );
      this.filteredResults = this.appcontraloria;
    });
  }
}
