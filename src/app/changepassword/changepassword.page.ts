import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, MenuController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router'
import { LoginService } from '../api/login.service';
import { SocketService } from '../api/socket.service'

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.page.html',
  styleUrls: ['./changepassword.page.scss'],
})
export class ChangepasswordPage implements OnInit {

  public current_password:any;
  public new_password: any;
  public retype_password: any;
  public disableButton: any = false;
  public errors: any = [];
  public authInfo: any;
  public keyChangePws: any;

  constructor(
      public alertCtrl: AlertController,
      private login: LoginService,
      private router: Router,
      private loading: LoadingController,
      public menuCtrl: MenuController,
		  private socketService: SocketService
    )
      {

      }

  ngOnInit() {
  }

  profile()
  {
    this.router.navigate(['/profile'])
  }

  async savePassword()
  {
    this.authInfo = JSON.parse(localStorage.getItem('authUser'));
    this.disableButton = true;
    this.errors = [];
    const loading = await this.loading.create({
      message: 'Please wait...'
    });

    loading.present();

    //console.log(this.authInfo.data);

    if(!this.current_password)
    {
      this.errors.push('Please Enter Current Password');
    }

    if(!this.new_password)
    {
      this.errors.push('Please Enter New Password');
    }


    if(!this.retype_password)
    {
      this.errors.push('Please Enter Retype Password');
    }

    if(this.new_password != this.retype_password)
    {
      this.errors.push('Your Retype Password not match with new password.');
    }


    if(this.current_password && this.new_password && this.retype_password && (this.new_password == this.retype_password)){

      this.login.changePasswordSuccess('users/changeuserpassword', {"new_password": this.new_password, "old_password": this.current_password},{"Authorization":"Bearer "+this.authInfo.data.access_token}).subscribe(result_pws => {
        loading.dismiss();
        this.disableButton = false;
        console.log(result_pws);
        if(result_pws.status == 200)
        {
          this.alertExit('Password has been Changed Successfully');
        }else{
          this.errors = [];
          this.errors.push(result_pws.message);
        }
      }, error => {
        loading.dismiss();
        this.disableButton = false;
        console.log(error);
        //this.global.showError(error);
      });

    }else{
      this.disableButton = false;
      loading.dismiss();
    }
    //loading.dismiss();

    //this.router.navigate(['/profile'])
  }

  async alertExit(message)
  {
    const alertX = await this.alertCtrl.create({
      header: 'Change Password',
      message: message,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.socketService.disconnectSocket();
            this.login.DoLogout();
            this.menuCtrl.enable(false);
            this.router.navigate(['/login']);
//            this.router.navigate(['/profile']);
          }
        }
      ]
    });
    await alertX.present();
    let resulXt = await alertX.onDidDismiss();

  }

}
