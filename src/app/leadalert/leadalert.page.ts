import { Component } from '@angular/core';
import {AlertController} from '@ionic/angular';

@Component({
  selector: 'app-leadalert',
  templateUrl: './leadalert.page.html',
  styleUrls: ['./leadalert.page.scss'],
})
export class LeadalertPage {
  constructor(public alertController: AlertController) {}

async presentAlertPrompt() {
  const alert = await this.alertController.create({
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