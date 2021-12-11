import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {

  constructor(private authService: AuthService) { }

  registerForm: FormGroup;

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      nombre: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });

  }

  onSubmitRegister() {
    console.log(this.registerForm.value)
    let form = this.registerForm.value;
    let nombre = form.nombre;
    let email = form.email;
    let password = form.password;

    console.log(form);
    this.authService.crearUsuario(nombre, email, password)
  }

}
