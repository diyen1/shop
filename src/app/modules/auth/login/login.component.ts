import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from '../services/auth.service';

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

  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    if (this.authService.isLoggedIn) {
      this.router.navigate(['shop']);
    }
  }

  login(formData) {
    console.log('login() called from login-form component');
    this.authService.login(formData.email, formData.password)
      .then((user) => { this.router.navigate(['shop']);  /*window.location.reload();*/ })
      .catch(error => this.errorMsg = error.message);
  }
}
