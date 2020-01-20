import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LeadcallendPage } from './leadcallend.page';

const routes: Routes = [
  {
    path: '',
    component: LeadcallendPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LeadcallendPageRoutingModule {}
