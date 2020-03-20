import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { SocketService } from '../api/socket.service'
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-leadalert',
  templateUrl: './leadalert.page.html',
  styleUrls: ['./leadalert.page.scss'],
})
export class LeadalertPage implements OnInit {
  public data: any
  constructor(
    private activateRoute: ActivatedRoute,
    private router: Router,
    private socket: SocketService,
    private alert: AlertController
  ) {
    this.activateRoute.params.subscribe(params => {
      this.data = JSON.parse(params.data)
    });
    this.socket.cancelLeads().subscribe(data => {
      if (data.lead == this.data[0].doctype_name) {
        this.router.navigate(['/leadacceptfailed'])
      } else if (data.code == 202) {
        this.router.navigate(['/leadacceptfailed'])
      }
      // } else if (data.fight == 203){
      // 	this.router.navigate()
      // }
    })
  }

  ngOnInit() {
  }

  acceptLeads(leads) {
    // console.log(leads)

    let data = {
      lead: leads['doctype_name']
    }

    this.socket.acceptLeads(JSON.stringify(data)).subscribe(resp => {
      console.log(resp)
      if (resp.code == 200) {
        this.router.navigate(['/leadacceptsuccess', { data: JSON.stringify(leads) }])
      } else {
        this.router.navigate(['/leadacceptfailed', { data: JSON.stringify(leads) }])
      }
    })

  }

  async presentAlertPrompt() {
    const alert = await this.alert.create({
      header: 'Do Not Disturb',
      inputs: [
        {
          name: 'checkbox3',
          type: 'checkbox',
          label: '5 Minutes',
          value: 'value3'
        },
        {
          name: 'checkbox4',
          type: 'checkbox',
          label: '10 Minutes',
          value: 'value4'
        },
        {
          name: 'checkbox5',
          type: 'checkbox',
          label: '15 Minutes',
          value: 'value5'
        },
        /* {
          name: 'reason_dnd',
          type: 'textarea',
          placeholder: 'Reason'
        },
        {
          name: 'minutes_dnd',
          type: 'select'
        }*/
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Set Now',
          handler: () => {
            console.log('Confirm Ok');
          }
        }
      ]
    });

    await alert.present();
    let result = await alert.onDidDismiss();
    console.log(result);
  }

}