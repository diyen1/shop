import {Component, Input, OnInit} from '@angular/core';
import { DmfbCrudService } from '../modules/crud/services/dmfb-crud.service';
import {ShopService} from '../model/shop-service.model';
import {AppService} from '../angular-services/app.service';
import {DmfbUser} from '../model/dmfb-user';

@Component({
  selector: 'app-services-list',
  templateUrl: './services-list.component.html',
  styleUrls: ['./services-list.component.css']
})
export class ServicesListComponent implements OnInit {

  offset = 20;
  services: ShopService[];
  @Input() user: DmfbUser;

  constructor(public servicesService: DmfbCrudService) {
  }

  ngOnInit() {
    this.servicesService.initializeItemsList('services', this.user);
  }

  onScroll() {
    console.log('onScroll');
    if (this.offset < this.servicesService.services.length) {
      this.offset += 20;
    }
  }

}
