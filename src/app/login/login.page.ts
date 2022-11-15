import { MenuController, Events } from '@ionic/angular';
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

  private candidate : FormGroup;
  public errors: any = [];

  constructor(private formBuilder: FormBuilder, private login: LoginService, private router: Router, public menuCtrl: MenuController, public events: Events, public lead: LeadService) {
    this.candidate = this.formBuilder.group({
      username: ['arvindder@tektician.com', Validators.required],
      password: ['test_123', Validators.required],
    });
    //this.disableButton = this.candidate.valid;
   }

   logForm(){
    this.errors = [];
    this.login.doLogin('/auth/login',this.candidate.value, {"x-instance":"192.168.10.41"}).subscribe(result => {
      //this.information = result;
      if(!result.success)
      {
        if(result.message instanceof Array)
        {
          for(let err of result.message)
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
          this.errors.push(result.message);
        }
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
    //console.log(this.candidate.value)

  }

  ngOnInit() {
  }

}
