import { Component, ViewContainerRef, OnInit } from '@angular/core';
import { RegistrosService } from '../servicios/registros.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Appcontraloria } from '../interfaz/appcontraloria';
import { Observable } from 'rxjs';
import { DialogoBNComponent } from './dialogo-bn/dialogo-bn.component';



@Component({
  selector: 'app-almacen',
  templateUrl: './almacen.component.html',
  styleUrl: './almacen.component.scss'
})
export class AlmacenComponent implements OnInit {

  appcontraloria: Appcontraloria[] = [];
  query: string = '';
  resultados$!: Observable<Appcontraloria[]>;

  filteredResults: Appcontraloria[] = [];
  idFrozen: boolean = false;

  startIndex: number = 0;
  endIndex: number = 0;
  totalItems: number = 0;
  itemsPerPage: number = 5;

  constructor(private registrosService: RegistrosService,
    private viewContainerRef: ViewContainerRef,
    private _snackbar: MatSnackBar,
    private dialog: MatDialog,) { }

    async mostrarComponente(appcontraloria: Appcontraloria): Promise<void> {
      try {
        const registro = await this.registrosService.getPlaceById(appcontraloria);
      
        const dialogRef = this.dialog.open(DialogoBNComponent, {
          data: registro, 
          width: '300px',
          height: '200px',
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
          !item.cedula && !item.usuario && !item.Departamento && !item.fecha_de_borrados && !item.fecha_de_descargoBN
        );
        this.filteredResults = this.appcontraloria;
      });
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