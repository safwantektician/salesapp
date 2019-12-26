import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LeaddetailsPage } from './leaddetails.page';

const routes: Routes = [
  {
    path: '',
    component: LeaddetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LeaddetailsPageRoutingModule {}
