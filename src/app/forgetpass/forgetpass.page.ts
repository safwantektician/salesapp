import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { LoginService } from '../api/login.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-forgetpass',
  templateUrl: './forgetpass.page.html',
  styleUrls: ['./forgetpass.page.scss'],
})
export class ForgetpassPage implements OnInit {

  public errors: any = [];
  public userinstances: any = [];
  public myinstances: any = [];
  public selectedInstance: any;
  public email: any = '';
  public sms_code: any = '';
  public verifyOTP: any = false;
  public verifyDisable: any = true;
  public keyChangePws: any = null;
  public confirmPws: any = false;
  public new_password: any;
  public retype_password:any;
  public emailDisable: any = false;

  constructor(public alertCtrl: AlertController, private login: LoginService, private router: Router, private loading: LoadingController) { }


  async forgotAction(){
   this.errors = [];
   const loading = await this.loading.create({
     message: 'Please wait...',
     duration: 2000
   });
   //console.log(this.candidate.value.username);
   if(!this.selectedInstance && !this.myinstances.length){
     let instances = this.login.getInstaceList('/auth/getinstance',{'email':this.email}).subscribe(instances_result => {
     instances = instances_result;
     if(instances.status == 200)
     {
       this.userinstances = JSON.parse(instances.data);
       for(let i=0;i<this.userinstances.data.instance.length;i++)
       {
         this.myinstances.push(this.userinstances.data.instance[i].instance);
       }
       if(this.myinstances.length == 1)
       {
         this.emailDisable = true;
         this.selectedInstance = this.myinstances[0];
         this.verifyOTP = true;

         this.login.forgotPasswordOTP('auth/forgotPassword', {"username":this.email,"instance":this.selectedInstance}).subscribe(forgot_result => {
           var resposne_otp = JSON.parse(forgot_result.data);
           loading.dismiss();
           this.verifyDisable = false;
           this.errors.push(resposne_otp.message);
         });
       }
       //console.log(this.userinstances);
     }else{
       this.error_handiling(instances);
     }
   });
 }else if(!this.selectedInstance && this.myinstances.length){
   this.errors.push('Please Select Instance');
 }else{
   this.verifyOTP = true;

   this.login.forgotPasswordOTP('auth/forgotPassword', {"username":this.email,"instance":this.selectedInstance}).subscribe(forgot_result => {
     loading.dismiss();
     var resposne_otp = JSON.parse(forgot_result.data);
     loading.dismiss();
     this.verifyDisable = false;
     this.emailDisable = true;
     this.errors.push(resposne_otp.message);
   })
   /*
   this.login.forgotPassword(this.selectedInstance+'/api/method/frappe.core.doctype.user.user.reset_password',{'user': this.email}).subscribe(result => {
      let fdata = JSON.parse(result.data);
      //console.log(fdata._server_messages[0].message);
      let message = JSON.parse(fdata._server_messages);
      message = JSON.parse(message[0]);
      this.alertExit(message.message);
   },
   error => {
     console.log(error);
     //this.global.showError(error);
   });*/
 }

   //console.log(this.candidate.value)

 }

 async verifyAction(){
   const loading = await this.loading.create({
     message: 'Please wait...',
     duration: 2000
   });

   this.login.verifyOTP('/auth/verifyresetcode',{"smscode":this.sms_code}).subscribe(result_otp => {
     var resultOTP = JSON.parse(result_otp.data);
     if(resultOTP.success){
       this.emailDisable = true;
       this.errors = [];
       this.errors.push('Please Insert Your New Password');
       this.verifyOTP = false;
        console.log(resultOTP);
        this.keyChangePws = resultOTP.data.erp_generated_code;
        this.confirmPws = true;
        loading.dismiss();
     }else{
        this.errors = [];
        loading.dismiss();
        this.errors.push(resultOTP.message);
     }
   })
 }

 changePwsAction()
 {
   if(this.new_password != this.retype_password)
   {
     this.errors = [];
     this.errors.push('Your new password not match with retype password');
   }else{
      this.login.changePasswordSuccess(this.selectedInstance+'/api/method/frappe.core.doctype.user.user.update_password', {"new_password": this.new_password, "key":this.keyChangePws},{"Accept":"application/json"}).subscribe(result_pws => {
        console.log(result_pws);
        if(result_pws.status == 200)
        {
          this.alertExit('Password has been Changed Successfully');
        }
        if(result_pws.status == 417)
        {
          this.errors = [];
          this.errors.push('Invalid Password: This is a top-10 common password. All-uppercase is almost as easy to guess as all-lowercase, Include symbols, numbers and capital letters in the password');
        }
      });
   }

 }

 error_handiling(instances)
 {
   if(instances.message instanceof Array)
   {
     for(let err of instances.message)
     {
       if(err.messages instanceof Array)
       {
         for(let messages of err.messages){
           //console.log(messages);
             this.errors.push(messages);
         }
       }else{
         this.errors.push(err.messages);
       }
     }
   }else{
     this.errors.push(instances.message);
   }
 }


 async alertExit(message)
 {
   const alertX = await this.alertCtrl.create({
     header: 'Reset Password',
     message: message,
     buttons: [
       {
         text: 'OK',
         handler: () => {
           this.router.navigate(['/login']);
         }
       }
     ]
   });
   await alertX.present();
   let resulXt = await alertX.onDidDismiss();

 }

  ngOnInit() {
  }

}
