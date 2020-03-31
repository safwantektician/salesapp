import { Component, OnInit } from '@angular/core';
import { LoginService } from '../api/login.service'
import { SocketService } from '../api/socket.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-leadllist',
  templateUrl: './leadllist.page.html',
  styleUrls: ['./leadllist.page.scss'],
})
export class LeadllistPage implements OnInit {

  public user: any;
  public leadData: any;

  constructor(private login: LoginService, private socket: SocketService, private route: Router) {
    this.socket.getLeadList().subscribe(data => {
      console.log(data);
      this.leadData = data.data;
    })
  }

  ngOnInit() {
    this.user = localStorage.getItem('email');
  }

  onClick(data){
    this.route.navigate(['/leaddetails',data])
  }

}
