import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanActivateApp } from './auth/route-guard.CanActivate';
import { DashboardComponent } from './core/components/dashboard/dashboard.component';


const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [CanActivateApp]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
