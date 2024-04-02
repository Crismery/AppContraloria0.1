import { Component, ViewContainerRef, OnInit } from '@angular/core';
import { RegistrosService } from '../servicios/registros.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Appcontraloria } from '../interfaz/appcontraloria';
import { Observable } from 'rxjs';


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

  startIndex: number = 0;
  endIndex: number = 0;
  totalItems: number = 0;
  itemsPerPage: number = 5;

  constructor(private registrosService: RegistrosService,
    private dialog: MatDialog,
    private viewContainerRef: ViewContainerRef,
    private _snackbar: MatSnackBar) { }

  ngOnInit() {
    this.registrosService.getPlaces().subscribe(appcontraloria => {
      this.appcontraloria = appcontraloria;

      this.filteredResults = this.appcontraloria;

       this.loadData();

    });
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

  loadData(): void {
    this.totalItems = this.filteredResults.length;
    this.endIndex = Math.min(this.startIndex + this.itemsPerPage, this.totalItems);
  }
  changeItemsPerPage(event: any): void {
    const value = (event.target as HTMLSelectElement).value;
    if (value !== null && value !== undefined) {
      this.itemsPerPage = +value;
      this.startIndex = 0;
      this.filteredResults = this.appcontraloria.slice(0, this.itemsPerPage);

      this.loadData();
    }
  }
  prevPage(): void {
    this.startIndex = Math.max(0, this.startIndex - this.itemsPerPage);
    this.loadData();
  }
  nextPage(): void {
    this.startIndex = Math.min(this.startIndex + this.itemsPerPage, this.totalItems - this.itemsPerPage);
    this.loadData();
  }
}