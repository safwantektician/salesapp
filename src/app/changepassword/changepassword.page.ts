import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router'
import { LoginService } from '../api/login.service';

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

  constructor(
      public alertCtrl: AlertController,
      private login: LoginService,
      private router: Router,
      private loading: LoadingController)
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

    console.log(this.authInfo.data);

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

      this.login.resetPasswordKey(this.authInfo.data.instance+'/api/method/erpnext.crm.doctype.lead.api.generate_key_4_pass', {"email":this.authInfo.data.email},{"Accept":"application/json"}).subscribe(result => {
        loading.dismiss();
        this.disableButton = false;
        console.log(result);
      }, error => {
        loading.dismiss();
        this.disableButton = false;
        console.log(error);
        //this.global.showError(error);
      });

    }else{
      this.disableButton = false;
    }
    loading.dismiss();

    //this.router.navigate(['/profile'])
  }

}
