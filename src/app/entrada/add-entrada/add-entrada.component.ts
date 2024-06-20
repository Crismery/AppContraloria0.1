import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RegistrosService } from '../../servicios/registros.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Appcontraloria } from '../../interfaz/appcontraloria';

@Component({
  selector: 'app-add-entrada',
  templateUrl: './add-entrada.component.html',
  styleUrl: './add-entrada.component.scss'
})
export class AddEntradaComponent {

  form: FormGroup;
  appcontraloriaedit!: Appcontraloria;

  constructor(public dialogRef: MatDialogRef<AddEntradaComponent>,
    private registros: RegistrosService,
    private formBuilder: FormBuilder,
    private _snackbar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: Appcontraloria) {

    this.form = this.formBuilder.group({
      dispositivo: ['', Validators.required],
      modelo: ['', Validators.required],
      serial: [''],
      placa: [''],
      bienes_nacionales: [''],
      tamaño: [''],
      os: ['', Validators.required],
      cpu: [''],
      memoria: ['', Validators.required],
      almacenamiento: ['', Validators.required],
      Departamento: [''],
      mantenimiento: [''],
      cedula: [''],
      usuario: [''],
      tipo_de_mantenimiento: [''],
      fecha_de_mantenimiento: [''],
      fecha_de_entrada: [''],
      fecha_de_salida: [''],
      defragmentacion: [''],
      limpieza: [''],
      fecha_de_actualizacion: [''],
      fecha_de_elimusuario: [''],
      fecha_de_borrados: [''],
      fecha_de_reingreso: [''],
      fecha_de_asignacion: [''],
      fecha_de_descargoBN: [''],
      comentarioeliusuario: ['']
    });

    this.form.get('dispositivo')?.valueChanges.subscribe((selectedDispositivo) => {
      this.actualizarControles(selectedDispositivo);
    });
  }
  ngOnInit() {
    this.actualizarControles(this.form.get('dispositivo')?.value);

    this.appcontraloriaedit = { ...this.data };
  }

  actualizarControles(selectedDispositivo: string | null): void {
    this.form.get('tamaño')?.clearValidators();
    this.form.get('os')?.clearValidators();
    this.form.get('cpu')?.clearValidators();
    this.form.get('memoria')?.clearValidators();
    this.form.get('almacenamiento')?.clearValidators();

    this.form.get('tamaño')?.setValue('');
    this.form.get('os')?.setValue('');
    this.form.get('cpu')?.setValue('');
    this.form.get('memoria')?.setValue('');
    this.form.get('almacenamiento')?.setValue('');

    if (selectedDispositivo === 'Monitor') {
      this.form.get('tamaño')?.setValidators([Validators.required]);
    } else if (selectedDispositivo === 'Desktop' || selectedDispositivo === 'Laptop') {
      this.form.get('os')?.setValidators([Validators.required]);
      this.form.get('cpu')?.setValidators([Validators.required]);
      this.form.get('memoria')?.setValidators([Validators.required]);
      this.form.get('almacenamiento')?.setValidators([Validators.required]);
    }

    this.form.updateValueAndValidity();
  }
  async onSubmit() {
    if (this.form.valid) {
      // Asignar la fecha de entrada antes de realizar el reset del formulario
      this.appcontraloriaedit.fecha_de_entrada = new Date().toISOString().split('T')[0];

      console.log(this.form.value);
      const response = await this.registros.addPlace(this.form.value);

      console.log(response);

      if (response) {
        this.form.reset();
        this._snackbar.open('¡Guardado exitosamente!', 'Cerrar', {
          duration: 3000,
        });
      } else {
        this._snackbar.open('No se pudo registrar la entrada', 'Cerrar', {
          duration: 2000,
        });
      }
    }
  }
  cerrarCentrado() {
    this.dialogRef.close();
  }
}
