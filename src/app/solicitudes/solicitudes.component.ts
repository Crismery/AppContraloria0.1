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

  //activo: boolean = false;
  //prueba
  visitable: Boolean = false;
  form: FormGroup;
  correos!: Correos;

  Correos: Correos[] = [];
  idFrozen: boolean = false;
  loaded: boolean = false;

  query: string = '';
  resultados$!: Observable<Correos[]>;
  filteredResults: Correos[] = [];

  title = 'enviarrespuesta';
  // datos: FormGroup;

  //resivir correo

  emails : any[]=[];

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
      estatu: ['', Validators.required],
    });

    this.form = new FormGroup({
      correo: new FormControl('', [Validators.required, Validators.email]),
      asunto: new FormControl('', Validators.required),
      mensaje: new FormControl('', Validators.required),
      comentario: new FormControl('', Validators.required),
      estatu: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.correo.getPlaces().subscribe(Correos => {
      this.Correos = Correos;
      this.loaded = true;
      this.filteredResults = this.Correos;
    });
    this.getEmails();
  }
  enviar(){
    if (this.form.valid) {

      console.log(this.form.value);
      const response = this.correo.addPlace(this.form.value);

      console.log(response);
    }
    if (this.form.invalid) {
      this.snackBar.open('Correo es obligatorio', 'Cerrar', {
        duration: 3000,
        verticalPosition: 'top'
      });
      return;
    }
    Notiflix.Loading.hourglass('Cargando...');
    let params = {
      email: this.form.value.correo,
      asunto: this.form.value.asunto,
      mensaje: `${this.form.value.estatu} \n \n - ${this.form.value.comentario}`
    }
    console.log(params)
    this.httpclient.post('http://localhost:3001/solicitudes', params).subscribe(resp => {
      console.log(resp)
      Notiflix.Loading.remove();
      Notiflix.Notify.success('Correo enviado correctamente');
      // this.form.reset();
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
  // setactivo(): void {
  //   this.activo = !this.activo;
  // }
  //prueba
  showdialogo(){
    this.visitable =true;
  }

  //resivir correo

  getEmails() {
    this.httpclient.get<any[]>('http://localhost:3000/emails')
      .subscribe(
        response => {
          this.emails = response;
        },
        error => {
          console.error('Error al obtener los correos', error);
        }
      );
  }
}
