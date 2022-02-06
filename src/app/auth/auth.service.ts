import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { map } from 'rxjs/operators';
import { User } from './user.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { ActivarLoadingAction, DesactivarLoadingAction } from '../shared/ui.accions';
import { SetUserAction, UnsetUserAction } from './auth.action';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSuscription: Subscription = new Subscription();
  private usuario: User;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private afDB: AngularFirestore,
    private store: Store<AppState>
  ) { }

  initAuthListener() {
    this.afAuth.authState.subscribe((fbUser) => {
      if (fbUser) {
        this.userSuscription = this.afDB.doc(`${fbUser.uid}/usuario`).valueChanges()
          .subscribe((usuarioObj: any) => {
            console.log(usuarioObj)
            const newUser = new User(usuarioObj.nombre, usuarioObj.email, usuarioObj.uid);
            this.store.dispatch(new SetUserAction(newUser))
            this.usuario = newUser;
          })
      } else {

        this.userSuscription.unsubscribe();
      }
    })
  }

  crearUsuario(nombre: string, email: string, password: string) {

    this.store.dispatch(new ActivarLoadingAction());

    this.afAuth.createUserWithEmailAndPassword(email, password)
      .then(resp => {

        const user: User = {
          nombre: nombre,
          email: resp.user?.email,
          uid: resp.user?.uid,

        };

        this.afDB.doc(`${user.uid}/usuario`)
          .set(user)
          .then(() => {

            this.router.navigate(['/']);
            this.store.dispatch(new DesactivarLoadingAction());

          });
      }).catch(error => {
        Swal.fire("Error en el login", error.message, 'error')
        console.log(error)
        this.store.dispatch(new DesactivarLoadingAction());
      })
  }

  login(email: string, password: string) {

    this.store.dispatch(new ActivarLoadingAction());

    this.afAuth.signInWithEmailAndPassword(email, password).then(
      (resp) => {
        this.router.navigate(['/']);
        this.store.dispatch(new DesactivarLoadingAction());
      }
    ).catch((error) => {
      Swal.fire("Error en el login", error.message, 'error')
      console.log(error)
      this.store.dispatch(new DesactivarLoadingAction());
    })
  }

  logout() {
    this.store.dispatch(new UnsetUserAction())
    return this.afAuth.signOut();
    
  }

  isAuth() {
    return this.afAuth.authState.pipe(
      map(fbUser => {

        if (fbUser == null) {
          this.router.navigate(["/login"]);
        }
        return fbUser != null
      })
    )
  }

  getUsuario() {
    return { ...this.usuario };
  }

}
