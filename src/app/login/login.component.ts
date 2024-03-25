import { Component } from '@angular/core';
import { UserService } from '../servicios/user.service';
import { FormGroup, Validators,FormBuilder } from '@angular/forms';
import { Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  formLogin: FormGroup;

  constructor(private userService: UserService,
    private router: Router,
    private fb: FormBuilder
    ) {
     this.formLogin = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });
  }

  ngOnInit(): void{

  }
  onSubmit() {
    if (this.formLogin.valid) {
      this.userService.login(this.formLogin.value)
        .then(response => {
          console.log(response);
          this.router.navigate(['/home']);
        })
        .catch(error => {
          console.log(error);
          // Maneja el error del inicio de sesión aquí
          // Puedes mostrar un mensaje de error adecuado al usuario
        });
    } else {
      // Formulario inválido, muestra un mensaje de error al usuario
      alert('Por favor complete todos los campos correctamente.');
    }
  }  
  onClick(){
    this.userService.loginWithGoogle()
    .then(response => {
      console.log(response);
      this.router.navigate(['/home']);
    })
    .catch(error => console.log(error))
  }
}
