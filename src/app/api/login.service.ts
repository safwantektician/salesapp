import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HTTP } from '@ionic-native/http/ngx';
import { Storage } from '@ionic/storage';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  isLoggedIn: any = false;
  // apiUrl: string = 'http://35.240.182.194:7000';
  apiUrl: string = environment.apiUrl
  authUser: any = [];

  constructor(private http: HTTP, private storage: Storage) {
    if(localStorage.getItem('isLogin')){
      this.isLoggedIn = localStorage.getItem('isLogin');
    }
  }

  doLogin(url, param={}, headers={})
  {
    return Observable.create(observer => {

      localStorage.setItem('lastLoginEmail', (<any>param).username);

      this.http.post(this.apiUrl+url, param, headers)
      .then(data => {
        //console.log(data);
        let results = JSON.parse(data.data);
        localStorage.setItem('isLogin', 'true');
        localStorage.setItem('email', results.data.email);
        this.isLoggedIn = true;
        this.authUser = results.data;
        this.storage.set('authUser', this.authUser).then((response) => {
          localStorage.setItem('authUser', data.data);
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
    this.isLoggedIn = false;
    localStorage.removeItem('isLogin');
    localStorage.removeItem('authUser');
    return true;
  }


  getInstaceList(url, param={}, headers={})
  {
    return Observable.create(observer => {
      this.http.get(this.apiUrl+url, param, headers)
      .then(data => {
        console.log(data);
        observer.next(data);
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
    })

  }

  forgotPassword(url, param={}, headers={})
  {
    return Observable.create(observer => {
      this.http.get('http://'+url, param, headers)
      .then(data => {
        console.log(data);
        observer.next(data);
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
    });
  }

  forgotPasswordOTP(url, param={}, headers={})
  {
    return Observable.create(observer => {

      this.http.post(this.apiUrl+url, param, headers)
      .then(data => {
        console.log(data);
        observer.next(data);
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
    });
  }

  verifyOTP(url, param={}, headers={})
  {
    return Observable.create(observer => {

      this.http.post(this.apiUrl+url, param, headers)
      .then(data => {
        console.log(data);
        observer.next(data);
      }).catch(error => {
      //  console.log(param);
      //  console.log(headers);
      //  console.log(error);
      //  console.log(error.status);
      //console.log(error.error);
        let errors = JSON.parse(error.error);
      //  console.log(response_got); // error message as string
        observer.next(errors);
    //    observer.complete();
      });
    });
  }

  changePasswordSuccess(url, param={}, headers={})
  {
    return Observable.create(observer => {
      this.http.post(this.apiUrl+url, param, headers)
      .then(data => {
        console.log(data);
        observer.next(data);
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
    });
  }

  resetPasswordKey(url, param={}, headers={})
  {
    return Observable.create(observer => {
      this.http.post(this.apiUrl+url, param, headers)
      .then(data => {
        console.log(data);
        observer.next(data);
      }).catch(error => {
      console.log(error);
        let errors = JSON.parse(error.error);
        observer.next(errors);
      });
    });
  }



  getProfile(url, param, headers={})
  {

    return Observable.create(observer => {
      console.log(param);
      this.http.get(this.apiUrl+url, param, headers)
      .then(data => {
        console.log(data);
        observer.next(data);
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
    })

  }

}
