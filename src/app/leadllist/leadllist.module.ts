import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LeadllistPageRoutingModule } from './leadllist-routing.module';

import { LeadllistPage } from './leadllist.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LeadllistPageRoutingModule
  ],
  declarations: [LeadllistPage]
})
export class LeadllistPageModule {}
