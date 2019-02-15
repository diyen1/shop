import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {environment} from '../environments/environment';
import {AuthService} from '../modules/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  pageTitle = 'page title';
  homeUrl = environment.homeUrl;

  constructor(private authService: AuthService) { }

  isMyItem(service) {
    return !!(service.uid === this.authService.currentUserId);
  }
}
