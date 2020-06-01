import { Component, OnInit } from '@angular/core';
import { errorMessage, errorCode } from '../../service/error.service'
import { LoginService } from '../api/login.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AlertController } from '@ionic/angular';

declare let window: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  public email: any;
  public authInfo: any;
  public userInfo: any = [];
  options: CameraOptions = {
          quality: 100,
          // targetWidth:512,
          // targetHeight:512,
          destinationType: this.camera.DestinationType.FILE_URI,
          encodingType: this.camera.EncodingType.JPEG,
          mediaType: this.camera.MediaType.PICTURE,
          sourceType: this.camera.PictureSourceType.CAMERA,
          correctOrientation: true,
          saveToPhotoAlbum: true,
      }

  constructor(private login: LoginService, 		private alertCtrl: AlertController,
    private camera: Camera
) {
    errorMessage.success
    errorCode.success
    this.email = localStorage.getItem('email');
    this.authInfo = JSON.parse(localStorage.getItem('authUser'));

    this.login.getProfile('users/profiledata', {}, {"Authorization":"Bearer "+this.authInfo.data.access_token}).subscribe(response => {
        this.userInfo = JSON.parse(response.data);
        this.userInfo = this.userInfo.data.message[0];
        //console.log();
    });
  }

  ngOnInit() {
  }

  editPhoto()
  {
        this.camera.getPicture(this.options).then(async (imageData) => {
                console.log(imageData)
                this.userInfo.image = window.Ionic.WebView.convertFileSrc(imageData);
                // this.data.defect_photo = imageData;
                //this.data.defect_photo = 'data:image/jpeg;base64,' + imageData
                //console.log(window.Ionic.WebView.convertFileSrc(imageData))
                //this.data.image_nativeURL = imageData;
            }, (err) => {
                this.displayErrorAlert(err);
            });

  }


  async displayErrorAlert(err){
        console.log(err);
        const alert = await this.alertCtrl.create({
           header: 'Error',
           subHeader: 'Error while trying to capture picture',
           buttons: ['OK']
         });
         alert.present();
  }

}
