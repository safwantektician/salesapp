import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginredirectPage } from './loginredirect.page';

const routes: Routes = [
  {
    path: '',
    component: LoginredirectPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginredirectPageRoutingModule {}
