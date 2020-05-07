import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectfilterPageRoutingModule } from './selectfilter-routing.module';

import { SelectfilterPage } from './selectfilter.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectfilterPageRoutingModule
  ],
  declarations: [SelectfilterPage]
})
export class SelectfilterPageModule {}
