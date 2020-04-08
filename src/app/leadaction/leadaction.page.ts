import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'

@Component({
  selector: 'app-leadaction',
  templateUrl: './leadaction.page.html',
  styleUrls: ['./leadaction.page.scss'],
})
export class LeadactionPage implements OnInit {
  public data: any
  constructor(
    private activateRoute: ActivatedRoute,
    private router: Router
  ) {
    this.activateRoute.params.subscribe(params => {
      this.data = JSON.parse(params.data)
    });
  }

  leadDetails()
  {
    this.router.navigate(['/leaddetails', { data: JSON.stringify(this.data) }]);
  }



  ngOnInit() {
  }

}
