import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'

@Component({
  selector: 'app-leaddetails',
  templateUrl: './leaddetails.page.html',
  styleUrls: ['./leaddetails.page.scss'],
})
export class LeaddetailsPage implements OnInit {

  public data: any
  constructor(
    private activateRoute: ActivatedRoute,
    private router: Router
  ) {
    this.activateRoute.params.subscribe(params => {
      // this.data = JSON.parse(params.data)
      this.data = params
      //console.log(params)
    });
    // console.log(this.activateRoute.snapshot.paramMap.get('data'))
  }

  callLead()
  {
    this.router.navigate(['/leadacceptsuccess', { data: JSON.stringify(this.data) }]);
  }

  ngOnInit() {
  }

}
