import { Component, ViewContainerRef, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { RegistrosService } from '../../servicios/registros.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Appcontraloria } from '../../interfaz/appcontraloria';
import { Observable } from 'rxjs';

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


  constructor(private dialog: MatDialog,
    private viewContainerRef: ViewContainerRef,
    private registrosService: RegistrosService,
    private _snackbar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: Appcontraloria) {
  }

  ngOnInit(): void {
    this.registrosService.getPlaces().subscribe(appcontraloria => {
      this.appcontraloria = appcontraloria.filter(registro => registro.fecha_de_borrados);

      this.filteredResults = this.appcontraloria;

    });

    this.appcontraloriaeditar = { ...this.data };
  }
  agregarFechaMomento(appcontraloria: Appcontraloria) {
    if (appcontraloria) {
      appcontraloria.fecha_de_reingreso = new Date().toISOString();
      this.registrosService.updatePlace(appcontraloria)
        .then(() => {
          this._snackbar.open('Registro agregado con éxito', 'Cerrar', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom'
          });
        })
        .catch(error => {
          console.error('Error al agregar la fecha del momento al registro:', error);
        });
    } else {
      console.error('Registro no válido.');
    }
  }  
  async onClickDelete(appcontraloria: Appcontraloria) {
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