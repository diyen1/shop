import {Component, Input, OnInit} from '@angular/core';
import { ServicesService } from '../angular-services/services.service';
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

  constructor(public servicesService: ServicesService, private appService: AppService) {
  }

  ngOnInit() {
    this.appService.pageTitle = 'Shop';
    this.servicesService.searchKey = '';
    this.servicesService.initializeServicesList(this.user);
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

  onScroll() {
    console.log('onScroll');
    if (this.offset < this.servicesService.services.length) {
      this.offset += 20;
    }
  }

}
