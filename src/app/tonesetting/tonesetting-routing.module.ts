import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TonesettingPage } from './tonesetting.page';

const routes: Routes = [
  {
    path: '',
    component: TonesettingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TonesettingPageRoutingModule {}
