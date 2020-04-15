import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { CallNumber } from '@ionic-native/call-number/ngx';
import { CallLog, CallLogObject } from '@ionic-native/call-log/ngx';
import { SocketService } from '../api/socket.service'

declare var window: any;

@Component({
  selector: 'app-leaddetails',
  templateUrl: './leaddetails.page.html',
  styleUrls: ['./leaddetails.page.scss'],
})
export class LeaddetailsPage implements OnInit {

  public data: any
  public startCall: any;
  public filters: CallLogObject[];
  public previousState: string;

  constructor(
    private activateRoute: ActivatedRoute,
    private router: Router,
    private callNumber: CallNumber,
    private callLog: CallLog,
    private socket: SocketService
  ) {
    this.activateRoute.params.subscribe(params => {
      this.data = JSON.parse(params.data)
      //this.data = params
      console.log(this.data)
    });

    
    // Check permission
    this.callLog.hasReadPermission().then(hasPermission => {
      if (!hasPermission) {
        this.callLog.requestReadPermission().then(results => {
          //this.getContacts("type","1","==");
          console.log(results);
        })
          .catch(e => console.log(" requestReadPermission " + JSON.stringify(e)));
      }
    })
      .catch(e => console.log(" hasReadPermission " + JSON.stringify(e)));
    // console.log(this.activateRoute.snapshot.paramMap.get('data'))


    if (window.PhoneCallIntercept) {
      window.PhoneCallIntercept.onCall((state) => {
        switch (state) {
          case "RINGING":
            console.log("Phone is ringing");
            break;
          case "OFFHOOK":
            console.log("Phone is off-hook/Ongoing Call");
            this.previousState = 'OFFHOOK'
            break;
          case "IDLE":
            console.log("Phone is idle, call is ended");
            if (this.previousState == 'OFFHOOK') {

              this.socket.setBuzyState({
                state: 'IDLE',
                date: new Date(),
                data: this.data
              })

              this.filters = [{
                "name": "number",
                "value": this.data.phone,
                "operator": "==",
              }, {
                "name": "date",
                "value": this.startCall,
                "operator": ">="
              }]
              setTimeout(() => {
                this.callLog.getCallLog(this.filters)
                  .then((results) => {
                    //setTimeout(function(){
                    alert(JSON.stringify(results));

                    this.router.navigate(['/leadcallend', { data: JSON.stringify(this.data), callLog: JSON.stringify(results[0]) }]);
                    // if (Object.keys(results).length) {
                    // this.socket.callEnded(JSON.stringify({data : this.data, callLog:results[0]})).subscribe(resp => {
                    // 	console.log(resp);
                    // });
                    //console.log(JSON.stringify(results))
                    //if(results[0]){

                    //}
                    //}
                    //},2000);
                    // }
                  })
                  .catch((e) => {
                    console.log(e);
                  });
              }, 2000);
              // Set back the state to idle
              this.previousState = 'IDLE'
            }
            break;
        }
      });
    }
  }

  callLead(number: string) {

    // Set Buzy State
    this.socket.setBuzyState({
      state: 'BUZY',
      date: new Date(),
      data: this.data
    })

    this.callNumber.callNumber(number, true)
      .then((res) => {
        console.log('calling');
        this.startCall = new Date().valueOf();
      })
      .catch(err => console.log('Error launching dialer', err));
    //this.router.navigate(['/leadacceptsuccess', { data: JSON.stringify(this.data) }]);
  }
  leadAction() {
    this.router.navigate(['/leadaction', { data: JSON.stringify(this.data) }]);
  }


  ngOnInit() {
  }

}
