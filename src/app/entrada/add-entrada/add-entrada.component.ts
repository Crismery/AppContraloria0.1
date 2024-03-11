import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { RegistrosService } from '../../servicios/registros.service';



interface FormData{
  opcionSeleccionada: string;
  opciones: string[];
  opciones1: string[];
  opciones2: string[];
  opciones3: string[];
  opciones4: string[];
  opciones5: string[];
}

@Component({
  selector: 'app-add-entrada',
  templateUrl: './add-entrada.component.html',
  styleUrl: './add-entrada.component.scss'
})
export class AddEntradaComponent {

  formulario: FormGroup;

  formData: FormData={
    opcionSeleccionada: '',
    opciones: ['Desktop','Laptop','Monitor','Telefono','Printer'],
    opciones1: ['Windows 10','Windows 11'],
    opciones2: ['i3','i5','i7'],
    opciones3: ['8Gb','16Gb','32Gb'],
    opciones4: ['256Gb','512Gb','1Tb'],
    opciones5: ['17','24']
  };

  constructor(public dialogRef: MatDialogRef<AddEntradaComponent>, private registros:RegistrosService) { 
   this.formulario = new FormGroup({
    dispositivo: new FormControl(),
    modelo: new FormControl(), 
    serial: new FormControl(),
    placa: new FormControl(),
    bienes_nacionales: new FormControl(),
    cedula: new FormControl(),
    usuario: new FormControl(),
    Departamento: new FormControl(),
    os: new FormControl(),
    version: new FormControl(),
    cpu: new FormControl(),
    memoria: new FormControl(),
    almacenamiento: new FormControl(),
    mantenimiento: new FormControl(),
   })
  }
  
  showSizeField(): boolean {
    return this.formData.opcionSeleccionada === 'Monitor';
  }

  showDesktopOrLaptopFields(): boolean {
    return this.formData.opcionSeleccionada === 'Desktop' || this.formData.opcionSeleccionada === 'Laptop';
  }

  async onSubmit(){
    console.log(this.formulario.value)
    const responde= await this.registros.addPlace(this.formulario.value);
    console.log(responde);
  }
  cerrarCentrado(){
    this.dialogRef.close();
  }
}
