import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { CallNumber } from '@ionic-native/call-number/ngx';
import { CallLog, CallLogObject } from '@ionic-native/call-log/ngx';
import { SocketService } from '../api/socket.service'
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
	public previousState: string;
	constructor(
		private activateRoute: ActivatedRoute,
		private router: Router,
		private callNumber: CallNumber,
		private callLog: CallLog,
		private socket: SocketService
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
											this.previousState = 'OFFHOOK'
					            break;
					        case "IDLE":
					            console.log("Phone is idle, call is ended");
											if (this.previousState = 'OFFHOOK') {

												this.filters = [{
														"name": "number",
														"value": number,
														"operator": "==",
													}, {
														"name": "date",
														"value": this.startCall,
														"operator" : ">="
													}]
													setTimeout(() => {
														this.callLog.getCallLog(this.filters)
										        .then((results) => {
															//setTimeout(function(){
																alert(JSON.stringify(results));
																if(Object.keys(results).length){
																	this.socket.callEnded(JSON.stringify(this.data)).subscribe(resp => {
																		console.log(resp);
																	});
																	//console.log(JSON.stringify(results))
																	//if(results[0]){
																	this.router.navigate(['/leadcallend', { data: JSON.stringify(this.data), callLog: JSON.stringify(results[0]) }]);
																	//}
																//}
															//},2000);
																	}
										          })
										        .catch((e) => {
															console.log(e);
														});
													},2000);
													// Set back the state to idle
													this.previousState = 'IDLE'
											}
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
