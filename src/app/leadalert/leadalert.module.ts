import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LeadalertPageRoutingModule } from './leadalert-routing.module';

import { LeadalertPage } from './leadalert.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LeadalertPageRoutingModule
  ],
  declarations: [LeadalertPage]
})
export class LeadalertPageModule {}
