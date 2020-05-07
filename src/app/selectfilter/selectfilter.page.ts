import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { FilterService } from '../../service/filter.service'

@Component({
  selector: 'app-selectfilter',
  templateUrl: './selectfilter.page.html',
  styleUrls: ['./selectfilter.page.scss'],
})
export class SelectfilterPage implements OnInit {

  constructor(private filterService: FilterService) { }

  ngOnInit() {
  }

  selectedOption(options){
    this.filterService.nextMessage(options)
  }

}
