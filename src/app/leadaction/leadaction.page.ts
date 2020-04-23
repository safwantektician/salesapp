import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { SocketService } from '../api/socket.service'
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-leadaction',
  templateUrl: './leadaction.page.html',
  styleUrls: ['./leadaction.page.scss'],
})
export class LeadactionPage implements OnInit {
  public data: any
  public selectedValue:any;
  public selectedDate: any;
  public selectedNote: any;

  public customActionSheetOptions: any = {
      header: 'Status',
      subHeader: 'Select your lead Status'
    };

  constructor(
    private activateRoute: ActivatedRoute,
    private router: Router,
    private socket: SocketService,
    private loading: LoadingController
  ) {
    this.activateRoute.params.subscribe(params => {
      this.data = JSON.parse(params.data)
    });
  }

  leadDetails()
  {
    this.router.navigate(['/leaddetails', { data: JSON.stringify(this.data) }]);
  }

  async saveLog()
  {

    const loading = await this.loading.create({
      message: 'Please wait...',
      duration: 2000
    });

    this.socket.callEnded({
      data: this.data,
      callLog: 0,
      status: this.selectedValue,
      followUp: this.selectedDate,
      note: this.selectedNote
    }).subscribe(data => {
      if(data.code == 200){
        // Navigate to lead list
        loading.dismiss()
        this.data.status = this.selectedValue;
        this.router.navigate(['/leaddetails', { data: JSON.stringify(this.data) }])
      } else {
        loading.dismiss()
        alert('Error Sending Data')
      }
    })
  }



  ngOnInit() {
  }

}
