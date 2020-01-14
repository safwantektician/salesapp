import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LeadacceptsuccessPage } from './leadacceptsuccess.page';

const routes: Routes = [
  {
    path: '',
    component: LeadacceptsuccessPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LeadacceptsuccessPageRoutingModule {}
