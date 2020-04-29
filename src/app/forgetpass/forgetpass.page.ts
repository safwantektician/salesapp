import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
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

  constructor(public alertCtrl: AlertController, private login: LoginService, private router: Router) { }


  forgotAction(){
   this.errors = [];
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
       //console.log(this.userinstances);
     }else{
       this.error_handiling(instances);
     }
   });
 }else if(!this.selectedInstance && this.myinstances.length){
   this.errors.push('Please Select Instance');
 }else{
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
   });
 }

   //console.log(this.candidate.value)

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
