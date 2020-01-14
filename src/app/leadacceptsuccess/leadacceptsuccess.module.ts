import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LeadacceptsuccessPageRoutingModule } from './leadacceptsuccess-routing.module';

import { LeadacceptsuccessPage } from './leadacceptsuccess.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LeadacceptsuccessPageRoutingModule
  ],
  declarations: [LeadacceptsuccessPage]
})
export class LeadacceptsuccessPageModule {}
