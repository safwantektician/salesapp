import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LeadllistPage } from './leadllist.page';

const routes: Routes = [
  {
    path: '',
    component: LeadllistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LeadllistPageRoutingModule {}
