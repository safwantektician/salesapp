import { Platform, MenuController, Events } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { LoginService } from '../api/login.service';
import { LeadService } from '../api/lead.service';

import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public candidate : FormGroup;
  public errors: any = [];
  public userinstances: any = [];
  public myinstances: any = [];
  public userinstance_data: any = [];
  public selectedInstance: any;

  constructor(private formBuilder: FormBuilder, private login: LoginService, private router: Router, public menuCtrl: MenuController, public events: Events, public lead: LeadService) {

    this.candidate = this.formBuilder.group({
      username: [localStorage.getItem('lastLoginEmail'), Validators.required],
      password: ['',''],
    });

    //this.candidate.valid = false
    //this.disableButton = this.candidate.valid;
   }

   logForm(){
    this.errors = [];
    //console.log(this.candidate.value.username);
    if(!this.selectedInstance && !this.myinstances.length){
      console.log('executing this')
      let instances = this.login.getInstaceList('auth/getinstance',{'email':this.candidate.value.username}).subscribe(instances_result => {
      instances = instances_result;
      if(instances.status == 200)
      {
        // this.userinstances = JSON.parse(instances.data);
        // console.log(this.userinstances)
        // this.userinstance_data = JSON.parse(this.userinstances.data)
        // this.myinstances = [];
        // for(let i=0;i<this.userinstance_data.instance.length;i++)
        // {
        //   this.myinstances.push(this.userinstances.data.instance[i].instance);
        // }
        // if(this.myinstances.length == 1)
        // {
        //   this.selectedInstance = this.myinstances[0];
        // }
        this.userinstances = JSON.parse(instances.data)

        if(this.userinstances){
          // JSON PARSE OTHERS
          this.userinstance_data = JSON.parse(this.userinstances.data)
          for (let x of this.userinstance_data.instance){
            console.log(x)
            this.myinstances.push(x['instance'])
          }
          console.log(this.myinstances)
          if (this.myinstances.length == 1){
            this.selectedInstance = this.myinstances[0]
          }
        }

        //console.log(this.userinstances);
      }else{
        this.error_handiling(instances);
      }
    });
  }else if(!this.selectedInstance && this.myinstances.length){
    this.errors.push('Please Select Instance');
  }else{
    this.login.doLogin('auth/login',this.candidate.value, {"x-instance":this.selectedInstance}).subscribe(result => {
      //this.information = result;
      if(!result.success)
      {
        this.error_handiling(result);
        //this.disableButton = true;
      }
      if(result.success)
      {
        // setTimeout( () => {
        //   // this.events.publish('leadComing', { leadComing: true, leadData: this.lead.getLeadDetail()});
        // }, 10000);
        //this.events.publish('menuCtrl', {display: true});
        this.events.publish('loginSuccess', {userInfo: result});
        this.menuCtrl.enable(true);
        this.router.navigate(['/leadllist']);
        console.log('success');
      }
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

  ngOnInit() {
  }

}
