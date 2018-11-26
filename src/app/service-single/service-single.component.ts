import {Component, OnInit} from '@angular/core';
import {ShopService} from '../model/shop-service.model';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ServicesService} from '../angular-services/services.service';
import {AppService} from '../angular-services/app.service';

@Component({
  selector: 'app-service-single',
  templateUrl: './service-single.component.html',
  styleUrls: ['./service-single.component.scss']
})
export class ServiceSingleComponent implements OnInit {

  service: ShopService;
  loading = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private fsService: ServicesService,
    private appService: AppService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.appService.pageTitle = 'Service';
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.loading = true;
        const id = params['id'];

        this.fsService.getService(id).subscribe(
          (service: ShopService) => {
            this.service = service;
            this.appService.pageTitle = service.service;
            this.loading = false;
          },
          () => {
            this.loading = false;
          });
      });
  }

  viewSellerProfile() {
    console.log(this.service);
    console.log(this.service.uid);
    if (this.service && this.service.uid) {
      this.router.navigate(['/seller-profile/' + this.service.uid]);
    }
  }
}
