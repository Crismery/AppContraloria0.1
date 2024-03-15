import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { RegistrosService } from '../../servicios/registros.service';
import { Appcontraloria } from '../../interfaz/appcontraloria';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-add-registros',
  templateUrl: './add-registros.component.html',
  styleUrl: './add-registros.component.scss'
})
export class AddRegistrosComponent implements OnInit {

  appcontraloriaedit: any = {};

  constructor(public dialogRef: MatDialogRef<AddRegistrosComponent>,
    private registros: RegistrosService,
    private route: ActivatedRoute){
  }

  ngOnInit(): void {
  
    this.route.params.subscribe(params => {
      const id = params['id']; 
      if (id) {
        this.registros.loadEditData(id)
          .then(data => {
            if (data) {
              this.appcontraloriaedit = data;
            } else {
              console.error('No se pudo cargar la información del lugar');
            }
          })
          .catch(error => console.error('Error al cargar la información del lugar:', error));
      } else {
        console.error('ID del lugar no proporcionado en la URL');
      }
    });
  }
  

  actualizarLugar() {
    if (this.appcontraloriaedit) {
      this.registros.updatePlace(this.appcontraloriaedit)
        .then(() => console.log('Lugar actualizado correctamente'))
        .catch(error => console.error('Error al actualizar el lugar:', error));
    } else {
      console.error('No hay información para actualizar');
    }
  }
  cerrarCentrado(){
    this.dialogRef.close();
  }
}
