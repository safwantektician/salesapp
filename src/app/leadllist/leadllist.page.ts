import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, PopoverController, IonDatetime, IonSelect } from '@ionic/angular';
import { SelectfilterPage } from '../selectfilter/selectfilter.page'
import { FilterService } from '../../service/filter.service'

@Component({
  selector: 'app-leadllist',
  templateUrl: './leadllist.page.html',
  styleUrls: ['./leadllist.page.scss'],
})
export class LeadllistPage implements OnInit {
  
  public selectStatus
  public selectedFilter
  public selectedDate
  public componentPopover
  public globalFilter

  @ViewChild('timePicker',{static: false}) public timePicker: IonDatetime
  @ViewChild('statusPicker',{static: false}) public statusPicker: IonSelect

  constructor(private alert: AlertController, private popover: PopoverController, private filterService: FilterService) {
    this.filterService.sharedMessage.subscribe(data => {
      this.selectFilter(data)
      this.dismissPopover()
    })
  }

  ngOnInit() {
  }

  // Get event's from shared child component
  async selectFilter(selected){
    if(selected == 'lead'){
      await this.presentLeadNameAlert()
    } else if (selected == 'date') {
      this.dateTimePopOver()
    } else if (selected == 'status') {
      this.statusPopOver()
    } else if (selected == 'number') {
      this.presentNumberAlert()
    } else if (selected == 'default') {
      // Reset to default
    }
  }

  // Trigger for popover
  async popOverTrigger(ev){
    const listFilterType = await this.popover.create({
      component: SelectfilterPage,
      event: ev,
      translucent: true
    })
    this.componentPopover = listFilterType
    listFilterType.present()
  }

  // Search By Lead Name Input
  async presentLeadNameAlert(){
    const alert = await this.alert.create({
      header: 'Search Lead',
      message: "Enter Leads's Name",
      inputs: [{
        name: 'lead_name',
        type: 'text',
        placeholder : 'Enter Lead Name'
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
  async presentNumberAlert(){
    const alert = await this.alert.create({
      header: 'Search By Number',
      message: "Enter Phone Num",
      inputs: [{
        name: 'number',
        type: 'text',
        placeholder : 'Enter Phone Num'
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

  // Search by Lead Name on click
  async leadNameSearchOnClick(data){
    this.globalFilter = {filter: {lead_name : data.lead_name}}
    console.log(this.globalFilter)
  }

  // Search by Number on click
  async leadSearchNumberOnClick(data){
    this.globalFilter = {filter: {number : data.number}}
    console.log(this.globalFilter)
  }

  // Date Opener
  async dateTimePopOver(){
    // Trigger Datetime manually
    this.timePicker.open()
  }

  // Date selected
  async dateTimeSearchOnClick(){
    
    // Avoid null or undefined
    if(this.selectedDate == undefined){
      return
    }
    
    this.globalFilter = {filter : {date : this.selectedDate}}
    console.log(this.globalFilter)
  }

  // Select Status
  async statusPopOver(){
    this.statusPicker.open()
  }

  // Select status on click
  async statusSearchOnClick(){
    
    // Avoid null or undefined
    if(this.selectStatus == undefined){
      return
    }
    
    this.globalFilter = {filter : {status : this.selectStatus}}
    
    console.log(this.globalFilter)
  }

  dismissPopover(){
    if (this.componentPopover) {
      this.componentPopover.dismiss().then(() => { this.componentPopover = null; });
    }
  }
}
