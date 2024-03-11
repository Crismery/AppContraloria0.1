import { Injectable } from '@angular/core';
import { Firestore, collection,addDoc } from '@angular/fire/firestore';
import { Appcontraloria } from '../interfaz/appcontraloria';

@Injectable({
  providedIn: 'root'
})
export class RegistrosService {

  constructor(private firestore: Firestore) { }

  addPlace(appcontraloria: Appcontraloria){
    const placeRef= collection(this.firestore, 'appcontraloria');
    return addDoc(placeRef, appcontraloria);
  }
}
