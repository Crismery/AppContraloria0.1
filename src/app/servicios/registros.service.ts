import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, deleteDoc, updateDoc, getDoc} from '@angular/fire/firestore';
import { Appcontraloria } from '../interfaz/appcontraloria';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RegistrosService {

  constructor(private firestore: Firestore) { }
//guardar
  addPlace(appcontraloria: Appcontraloria){

    const fechaDeEntrada = new Date().toISOString().split('T')[0];
    appcontraloria.fecha_de_entrada = fechaDeEntrada;

    // const fecha_de_actualizacion = new Date().toISOString();
    // appcontraloria.fecha_de_actualizacion = fecha_de_actualizacion;
    
    const placeRef= collection(this.firestore, 'appcontraloria');
    return addDoc(placeRef, appcontraloria);
  }
  //listar
  getPlaces(): Observable<Appcontraloria[]> {
    const placeRef = collection(this.firestore, 'appcontraloria');
    return collectionData(placeRef, { idField: 'id' }) as Observable<Appcontraloria[]>;
  }
  //eliminar
  deletePlaces(appcontraloria: Appcontraloria): Promise<{ success: boolean }> {
    const placeRef = doc(this.firestore, `appcontraloria/${appcontraloria.id}`);
    return deleteDoc(placeRef)
      .then(() => ({ success: true }))
      .catch(error => {
        console.error('Error deleting document:', error);
        return { success: false };
      });
  }
//eliminar usuario
  async deleteFields(appcontraloria: Appcontraloria) {
    const placeRef = doc(this.firestore, `appcontraloria/${appcontraloria.id}`);
    
    const fecha_de_elimusuario = new Date().toISOString();
    const updateData = {
        usuario: null, 
        cedula: null, 
        Departamento: null,
        fecha_de_elimusuario: fecha_de_elimusuario
    };
    await updateDoc(placeRef, updateData);
}
async deletedescargo(appcontraloria: Appcontraloria) {
  const placeRef = doc(this.firestore, `appcontraloria/${appcontraloria.id}`);
  
  const updateData = {
    fecha_de_descargoBN: null,
    comentariodescargoAlma: null
  };
  await updateDoc(placeRef, updateData);
}

async deletecomenusuario(appcontraloria: Appcontraloria) {
  const placeRef = doc(this.firestore, `appcontraloria/${appcontraloria.id}`);
  
  const fecha_de_elimusuario = new Date().toISOString();
  const updateData = {
    comentarioeliusuario: null, 
      fecha_de_elimusuario: null, 
      email:null,
  };
  await updateDoc(placeRef, updateData);
}
//editar
updatePlace(appcontraloria: Appcontraloria){
  const { id, ...dataToUpdate } = appcontraloria; 
  const placeRef = doc(this.firestore, 'appcontraloria', id);
  return updateDoc(placeRef, dataToUpdate);
}
updateplacefecha(appcontraloria: Appcontraloria) {
  if (appcontraloria) {
    const dataToUpdate = { ...appcontraloria }; 
    
    const placeRef = doc(this.firestore, 'appcontraloria', appcontraloria.id);
    return updateDoc(placeRef, dataToUpdate)
      .then(() => {
        console.log('Documento actualizado correctamente.');
      })
      .catch(error => {
        console.error('Error al actualizar el documento:', error);
        throw error; 
      });
  } else {
    console.error('El objeto appcontraloria es undefined');
    throw new Error('El objeto appcontraloria es undefined'); 
  }
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