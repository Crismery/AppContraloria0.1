import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { Correos } from '../interfaz/correos';
import { EncorreoService } from '../servicios/encorreo.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrl: './solicitudes.component.scss'
})
export class SolicitudesComponent implements OnInit {

  activo : boolean = false;
  form: FormGroup;
  correos!: Correos;

  Correos: Correos[]=[];
  idFrozen: boolean = false;
  loaded: boolean = false;

  query: string='';
  resultados$!: Observable<Correos[]>;
  filteredResults: Correos[]=[];
  
  constructor( private correo: EncorreoService,
    private formBuilder: FormBuilder,
    private _snackbar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: Correos
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
   this.correo.getPlaces().subscribe(Correos =>{
    this.Correos = Correos;
    this.loaded =true;

   })
  }

  getSeverity(estatu: string): string {
    if (estatu === 'Aprobado') {
      return 'success';
    } else if (estatu === 'En espera') {
      return 'warning';
    } else if (estatu === 'Rechazado') {
      return 'danger';
    } else {
      return 'info';
    }
  }
  // buscar(): void {
  //   if (this.query.trim() !== '') {
  //     this.filteredResults = this.Correos.filter(place => 
  //       place.correo.toLowerCase().includes(this.query.trim().toLowerCase())
  //     );
  //   } else {
  //     this.filteredResults = this.correo;
  //   }
  // }
  
  setactivo(): void{
    this.activo =!this.activo;
  }
}
