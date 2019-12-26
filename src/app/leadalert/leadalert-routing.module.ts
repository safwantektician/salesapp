import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LeadalertPage } from './leadalert.page';

const routes: Routes = [
  {
    path: '',
    component: LeadalertPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LeadalertPageRoutingModule {}
