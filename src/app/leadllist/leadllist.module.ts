import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LeadllistPageRoutingModule } from './leadllist-routing.module';

import { LeadllistPage } from './leadllist.page';
import { SelectfilterPageModule } from '../selectfilter/selectfilter.module'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LeadllistPageRoutingModule,
    SelectfilterPageModule
  ],
  declarations: [LeadllistPage]
})
export class LeadllistPageModule {}
