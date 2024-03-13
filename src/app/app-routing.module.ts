import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { HomeComponent } from './home/home.component';
import { EntradaComponent } from './entrada/entrada.component';
import { AsignacionComponent } from './asignacion/asignacion.component';
import { AlmacenComponent } from './almacen/almacen.component';
import { DescargoComponent } from './descargo/descargo.component';
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


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent},
    {path: 'registro', component: RegistroComponent},
    {path: 'home', component: HomeComponent,  ...canActivate(() => redirectUnauthorizedTo(['/registro']))},
    {path: 'registros', component: RegistrosComponent},
    {path: 'entrada', component: EntradaComponent},
    {path: 'asignacion', component: AsignacionComponent},
    {path: 'almacen', component: AlmacenComponent},
    {path: 'descargo', component: DescargoComponent},
    {path: 'descargobn', component: DescargobnComponent},
    {path: 'mantenimiento', component: MantenimientoComponent},
    {path: 'reporte', component: ReporteComponent},
    {path: 'solicitudes', component: SolicitudesComponent},
    {path: 'add-entrada', component: AddEntradaComponent},
    {path: 'add-registros', component: AddRegistrosComponent},
    {path: 'edit-entrada', component: EditEntradaComponent},
    {path: 'edit-asignacion',component: EditAsignacionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
