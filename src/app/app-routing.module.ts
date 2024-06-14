import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { HomeComponent } from './home/home.component';
import { EntradaComponent } from './entrada/entrada.component';
import { AsignacionComponent } from './asignacion/asignacion.component';
import { AlmacenComponent } from './almacen/almacen.component';
import { DescargobnComponent } from './descargobn/descargobn.component';
import { MantenimientoComponent } from './mantenimiento/mantenimiento.component';
import { ReporteComponent } from './reporte/reporte.component';
import { SolicitudesComponent } from './solicitudes/solicitudes.component';
import { RegistrosComponent } from './registros/registros.component';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { AddEntradaComponent } from './entrada/add-entrada/add-entrada.component';
import { AddRegistrosComponent } from './registros/add-registros/add-registros.component';
import { EditEntradaComponent } from './entrada/edit-entrada/edit-entrada.component';
import { EditAsignacionComponent } from './asignacion/edit-asignacion/edit-asignacion.component';
import { BorradorComponent } from './almacen/borrador/borrador.component';
import { DialogocorreoComponent } from './descargobn/dialogocorreo/dialogocorreo.component';



const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'home', component: HomeComponent, ...canActivate(() => redirectUnauthorizedTo(['/registro'])) },
  { path: 'registros', component: RegistrosComponent, ...canActivate(() => redirectUnauthorizedTo(['/registro'])) },
  { path: 'entrada', component: EntradaComponent, ...canActivate(() => redirectUnauthorizedTo(['/registro'])) },
  { path: 'asignacion', component: AsignacionComponent, ...canActivate(() => redirectUnauthorizedTo(['/registro'])) },
  { path: 'almacen', component: AlmacenComponent, ...canActivate(() => redirectUnauthorizedTo(['/registro'])) },
  { path: 'descargobn', component: DescargobnComponent, ...canActivate(() => redirectUnauthorizedTo(['/registro'])) },
  { path: 'mantenimiento', component: MantenimientoComponent, ...canActivate(() => redirectUnauthorizedTo(['/registro'])) },
  { path: 'reporte', component: ReporteComponent, ...canActivate(() => redirectUnauthorizedTo(['/registro'])) },
  { path: 'solicitudes', component: SolicitudesComponent, ...canActivate(() => redirectUnauthorizedTo(['/registro'])) },
  { path: 'add-entrada', component: AddEntradaComponent },
  { path: 'add-registros/:id', component: AddRegistrosComponent },
  { path: 'edit-entrada/:id', component: EditEntradaComponent },
  { path: 'edit-asignacion/:id', component: EditAsignacionComponent },
  { path: 'borrador', component: BorradorComponent, ...canActivate(() => redirectUnauthorizedTo(['/registro'])) },
  {path: 'dialogocorreo', component: DialogocorreoComponent,}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
