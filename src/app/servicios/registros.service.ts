import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, deleteDoc, updateDoc,query, where } from '@angular/fire/firestore';
import { Appcontraloria } from '../interfaz/appcontraloria';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RegistrosService {

  constructor(private firestore: Firestore) { }

  addPlace(appcontraloria: Appcontraloria){
    const placeRef= collection(this.firestore, 'appcontraloria');
    return addDoc(placeRef, appcontraloria);
  }
  getPlaces(): Observable<Appcontraloria[]> {
    const placeRef = collection(this.firestore, 'appcontraloria');
    return collectionData(placeRef, { idField: 'id' }) as Observable<Appcontraloria[]>;
  }
  deletePlaces(appcontraloria: Appcontraloria){
    const placeRef= doc(this.firestore,`appcontraloria/${appcontraloria.id}`);
    return deleteDoc(placeRef);
  }
  async deleteFields(appcontraloria: Appcontraloria) {
    const placeRef = doc(this.firestore, `appcontraloria/${appcontraloria.id}`);
    const updateData = {
        usuario: null, 
        cedula: null, 
        Departamento: null 
    };
    await updateDoc(placeRef, updateData);
}
}
