import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { CallNumber } from '@ionic-native/call-number/ngx';
import { CallLog, CallLogObject } from '@ionic-native/call-log/ngx';

@Component({
  selector: 'app-leaddetails',
  templateUrl: './leaddetails.page.html',
  styleUrls: ['./leaddetails.page.scss'],
})
export class LeaddetailsPage implements OnInit {

  public data: any
  constructor(
    private activateRoute: ActivatedRoute,
    private router: Router,
    private callNumber: CallNumber
  ) {
    this.activateRoute.params.subscribe(params => {
      this.data = JSON.parse(params.data)
      //this.data = params
      console.log(this.data)
    });
    // console.log(this.activateRoute.snapshot.paramMap.get('data'))
  }

  callLead(number: string)
  {
    this.callNumber.callNumber(number, false)
			.then((res) => {
				console.log('calling');
			})
			.catch(err => console.log('Error launching dialer', err));
    //this.router.navigate(['/leadacceptsuccess', { data: JSON.stringify(this.data) }]);
  }
  leadAction(){
      this.router.navigate(['/leadaction', { data: JSON.stringify(this.data) }]);
  }


  ngOnInit() {
  }

}
