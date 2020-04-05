import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TonesettingPageRoutingModule } from './tonesetting-routing.module';

import { TonesettingPage } from './tonesetting.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TonesettingPageRoutingModule
  ],
  declarations: [TonesettingPage]
})
export class TonesettingPageModule {}
