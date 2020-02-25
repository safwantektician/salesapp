import { Injectable } from "@angular/core";
import { Router, CanActivate, ActivatedRouteSnapshot } from "@angular/router";
import { LoginService } from './login.service';

@Injectable({
  providedIn: "root"
})
export class AuthGuardService implements CanActivate {
  constructor(private router: Router, private login: LoginService) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {

    let authInfo = this.login.isLogin();

    //console.log(authInfo);

    if (!authInfo) {
      this.router.navigate(["/login"]);
      return false;
    }

    return true;
  }
}
