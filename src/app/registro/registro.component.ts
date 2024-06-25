import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../servicios/user.service';
import { Router } from '@angular/router';
import Notiflix from 'notiflix';
import {passwordMatchValidator} from '../validaciones/contraseñaVakidacion';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  formReg: FormGroup;

  constructor(private userService: UserService, private router: Router, private fb: FormBuilder) { 
    this.formReg = this.fb.group({
      usuario: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmarC: ['', [Validators.required]]
    }, { validator: passwordMatchValidator });
  }

  ngOnInit(): void {}

  // passwordMatchValidator(formGroup: FormGroup) {
  //   const password = formGroup.get('password');
  //   const confirmarC = formGroup.get('confirmarC');
  
  //   if (password && confirmarC) {
  //     if (password.value !== confirmarC.value) {
  //       confirmarC.setErrors({ passwordMismatch: true });
  //     } else {
  //       confirmarC.setErrors(null);
  //     }
  //   }
  // }
  // passwordValidator(control: { value: any; }) {
  //   const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*.\-_+/?\|=()])[a-zA-Z0-9!@#$%^&*.\-_+/?\|=()]{6,}$/;
  //   return passwordRegex.test(control.value) ? null : { invalidPassword: true };
  // }
   
  
  onSubmit() {
    if (this.formReg.valid) {
      this.userService.registrar(this.formReg.value)
        .then(response => {
          console.log(response);
          Notiflix.Notify.success('Registrado exitosamente');
          this.router.navigate(['/home']);
        })
        .catch(error => console.error(error));
    } else {
      Notiflix.Notify.failure('Por favor complete todos los campos correctamente.');
    }
  }
  
}
