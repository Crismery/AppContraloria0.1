import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import Notiflix from 'notiflix';

@Component({
  selector: 'app-dialogocorreo',
  templateUrl: './dialogocorreo.component.html',
  styleUrl: './dialogocorreo.component.scss'
})
export class DialogocorreoComponent {

  title ='enviarcorreo';

  datos: FormGroup;

 constructor(public dialogRef: MatDialogRef<DialogocorreoComponent>,
  private httpclient:HttpClient,
  private fb: FormBuilder,
  private snackBar: MatSnackBar
 ){
  this.datos = new FormGroup({
  correo: new FormControl('',[Validators.required,Validators.email]),
  asunto: new FormControl('',Validators.required),
  mensaje: new FormControl('',Validators.required)
  });
 }

 enviarcorreo(){

if (this.datos.invalid) {
  this.snackBar.open('Correo es obligatorio', 'Cerrar', {
    duration: 3000, 
    verticalPosition: 'top' 
  });
  return; 
}
Notiflix.Loading.hourglass('Cargando...');
  let params ={
    email: this.datos.value.correo,
    asunto: this.datos.value.asunto,
    mensaje: this.datos.value.mensaje
  }
  console.log(params)
  this.httpclient.post('http://localhost:3000/envio',params).subscribe(resp=>{
    console.log(resp)
    Notiflix.Loading.remove();
    Notiflix.Notify.success('Correo enviado correctamente');
    this.datos.reset();
    //this.dialogRef.close();
  })
 }
 cerrarCentrado(){
  this.dialogRef.close();
}
}
