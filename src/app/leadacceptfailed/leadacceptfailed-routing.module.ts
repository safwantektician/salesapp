import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LeadacceptfailedPage } from './leadacceptfailed.page';

const routes: Routes = [
  {
    path: '',
    component: LeadacceptfailedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LeadacceptfailedPageRoutingModule {}
