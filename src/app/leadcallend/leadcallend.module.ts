import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LeadcallendPageRoutingModule } from './leadcallend-routing.module';

import { LeadcallendPage } from './leadcallend.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LeadcallendPageRoutingModule
  ],
  declarations: [LeadcallendPage]
})
export class LeadcallendPageModule {}
