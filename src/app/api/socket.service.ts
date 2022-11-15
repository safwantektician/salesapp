import { Injectable } from '@angular/core';
import { Observable, observable, BehaviorSubject } from 'rxjs';

import * as io from 'socket.io-client';

// import { environment } from './../../../environments/environment';

// /* importing interfaces starts */
// import { Auth } from './../../interfaces/auth';
// import { ChatListResponse } from './../../interfaces/chat-list-response';
// import { MessageSocketEvent } from './../../interfaces/message-socket-event';
// import { Message } from './../../interfaces/message';
/* importing interfaces ends */

@Injectable()
export class SocketService {

	private BASE_URL = 'http://192.168.10.106:7000/dev.tektician.com:32006';
	public socket;

	constructor() { }

	/*
	* Method to connect the users to socket
	*/
	connectSocket(token): void {
		this.socket = io(this.BASE_URL, { query: `token=${token.userInfo.data.access_token}` });
		console.log(this.socket)
		// console.log(token.userInfo.data.access_token)
	}

	getLeadList(): Observable<any> {
		this.socket.emit('lead-list');
		return new Observable(observer => {
			this.socket.on('lead-list-response', (data: any) => {
				console.log(data)
				observer.next(data);
			});
			// return () => {
			// 	this.socket.disconnect();
			// };
		});
	}

	// Get leads push
	getLeadPush(): Observable<any>{
		return new Observable(observer => {
			this.socket.on('leads-push',(data)=>{
				console.log(data)
				observer.next(data);
			})
			
			// Close the connection to avoid multiple data entry
			// return () => {
			// 	this.socket.disconnect();
			// };
		})
	}

	// Listener for canceling leads 'MIDWAY' if the leads are accepted by others
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

	// Accept Leads - returns if accepted or declined
	acceptLeads(leadDetails:Object): Observable<any>{
		
		this.socket.emit('leads-accepted', leadDetails)

		return new Observable(observable => {
			// let toReturn = new BehaviorSubject();
			this.socket.on('leads-awarding-status', (data) => {
				console.log(data)
				observable.next(data)
				observable.complete()
			})

			// Close the connection to avoid multiple data entry
			// return () => {
			// 	this.socket.disconnect();
			// };
		})
	}

	// Send data after call ended to server : returns promise
	callEnded(leadDetails: Object): Promise<any>{
		return new Promise(async (resolve,reject) => {
			try{
				// Emit to socket. 
				this.socket.emit('leads-after-call', leadDetails, (ack) => {
					console.log(ack)
					// resolve acknowlegement
					resolve(ack)
				})
				return
			} catch(error) {
				// Handle error - Please add you error processing here
				reject(false)
				return
			}
			
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
