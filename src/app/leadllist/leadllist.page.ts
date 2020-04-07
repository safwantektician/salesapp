import { Component, OnInit } from '@angular/core';
import { LoginService } from '../api/login.service'
import { SocketService } from '../api/socket.service'
import { Router } from '@angular/router'
import { NativeRingtones } from '@ionic-native/native-ringtones/ngx';

@Component({
  selector: 'app-leadllist',
  templateUrl: './leadllist.page.html',
  styleUrls: ['./leadllist.page.scss'],
})
export class LeadllistPage implements OnInit {

  public user: any;
  public leadData: any = [];
  public startNo: any = 0;
  public endNo: any = 10;

  constructor(private login: LoginService, private socket: SocketService, private route: Router,private ringtones: NativeRingtones) {
    this.loadlist();
  }

  ngOnInit() {
    this.user = localStorage.getItem('email');
  }

  onClick(data){
    this.route.navigate(['/leaddetails',data])
  }

  loadMore(event)
  {
    this.startNo = this.endNo
    this.endNo = this.endNo + 10
    this.loadlist(event)
  }

  loadlist(event?)
  {
    this.socket.getLeadList(this.startNo, this.endNo).subscribe(data => {
      console.log(data)
      if(!data.data.length){
        if(event){
          event.target.disabled = true
        }
      }else{
        this.leadData = this.leadData.concat(data.data)
        if(event){
          event.target.complete();
        }
      }
    });
  }

  doRefresh(event) {
    this.startNo = 0
    this.leadData = []
    this.loadlist();

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

}
