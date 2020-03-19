import { Injectable } from '@angular/core';
import { HTTP, HTTPResponse } from '@ionic-native/http/ngx';
import { environment } from '../environments/environment'

@Injectable({
    providedIn: 'root'
})
export class HttpService {

    constructor(
        private http: HTTP
    ) { }

    // async getDeviceDetails(): Promise<HTTPResponse> {
    //     return await this.http.get(environment.apiUrl + '/users/device/details', {}, { 'Authorization': 'bearer token' })
    // }


    async setDeviceDetails(): Promise<HTTPResponse> {
        let data = {
            fcmtoken: localStorage.getItem('fcmToken'),
            fcmuserid: localStorage.getItem('fcmUserId'),
            email: localStorage.getItem('email')
        }
        return await this.http.post(environment.apiUrl + `/auth/setDeviceDetails?fcmToken=${data.fcmtoken}&fcmUserId=${data.fcmuserid}&email=${data.email}`, {}, { 'Authorization': 'bearer token' })
    }
}
