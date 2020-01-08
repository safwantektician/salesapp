import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActivitylogPageRoutingModule } from './activitylog-routing.module';

import { ActivitylogPage } from './activitylog.page';
import { CalendarModule } from 'ion2-calendar';

/* Calendar Plugin: https://ampersandacademy.com/tutorials/ionic-framework-4/ionic-4-calendar-ui-plugin-example */

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CalendarModule,
    ActivitylogPageRoutingModule
  ],
  declarations: [ActivitylogPage]
})
export class ActivitylogPageModule {}
