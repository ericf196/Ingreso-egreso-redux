import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [
  ]
})
export class NavbarComponent implements OnInit, OnDestroy {

  subcription: Subscription = new Subscription();
  nombre: string;
  constructor(public store:Store<AppState>) { }

  ngOnInit(): void {
    this.subcription = this.store.select('auth').subscribe( (auth)=>{
      this.nombre = auth.user.nombre;
    })
  }

  ngOnDestroy(): void {
    this.subcription.unsubscribe();
  }

}
