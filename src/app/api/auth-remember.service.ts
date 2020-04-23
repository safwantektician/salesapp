import { MenuController, Events } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from "@angular/router";
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthRememberService implements CanActivate {
  constructor(private router: Router, private login: LoginService, public menuCtrl: MenuController, public events: Events) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    let authInfo = this.login.isLogin();
    console.log(authInfo);
    if (authInfo) {
      this.events.publish('loginSuccess', {userInfo: JSON.parse(localStorage.getItem('authUser'))});
      this.menuCtrl.enable(true);
      this.router.navigate(['/leadllist']);
      return false;
    }
    return true;
  }
}
