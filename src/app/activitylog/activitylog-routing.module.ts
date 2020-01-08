import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActivitylogPage } from './activitylog.page';

const routes: Routes = [
  {
    path: '',
    component: ActivitylogPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActivitylogPageRoutingModule {}
