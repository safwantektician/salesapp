import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import * as moment from 'moment';


@Component({
  selector: 'app-leadcallend',
  templateUrl: './leadcallend.page.html',
  styleUrls: ['./leadcallend.page.scss'],
})
export class LeadcallendPage implements OnInit {
  public data: any;
  public callLog: any;
  public displayLog: any;

  public customActionSheetOptions: any = {
      header: 'Status',
      subHeader: 'Select your lead Status'
    };

  constructor(private activateRoute: ActivatedRoute, private router: Router) {
    this.activateRoute.params.subscribe(params => {
      console.log(params)
      this.data = JSON.parse(params.data)
      this.callLog = JSON.parse(params.callLog)
      this.displayLog = '00:00:00'
    });
    if(this.callLog.duration){
      var formatted = (<any>moment.duration(this.callLog.duration, 'seconds')).format("hh:mm:ss");
      //var formatted = duration.format("hh:mm:ss");
      this.displayLog = formatted;
    }
  }

  ngOnInit() {
  }

}
