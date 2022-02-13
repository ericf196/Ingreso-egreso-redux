import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { AppState } from '../app.reducer';
import { AppStateIngresoEgreso } from '../ingreso-egreso/ingreso-egreso.reducer';
import { AuthService } from '../auth/auth.service';
import { SetItemsAction, UnsetItemsAction } from './ingreso-egreso.actions';
import { IngresoEgreso } from './ingreso-egreso.model';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  ingresoEgresoListenerSubcription: Subscription = new Subscription();
  ingresoEgresoItemsSubcription : Subscription = new Subscription()

  constructor(
    private afDB: AngularFirestore,
    public authService: AuthService,
    private store: Store<AppState>,
    private storeLazy: Store<AppStateIngresoEgreso>
  ) { }

  initIngresoEgresoListener() {
    this.ingresoEgresoListenerSubcription = this.store.select('auth')
      .pipe(
        filter(auth => auth.user.nombre !== "" && auth.user.uid !== "")
      )
      .subscribe(auth => {
        console.log(auth.user.uid)
        this.ingresoEgresoItems(auth.user.uid);
      })
  }

  private ingresoEgresoItems(uid: string) {
    this.ingresoEgresoItemsSubcription = this.afDB.collection(`${uid}/ingreso-egreso/items`)
      .valueChanges()
      .subscribe((docData: any[]) => {
        console.log(docData)

        this.storeLazy.dispatch( new SetItemsAction(docData));
      })
  }

  crearIngresoEgreso(ingresoEgreso: IngresoEgreso) {
    const user = this.authService.getUsuario();
    return this.afDB.doc(`${user.uid}/ingreso-egreso/`).collection('items')
      .add({
        descripcion: ingresoEgreso.descripcion,
        monto: ingresoEgreso.monto,
        tipo: ingresoEgreso.tipo,
        //uid: ingresoEgreso.uid
      });
  }

  cancelarSubscriptions(){
    this.ingresoEgresoItemsSubcription.unsubscribe();
    this.ingresoEgresoListenerSubcription.unsubscribe();
    this.store.dispatch( new UnsetItemsAction() );

  }

}
