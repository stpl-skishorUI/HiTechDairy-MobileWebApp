import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicComponent } from './layouts/public/public.component';
import { SecureComponent } from './layouts/secure/secure.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';



const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '', component: PublicComponent,
    loadChildren: () => import('./layouts/public/public.module').then(m => m.PublicModule)
  },
  {
    path: '',
    component: SecureComponent,
    loadChildren: () => import('./layouts/secure/secure.module').then(m => m.SecureModule)
  },

  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
