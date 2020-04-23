import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.page.html',
  styleUrls: ['./changepassword.page.scss'],
})
export class ChangepasswordPage implements OnInit {

  public current_password:any;
  public new_password: any;
  public retype_password: any;

  constructor(
      private activateRoute: ActivatedRoute,
      private router: Router)
      {

      }

  ngOnInit() {
  }

  profile()
  {
    this.router.navigate(['/profile'])
  }

  savePassword()
  {
    this.router.navigate(['/profile'])
  }

}
