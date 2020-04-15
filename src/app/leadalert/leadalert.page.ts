import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { SocketService } from '../api/socket.service'
import { AlertController, LoadingController } from '@ionic/angular';
import { Vibration } from '@ionic-native/vibration/ngx';
import { NativeRingtones } from '@ionic-native/native-ringtones/ngx';
import * as moment from 'moment';

@Component({
  selector: 'app-leadalert',
  templateUrl: './leadalert.page.html',
  styleUrls: ['./leadalert.page.scss'],
})
export class LeadalertPage implements OnInit {
  public data: any
  public timer: any
  @ViewChild('myDiv',{ static: false }) myDiv: ElementRef;
  constructor(
    private activateRoute: ActivatedRoute,
    private router: Router,
    private socket: SocketService,
    private alertCtrl: AlertController,
    private loading: LoadingController,
    private vibration: Vibration,
    private ringtones: NativeRingtones
  ) {

    this.activateRoute.params.subscribe(params => {
      this.data = JSON.parse(params.data)
      console.log(this.data);
      this.runCountdown()
    });

    this.socket.leadExpire().subscribe(data => {
      this.router.navigate(['/leadllist']);
    });

    setTimeout(()=>{
      if(localStorage.getItem('tone'))
      {
        this.ringtones.playRingtone('file:///android_asset/www/'+localStorage.getItem('tone'));
        //alert(localStorage.getItem('tone'))
      }
    },1000);
  }

  // Runs the countdown
  runCountdown(){
    let expriyTime =  this.data['expiration_time']
    let currentTime = moment().utcOffset("+08:00")
    let timeDiff = moment(expriyTime).diff(currentTime,'seconds')
    this.timer = timeDiff
    setInterval(()=>{
      this.timer = --this.timer
    }, 1000)
  }

  // Sets the svg circle time
  ngAfterViewInit() {
    this.myDiv.nativeElement.style = `animation: countdown ${this.timer}s linear infinite forwards;`
  }


  ngOnInit() {
    if(localStorage.getItem('vibrate') == 'true'){
      this.vibration.vibrate([2000,1000,2000,1000,2000,1000,2000,1000,2000,1000,2000,1000,2000,1000,2000,1000,2000,1000,2000,1000,2000,1000,2000,1000,2000,1000,2000,1000,2000,1000,2000,1000,2000,1000,2000,1000,2000,1000,2000,1000,2000,1000,2000,1000,2000,1000,2000,1000,2000]);
    }
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
        loading.dismiss();
        if(localStorage.getItem('vibrate') == 'true'){
          this.vibration.vibrate(0);
        }
        if(localStorage.getItem('tone'))
        {
          this.ringtones.stopRingtone('file:///android_asset/www/'+localStorage.getItem('tone'));
        }
        this.router.navigate(['/leadacceptsuccess', { data: JSON.stringify(resp.data) }]);
      } else {
        loading.dismiss();
        if(localStorage.getItem('tone'))
        {
          this.ringtones.stopRingtone('file:///android_asset/www/'+localStorage.getItem('tone'));
        }
        if(localStorage.getItem('vibrate') == 'true'){
          this.vibration.vibrate(0);
        }
        this.router.navigate(['/leadacceptfailed', { data: JSON.stringify(resp.data) }]);
      }
      //if (resp.code == 200) {
      //  this.router.navigate(['/leadacceptsuccess', { data: JSON.stringify(leads) }])
      //} else {
      //  this.router.navigate(['/leadacceptfailed', { data: JSON.stringify(leads) }])
      //}
    })

  }

  handleSlide(event: any) {
  let ratio = event.detail.ratio;
    if(ratio >= 3)
    {
      this.acceptLeads(this.data);
    }
  }


  async declineAlertPrompt(leadDetails) {
    console.log(leadDetails);
    const alert = await this.alertCtrl.create({
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
              if(localStorage.getItem('vibrate') == 'true'){
                this.vibration.vibrate(0);
              }
              if(localStorage.getItem('tone'))
              {
                this.ringtones.stopRingtone('file:///android_asset/www/'+localStorage.getItem('tone'));
              }
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
