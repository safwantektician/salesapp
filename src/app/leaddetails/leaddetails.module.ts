import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LeaddetailsPageRoutingModule } from './leaddetails-routing.module';

import { LeaddetailsPage } from './leaddetails.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LeaddetailsPageRoutingModule
  ],
  declarations: [LeaddetailsPage]
})
export class LeaddetailsPageModule {}
