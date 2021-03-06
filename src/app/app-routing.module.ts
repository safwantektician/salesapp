import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'list',
    loadChildren: () => import('./list/list.module').then(m => m.ListPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'leadllist',
    loadChildren: () => import('./leadllist/leadllist.module').then( m => m.LeadllistPageModule)
  },
  {
    path: 'leadalert',
    loadChildren: () => import('./leadalert/leadalert.module').then( m => m.LeadalertPageModule)
  },
  {
    path: 'leaddetails',
    loadChildren: () => import('./leaddetails/leaddetails.module').then( m => m.LeaddetailsPageModule)
  },
  {
    path: 'activitylog',
    loadChildren: () => import('./activitylog/activitylog.module').then( m => m.ActivitylogPageModule)
  },
  {
    path: 'leadaction',
    loadChildren: () => import('./leadaction/leadaction.module').then( m => m.LeadactionPageModule)
  },
  {
    path: 'loginredirect',
    loadChildren: () => import('./loginredirect/loginredirect.module').then( m => m.LoginredirectPageModule)
  },
  {
    path: 'leadacceptsuccess',
    loadChildren: () => import('./leadacceptsuccess/leadacceptsuccess.module').then( m => m.LeadacceptsuccessPageModule)
  },
  {
    path: 'leadacceptfailed',
    loadChildren: () => import('./leadacceptfailed/leadacceptfailed.module').then( m => m.LeadacceptfailedPageModule)
  },
  {
    path: 'leadcallend',
    loadChildren: () => import('./leadcallend/leadcallend.module').then( m => m.LeadcallendPageModule)
  },
  {
    path: 'forgetpass',
    loadChildren: () => import('./forgetpass/forgetpass.module').then( m => m.ForgetpassPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
