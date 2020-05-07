import { Component, OnInit, ViewChild } from '@angular/core';
import { LoginService } from '../api/login.service'
import { SocketService } from '../api/socket.service'
import { Router } from '@angular/router'
import { NativeRingtones } from '@ionic-native/native-ringtones/ngx';
import { IonInfiniteScroll, AlertController, PopoverController, IonDatetime, IonSelect, ToastController  } from '@ionic/angular';
import { SelectfilterPage } from '../selectfilter/selectfilter.page'
import { FilterService } from '../../service/filter.service'

@Component({
  selector: 'app-leadllist',
  templateUrl: './leadllist.page.html',
  styleUrls: ['./leadllist.page.scss'],
})
export class LeadllistPage implements OnInit {

  public user: any;
  public leadData: any = [];
  public startNo: any = 0;
  public endNo: any = 10;
  public whocalled: any
  public refreshEvent: any
  public loadMoreEvent: any
  public selectStatus
  public selectedFilter
  public selectedDate1:any = null
  public selectedDate2:any = null
  public componentPopover
  public globalFilter

  @ViewChild(IonInfiniteScroll, { static: false }) infiniteScroll: IonInfiniteScroll;
  @ViewChild('timePicker1', { static: false }) public timePicker1: IonDatetime
  @ViewChild('timePicker2', { static: false }) public timePicker2: IonDatetime
  @ViewChild('statusPicker', { static: false }) public statusPicker: IonSelect

  constructor(private login: LoginService, private socket: SocketService, private route: Router, private ringtones: NativeRingtones,
    private alert: AlertController, private popover: PopoverController, private filterService: FilterService, private toastControl: ToastController) {

    //Observer for lead list refresh
    this.socket.onLeadListUpdate().subscribe(data => {
      let temp = JSON.parse(data)
      console.log("refresh")
      if (temp.refresh) {
        this.startNo = 0
        this.endNo = 10
        this.leadData = []
        this.socket.getLeadList(this.startNo, this.endNo)
        this.toggleInfiniteScroll()
        // this.loadlist();
      }
    })

    this.socket.getLeadListResult().subscribe(data => {
      if (this.whocalled == 'loadMore') {
        this.loadlist(data, this.loadMoreEvent)
      } else {
        this.leadData = []
        this.loadlist(data)
      }
      this.whocalled == ''
      console.log(data)
    })

    // Get on first load
    this.socket.getLeadList(this.startNo, this.endNo)

    // Listen to filteration inter component communication
    this.filterService.sharedMessage.subscribe(data => {
      this.selectFilter(data)
      this.dismissPopover()
    })

  }

  ionViewWillEnter() {
    // Disable temp lock and enable notification
    this.socket.setTempLock({ req: 'DISABLE' })
    console.log("entering view")
  }

  ngOnInit() {
    this.user = localStorage.getItem('email');
  }

  onClick(data) {
    this.route.navigate(['/leaddetails', { data: JSON.stringify(data) }])
  }

  loadMore(event) {
    this.startNo = this.endNo
    this.endNo = this.endNo + 10
    this.whocalled = 'loadMore'
    this.loadMoreEvent = event
    this.socket.getLeadList(this.startNo, this.endNo)
    // this.loadlist(event)
  }

  loadlist(data?, event?) {
    if (!data.data.length) {
      if (event) {
        event.target.complete()
      }
    } else {
      console.log("now only coming here")
      this.leadData = this.leadData.concat(data.data)
      if (event) {
        event.target.complete();
      }
    }
  }

  toggleInfiniteScroll() {
    this.infiniteScroll.disabled = false;
  }

  doRefresh(event) {
    this.startNo = 0
    this.endNo = 10
    this.leadData = []
    // this.loadlist();
    this.socket.getLeadList(this.startNo, this.endNo)

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }


  // Filteration Logic
  // Get event's from shared child component
  async selectFilter(selected) {
    if (selected == 'lead') {
      await this.presentLeadNameAlert()
    } else if (selected == 'date') {
      this.dateTimePopOver()
    } else if (selected == 'status') {
      this.statusPopOver()
    } else if (selected == 'number') {
      this.presentNumberAlert()
    } else if (selected == 'default') {
      // Reset to default
      this.resetPageCounter()
      this.socket.getLeadList(this.startNo, this.endNo)
    }
  }

  // Trigger for popover
  async popOverTrigger(ev) {
    const listFilterType = await this.popover.create({
      component: SelectfilterPage,
      event: ev,
      translucent: true
    })
    this.componentPopover = listFilterType
    listFilterType.present()
  }

  // Search By Lead Name Input
  async presentLeadNameAlert() {
    const alert = await this.alert.create({
      header: 'Search Lead',
      message: "Enter Leads's Name",
      inputs: [{
        name: 'lead_name',
        type: 'text',
        placeholder: 'Enter Lead Name'
      }],
      buttons: [{
        text: 'Search',
        handler: (data) => {
          this.leadNameSearchOnClick(data)
        }
      }, {
        text: 'Cancel'
      }]
    })

    await alert.present()
  }

  // Search By Lead Name Input
  async presentNumberAlert() {
    const alert = await this.alert.create({
      header: 'Search By Number',
      message: "Enter Phone Num",
      inputs: [{
        name: 'number',
        type: 'text',
        placeholder: 'Enter Phone Num'
      }],
      buttons: [{
        text: 'Search',
        handler: (data) => {
          this.leadSearchNumberOnClick(data)
        }
      }, {
        text: 'Cancel'
      }]
    })

    await alert.present()
  }

  // Present toat
  async presentToast(message) {
    const toast = await this.toastControl.create({
      message: message,
      duration: 1300
    });
    toast.present();
  }

  // Search by Lead Name on click
  async leadNameSearchOnClick(data) {
    this.globalFilter = { filter: { lead_name: data.lead_name } }
    console.log(this.globalFilter)
    this.resetPageCounter()
    this.socket.getLeadList(this.startNo, this.endNo, this.globalFilter)
  }

  // Search by Number on click
  async leadSearchNumberOnClick(data) {
    this.globalFilter = { filter: { number: data.number } }
    console.log(this.globalFilter)
    this.resetPageCounter()
    this.socket.getLeadList(this.startNo, this.endNo, this.globalFilter)
  }

  // Date Opener
  async dateTimePopOver() {
    // Trigger Datetime manually
    this.presentToast('Please select starting date')
    this.timePicker1.open()
  }

  // Date selected
  async dateTimeSearchOnClick() {

    // Avoid null or undefined
    if (this.selectedDate1 == undefined || this.selectedDate1 == null) {
      return
    }

    if(this.selectedDate2 == null || this.selectedDate2 == undefined){
      // Get date 2
      this.presentToast('Please select ending date')
      this.timePicker2.open()
      return
    }

    this.globalFilter = { filter: { date: {start : this.selectedDate1 , end : this.selectedDate2}}  }
    console.log(this.globalFilter)
    this.resetPageCounter()
    this.socket.getLeadList(this.startNo, this.endNo, this.globalFilter)
    
    // Reset after use
    this.selectedDate1 = null
    this.selectedDate2 = null
  }

  // Select Status
  async statusPopOver() {
    this.statusPicker.open()
  }

  // Select status on click
  async statusSearchOnClick() {

    // Avoid null or undefined
    if (this.selectStatus == undefined) {
      return
    }

    this.globalFilter = { filter: { status: this.selectStatus } }

    console.log(this.globalFilter)
    this.resetPageCounter()
    this.socket.getLeadList(this.startNo, this.endNo, this.globalFilter)
  }

  dismissPopover() {
    if (this.componentPopover) {
      this.componentPopover.dismiss().then(() => { this.componentPopover = null; });
    }
  }

  resetPageCounter() {
    this.startNo = 0
    this.endNo = 10
    this.leadData = []
  }

}
