import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

interface FormData{
  opcionSeleccionada: string;
  opciones5: string[];
}

@Component({
  selector: 'app-edit-asignacion',
  templateUrl: './edit-asignacion.component.html',
  styleUrl: './edit-asignacion.component.scss'
})
export class EditAsignacionComponent {

  formData: FormData={
    opcionSeleccionada: '',
    opciones5: ['Direción Jurídica','Dirección de Comunicaciones', 'Planificación y Desarrollo', 'Recursos Humanos',
    'Tecnología de la Información y Comunicación','Administrativa Financiera', 'Revisión y Control de Calidad',
   'Desarrollo Normativo','Unidades de Auditoría Interna Gubernamental','Auditoría Interna','Auditorías Especiales e Investigación',
 'Análisis Financiero']
  };

  constructor(private dialogRef: MatDialogRef<EditAsignacionComponent>) { }

  cerrarCentrado(){
    this.dialogRef.close();
  }
}
