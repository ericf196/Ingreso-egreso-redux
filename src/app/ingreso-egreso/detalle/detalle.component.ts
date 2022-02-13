import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
//import { AppState } from 'src/app/app.reducer';
import { IngresoEgreso } from '../ingreso-egreso.model';
import { AppStateIngresoEgreso } from '../ingreso-egreso.reducer';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: [
  ]
})
export class DetalleComponent implements OnInit, OnDestroy {
  
  items: IngresoEgreso[] = [];
  subscription :Subscription = new Subscription();
  constructor(private store:Store<AppStateIngresoEgreso>) { }

  ngOnInit(): void {
    this.subscription = this.store.select('ingresoEgreso').subscribe((ingresoEgreso)=>{
      let itemsfb =ingresoEgreso.items;
      itemsfb.map((item)=>{
        let obj = new IngresoEgreso(item.descripcion,item.monto,item.tipo,'')        
        this.items.push(obj); 
      })
      console.log(this.items);
    });
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

}
