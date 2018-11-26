import { Component, OnInit } from '@angular/core';
import {AppService} from '../angular-services/app.service';
import {generateFirebaseId} from '../functions/generate-firebase-id';
import {AuthService} from '../modules/auth/services/auth.service';
import {ServicesService} from '../angular-services/services.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-service',
  templateUrl: './add-service.component.html',
  styleUrls: ['./add-service.component.css']
})
export class AddServiceComponent implements OnInit {

  fields = [
    {
      key: 'service',
      name: 'Title',
      type: 'text',
    },
    {
      key: 'description',
      name: 'Description',
      type: 'text_area',
    },
    {
      key: 'price',
      name: 'Price',
      type: 'text',
    },
    {
      key: 'mainPhotoUrl',
      name: 'Service Main Image',
      type: 'image',
    },
    {
      key: 'imageUrl',
      name: 'Gallery Images',
      type: 'image_array',
      image_count: 5,
    },
  ];

  constructor(
    private appService: AppService,
    private authService: AuthService,
    private servicesService: ServicesService,
    private router: Router,
    ) { }

  ngOnInit() {
    this.appService.pageTitle = 'Add Service';
  }

  addService(formData) {
    console.log('emitted back to initial:', formData);


    formData.id = generateFirebaseId();
    // formData.imageUrl is auto generated
    formData.latestUpdateTimestamp = '';
    formData.sid = formData.id;
    formData.time = '';
    formData.uid = this.authService.getAuthUser().uid;
    // formData.service is auto generated
    // formData.mainPhotoUrl is auto generated

    console.log('prepared:', formData);

    this.servicesService.postService(formData).subscribe((id) => {
      console.log(id);
      // this.router.navigate(['edit-service/' + id]);
      this.router.navigate(['shop']);
    });
  }
}
