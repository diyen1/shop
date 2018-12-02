import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  pageTitle = 'page title';
  homeUrl = environment.homeUrl;

  constructor() { }

}
