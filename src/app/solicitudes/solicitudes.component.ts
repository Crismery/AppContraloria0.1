import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { Correos } from '../interfaz/correos';
import { EncorreoService } from '../servicios/encorreo.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrl: './solicitudes.component.scss'
})
export class SolicitudesComponent implements OnInit {

  activo : boolean = false;
  form: FormGroup;
  correos!: Correos;
  
  
  constructor( private correo: EncorreoService,
    private formBuilder: FormBuilder,
    private _snackbar: MatSnackBar,
  ){
    this.form = this.formBuilder.group({
      correo: [''],
      asunto: ['',Validators.required],
      mensaje: ['',Validators.required],
      comentario: ['',Validators.required],
      fecha_solicitud: [''],
      fecha_respuesta: [''],
      estatu: [''],
    });
  }

  async onSubmit(){
    if (this.form.valid) {
    
      console.log(this.form.value);
      const response = await this.correo.addPlace(this.form.value);
      
      console.log(response);
    
    //   if (response) {
    //     this.form.reset();
    //     this._snackbar.open('¡Guardado exitosamente!', 'Cerrar', {
    //       duration: 3000,
    //     });
    //   } else {
    //     this._snackbar.open('No se pudo registrar la entrada', 'Cerrar', {
    //       duration: 2000,
    //     });
    //   }
    // } else {
    //   this._snackbar.open('Por favor complete todos los campos obligatorios', 'Cerrar', {
    //     duration: 2000,
    //   });
    }
  }   
  ngOnInit(): void {
    
  }

  setactivo(): void{
    this.activo =!this.activo;
  }
}
