import { Component, OnInit } from '@angular/core';
import { errorMessage, errorCode } from '../../service/error.service'
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  public email: any;

  constructor() {
    errorMessage.success
    errorCode.success
    this.email = localStorage.getItem('email');
  }

  ngOnInit() {
  }

}
