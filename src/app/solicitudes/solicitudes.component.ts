import { Component, OnInit, Inject, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Correos } from '../interfaz/correos';
import { EncorreoService } from '../servicios/encorreo.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import Notiflix from 'notiflix';
import { ResolicitudesComponent } from './resolicitudes/resolicitudes.component';

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrl: './solicitudes.component.scss'
})
export class SolicitudesComponent implements OnInit {

  Correos: Correos[] = [];
  idFrozen: boolean = false;
  loaded: boolean = false;

  query: string = '';
  resultados$!: Observable<Correos[]>;
  filteredResults: Correos[] = [];

  title = 'enviarrespuesta';
  //resivir correo


  constructor(private correo: EncorreoService,
    private dialog:MatDialog, 
    private viewContainerRef: ViewContainerRef,
    @Inject(MAT_DIALOG_DATA) public data: Correos
  ) {
  }

  mostrarComponente(): void {
    const dialogRef = this.dialog.open(ResolicitudesComponent, {
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
  ngOnInit(): void {
    this.correo.getPlaces().subscribe(Correos => {
      this.Correos = Correos;
      this.loaded = true;
      this.filteredResults = this.Correos;
    });
  }
  getSeverity(estatu: string): string {
    if (estatu === 'Aprobado') {
      return 'success';
    } else if (estatu === 'En espera') {
      return 'warning';
    } else if (estatu === 'Rechazado') {
      return 'danger';
    } else {
      return 'info';
    }
  }
  buscar(): void {
    if (this.query.trim() !== '') {
      this.Correos = this.Correos.filter(place =>
        Object.values(place).some(value =>
          value && typeof value === 'string' && value.toLowerCase().includes(this.query.trim().toLowerCase())
        )
      );
    } else {
      this.correo.getPlaces().subscribe(Correos => {
        this.Correos = Correos;
      });
    }
  }
}
