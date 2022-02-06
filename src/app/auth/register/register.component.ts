import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit,OnDestroy {

  cargando:boolean;
  subscription:Subscription = new Subscription();

  constructor(private authService: AuthService, private store: Store<AppState>) { }

  registerForm: FormGroup;

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      nombre: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
    this.store.select('ui').subscribe((ui) => {
      this.cargando = ui.isLoading;
    })
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
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
