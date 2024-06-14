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
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AddAsignacionComponent } from './asignacion/add-asignacion/add-asignacion.component';
import { MatSelectModule } from '@angular/material/select';
import { AddRegistrosComponent } from './registros/add-registros/add-registros.component';
import { EditEntradaComponent } from './entrada/edit-entrada/edit-entrada.component';
import { EditAsignacionComponent } from './asignacion/edit-asignacion/edit-asignacion.component';
import { AddMantenimientoComponent } from './mantenimiento/add-mantenimiento/add-mantenimiento.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { BorradorComponent } from './almacen/borrador/borrador.component';
import { MatSidenavModule } from '@angular/material/sidenav'; 
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { SinodialogoComponent } from './almacen/borrador/sinodialogo/sinodialogo.component';
import { DialogoentradaComponent } from './entrada/dialogoentrada/dialogoentrada.component';
import { DialogoregistroComponent } from './registros/dialogoregistro/dialogoregistro.component';
import { DialogousuarioComponent } from './registros/dialogousuario/dialogousuario.component';
import { DialogocorreoComponent } from './descargobn/dialogocorreo/dialogocorreo.component';
import { DialogoBNComponent } from './almacen/dialogo-bn/dialogo-bn.component';
import { DialogoagregarComponent } from './almacen/borrador/dialogoagregar/dialogoagregar.component';
import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { TagModule } from 'primeng/tag';
import { DialogModule } from 'primeng/dialog';
import { ResolicitudesComponent } from './solicitudes/resolicitudes/resolicitudes.component';
import { TabViewModule } from 'primeng/tabview';
import { InputTextModule } from 'primeng/inputtext';
import { ScrollPanelModule } from 'primeng/scrollpanel';



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
    MantenimientoComponent,
    ReporteComponent,
    SolicitudesComponent,
    DescargobnComponent,
    AddEntradaComponent,
    AddAsignacionComponent,
    AddRegistrosComponent,
    EditEntradaComponent,
    EditAsignacionComponent,
    AddMantenimientoComponent,
    BorradorComponent,
    SinodialogoComponent,
    DialogoentradaComponent,
    DialogoregistroComponent,
    DialogousuarioComponent,
    DialogocorreoComponent,
    DialogoBNComponent,
    DialogoagregarComponent,
    ResolicitudesComponent
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
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatExpansionModule,
    MatListModule,
    TableModule,
    ToggleButtonModule,
    TagModule,
    DialogModule,
    TabViewModule,
    InputTextModule,
    ScrollPanelModule,
    HttpClientModule,
    provideFirebaseApp(() => initializeApp({"projectId":"app-contraloria-4e461","appId":"1:773014821815:web:25693680a61efc7fe0a632","storageBucket":"app-contraloria-4e461.appspot.com","apiKey":"AIzaSyDQ-4H7L3V8acBlSqClBLPeXasvpSQ2p8c","authDomain":"app-contraloria-4e461.firebaseapp.com","messagingSenderId":"773014821815"})),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    { provide: MAT_DIALOG_DATA, useValue: {} }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
