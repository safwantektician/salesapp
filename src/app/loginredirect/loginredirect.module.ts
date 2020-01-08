import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginredirectPageRoutingModule } from './loginredirect-routing.module';

import { LoginredirectPage } from './loginredirect.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginredirectPageRoutingModule
  ],
  declarations: [LoginredirectPage]
})
export class LoginredirectPageModule {}
