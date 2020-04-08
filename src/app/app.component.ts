import { Component } from '@angular/core';

import { Platform, AlertController, MenuController, Events } from '@ionic/angular';
import { Router } from '@angular/router'
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { LoginService } from './api/login.service'
import { OneSignal } from '@ionic-native/onesignal/ngx'
import { BackgroundMode } from '@ionic-native/background-mode/ngx'
import { Vibration } from '@ionic-native/vibration/ngx';
//import { Socket } from 'ngx-socket-io';
import { SocketService } from './api/socket.service'
import { HttpService } from '../service/http.service'

declare var cordova: any

@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html',
	styleUrls: ['app.component.scss']
})
export class AppComponent {
	public appPages = [
		{
			title: 'Log In',
			url: '/login',
			icon: 'log-in'
		},
		{
			title: 'Lead List',
			url: '/leadllist',
			icon: 'list'
		},
		{
			title: 'Lead Accept',
			url: '/leadalert',
			icon: 'call'
		},
		{
			title: 'Profile',
			url: '/profile',
			icon: 'person'
		}
		,
		{
			title: 'Lead Activity Log',
			url: '/activitylog',
			icon: 'person'
		},
		{
			title: 'Lead Accept Success',
			url: '/leadacceptsuccess',
			icon: 'person'
		},
		{
			title: 'Lead Accept Failed',
			url: '/leadacceptfailed',
			icon: 'person'
		}
	];

	public leadComing: boolean = false;
	public leadData: any;
	public user: any;
	public toggleValue: boolean = false;

	constructor(
		private platform: Platform,
		private splashScreen: SplashScreen,
		private statusBar: StatusBar,
		private oneSignal: OneSignal,
		private alertCtrl: AlertController,
		private backgroundMode: BackgroundMode,
		public menuCtrl: MenuController,
		public events: Events,
		public vibration: Vibration,
		private login: LoginService,
		private router: Router,
		private socketService: SocketService,
		private http: HttpService
	) {

		this.initializeApp();
		this.events.subscribe('leadComing', (data) => {
			// this.leadComing = data.leadComing;
			// this.leadData = data.leadData;
			// if(this.leadComing){
			//   this.vibration.vibrate([2000,1000,2000,1000,2000,1000,2000]);
			//   setTimeout( () => {
			//     this.leadClose();
			//   }, 10000);
			// }
			this.router.navigate(['/leadalert', { data }])
		});

		this.events.subscribe('loginSuccess', (data) => {
			// Get testspace lead
			// this.socketService.connect()
			console.log(data);
			this.user = data.userInfo.data;
			this.socketService.connectSocket(data)
			// Save user email on localstorage
			localStorage.setItem('email', data.userInfo.data.email);
			if (!localStorage.getItem('vibrate')) {
				localStorage.setItem('vibrate', 'true');
			}

			if (!localStorage.getItem('tone')) {
				localStorage.setItem('tone', 'assets/ringtones/media_p_o_l_i_c_e.mp3');
			}

			// this.http.setDeviceDetails()
			this.socketService.getLeadPush().subscribe(data => {
				console.log(data);
				// this.leadComing = true;
				// this.leadData = JSON.parse(data)[0];
				// if(this.leadComing){
				//   this.vibration.vibrate([2000,1000,2000,1000,2000,1000,2000]);
				//   setTimeout( () => {
				//     this.leadClose();
				//   }, 90000);
				// }
				this.router.navigate(['/leadalert', { data }])
			})

			this.socketService.getResheduleListener()

			this.socketService.getUserDetails().subscribe(data => {
				localStorage.setItem('UserDetails', data)
			})
			this.setupPush();
			// console.log(this.socketService.getLeadList());

			//console.log(data.userInfo.data.access_token);
			//   console.log(data);
			//   this.socket.connect();

			//   this.socket.on('connect', async(data)=> {
			//       console.log('connected from client')
			//   });
			//   this.socket.on('error', async(data) => {
			//       console.log(data)
			//   });

			//   this.socket.emit('lead-list', {resp: 'team'})

			//   this.socket.on('lead-list-responce', async (data) => {
			//       console.log(data)
			//   })

		});
		//socket.init();
	}

	initializeApp() {
		this.platform.ready().then(() => {
			this.statusBar.styleDefault();
			this.splashScreen.hide();

			this.menuCtrl.enable(false);

			this.backgroundMode.enable();
			// this.backgroundMode.excludeFromTaskList();
			// this.backgroundMode.overrideBackButton();
			// this.backgroundMode.setDefaults({silent: true});
			// cordova.plugins.backgroundMode.on('activate', function(){
			//     console.log("hai")
			// })
			// this.backgroundMode.onactivate
			this.platform.pause.subscribe(data => {
				this.socketService.sendAppState({
					app_state: 'FOREGROUND',
					date: new Date()
				})
			})

			this.platform.resume.subscribe(data => {
				this.socketService.sendAppState({
					app_state: 'ACTIVE',
					date: new Date()
				})
			})
		});


	}

	leadClose() {
		this.vibration.vibrate(0);
		this.events.publish('leadComing', { leadComing: false, leadData: {} });
	}

	logout() {
		this.login.DoLogout();
		this.menuCtrl.enable(false);
		this.router.navigate(['/login']);
	}


	setupPush() {
		// I recommend to put these into your environment.ts
		this.oneSignal.startInit('a00c5f60-a0da-4d0a-a42f-97b7b08551cf', '486774138767');

		this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.None);

		// Notifcation was received in general
		this.oneSignal.handleNotificationReceived().subscribe(data => {
			// console.log(data)
			this.backgroundMode.wakeUp()
			this.backgroundMode.unlock();
			this.backgroundMode.moveToForeground();
			// this.socketService.getBatch()
			// let msg = data.payload.body;
			// let title = data.payload.title;
			// let additionalData = data.payload.additionalData;
			// this.showAlert(title, msg, additionalData.task);
		});

		// Get FCMToken and UserId
		this.oneSignal.getIds().then((data) => {
			localStorage.setItem('fcmToken', data.pushToken)
			localStorage.setItem('fcmUserId', data.userId)
			this.socketService.setFCMToken({
				fcmToken: data.pushToken,
				fcmUserId: data.userId
			})
		})

		// Notification was really clicked/opened
		this.oneSignal.handleNotificationOpened().subscribe(data => {
			console.log(data)
			// Just a note that the data is a different place here!
			// console.log(data)
			let additionalData = data.notification.payload.additionalData;

			if (data.notification.payload.title == "RESHEDULED") {

				setTimeout(() => {
					const url = this.router.url;
					const urlParts = url.split(';');
					console.log(urlParts)
					if (urlParts.includes('/leaddetails')) {
						return
					}
					this.socketService.getIndividualLeadsDetail({ lead: additionalData.reshedule }).then(data => {
						this.router.navigate(['/leaddetails', { data: JSON.stringify(data) }])
					}).catch(error => {
						console.log(error)
					})
					this.oneSignal.clearOneSignalNotifications()
				}, 400)

			} else {
				this.socketService.getBatch()
				this.oneSignal.clearOneSignalNotifications()
			}
			
			// this.socketService.getBatch()
			// this.router.navigate(['/leadalert', { data: JSON.stringify(additionalData) }])
			// this.showAlert('Notification opened', 'You already read this before', additionalData.task);
		});
		this.oneSignal.endInit();
	}
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
	async presentAlertPrompt() {
		this.toggleValue = !this.toggleValue;

		const alert = await this.alertCtrl.create({
			header: 'Do Not Disturb',
			inputs: [
				{
					name: 'dnd',
					type: 'radio',
					label: '5 Minutes',
					value: '300'
				},
				{
					name: 'dnd',
					type: 'radio',
					label: '10 Minutes',
					value: '600'
				},
				{
					name: 'dnd',
					type: 'radio',
					label: '15 Minutes',
					value: '900'
				},
				/* {
				  name: 'reason_dnd',
				  type: 'textarea',
				  placeholder: 'Reason'
				},
				{
				  name: 'minutes_dnd',
				  type: 'select'
				}*/
			],
			buttons: [
				{
					text: 'Cancel',
					role: 'cancel',
					cssClass: 'secondary',
					handler: () => {
						console.log('Confirm Cancel');
					}
				}, {
					text: 'Set Now',
					handler: (data: string) => {
						console.log(data);
						console.log('Confirm Ok');
					}
				}
			]
		});

		console.log(this.toggleValue);

		if (this.toggleValue === true) {
			await alert.present();
			let result = await alert.onDidDismiss();
			console.log(result.data.values);
			this.socketService.setDoNotDisturb(result.data.values).subscribe(data => {
				console.log(data);
			});
		} else {
			this.socketService.setDoNotDisturb(0).subscribe(data => {
				console.log(data);
			});
		}

	}
}
