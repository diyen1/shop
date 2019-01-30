import {Component, OnInit} from '@angular/core';
import {ShopService} from '../model/shop-service.model';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {DmfbCrudService} from '../modules/crud/services/dmfb-crud.service';
import {AppService} from '../angular-services/app.service';
import {AuthService} from '../modules/auth/services/auth.service';

@Component({
  selector: 'app-service-single',
  templateUrl: './service-single.component.html',
  styleUrls: ['./service-single.component.scss']
})
export class ServiceSingleComponent implements OnInit {

  service: ShopService;
  loading = false;
  currentImageUrl = '';
  zoomed = false;
  galleries: string[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private crudService: DmfbCrudService,
    private appService: AppService,
    private router: Router,
    private authService: AuthService,
  ) {
  }

  ngOnInit() {
    this.appService.pageTitle = 'Service';
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.loading = true;
        const id = params['id'];

        this.crudService.getItem('services', id).subscribe(
          (service: ShopService) => {
            this.service = service;
            this.currentImageUrl = this.service.mainPhotoUrl;
            this.appService.pageTitle = service.service;
            this.loading = false;
            this.galleries.push(this.service.mainPhotoUrl);
            this.service.imagesUrl.forEach((image) => {
              this.galleries.push(image);
            });
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

  change(photoUrl) {
    this.currentImageUrl = photoUrl;
  }

  toggleZoom() {
    this.zoomed = !this.zoomed;
  }

  isMyItem() {
    return this.service.uid === this.authService.currentUserId;
  }
}
