import { Injectable } from '@angular/core';
import { Observable, observable } from 'rxjs';

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

	private BASE_URL = 'http://35.240.182.194:8000/dev.tektician.com:32006';
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
				observer.next(data);
			});
			// return () => {
			// 	this.socket.disconnect();
			// };
		});
	}

	getLeadPush(): Observable<any>{
		return new Observable(observer => {
			this.socket.on('leads-push',(data)=>{
				observer.next(data);
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
