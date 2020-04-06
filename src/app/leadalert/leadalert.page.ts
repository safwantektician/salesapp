import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { SocketService } from '../api/socket.service'
import { AlertController, LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-leadalert',
  templateUrl: './leadalert.page.html',
  styleUrls: ['./leadalert.page.scss'],
})
export class LeadalertPage implements OnInit {
  public data: any
  constructor(
    private activateRoute: ActivatedRoute,
    private router: Router,
    private socket: SocketService,
    private alert: AlertController,
    private loading: LoadingController
  ) {
    this.activateRoute.params.subscribe(params => {
      this.data = JSON.parse(params.data)
      console.log(this.data);
    });

    /*
    this.socket.cancelLeads().subscribe(data => {
      if (data.lead == this.data[0].doctype_name) {
        this.router.navigate(['/leadacceptfailed'])
      } else if (data.code == 202) {
        this.router.navigate(['/leadacceptfailed'])
      }
      // } else if (data.fight == 203){
      // 	this.router.navigate()
      // }
    });
*/
    this.socket.leadExpire().subscribe(data => {
      this.router.navigate(['/leadllist']);
    });


  }

  ngOnInit() {
  }
  
  async presentLoading() {
    const loading = await this.loading.create({
      message: 'Please wait...',
      duration: 2000
    });
    return loading
  }
  
  async acceptLeads(leads) {
    console.log(leads);
    const loading = await this.loading.create({
      message: 'Please wait...',
      duration: 2000
    });

    loading.present()
    this.socket.acceptLead(JSON.stringify(leads)).subscribe(resp => {
      //console.log(resp)
      console.log(resp);
      if (resp.code == '200') {
        loading.dismiss()
        this.router.navigate(['/leadacceptsuccess', { data: JSON.stringify(resp.data) }]);
      } else {
        loading.dismiss()
        this.router.navigate(['/leadacceptfailed', { data: JSON.stringify(resp.data) }]);
      }
      //if (resp.code == 200) {
      //  this.router.navigate(['/leadacceptsuccess', { data: JSON.stringify(leads) }])
      //} else {
      //  this.router.navigate(['/leadacceptfailed', { data: JSON.stringify(leads) }])
      //}
    })

  }

  async declineAlertPrompt(leadDetails) {
    console.log(leadDetails);
    const alert = await this.alert.create({
      header: 'Are you sure?',
      message: 'You are really sure you want to decline this lead!',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Yes',
          handler: () => {
            //console.log(leadDetails);
            this.socket.declineLead(JSON.stringify(leadDetails)).subscribe(resp => {
              console.log(resp);
              this.router.navigate(['/leadllist']);
            });
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }

}
