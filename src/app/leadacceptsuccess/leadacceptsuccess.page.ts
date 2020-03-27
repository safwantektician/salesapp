import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { CallNumber } from '@ionic-native/call-number/ngx';
declare var cordova: any;

@Component({
	selector: 'app-leadacceptsuccess',
	templateUrl: './leadacceptsuccess.page.html',
	styleUrls: ['./leadacceptsuccess.page.scss'],
})
export class LeadacceptsuccessPage implements OnInit {

	public data: any;
	public startCall: any;
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

	callNow(number:string)
	{
		console.log(number);

		this.callNumber.callNumber(number, false)
		  	.then((res) => {
					this.startCall = new Date;
					cordova.plugins.CordovaCall.speakerOn((data2) => {
						console.log('speakerOn');
					},(error2) => {});
					cordova.plugins.CordovaCall.connectCall((data2) => {
						console.log('Call Connected');
					},(error2) => {});
				})
		  	.catch(err => console.log('Error launching dialer', err));
/*
		cordova.plugins.CordovaCall.callNumber(number, (data) => {
				console.log(data);

		},
		(error) => {
			console.log(error);
		});

		*/

/*		this.callNumber.callNumber(numer, false)
  	.then((res) => {
			this.startCall = new Date;
		})
  	.catch(err => console.log('Error launching dialer', err));
		*/
	}

	ngOnInit() {
	}

}
