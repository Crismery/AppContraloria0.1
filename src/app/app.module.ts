import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { HomeComponent } from './home/home.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RegistrosComponent } from './registros/registros.component';
import { EntradaComponent } from './entrada/entrada.component';
import { AsignacionComponent } from './asignacion/asignacion.component';
import { AlmacenComponent } from './almacen/almacen.component';
import { DescargoComponent } from './descargo/descargo.component';
import { MantenimientoComponent } from './mantenimiento/mantenimiento.component';
import { ReporteComponent } from './reporte/reporte.component';
import { SolicitudesComponent } from './solicitudes/solicitudes.component';
import { DescargobnComponent } from './descargobn/descargobn.component';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { AddEntradaComponent } from './entrada/add-entrada/add-entrada.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    HomeComponent,
    RegistrosComponent,
    EntradaComponent,
    AsignacionComponent,
    AlmacenComponent,
    DescargoComponent,
    MantenimientoComponent,
    ReporteComponent,
    SolicitudesComponent,
    DescargobnComponent,
    AddEntradaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ButtonModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    provideFirebaseApp(() => initializeApp({"projectId":"app-contraloria-4e461","appId":"1:773014821815:web:25693680a61efc7fe0a632","storageBucket":"app-contraloria-4e461.appspot.com","apiKey":"AIzaSyDQ-4H7L3V8acBlSqClBLPeXasvpSQ2p8c","authDomain":"app-contraloria-4e461.firebaseapp.com","messagingSenderId":"773014821815"})),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
