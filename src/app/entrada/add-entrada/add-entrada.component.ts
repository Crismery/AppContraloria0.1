import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-add-entrada',
  templateUrl: './add-entrada.component.html',
  styleUrl: './add-entrada.component.scss'
})
export class AddEntradaComponent {

  constructor(public dialogRef: MatDialogRef<AddEntradaComponent>) { }
  
  opciones=['Desktop','Laptop','Monitor','Telefono','Printer'];
  opcionSeleccionada: string='';

  opciones1=['Windows 10','Windows 11'];
  opcionSeleccionada1: string='';

  opciones2=['i3','i5','i7'];
  opcionSeleccionada2: string='';

  opciones3=['8Gb','16Gb','32Gb'];
  opcionSeleccionada3: string='';

  opciones4=['256Gb','512Gb','1Tb'];
  opcionSeleccionada4: string='';

  opciones5=['17','24'];
  opcionSeleccionada5: string='';
  cerrarCentrado(){
    this.dialogRef.close();
  }
}
