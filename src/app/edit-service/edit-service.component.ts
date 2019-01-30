import { Component, OnInit } from '@angular/core';
import {AppService} from '../angular-services/app.service';
import {generateFirebaseId} from '../functions/generate-firebase-id';
import {AuthService} from '../modules/auth/services/auth.service';
import {DmfbCrudService} from '../modules/crud/services/dmfb-crud.service';
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
    private crudService: DmfbCrudService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    ) { }

  ngOnInit() {

    this.appService.pageTitle = 'Edit service';

    if (!this.authService.isLoggedIn) {
      this.router.navigate(['login']);
    } else {
      this.activatedRoute.params.subscribe(
        (params: Params) => {
          this.loading = true;
          const id = params['id'];

          this.crudService.getItem('services', id).subscribe(
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
                  key: 'imagesUrl',
                  name: 'Gallery Images',
                  type: 'image_array',
                  image_count: 5,
                  value: service.imagesUrl,
                },
              ];
              this.loading = false;
            },
            () => {
              this.loading = false;
            });
        });
    }
  }

  updateService(formData) {
    formData.latestUpdateTimestamp = '';
    formData.time = '';

    console.log('prepared:', formData);

    this.crudService.updateItem('services', '' + this.service.sid, formData).subscribe((id) => {
      console.log(id);

      // TODO display success message
    });
  }
}
