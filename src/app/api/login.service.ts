import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HTTP } from '@ionic-native/http/ngx';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  isLoggedIn: boolean = false;
  apiUrl: string = 'http://192.168.10.106:7000';
  authUser: any = [];

  constructor(private http: HTTP, private storage: Storage) { }

  doLogin(url, param={}, headers={})
  {
    return Observable.create(observer => {

      this.http.post(this.apiUrl+url, param, headers)
      .then(data => {
        //console.log(data);
        let results = JSON.parse(data.data);
        this.isLoggedIn = true;
        this.authUser = results.data;
        this.storage.set('authUser', this.authUser).then((response) => {
          observer.next(results);
        });
  //      observer.complete();
      }).catch(error => {
      //  console.log(param);
      //  console.log(headers);
      //  console.log(error);
      //  console.log(error.status);
      console.log(error);
        let errors = JSON.parse(error.error);
      //  console.log(response_got); // error message as string
        observer.next(errors);
    //    observer.complete();
      });
      //observer.complete();
    });

  }

  isLogin()
  {
    return this.isLoggedIn;
  }

  getUserDetails()
  {
    this.storage.get('authUser').then((response) => {
      if (response) {
        this.authUser = response
      }
    });
    return this.authUser;
  }

  DoLogout()
  {
    this.storage.remove('authUser').then(() => {
      this.isLoggedIn = false;
      this.authUser = [];
    });
    return true;
  }

}
