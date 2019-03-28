import {Component, OnInit} from '@angular/core';
import {DmfbUser} from '../model/dmfb-user';
import {FormBuilder, Validators} from '@angular/forms';
import {AppService} from '../angular-services/app.service';
import {Router} from '@angular/router';
import {AuthService} from '../modules/auth/services/auth.service';
import {MdlSnackbarService} from '@angular-mdl/core';

@Component({
  selector: 'app-profile',
  templateUrl: './edit-profile.component.html',
})
export class EditProfileComponent implements OnInit {

  user: DmfbUser = new DmfbUser();

  form: any;
  fields = [];

  constructor(
    private fb: FormBuilder,
    private appService: AppService,
    private authService: AuthService,
    private router: Router,
    private mdlSnackbarService: MdlSnackbarService
  ) {
  }

  ngOnInit() {
    this.user = this.authService.getAuthUser();
    this.appService.pageTitle = 'Edit Profile';
    if (!this.authService.isLoggedIn) {
      this.router.navigate(['login']);
    }

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
        key: 'state',
        name: 'State',
        type: 'text',
        value: this.user.state,
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
      {
        key: 'services',
        name: 'Services',
        type: 'text_area',
        value: this.user.services,
      },
    ];
  }

  update(data) {
    data.active = true;
    console.log('update user', data);
    this.authService.setUserData(data).then(() => {
      this.router.navigate(['profile']).then(() => {
        this.mdlSnackbarService.showSnackbar({
          message: 'Successfully updated profile',
        });
      });
    }).catch((error) => {
      this.mdlSnackbarService.showSnackbar({
        message: error.message,
      });
    });
  }

}
