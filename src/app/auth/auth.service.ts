import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { map } from 'rxjs/operators';
import { User } from './user.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private afDB: AngularFirestore
  ) { }

  initAuthListener() {
    this.afAuth.authState.subscribe((fbUser) => {
      console.log(fbUser);
    })
  }

  crearUsuario(nombre: string, email: string, password: string) {
    this.afAuth.createUserWithEmailAndPassword(email, password)
      .then(resp => {

        const user: User = {
          nombre: nombre,
          email: resp.user?.email,
          uid: resp.user?.uid,
      
        };

        this.afDB.doc(`${user.uid}/usuario`)
                  .set(user)
                  .then(() =>{
                    this.router.navigate(['/']);
                  });
      }).catch(error => {
        Swal.fire("Error en el login", error.message, 'error')
        console.log(error)
      })
  }

  login(email: string, password: string) {
    this.afAuth.signInWithEmailAndPassword(email, password).then(
      (resp) => {
        this.router.navigate(['/']);
      }
    ).catch((error) => {
      Swal.fire("Error en el login", error.message, 'error')
      console.log(error)
    })
  }

  logout() {
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

}
