import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LeadactionPageRoutingModule } from './leadaction-routing.module';

import { LeadactionPage } from './leadaction.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LeadactionPageRoutingModule
  ],
  declarations: [LeadactionPage]
})
export class LeadactionPageModule {}
