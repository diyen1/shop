import { Component, OnInit } from '@angular/core';
import {AppService} from '../angular-services/app.service';
import {generateFirebaseId} from '../functions/generate-firebase-id';
import {AuthService} from '../modules/auth/services/auth.service';
import {ServicesService} from '../angular-services/services.service';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ShopService} from '../model/shop-service.model';

@Component({
  selector: 'app-edit-service',
  templateUrl: './edit-service.component.html',
  styleUrls: ['./edit-service.component.css']
})
export class EditServiceComponent implements OnInit {

  fields = [];

  loading = false;
  service: ShopService;

  constructor(
    private appService: AppService,
    private authService: AuthService,
    private servicesService: ServicesService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    ) { }

  ngOnInit() {

    this.appService.pageTitle = 'Edit service';

    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.loading = true;
        const id = params['id'];

        this.servicesService.getService(id).subscribe(
          (service: ShopService) => {
            this.service = service;
            this.appService.pageTitle = 'Edit ' + service.service;

            this.fields = [
              {
                key: 'service',
                name: 'Title',
                type: 'text',
                value: service.service,
              },
              {
                key: 'description',
                name: 'Description',
                type: 'text_area',
                value: service.description,
              },
              {
                key: 'price',
                name: 'Price',
                type: 'text',
                value: service.price,
              },
              {
                key: 'mainPhotoUrl',
                name: 'Service Main Image',
                type: 'image',
                value: service.mainPhotoUrl,
              },
              {
                key: 'imageUrl',
                name: 'Gallery Images',
                type: 'image_array',
                image_count: 5,
                value: service.imageUrl,
              },
            ];
            this.loading = false;
          },
          () => {
            this.loading = false;
          });
      });
  }

  updateService(formData) {
    formData.latestUpdateTimestamp = '';
    formData.time = '';

    console.log('prepared:', formData);

    this.servicesService.updateService('' + this.service.id, formData).subscribe((id) => {
      console.log(id);

      // TODO display success message
    });
  }
}
