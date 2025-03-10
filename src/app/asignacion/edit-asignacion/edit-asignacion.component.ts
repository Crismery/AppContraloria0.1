import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Appcontraloria } from '../../interfaz/appcontraloria';
import { RegistrosService } from '../../servicios/registros.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private registros: RegistrosService,
    private _snackbar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: Appcontraloria) { }

    ngOnInit(): void {
      this.appcontraloriaedit = {...this.data};
    }
    async actualizarLugar(appcontraloria: Appcontraloria) {
      if (this.appcontraloriaedit) {
        this.appcontraloriaedit.fecha_de_asignacion= new Date().toISOString().split('T')[0];
        this.dialogRef.close();
        this.registros.updatePlace(this.appcontraloriaedit)
      }
        try {
    
          const response = await this.registros.deletecomenusuario(appcontraloria);
          console.log('¡Guardado exitosamente!');
          this.dialogRef.close();
          this._snackbar.open('¡Guardado exitosamente!', 'Cerrar', {
              duration: 3000,
          });
        } catch (error) {
          console.error('Error al actualizar el lugar:', error);
    
          this._snackbar.open('No hay información para actualizar.', 'Cerrar', {
              duration: 3000,
          });
        }
      }
    
  cerrarCentrado(){
    this.dialogRef.close();
  }
}
