import {Component, OnInit} from '@angular/core';
import {DmfbUser} from '../model/dmfb-user';
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

  user: DmfbUser = new DmfbUser();

  form: any;
  profileImageFields = [];
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
    this.appService.pageTitle = 'Profile';
    if (!this.authService.isLoggedIn) {
      this.router.navigate(['login']);
    } else if (!this.user.active) {
      this.router.navigate(['edit-profile']);
    } else {
      this.profileImageFields = [
        {
          key: 'profileImage',
          name: 'Profile Image',
          type: 'image',
          value: this.user.profileImage,
        },
      ];

      this.fields = [
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
          key: 'state',
          name: 'State',
          type: 'text',
          value: this.user.state,
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
        {
          key: 'services',
          name: 'Services',
          type: 'text',
          value: this.user.services,
        },
      ];
    }
  }

  editProfile() {
    this.router.navigate(['edit-profile']);
  }

}
