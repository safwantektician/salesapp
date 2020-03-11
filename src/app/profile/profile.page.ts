import { Component, OnInit } from '@angular/core';
import { errorMessage, errorCode } from '../../service/error.service'
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor() { 
    errorMessage.success
    errorCode.success
  }

  ngOnInit() {
  }

}
