import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LeadactionPage } from './leadaction.page';

const routes: Routes = [
  {
    path: '',
    component: LeadactionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LeadactionPageRoutingModule {}
