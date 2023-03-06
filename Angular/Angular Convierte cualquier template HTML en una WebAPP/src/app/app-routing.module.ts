import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './component/pages/about/about.component';
import { PortafolioComponent } from './component/pages/portafolio/portafolio.component';

const routes: Routes = [
  {path: 'home', component: PortafolioComponent},
  {path: 'about', component: AboutComponent},
  {path: '**', pathMatch: 'full', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
