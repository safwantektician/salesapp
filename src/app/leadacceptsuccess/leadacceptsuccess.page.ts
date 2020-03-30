import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { CallNumber } from '@ionic-native/call-number/ngx';
import { CallLog, CallLogObject } from '@ionic-native/call-log/ngx';
import * as moment from 'moment';

declare var cordova: any;
declare var window: any;

@Component({
	selector: 'app-leadacceptsuccess',
	templateUrl: './leadacceptsuccess.page.html',
	styleUrls: ['./leadacceptsuccess.page.scss'],
})
export class LeadacceptsuccessPage implements OnInit {

	public data: any;
	public startCall: any;
	public filters: CallLogObject[];
	constructor(
		private activateRoute: ActivatedRoute,
		private router: Router,
		private callNumber: CallNumber,
		private callLog: CallLog
	) {
		this.activateRoute.params.subscribe(params => {
			console.log(params)
			this.data = JSON.parse(params.data)
			console.log(this.data)
		});
		// Check permission
		window.plugins.callLog.hasReadPermission((data, error) => {
			console.log(data);
			if (!data) {
				window.plugins.callLog.requestReadPermission((data, error) => {
					console.log(data);
					console.log(error);
				})
			}
			console.log(error)
		});
	}

	callNow(number:string)
	{
		console.log(number);

		this.callNumber.callNumber(number, false)
		  	.then((res) => {
					this.startCall = new Date().valueOf();
							if (window.PhoneCallIntercept) {
								window.PhoneCallIntercept.onCall((state) => {
					    switch (state) {
					        case "RINGING":
					            console.log("Phone is ringing");
					            break;
					        case "OFFHOOK":
					            console.log("Phone is off-hook/Ongoing Call");
					            break;
					        case "IDLE":
					            console.log("Phone is idle, call is ended");
											this.filters = [{
													"name": "number",
													"value": number,
													"operator": "==",
												}, {
													"name": "date",
													"value": this.startCall,
													"operator" : ">="
												}]
												this.callLog.getCallLog(this.filters)
								        .then((results) => {
								           console.log(results);
								          })
								        .catch((e) => {
													console.log(e);
												});

											this.router.navigate(['/leadcallend', { data: JSON.stringify(this.data) }]);
					            break;
					    }
						});
					}
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
