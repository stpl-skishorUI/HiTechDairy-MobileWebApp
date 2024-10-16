import { NgModule } from '@angular/core';
import { SecureComponent } from './secure.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: SecureComponent },
  { path: 'dashboard', loadChildren: () => import('../../modules/secure/dashboard/dashboard.module').then(m => m.DashboardModule), data: { breadcrumb: [{ title: 'Dashboard', active: true }] }, },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecureRoutingModule { }
