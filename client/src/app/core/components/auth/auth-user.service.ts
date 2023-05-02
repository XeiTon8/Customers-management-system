import { Injectable, Inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { getAuth, setPersistence, browserSessionPersistence } from "firebase/auth";

@Injectable({
  providedIn: 'root',
})
export class AuthUserService {
userData: any;
constructor( private afAuth: AngularFireAuth, private router: Router) {
  this.isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
}

isLoggedIn = false;


// Sign in with email/password
async signIn(email: string, password: string) {
  try {
    const auth = getAuth();
    await  setPersistence(auth, browserSessionPersistence)
   await this.afAuth.signInWithEmailAndPassword(email, password)
    this.afAuth.authState.subscribe((user: any) => {
      if (user) {
       
        this.router.navigate(['dashboard']);
        this.isLoggedIn = true;
        sessionStorage.setItem('isLoggedIn', 'true');
  
      }

   });
  
   
  } catch(error: any) {
   console.log(error)
   throw error;
  }}

signUp(email: string, password: string) {
  try {
    return this.afAuth.createUserWithEmailAndPassword(email, password).then(() => {
      this.afAuth.authState.subscribe((user: any) => {
        if (user) {
          this.router.navigate(['dashboard']);
          this.isLoggedIn = true;
        }
        })
      });
  } catch(e) {
    console.error(e)
    throw e;
  }}

signOut() {
this.isLoggedIn = false;
sessionStorage.setItem('isLoggedIn', 'false');
return this.afAuth.signOut();
}

isAuth() {
return this.isLoggedIn;
}


}