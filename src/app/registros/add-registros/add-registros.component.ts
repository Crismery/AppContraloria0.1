import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RegistrosService } from '../../servicios/registros.service';
import { Appcontraloria } from '../../interfaz/appcontraloria';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-add-registros',
  templateUrl: './add-registros.component.html',
  styleUrl: './add-registros.component.scss'
})
export class AddRegistrosComponent implements OnInit{

  appcontraloriaedit!: Appcontraloria;

  constructor(public dialogRef: MatDialogRef<AddRegistrosComponent>,
    private registros: RegistrosService,
    private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: Appcontraloria){
  }

 
 ngOnInit(): void {

  this.appcontraloriaedit = {...this.data};
 /* const id = this.data.id; 
  this.registros.loadEditData(id)
    .then(data => {
      if (data) {
        this.appcontraloriaedit = data;
      } else {
        console.error('No se pudo cargar');
      }
    })
    .catch(error => console.error('Error al cargar la información:', error));*/
}


  /*actualizarLugar() {
    if (this.appcontraloriaedit) {
      this.registros.updatePlace(this.appcontraloriaedit)
        .then(() => console.log('Lugar actualizado correctamente'))
        .catch(error => console.error('Error al actualizar el lugar:', error));
    } else {
      console.error('No hay información para actualizar');
    }
  }*/
  cerrarCentrado(){
    this.dialogRef.close();
  }
}
