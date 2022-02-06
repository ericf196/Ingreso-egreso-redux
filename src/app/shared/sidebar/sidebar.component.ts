import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/app.reducer';
import { AuthService } from 'src/app/auth/auth.service';
import { IngresoEgresoService } from 'src/app/ingreso-egreso/ingreso-egreso.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent implements OnInit, OnDestroy {

  nombre: string;
  subcription: Subscription = new Subscription();
  
  constructor(private authService: AuthService,
              private router: Router,
              public store:Store<AppState>,
              public ingresoEgresoService: IngresoEgresoService ) { }

  ngOnInit(): void {
    this.subcription = this.store.select('auth').subscribe( (auth)=>{
      this.nombre = auth.user.nombre;
    })
  }

  ngOnDestroy(): void {
    this.subcription.unsubscribe();
  }

  logout() {
    this.authService.logout().then(() => {
      this.ingresoEgresoService.cancelarSubscriptions();
      this.router.navigate(['/login']);
    })
  }

}
