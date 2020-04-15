import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { SocketService } from '../api/socket.service'
import * as moment from 'moment';


@Component({
  selector: 'app-activitylog',
  templateUrl: './activitylog.page.html',
  styleUrls: ['./activitylog.page.scss'],
})
export class ActivitylogPage implements OnInit {

  public data: any
  public history: any = []
  public nextFollow: any

  constructor(
    private activateRoute: ActivatedRoute,
    private router: Router,
    private socket: SocketService
  ) {
    this.activateRoute.params.subscribe(params => {
      this.data = JSON.parse(params.data)
      this.socket.getLeadsLog({ doctype_name:  this.data.doctype_name }).then(data => {

        if((<any>data).next_schedule){
          const dd = new Date((<any>data).next_schedule);
          this.nextFollow = (<any>moment(dd)).format("MMMM d, YYYY hh:mm:ss")
        }
        
        for(let i=0;i<(<any>data).history.length;i++){
          const d = new Date((<any>data).history[i].created_on);
          this.history.push({comments: (<any>data).history[i].comments, created: (<any>moment(d)).format("MMMM d, YYYY hh:mm:ss")})
            // key: the name of the object key
            // index: the ordinal position of the key within the object
        };

      }).catch(error => {
        console.log(error)
      })
    });



  }

  ngOnInit() {
  }

}
