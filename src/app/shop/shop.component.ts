import { Component, OnInit } from '@angular/core';
import { DmfbCrudService } from '../modules/crud/services/dmfb-crud.service';
import {ShopService} from '../model/shop-service.model';
import {AppService} from '../angular-services/app.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  services: ShopService[];

  constructor(public servicesService: DmfbCrudService, private appService: AppService) {
  }

  ngOnInit() {
    this.appService.pageTitle = 'Shop';
    this.servicesService.searchKey = '';
  }
}
