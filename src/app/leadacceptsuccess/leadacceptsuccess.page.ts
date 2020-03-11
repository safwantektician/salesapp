import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'

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
	) {
		this.activateRoute.params.subscribe(params => {
			console.log(params)
			this.data = JSON.parse(params.data)
			console.log(this.data)
		});
	}

	ngOnInit() {
	}

}
