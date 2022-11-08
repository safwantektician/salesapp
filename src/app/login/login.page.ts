import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor() { }

  ngOnInit() {
    this.hidepreload()
  }

  hidepreload(){
    setTimeout(() => {
      const box = document.getElementById('preloader');       
      box.style.display = 'none';
    }, 7000); 
  }

}
