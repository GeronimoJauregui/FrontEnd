import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingComponent } from './account-setting/account-setting.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { AdminGuard } from '../guards/admin.guard';

const childRoutes: Routes = [
  { path: '', component: DashboardComponent, data: { titulo: 'Dashborad'} },
  { path: 'progress', component: ProgressComponent, data: { titulo: 'Progress Bar'} },
  { path: 'grafica1', component: Grafica1Component, data: { titulo: 'Graficas'} },
  { path: 'account-settings', component: AccountSettingComponent},
  { path: 'promesas', component: PromesasComponent},
  { path: 'rxjs', component: RxjsComponent},
  { path: 'perfil', component: PerfilComponent, data: { titulo: 'Perfil'} },
  { path: 'buscar/:termino', component: BusquedaComponent, data: { titulo: 'Busquedas'} },

  //Mantenimientos
  { path: 'hospitales', component: HospitalesComponent, data: { titulo: 'Hospitales de aplicación'} },
  { path: 'medicos', component: MedicosComponent, data: { titulo: 'Médicos de aplicación'} },
  { path: 'medico/:id', component: MedicoComponent, data: { titulo: 'Médico de aplicación'} },
  
  { path: 'usuarios', canActivate: [AdminGuard], component: UsuariosComponent, data: { titulo: 'Usuarios de aplicación'} },
]

@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule]
})
export class ChildRoutesModule { }
