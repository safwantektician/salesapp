import { Component, OnInit } from '@angular/core';
import { NativeAudio } from '@ionic-native/native-audio/ngx';

@Component({
  selector: 'app-tonesetting',
  templateUrl: './tonesetting.page.html',
  styleUrls: ['./tonesetting.page.scss'],
})
export class TonesettingPage implements OnInit {

  public toneSelected: any;
  public ring1: any = false;
  public ring2: any = false;
  public ring3: any = false;
  public vibration: any = true;

  constructor(private nativeAudio: NativeAudio) {
    console.log(localStorage.getItem('ringtone'));

    if(localStorage.getItem('tone') == 'assets/ringtones/media_p_o_l_i_c_e.mp3')
    {
      this.ring1 = true;
    }

    if(localStorage.getItem('tone') == 'assets/ringtones/sound_effect.mp3')
    {
      this.ring2 = true;
    }

    if(localStorage.getItem('tone') == 'assets/ringtones/no_more_heroes.mp3')
    {
      this.ring3 = true;
    }

  }

  selectTone(event)
  {
    localStorage.setItem('tone',event.target.value);
    this.nativeAudio.preloadSimple('tone', localStorage.getItem('tone')).then(()=>{
      //console.log('DONE Load Ring Tune');
      this.nativeAudio.loop('tone').then(()=>{
        console.log('Playing');
      }, ()=>{
        console.log('Error in Play');
      });

    }, ()=>{
      console.log('Error Load Ring Tune');
    });



  }

  onVibration(event)
  {
    this.vibration = !this.vibration;
    if(this.vibration == false)
    {
      localStorage.setItem('vibrate', 'false');
    }else{
      localStorage.setItem('vibrate', 'true');
    }
  }

  ngOnInit() {
  }

  ionViewDidLeave()
  {
    this.nativeAudio.stop('tone').then(()=>{
      console.log('Playing');
    }, ()=>{
      console.log('Error in Play');
    });
  }

}
