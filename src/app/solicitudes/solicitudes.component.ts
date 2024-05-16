import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Correos } from '../interfaz/correos';
import { EncorreoService } from '../servicios/encorreo.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import Notiflix from 'notiflix';


@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styleUrl: './solicitudes.component.scss'
})
export class SolicitudesComponent implements OnInit {

  activo: boolean = false;
  form: FormGroup;
  correos!: Correos;

  Correos: Correos[] = [];
  idFrozen: boolean = false;
  loaded: boolean = false;

  query: string = '';
  resultados$!: Observable<Correos[]>;
  filteredResults: Correos[] = [];

  title = 'enviarrespuesta';
  datos: FormGroup;

  constructor(private correo: EncorreoService,
    private formBuilder: FormBuilder,
    private httpclient: HttpClient,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: Correos
  ) {
    this.form = this.formBuilder.group({
      correo: [''],
      asunto: ['', Validators.required],
      mensaje: ['', Validators.required],
      comentario: ['', Validators.required],
      fecha_solicitud: [''],
      fecha_respuesta: [''],
      estatu: [''],
    });

    this.datos = new FormGroup({
      correo: new FormControl('', [Validators.required, Validators.email]),
      asunto: new FormControl('', Validators.required),
      mensaje: new FormControl('', Validators.required)
    });
  }

  enviar(){
    if (this.form.valid) {

      console.log(this.form.value);
      const response = this.correo.addPlace(this.form.value);

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
  async onSubmit() {
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
    this.correo.getPlaces().subscribe(Correos => {
      this.Correos = Correos;
      this.loaded = true;
      this.filteredResults = this.Correos;
    });

  }

  enviarcorreo() {
    if (this.datos.invalid) {
      this.snackBar.open('Correo es obligatorio', 'Cerrar', {
        duration: 3000,
        verticalPosition: 'top'
      });
      return;
    }
    Notiflix.Loading.hourglass('Cargando...');
    let params = {
      email: this.datos.value.correo,
      asunto: this.datos.value.asunto,
      mensaje: this.datos.value.mensaje
    }
    console.log(params)
    this.httpclient.post('http://localhost:3001/solicitudes', params).subscribe(resp => {
      console.log(resp)
      Notiflix.Loading.remove();
      Notiflix.Notify.success('Correo enviado correctamente');
      this.datos.reset();
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
  buscar(): void {
    if (this.query.trim() !== '') {
      this.Correos = this.Correos.filter(place =>
        Object.values(place).some(value =>
          value && typeof value === 'string' && value.toLowerCase().includes(this.query.trim().toLowerCase())
        )
      );
    } else {
      this.correo.getPlaces().subscribe(Correos => {
        this.Correos = Correos;
      });
    }
  }
  setactivo(): void {
    this.activo = !this.activo;
  }
}
