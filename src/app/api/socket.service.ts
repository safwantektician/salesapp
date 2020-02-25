import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { LoginService } from './login.service';
// import { Storage } from '@ionic/storage';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService{

//   public user: any;


//   constructor(private login: LoginService) {
//     //const token = this.user.data.access_token;
//     super({ url: 'http://35.240.205.140:7000/testspace', options: {} });
// /*
//     super({ url: 'http://35.240.182.194:7000/dev.tektician.com:32006', options: {
//         query: 'token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTksImVtYWlsIjoiYXJ2aW5kZGVyQHRla3RpY2lhbi5jb20iLCJpbnN0YW5jZSI6ImRldi50ZWt0aWNpYW4uY29tOjMyMDA2IiwidGVhbSI6InRlYW0gZ2FsYWN0aWMiLCJpYXQiOjE1ODIxODMxNjgsImV4cCI6MTY2ODU4MzE2OH0.RzmnGvpfc5a5ZeAmtWpEHXHEkwflMe4DTv0waA9zX8I'
//     } });
//     */
//     console.log(window.localStorage.getItem('authUser'));
//   }

//   ngOnInit() {
//   }

    private socket: any;

    constructor(
      private login: LoginService
      //private socket: Socket
    ){}

    connect()
    {
      const auth = this.login.getUserDetails();
      console.log(auth);
      this.socket = io.connect('http://35.240.182.194:7000/'+auth.instance, {
          query: `token=`+auth.access_token
      })
    }

    getLeadList(){
      this.socket.emit('lead-list')

      this.socket.on('lead-list-response', (data) => {
        return data;
      })
    }

    // sendMessage(msg: string){
    //   thi
    // }
}
