import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

interface FormData{
  opcionSeleccionada: string;
  opciones5: string[];
}

@Component({
  selector: 'app-add-asignacion',
  templateUrl: './add-asignacion.component.html',
  styleUrl: './add-asignacion.component.scss'
})
export class AddAsignacionComponent {
  formData: FormData={
    opcionSeleccionada: '',
    opciones5: ['Direción Jurídica','Dirección de Comunicaciones', 'Planificación y Desarrollo', 'Recursos Humanos',
               'Tecnología de la Información y Comunicación','Administrativa Financiera', 'Revisión y Control de Calidad',
              'Desarrollo Normativo','Unidades de Auditoría Interna Gubernamental','Auditoría Interna','Auditorías Especiales e Investigación',
            'Análisis Financiero']
  };

  constructor(public dialogRef:MatDialogRef<AddAsignacionComponent>) { }

  cerrarCentrado(){
    this.dialogRef.close();
  }
}
