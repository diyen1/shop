import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from '../services/auth.service';
import {environment} from '../../../environments/environment';
import {AppService} from '../../../angular-services/app.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  errorMsg: string;

  fields = [
    {
      key: 'email',
      name: 'Email',
      type: 'text',
    },
    {
      key: 'password',
      name: 'Password',
      type: 'password',
    },
  ];

  constructor(public authService: AuthService, private router: Router, public appService: AppService) { }

  ngOnInit(): void {
    if (this.authService.isLoggedIn) {
      this.router.navigate(['shop']);
    } else {
      this.appService.pageTitle = 'Login';
    }
  }

  login(loginType = 'email', formData: any = {}) {
    switch (loginType) {
      case 'google':
        this.authService.loginGoogle()
          .then((user) => { this.actionAfterLogin(user); })
          .catch(error => this.errorMsg = error.message);
        break;
      case 'facebook':
        this.authService.loginFb()
          .then((user) => { this.actionAfterLogin(user); })
          .catch(error => this.errorMsg = error.message);
        break;
      case 'email':
      default:
        this.authService.login(formData.email, formData.password)
          .then((user) => { this.actionAfterLogin(user); })
          .catch(error => this.errorMsg = error.message);
        break;
    }

  }

  actionAfterLogin(user) {
    /*if (user.active) {
      this.router.navigate(['shop']);
    } else {
      this.router.navigate(['profile']);
    }
    window.location.reload();*/
  }
}
