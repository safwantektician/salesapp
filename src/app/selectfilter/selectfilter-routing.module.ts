import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectfilterPage } from './selectfilter.page';

const routes: Routes = [
  {
    path: '',
    component: SelectfilterPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectfilterPageRoutingModule {}
