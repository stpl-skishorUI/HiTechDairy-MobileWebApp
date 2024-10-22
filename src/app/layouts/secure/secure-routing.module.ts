import { NgModule } from '@angular/core';
import { SecureComponent } from './secure.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: SecureComponent },
  { path: 'dashboard', loadChildren: () => import('../../modules/secure/dashboard/dashboard.module').then(m => m.DashboardModule), data: { breadcrumb: [{ title: 'Dashboard', active: true }] }, },
  { path: 'visit-entry-list/:id', loadComponent: () => import('../../modules/secure/visit-entry-list/visit-entry-list.component').then(m => m.VisitEntryListComponent), data: { breadcrumb: 'Visit Entry List' } },
  { path: 'add-visit-entry', loadComponent: () => import('../../modules/secure/visit-entry-list/add-visit-entry/add-visit-entry.component').then(m => m.AddVisitEntryComponent), data: { breadcrumb: 'Add Visit Entry List' } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecureRoutingModule { }
