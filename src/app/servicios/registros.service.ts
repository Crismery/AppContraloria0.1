import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, deleteDoc, updateDoc, getDoc} from '@angular/fire/firestore';
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
  deletePlaces(appcontraloria: Appcontraloria): Promise<{ success: boolean }> {
    const placeRef = doc(this.firestore, `appcontraloria/${appcontraloria.id}`);
    return deleteDoc(placeRef)
      .then(() => ({ success: true }))
      .catch(error => {
        console.error('Error deleting document:', error);
        return { success: false };
      });
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
updatePlace(appcontraloria: Appcontraloria){
  const { id, ...dataToUpdate } = appcontraloria; 
  const placeRef = doc(this.firestore, 'appcontraloria', id);
  return updateDoc(placeRef, dataToUpdate);
}
async getPlaceById(appcontraloria: Appcontraloria): Promise<Appcontraloria | string> {
  try {
    const placeRef = doc(this.firestore, `appcontraloria/${appcontraloria.id}`);
    const documentSnapshot = await getDoc(placeRef);
    if (documentSnapshot.exists()) {
      return { id: documentSnapshot.id, ...documentSnapshot.data() } as Appcontraloria;
    } else {
      console.error('El documento no existe');
      return 'El documento no existe';
    }
  } catch (error) {
    console.error('Error al cargar la información:', error);
    return 'Error al cargar la información';
  }
}
}