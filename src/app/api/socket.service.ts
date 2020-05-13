import { Injectable } from '@angular/core';
import { Observable, observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router'
import { AlertController } from '@ionic/angular'

import * as io from 'socket.io-client';
import { environment } from '../../environments/environment';
// import { environment } from './../../../environments/environment';

// /* importing interfaces starts */
// import { Auth } from './../../interfaces/auth';
// import { ChatListResponse } from './../../interfaces/chat-list-response';
// import { MessageSocketEvent } from './../../interfaces/message-socket-event';
// import { Message } from './../../interfaces/message';
/* importing interfaces ends */

@Injectable()
export class SocketService {

	private BASE_URL = environment.apiUrl;
	public socket;

	constructor(
		private route: Router,
		private alertCtrl: AlertController
	) {
	}

	/*
	* Method to connect the users to socket
	*/
	async showAlert(title, msg, task) {
		const alert = await this.alertCtrl.create({
			header: title,
			subHeader: msg,
			buttons: [
				{
					text: `Action: ${task}`,
					handler: () => {
						// E.g: Navigate to a specific screen
					}
				}
			]
		})
		alert.present();
	}

	connectSocket(token): void {
		if((<any>JSON.parse((<any>localStorage.getItem('authUser'))))){
			this.BASE_URL = environment.apiUrl + (<any>JSON.parse((<any>localStorage.getItem('authUser')))).data.instance
		}
		this.socket = io(this.BASE_URL, { query: `token=${token.userInfo.data.access_token}` });
		console.log(this.socket)
		// console.log(token.userInfo.data.access_token)
	}

	disconnectSocket(): void {
			this.socket.disconnect();
	}

	getLeadList(startNo, endNo, filter={filter:{}}){
		//this.socket.emit('lead-list');
		console.log(filter)
		this.socket.emit('lead-list-page', { start: startNo, end: endNo, ...filter });
	}

	getLeadListResult(): Observable<any> {
		//this.socket.emit('lead-list');
		return new Observable(observer => {
			this.socket.on('lead-list-page-resp', (data: any) => {
				console.log("lead list has already been send and recievied")
				observer.next(data);
			});
			// return () => {
			// 	this.socket.disconnect();
			// };
		});
	}

	onLeadListUpdate(): Observable<any>{
		return new Observable(observer => {
			this.socket.on('lead-list-refresh', (data: any) => {
				observer.next(data)
			})
		})
	}

	setDoNotDisturb(timer = 300): Observable<any> {
		return new Observable(observer => {
			this.socket.emit('user-dnd', { time: timer }, (ack) => {
				observer.next(ack);
			});
		});
	}

	// Get leads push
	getLeadPush(): Observable<any> {
		return new Observable(observer => {
			this.socket.on('leads-incoming-call', (data) => {
				console.log(data);
				observer.next(data);
			})

			// Close the connection to avoid multiple data entry
			// return () => {
			// 	this.socket.disconnect();
			// };
		})
	}

	// Listener for canceling leads 'MIDWAY' if the leads are accepted by others
	/*
		cancelLeads(): Observable<any>{
			return new Observable(observable => {
				this.socket.on('leads-awarded-cancel-others', (data)=> {
					console.log(data)
					observable.next(data)
					// observable.complete()
				})

				// Close the connection to avoid multiple data entry
				// return () => {
				// 	this.socket.disconnect();
				// };
			})
		}
	*/

	declineLead(leadDetails: Object): Observable<any> {
		return new Observable(observable => {
			//console.log(leadDetails);
			this.socket.emit('leads-call-denied', leadDetails, (data) => {
				//console.log(data)
				observable.next(data);
				// observable.complete()
			});
			// Close the connection to avoid multiple data entry
			// return () => {
			// 	this.socket.disconnect();
			// };
		})
	}

	// Accept Leads - returns if accepted or declined
	acceptLead(leadDetails: Object): Observable<any> {
		console.log(leadDetails);
		return new Observable(observable => {
			// let toReturn = new BehaviorSubject();
			//			this.socket.on('leads-awarding-status', (data) => {
			// console.log(data)
			//				observable.next(data)
			//				observable.complete()
			//			})
			console.log(leadDetails);
			this.socket.emit('leads-call-accepeted', leadDetails, (data) => {
				console.log(data)
				observable.next(data);
				//observable.complete();
			});

			// Close the connection to avoid multiple data entry
			// return () => {
			// 	this.socket.disconnect();
			// };
		});
	}

	// Send data after call ended to server : returns Observable
	callEnded(leadDetails: Object): Observable<any> {
		return new Observable(observable => {
			// Emit to socket.
			this.socket.emit('leads-call-conclude', JSON.stringify(leadDetails), (ack) => {
				// Observable next
				observable.next(ack);
			});

		})
	}

	leadExpire(): Observable<any> {
		return new Observable(observable => {
			this.socket.on('leads-expired-cancel-all', (data) => {
				console.log(data);
				observable.next(data);
			});
		});
	}

	getBatch() {
		let getAuth = localStorage.getItem('authUser')
		let getUserDetails = localStorage.getItem('UserDetails')
		this.socket.emit('get-latest-leads', JSON.stringify({ 'auth': getAuth, 'user': getUserDetails }), (ack) => {
			console.log(ack)
			if (ack.length > 0) {
				this.route.navigate(['/leadalert', { data: JSON.stringify(ack[0].leads.body) }])
			} else {
				this.showAlert('LEAD EXPIRED', 'Sorry Leads Expired', 'Exit')
			}

		});
	}

	getUserDetails(): Observable<any> {
		return new Observable(observable => {
			this.socket.on('user-details', (data) => {
				console.log(data);
				observable.next(data);
			});
		});
	}

	TriggerUserDetails() {
		this.socket.emit('get-user-details')
	}

	setFCMToken(data) {
		console.log('fcm token')
		this.socket.emit('set-fcm-token', JSON.stringify(data))
	}

	sendAppState(data) {
		this.socket.emit('set-app-state', JSON.stringify(data))
	}

	setBuzyState(data) {
		this.socket.emit('set-buzy-state', JSON.stringify(data))
	}

	getResheduleListener() {
		this.socket.on('leads-incoming-reshedule', (data) => {
			console.log('icnoming reshedule')
			this.route.navigate(['/leaddetails', { data: JSON.stringify(data) }])
		});
	}

	setTempLock(data){
		// return new Promise((resolve,reject) => {
		// 	this.socket.emit('temp-lock', JSON.stringify(data), (ack) => {
		// 		resolve(ack)
		// 	})
		// })
		console.log('disabled')
	}

	getActiveLeadsListener(){
		this.socket.on('active-leads', (data) => {
			console.log('icnoming reshedule')
			this.route.navigate(['/leaddetails', { data: JSON.stringify(data) }])
		});
	}

	getIndividualLeadsDetail(data) {
		console.log(data)
		return new Promise((resolve, reject) => {
			this.socket.emit('get-leads-details', JSON.stringify(data), (ack) => {
				console.log(ack)
				resolve(ack)
			})
		})
	}

	closeLeads(data){
		return new Promise((resolve, reject) => {
			this.socket.emit('leads-complete-close', JSON.stringify(data), (ack) => {
				console.log(ack)
				resolve(ack)
			})
		})
	}

	getLeadsLog(data){
		console.log('come here');
		return new Promise((resolve,reject) => {
			this.socket.emit('leads-log', JSON.stringify(data), (ack) => {
				console.log(ack)
				resolve(ack)
			})
		})
	}

	remoteLogOut():Observable<any>{
		return new Observable(observer => {
			this.socket.on('user-remote-logout', (data: any) => {
				console.log(data)
				observer.next(data)
			})
		})
	}
	// /*
	// * Method to emit the logout event.
	// */
	// logout(userId: { userId: string}): Observable<Auth> {
	// 	this.socket.emit('logout', userId);
	// 	return new Observable(observer => {
	// 		this.socket.on('logout-response', (data: Auth) => {
	// 			observer.next(data);
	// 		});
	// 		return () => {
	// 			this.socket.disconnect();
	// 		};
	// 	});
	// }

	// /*
	// * Method to receive chat-list-response event.
	// */
	// getChatList(userId: string = null): Observable<ChatListResponse> {
	// 	if (userId !== null) {
	// 		this.socket.emit('chat-list', { userId: userId });
	// 	}
	// 	return new Observable(observer => {
	// 		this.socket.on('chat-list-response', (data: ChatListResponse) => {
	// 			observer.next(data);
	// 		});
	// 		return () => {
	// 			this.socket.disconnect();
	// 		};
	// 	});
	// }

	// /*
	// * Method to emit the add-messages event.
	// */
	// sendMessage(message: MessageSocketEvent): void {
	// 	this.socket.emit('add-message', message);
	// }

	// /*
	// * Method to receive add-message-response event.
	// */
	// receiveMessages(): Observable<Message> {
	// 	return new Observable(observer => {
	// 		this.socket.on('add-message-response', (data) => {
	// 			observer.next(data);
	// 		});

	// 		return () => {
	// 			this.socket.disconnect();
	// 		};
	// 	});
	// }
}
