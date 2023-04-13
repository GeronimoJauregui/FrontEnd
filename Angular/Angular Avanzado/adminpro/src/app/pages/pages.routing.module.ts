import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingComponent } from './account-setting/account-setting.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { AuthGuard } from '../guards/auth.guard';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';

const routes: Routes = [
    { 
        path: 'dashboard', 
        component: PagesComponent,
        canActivate: [AuthGuard],
        children: [
          { path: '', component: DashboardComponent, data: { titulo: 'Dashborad'} },
          { path: 'progress', component: ProgressComponent, data: { titulo: 'Progress Bar'} },
          { path: 'grafica1', component: Grafica1Component, data: { titulo: 'Graficas'} },
          { path: 'account-settings', component: AccountSettingComponent},
          { path: 'promesas', component: PromesasComponent},
          { path: 'rxjs', component: RxjsComponent},
          { path: 'perfil', component: PerfilComponent, data: { titulo: 'Perfil'} },
          { path: 'buscar/:termino', component: BusquedaComponent, data: { titulo: 'Busquedas'} },

          //Mantenimientos
          { path: 'usuarios', component: UsuariosComponent, data: { titulo: 'Usuarios de aplicación'} },
          { path: 'hospitales', component: HospitalesComponent, data: { titulo: 'Hospitales de aplicación'} },
          { path: 'medicos', component: MedicosComponent, data: { titulo: 'Médicos de aplicación'} },
          { path: 'medico/:id', component: MedicoComponent, data: { titulo: 'Médico de aplicación'} },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
