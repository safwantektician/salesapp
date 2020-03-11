import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { SocketService } from '../api/socket.service'

@Component({
	selector: 'app-leadalert',
	templateUrl: './leadalert.page.html',
	styleUrls: ['./leadalert.page.scss'],
})
export class LeadalertPage implements OnInit {
	public data: any
	constructor(
		private activateRoute: ActivatedRoute,
		private router: Router,
		private socket: SocketService
	) {
		this.activateRoute.params.subscribe(params => {
			this.data = JSON.parse(params.data)
		});
		this.socket.cancelLeads().subscribe(data => {
			if(data.lead == this.data[0].doctype_name){
				this.router.navigate(['/leadacceptfailed'])
			} else if (data.code == 202) {
				this.router.navigate(['/leadacceptfailed'])
			}
			// } else if (data.fight == 203){
			// 	this.router.navigate()
			// }
		})
	}

	ngOnInit() {
	}

	acceptLeads(leads) {
		// console.log(leads)
		
		let data = {
			lead: leads['doctype_name']
		}

		this.socket.acceptLeads(JSON.stringify(data)).subscribe(resp => {
			console.log(resp)
			if(resp.code == 200){
				this.router.navigate(['/leadacceptsuccess',{data: JSON.stringify(leads)}])
			} else {
				this.router.navigate(['/leadacceptfailed',{data: JSON.stringify(leads)}])
			}
		})

	}

}
