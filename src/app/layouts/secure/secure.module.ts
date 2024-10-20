import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecureRoutingModule } from './secure-routing.module';
import { SecureComponent } from './secure.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    SecureComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    SecureRoutingModule,
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
  ]
})
export class SecureModule { }
