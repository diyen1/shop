import {AfterViewInit, Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Router} from '@angular/router';
import * as firebase from 'firebase';
import firestore from 'firebase/firestore';
import {AppService} from './angular-services/app.service';
import {ChatService} from './modules/chat/services/chat.service';
import {delay, startWith, tap} from 'rxjs/operators';
import {AuthService} from './modules/auth/services/auth.service';
import {DmfbCrudService} from './modules/crud/services/dmfb-crud.service';

/*import {OnlineStatusService, OnlineStatusType} from 'ngx-online-status';
import {st} from '@angular/core/src/render3';*/

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  onlineStatus = 1;

  constructor(
    private authService: AuthService,
    public router: Router,
    public appService: AppService,
    public servicesService: DmfbCrudService,
    // private onlineStatusService: OnlineStatusService,
  ) {
  }

  ngOnInit(): void {
    console.log('checking online status');
    /*this.onlineStatusService.status.subscribe((status: OnlineStatusType) => {
      // use status
      console.log('status', status);
      this.onlineStatus = status;
    });*/
  }

  get isFullScreenTemplate() {
    /*const route = this.router.url;
    return route === '/login' || route === '/register';*/
    return false;
  }

  get isCleanTemplate() {
    const route = this.router.url;
    return route.includes('/chat') || route.includes('/admin');
  }

  displayPostButton() {
    const route = this.router.url;
    const routesWithoutPostButtons = [
      '/chat',
      '/add-service',
      '/login',
      '/register',
    ];

    for (let i = 0; i < routesWithoutPostButtons.length; i++) {
      if (route.includes(routesWithoutPostButtons[i])) {
        return false;
      }
    }

    return true;
    /*return !(route.includes('/chat') || route.includes('/add-service')
      || route.includes('/login') || route.includes('/register'));*/

    /*const pageTitle = this.appService.pageTitle.toLowerCase();
    return !(pageTitle === 'chat');*/
  }

  get logOutOrInButtonText() {
    return this.authService.isLoggedIn ? 'Logout' : 'Login';
  }

  logout() {
    this.authService.logout();
  }

  search(event) {
    // this.servicesService.searchKey = this.searchField;
    this.servicesService.initializeItemsList('services');
    const route = this.router.url;
    if (route !== '/search') {
      this.router.navigate(['search']);
    }
  }

}
