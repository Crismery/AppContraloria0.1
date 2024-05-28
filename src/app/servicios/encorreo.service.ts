import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, getDoc} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import {Correos} from "../interfaz/correos";
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EncorreoService {

  private apiUrl = 'http://localhost:3002/api/emails';

  constructor(private firestore:Firestore,
    private http: HttpClient
  ) { }
//guardar
  addPlace(correo: Correos){
    const fecha_respuesta = new Date().toISOString().split('T')[0];
    correo.fecha_respuesta= fecha_respuesta;
    
    const placeRef= collection(this.firestore, 'correo');
    return addDoc(placeRef, correo);
  }
  //obtener
  getPlaces(): Observable<Correos[]> {
    const placeRef = collection(this.firestore, 'correo');
    return collectionData(placeRef, { idField: 'id' }) as Observable<Correos[]>;
  }
  //buscar
  async getPlaceById(correo: Correos): Promise<Correos | string> {
    try {
      const placeRef = doc(this.firestore, `appcontraloria/${correo.id}`);
      const documentSnapshot = await getDoc(placeRef);
      if (documentSnapshot.exists()) {
        return { id: documentSnapshot.id, ...documentSnapshot.data() } as Correos;
      } else {
        console.error('El documento no existe');
        return 'El documento no existe';
      }
    } catch (error) {
      console.error('Error al cargar la información:', error);
      return 'Error al cargar la información';
    }
  }
  
  //obtener correo
  getEmails(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
