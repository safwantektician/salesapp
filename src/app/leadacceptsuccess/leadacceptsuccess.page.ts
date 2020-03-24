import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { CallNumber } from '@ionic-native/call-number/ngx';

@Component({
	selector: 'app-leadacceptsuccess',
	templateUrl: './leadacceptsuccess.page.html',
	styleUrls: ['./leadacceptsuccess.page.scss'],
})
export class LeadacceptsuccessPage implements OnInit {

	public data: any
	constructor(
		private activateRoute: ActivatedRoute,
		private router: Router,
		private callNumber: CallNumber
	) {
		this.activateRoute.params.subscribe(params => {
			console.log(params)
			this.data = JSON.parse(params.data)
			console.log(this.data)
		});
	}

	callNow(numer:string)
	{
		console.log(numer);

		this.callNumber.callNumber(numer, true)
  	.then(res => console.log('Launched dialer!', res))
  	.catch(err => console.log('Error launching dialer', err));
	}

	ngOnInit() {
	}

}
