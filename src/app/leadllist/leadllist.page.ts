import { Component, OnInit } from '@angular/core';
import { LoginService } from '../api/login.service'


@Component({
  selector: 'app-leadllist',
  templateUrl: './leadllist.page.html',
  styleUrls: ['./leadllist.page.scss'],
})
export class LeadllistPage implements OnInit {

  public user: any;

  constructor(private login: LoginService) { }

  ngOnInit() {
    this.user = this.login.getUserDetails();
  }

}
