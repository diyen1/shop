import {Component, OnInit} from '@angular/core';
import {AppService} from '../../../angular-services/app.service';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  errorMsg: string;

  fields = [
    {
      key: 'fullNames',
      name: 'Full Names',
      type: 'text',
    },
    {
      key: 'email',
      name: 'Email',
      type: 'email',
    },
    {
      key: 'password',
      name: 'Password',
      type: 'password',
    },
    {
      key: 'city',
      name: 'City',
      type: 'text',
    },
    {
      key: 'country',
      name: 'Country',
      type: 'text',
    },
    {
      key: 'homePhone',
      name: 'Home Phone',
      type: 'phone',
    },
    {
      key: 'mobilePhone',
      name: 'Mobile Phone',
      type: 'phone',
    },
    // {
    //   key: 'profileImage',
    //   name: 'Profile Image',
    //   type: 'image',
    // },
  ];

  constructor(private authService: AuthService, private router: Router, public appService: AppService) {
  }

  signUp(formData) {
    this.authService.signUp(formData)
      .then(resolve => { this.router.navigate(['shop']); /* window.location.reload(); */ })
      .catch(error => this.errorMsg = error.message);
  }

  ngOnInit(): void {
    this.appService.pageTitle = 'Register';
  }
}
