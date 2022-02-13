import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
//import { AppState } from 'src/app/app.reducer';
import { AppStateIngresoEgreso } from '../ingreso-egreso.reducer';
import { IngresoEgreso } from '../ingreso-egreso.model';
import { ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: [
  ]
})
export class EstadisticaComponent implements OnInit {

  ingresos: number;
  egresos: number;
  cuantosIngresos: number;
  cuantosEgresos: number;

  subscription: Subscription = new Subscription();

  public doughnutChartType: ChartType = 'doughnut';
  public doughnutChartLabels: string[] = [ 'Ingreso', 'Egreso' ];
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [
      { data: [] }
    ]
  };

  constructor( private store:Store<AppStateIngresoEgreso>) { }

  ngOnInit(): void {
    this.subscription = this.store.select('ingresoEgreso')
          .subscribe( ( ingresosEgresos ) => {
            this.contarIngresoEgreso(ingresosEgresos.items)
          });

  }

  contarIngresoEgreso( items: IngresoEgreso[] ){
    this.egresos = 0;
    this.ingresos = 0;
    this.cuantosEgresos = 0;
    this.cuantosIngresos = 0;

    items.forEach( ( item )=>{

      if(item.tipo === 'ingreso'){
        this.cuantosIngresos ++;
        this.ingresos += item.monto;
      }

      if(item.tipo === 'egreso'){
        this.cuantosEgresos ++;
        this.egresos += item.monto;
      }

    })

    this.doughnutChartData.datasets[0].data = [this.ingresos, this.egresos]

  }

}
