import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HTTP } from '@ionic-native/http/ngx';

@Injectable({
  providedIn: 'root'
})
export class LeadService {

  public leadData: any;

  constructor(public http: HTTP) {

  }

  getLeadDetail()
  {
    this.leadData = {
      "id": 123,
      "name": "Jonathan Lee",
      "company": "Setia Awan Holding Sdn Bhd",
      "displayImage": "https://comelite-arch.com/wp-content/uploads/2018/09/Small-House-Designs-in-Saudi-Arabia-1-thegem-blog-default.jpg",
      "wait": 10000
    }
    return this.leadData;
  }


}
