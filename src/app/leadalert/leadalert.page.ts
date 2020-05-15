import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { SocketService } from '../api/socket.service'
import { AlertController, LoadingController } from '@ionic/angular';
import { Vibration } from '@ionic-native/vibration/ngx';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { NativeAudio } from '@ionic-native/native-audio/ngx';
import * as moment from 'moment';

@Component({
  selector: 'app-leadalert',
  templateUrl: './leadalert.page.html',
  styleUrls: ['./leadalert.page.scss'],
})
export class LeadalertPage implements OnInit {
  public data: any
  public timer: any
  public canAccept: any;
  @ViewChild('myDiv',{ static: false }) myDiv: ElementRef;
  constructor(
    private activateRoute: ActivatedRoute,
    private router: Router,
    private socket: SocketService,
    private alertCtrl: AlertController,
    private loading: LoadingController,
    private vibration: Vibration,
    private screenOrientation: ScreenOrientation,
    private nativeAudio: NativeAudio
  ) {

    this.activateRoute.params.subscribe(params => {
      this.data = JSON.parse(params.data)
      console.log(this.data);
      this.runCountdown()
    });

    this.socket.leadExpire().subscribe(data => {
      if(localStorage.getItem('tone'))
      {
        this.nativeAudio.stop('tone').then(()=>{
          console.log('Playing');
        }, ()=>{
          console.log('Error in Play');
        });
      }
      if(localStorage.getItem('vibrate') == 'true'){
        this.vibration.vibrate(0);
      }
      this.router.navigate(['/leadllist']);
    });

    if(localStorage.getItem('tone'))
    {
      this.nativeAudio.loop('tone').then(()=>{
        console.log('Playing');
      }, ()=>{
        console.log('Error in Play');
      });
    }

    this.canAccept = true;
    this.screenOrientation.lock('portrait')
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
          this.nativeAudio.stop('tone').then(()=>{
            console.log('Playing');
          }, ()=>{
            console.log('Error in Play');
          });
        }
        this.router.navigate(['/leaddetails', { data: JSON.stringify(resp.data) }]);
      } else {
        loading.dismiss();
        if(localStorage.getItem('tone'))
        {
          this.nativeAudio.stop('tone').then(()=>{
            console.log('Playing');
          }, ()=>{
            console.log('Error in Play');
          });
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

  async handleSlide(event: any) {
  let ratio = event.detail.ratio;

    if(ratio >= 1 && this.canAccept == true)
    {
      this.canAccept = false;
      await this.acceptLeads(this.data);
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
                this.nativeAudio.stop('tone').then(()=>{
                  console.log('Playing');
                }, ()=>{
                  console.log('Error in Play');
                });
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

  ionViewDidLeave(){
    if(localStorage.getItem('tone'))
    {
      this.nativeAudio.stop('tone').then(()=>{
        console.log('Stop');
      }, ()=>{
        console.log('Stop in Play');
      });
    }
    this.screenOrientation.unlock();
  }

}
