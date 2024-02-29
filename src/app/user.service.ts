import { Injectable } from '@angular/core';
import {Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, signInWithPopup, GoogleAuthProvider} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private auth: Auth) { }

  registrar({email, password}: any){ 
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  login({email, password}: any){
    return signInWithEmailAndPassword(this.auth, email, password);
  }
  loginWithGoogle() {
    const provide = new GoogleAuthProvider();
    return signInWithPopup(this.auth, provide);
  }

  logout() {
    return signOut(this.auth);
  }
}
