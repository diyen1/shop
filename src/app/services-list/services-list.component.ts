import {Component, Input, OnInit} from '@angular/core';
import { DmfbCrudService } from '../modules/crud/services/dmfb-crud.service';
import {ShopService} from '../model/shop-service.model';
import {AppService} from '../angular-services/app.service';
import {DmfbUser} from '../model/dmfb-user';

@Component({
  selector: 'app-services-list',
  templateUrl: './services-list.component.html',
  styleUrls: ['./services-list.component.scss']
})
export class ServicesListComponent implements OnInit {

  offset = this.servicesService.PER_PAGE;
  services: ShopService[];
  @Input() user: DmfbUser = null;

  constructor(public servicesService: DmfbCrudService, public appService: AppService) {
  }

  ngOnInit() {
    this.servicesService.initializeItemsList('services', this.user, );
  }

  onScroll() {
    if (this.offset < this.servicesService.services.length) {
      this.offset += this.servicesService.PER_PAGE;
    }
  }
}
