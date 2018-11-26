import { Component, OnInit } from '@angular/core';
import {ShopUser} from '../model/shop-user';
import {FormBuilder, Validators} from '@angular/forms';
import {AppService} from '../angular-services/app.service';
import {Router} from '@angular/router';
import {AuthService} from '../modules/auth/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: ShopUser = new ShopUser();

  form: any;
  fields = [];

  constructor(
    private fb: FormBuilder,
    private appService: AppService,
    private authService: AuthService,
    private router: Router,
    ) {
  }

  ngOnInit() {
    this.user = this.authService.getAuthUser();
    console.log('this.user', this.user);
    this.appService.pageTitle = 'Profile';

    this.fields = [
      {
        key: 'profileImage',
        name: 'Profile Image',
        type: 'image',
        value: this.user.profileImage,
      },
      {
        key: 'fullNames',
        name: 'Full Names',
        type: 'text',
        value: this.user.fullNames,
      },
      {
        key: 'email',
        name: 'Email',
        type: 'hidden',
        value: this.user.email,
      },
      {
        key: 'city',
        name: 'City',
        type: 'text',
        value: this.user.city,
      },
      {
        key: 'country',
        name: 'Country',
        type: 'text',
        value: this.user.country,
      },
      {
        key: 'homePhone',
        name: 'Home Phone',
        type: 'phone',
        value: this.user.homePhone,
      },
      {
        key: 'mobilePhone',
        name: 'Mobile Phone',
        type: 'phone',
        value: this.user.mobilePhone,
      },
    ];
  }

  update(data) {
    this.authService.setUserData(data);
  }

}
