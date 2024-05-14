import { Component, ViewContainerRef, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { RegistrosService } from '../../servicios/registros.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Appcontraloria } from '../../interfaz/appcontraloria';
import { Observable } from 'rxjs';
import { SinodialogoComponent } from './sinodialogo/sinodialogo.component';
import { DialogoagregarComponent } from './dialogoagregar/dialogoagregar.component';

@Component({
  selector: 'app-borrador',
  templateUrl: './borrador.component.html',
  styleUrl: './borrador.component.scss'
})
export class BorradorComponent implements OnInit {

  appcontraloria: Appcontraloria[] = [];
  appcontraloriaeditar!: Appcontraloria;

  query: string='';
  resultados$!: Observable<Appcontraloria[]>;
  filteredResults: Appcontraloria[]=[];
  idFrozen: boolean = false;

  startIndex: number = 0;
  endIndex: number = 0;
  totalItems: number = 0;
  itemsPerPage: number = 5;

  registroSeleccionado!: Appcontraloria;


  constructor(private dialog: MatDialog,
    private viewContainerRef: ViewContainerRef,
    private registrosService: RegistrosService,
    private _snackbar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: Appcontraloria) {
  }

  async mostrarComponente(appcontraloria: Appcontraloria): Promise<void> {
    try {
      const registro = await this.registrosService.getPlaceById(appcontraloria);
    
      const dialogRef = this.dialog.open(SinodialogoComponent, {
        data: registro, 
        width: '250px',
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
  async mostrarComponenteagregar(appcontraloria: Appcontraloria): Promise<void> {
    try {
      const registro = await this.registrosService.getPlaceById(appcontraloria);
    
      const dialogRef = this.dialog.open(DialogoagregarComponent, {
        data: registro, 
        width: '250px',
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
  ngOnInit(): void {
    this.registrosService.getPlaces().subscribe(appcontraloria => {
      this.appcontraloria = appcontraloria.filter(registro => registro.fecha_de_descargoBN);

      this.filteredResults = this.appcontraloria;
    });

    this.appcontraloriaeditar = { ...this.data };
  }
  buscar(): void {
    if (this.query.trim() !== '') {
      this.filteredResults = this.appcontraloria.filter(place => {
        const concatenatedValues = Object.values(place).join(' ').toLowerCase();
        return concatenatedValues.includes(this.query.trim().toLowerCase());
      });
    } else {
      this.filteredResults = this.appcontraloria;
    }
  }  

}