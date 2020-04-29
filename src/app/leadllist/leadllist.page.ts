import { Component, OnInit, ViewChild  } from '@angular/core';
import { LoginService } from '../api/login.service'
import { SocketService } from '../api/socket.service'
import { Router } from '@angular/router'
import { NativeRingtones } from '@ionic-native/native-ringtones/ngx';
import { IonInfiniteScroll } from '@ionic/angular';

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
  public whocalled: any
  public refreshEvent: any
  public loadMoreEvent:any
  @ViewChild(IonInfiniteScroll, {static: false}) infiniteScroll: IonInfiniteScroll;

  constructor(private login: LoginService, private socket: SocketService, private route: Router, private ringtones: NativeRingtones) {
    
    //Observer for lead list refresh
    this.socket.onLeadListUpdate().subscribe(data => {
      let temp = JSON.parse(data)
      console.log("refresh")
      if (temp.refresh) {
        this.startNo = 0
        this.endNo = 10
        this.leadData = []
        this.socket.getLeadList(this.startNo,this.endNo)
        this.toggleInfiniteScroll()
        // this.loadlist();
      }
    })

    this.socket.getLeadListResult().subscribe(data => {
      if(this.whocalled == 'loadMore'){
        this.loadlist(data, this.loadMoreEvent)
      } else {
        this.loadlist(data)
      }
      this.whocalled == ''
      console.log(data)
    })

    // Get on first load
    this.socket.getLeadList(this.startNo,this.endNo)
  }

  ionViewWillEnter() {
    // Disable temp lock and enable notification
    this.socket.setTempLock({ req: 'DISABLE' })
    console.log("entering view")
  }

  ngOnInit() {
    this.user = localStorage.getItem('email');
  }

  onClick(data) {
    this.route.navigate(['/leaddetails', { data: JSON.stringify(data) }])
  }

  loadMore(event) {
    this.startNo = this.endNo
    this.endNo = this.endNo + 10
    this.whocalled = 'loadMore'
    this.loadMoreEvent = event
    this.socket.getLeadList(this.startNo,this.endNo)
    // this.loadlist(event)
  }

  loadlist(data?,event?) {
      if (!data.data.length) {
        if (event) {
          event.target.complete()
        }
      } else {
        console.log("now only coming here")
        this.leadData = this.leadData.concat(data.data)
        if (event) {
          event.target.complete();
        }
      }
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = false;
  }

  doRefresh(event) {
    this.startNo = 0
    this.endNo = 10
    this.leadData = []
    // this.loadlist();
    this.socket.getLeadList(this.startNo,this.endNo)

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

}
