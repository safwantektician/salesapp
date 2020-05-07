import { Component, OnInit } from '@angular/core';
import { errorMessage, errorCode } from '../../service/error.service'
import { LoginService } from '../api/login.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  public email: any;
  public authInfo: any;
  public userInfo: any = [];

  constructor(private login: LoginService) {
    errorMessage.success
    errorCode.success
    this.email = localStorage.getItem('email');
    this.authInfo = JSON.parse(localStorage.getItem('authUser'));

    console.log(this.authInfo.data.instance);
    this.login.getProfile(this.authInfo.data.instance+'/api/method/erpnext.crm.doctype.lead.api.getMobileData', this.authInfo.data.email).subscribe(response => {
        this.userInfo = JSON.parse(response.data);
        this.userInfo = this.userInfo.message[0];
        console.log(this.userInfo);
    });
  }

  ngOnInit() {
  }

}
