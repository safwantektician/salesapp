import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import * as moment from 'moment';
import { SocketService } from '../api/socket.service'
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-leadcallend',
  templateUrl: './leadcallend.page.html',
  styleUrls: ['./leadcallend.page.scss'],
})
export class LeadcallendPage implements OnInit {
  public data: any;
  public callLog: any;
  public displayLog: any;
  public subscription: any;
  public selectedValue:any;
  public selectedDate: any;
  public selectedNote: any;

  public customActionSheetOptions: any = {
      header: 'Status',
      subHeader: 'Select your lead Status'
    };

  constructor(private activateRoute: ActivatedRoute, private router: Router, private socket: SocketService, private loading: LoadingController) {
    this.activateRoute.params.subscribe(params => {
      console.log(params)
      this.data = JSON.parse(params.data)
      this.callLog = JSON.parse(params.callLog)
      this.displayLog = '00:00:00'

      if(this.callLog.duration){
        var formatted = (<any>moment.duration(this.callLog.duration, 'seconds')).format("hh:mm:ss");
        //var formatted = duration.format("hh:mm:ss");
        this.displayLog = formatted;
      }
    });
  }

  ngOnInit() {
  }

  async sendCallDetails(){

    const loading = await this.loading.create({
      message: 'Please wait...',
      duration: 2000
    });

    loading.present()
    console.log(this.selectedDate)
    console.log(this.selectedNote)
    this.subscription = this.socket.callEnded({
      data: this.data,
      callLog: this.callLog,
      status: this.selectedValue,
      followUp: this.selectedDate,
      note: this.selectedNote
    }).subscribe(data => {
      if(data.code == 200){
        // Navigate to lead list
        loading.dismiss()
        this.router.navigate(['/leaddetails', { data: JSON.stringify(this.data) }])
      } else {
        loading.dismiss()
        alert('Error Sending Data')
      }
    })
  }

  ngOnDestroy(){
    this.subscription.unsubscribe()
  }

}
