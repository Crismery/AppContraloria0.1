import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Appcontraloria } from '../../interfaz/appcontraloria';

interface FormData{
  opcionSeleccionada: string;
  opciones5: string[];
}

@Component({
  selector: 'app-edit-asignacion',
  templateUrl: './edit-asignacion.component.html',
  styleUrl: './edit-asignacion.component.scss'
})
export class EditAsignacionComponent implements OnInit{

  formData: FormData={
    opcionSeleccionada: '',
    opciones5: ['Direción Jurídica','Dirección de Comunicaciones', 'Planificación y Desarrollo', 'Recursos Humanos',
    'Tecnología de la Información y Comunicación','Administrativa Financiera', 'Revisión y Control de Calidad',
   'Desarrollo Normativo','Unidades de Auditoría Interna Gubernamental','Auditoría Interna','Auditorías Especiales e Investigación',
 'Análisis Financiero']
  };

  appcontraloriaedit!: Appcontraloria;

  constructor(private dialogRef: MatDialogRef<EditAsignacionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Appcontraloria) { }

    ngOnInit(): void {
      this.appcontraloriaedit = {...this.data};
    }

  cerrarCentrado(){
    this.dialogRef.close();
  }
}
