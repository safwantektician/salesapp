import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'


@Component({
  selector: 'app-leadacceptfailed',
  templateUrl: './leadacceptfailed.page.html',
  styleUrls: ['./leadacceptfailed.page.scss'],
})
export class LeadacceptfailedPage implements OnInit {

  constructor(private router:Router) { }


  leadlist()
  {
    this.router.navigate(['/leadllist']);
  }

  ngOnInit() {
  }

}
