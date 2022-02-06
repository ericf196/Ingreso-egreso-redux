import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { AppState } from '../app.reducer';
import { ActivarLoadingAction, DesactivarLoadingAction } from '../shared/ui.accions';
import { IngresoEgreso } from './ingreso-egreso.model';
import { IngresoEgresoService } from './ingreso-egreso.service';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: [
  ]
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {

  forma: FormGroup;
  tipo: string = 'ingreso';
  loadingSubs: Subscription = new Subscription();
  cargando: boolean;

  constructor(public ingresoEgresoService: IngresoEgresoService,
    private store: Store<AppState>) { }


  ngOnInit(): void {

    this.loadingSubs = this.store.select('ui')
      .subscribe(ui => { this.cargando = ui.isLoading })

    this.forma = new FormGroup({
      descripcion: new FormControl('', Validators.required),
      monto: new FormControl(0, Validators.min(0)),
    })

  }
  ngOnDestroy(): void {
    this.loadingSubs.unsubscribe;
  }

  crearIngresoEgreso() {

    this.store.dispatch(new ActivarLoadingAction());

    const { descripcion, monto } = this.forma.value;

    const ingresoEgreso = new IngresoEgreso(descripcion, monto, this.tipo, '');

    this.ingresoEgresoService.crearIngresoEgreso(ingresoEgreso)
      .then(() => {
        this.store.dispatch(new DesactivarLoadingAction());
        Swal.fire('Creado', ingresoEgreso.descripcion, 'success');
        this.forma.reset({
          monto: 0
        })
      })


  }

}
