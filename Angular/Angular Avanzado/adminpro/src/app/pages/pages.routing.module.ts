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
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
