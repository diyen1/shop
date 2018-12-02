import { Component, OnInit } from '@angular/core';
import {AppService} from '../angular-services/app.service';
import {generateFirebaseId} from '../functions/generate-firebase-id';
import {AuthService} from '../modules/auth/services/auth.service';
import {DmfbCrudService} from '../modules/crud/services/dmfb-crud.service';
import {Router} from '@angular/router';
import {firestore} from 'firebase';
import {MdlSnackbarService} from '@angular-mdl/core';

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
    private servicesService: DmfbCrudService,
    private router: Router,
    private mdlSnackbarService: MdlSnackbarService,
    ) { }

  ngOnInit() {
    this.appService.pageTitle = 'Add Service';
    if (!this.authService.isLoggedIn) {
      this.router.navigate(['login']);
    }
  }

  addService(formData) {
    // formData.imageUrl is auto generated
    // formData.service is auto generated
    // formData.mainPhotoUrl is auto generated
    formData.id = generateFirebaseId(); // firestore.FieldPath.documentId();
    formData.sid = formData.id;
    formData.time = firestore.FieldValue.serverTimestamp();
    formData.latestUpdateTimestamp = firestore.FieldValue.serverTimestamp();
    formData.uid = this.authService.getAuthUser().uid;

    this.servicesService.postItem('services', formData).subscribe(() => {
      // console.log(id);
      // this.router.navigate(['edit-service/' + id]);
      this.router.navigate(['shop']).then(() => {
        this.mdlSnackbarService.showSnackbar({
          message: 'Successfully added service',
        });
      });
    });
  }
}
