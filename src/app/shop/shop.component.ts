import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../angular-services/services.service';
import {ShopService} from '../model/shop-service.model';
import {AppService} from '../angular-services/app.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  services: ShopService[];

  constructor(public servicesService: ServicesService, private appService: AppService) {
  }

  ngOnInit() {
    this.appService.pageTitle = 'Shop';
    this.servicesService.searchKey = '';
    this.servicesService.initializeServicesList();
    /*this.fs.getServices().subscribe((data: ShopService[]) => {
        console.log('success', data);
        this.services = data;
        this.loading = false;
    },
      (error) => {
        console.log('error', error);
        this.loading = false;
    });*/
  }

}
