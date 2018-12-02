import { Component, OnInit } from '@angular/core';
import {ShopService} from '../model/shop-service.model';
import {DmfbCrudService} from '../modules/crud/services/dmfb-crud.service';
import {AppService} from '../angular-services/app.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  services: ShopService[];
  loading = false;

  constructor(public servicesService: DmfbCrudService, private appService: AppService) {
  }

  ngOnInit() {
    this.loading = true;
    this.appService.pageTitle = 'Search';
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
