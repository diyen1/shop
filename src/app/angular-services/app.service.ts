import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment';
import {AuthService} from '../modules/auth/services/auth.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  pageTitle = 'page title';
  homeUrl = environment.homeUrl;

  constructor(
    private authService: AuthService,
    private router: Router,
    ) { }

  isMyItem(service) {
    return !!(service.uid === this.authService.currentUserId);
  }

  goToMainSite() {
    this.router.navigate(['shop']).then(() => {
      window.location.reload();
    });
  }
}
