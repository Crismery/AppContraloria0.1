import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, deleteDoc, updateDoc, getDoc} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import {Correos} from "../interfaz/correos"

@Injectable({
  providedIn: 'root'
})
export class EncorreoService {

  constructor(private firestore:Firestore) { }

  addPlace(correo: Correos){

    const fecha_respuesta = new Date().toISOString().split('T')[0];
    correo.fecha_respuesta= fecha_respuesta;
    
    const placeRef= collection(this.firestore, 'correo');
    return addDoc(placeRef, correo);
  }
  getPlaces(): Observable<Correos[]> {
    const placeRef = collection(this.firestore, 'correo');
    return collectionData(placeRef, { idField: 'id' }) as Observable<Correos[]>;
  }
}
