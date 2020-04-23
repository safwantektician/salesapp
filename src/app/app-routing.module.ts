import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from "./api/auth-guard.service";
import { AuthRememberService } from "./api/auth-remember.service";



const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule),
    canActivate: [AuthRememberService]
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'list',
    loadChildren: () => import('./list/list.module').then(m => m.ListPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'leadllist',
    loadChildren: () => import('./leadllist/leadllist.module').then( m => m.LeadllistPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'leadalert',
    loadChildren: () => import('./leadalert/leadalert.module').then( m => m.LeadalertPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'leaddetails',
    loadChildren: () => import('./leaddetails/leaddetails.module').then( m => m.LeaddetailsPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'activitylog',
    loadChildren: () => import('./activitylog/activitylog.module').then( m => m.ActivitylogPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'leadaction',
    loadChildren: () => import('./leadaction/leadaction.module').then( m => m.LeadactionPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'loginredirect',
    loadChildren: () => import('./loginredirect/loginredirect.module').then( m => m.LoginredirectPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'leadacceptsuccess',
    loadChildren: () => import('./leadacceptsuccess/leadacceptsuccess.module').then( m => m.LeadacceptsuccessPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'leadacceptfailed',
    loadChildren: () => import('./leadacceptfailed/leadacceptfailed.module').then( m => m.LeadacceptfailedPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'leadcallend',
    loadChildren: () => import('./leadcallend/leadcallend.module').then( m => m.LeadcallendPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'forgetpass',
    loadChildren: () => import('./forgetpass/forgetpass.module').then( m => m.ForgetpassPageModule)
  },
  {
    path: 'tonesetting',
    loadChildren: () => import('./tonesetting/tonesetting.module').then( m => m.TonesettingPageModule),
    canActivate: [AuthGuardService]
  },
  {
    path: 'changepassword',
    loadChildren: () => import('./changepassword/changepassword.module').then( m => m.ChangepasswordPageModule),
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
