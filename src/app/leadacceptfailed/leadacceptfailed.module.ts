import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LeadacceptfailedPageRoutingModule } from './leadacceptfailed-routing.module';

import { LeadacceptfailedPage } from './leadacceptfailed.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LeadacceptfailedPageRoutingModule
  ],
  declarations: [LeadacceptfailedPage]
})
export class LeadacceptfailedPageModule {}
