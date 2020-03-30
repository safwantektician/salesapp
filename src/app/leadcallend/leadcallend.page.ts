import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'


@Component({
  selector: 'app-leadcallend',
  templateUrl: './leadcallend.page.html',
  styleUrls: ['./leadcallend.page.scss'],
})
export class LeadcallendPage implements OnInit {
  public data: any;

  public customActionSheetOptions: any = {
      header: 'Status',
      subHeader: 'Select your lead Status'
    };

  constructor(private activateRoute: ActivatedRoute, private router: Router) {
    this.activateRoute.params.subscribe(params => {
      console.log(params)
      this.data = JSON.parse(params.data)
      console.log(this.data)
    });
  }

  ngOnInit() {
  }

}
