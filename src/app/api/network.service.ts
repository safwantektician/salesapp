import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Network } from '@ionic-native/network/ngx';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  private Online: boolean = true;

  constructor(
    		private platform: Platform,
    		private network: Network
  ) {
    

  }
}
