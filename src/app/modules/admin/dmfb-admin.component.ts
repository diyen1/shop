import {Component, OnInit} from '@angular/core';
import {AppService} from '../../angular-services/app.service';
import {AuthService} from '../auth/services/auth.service';
import {Router} from '@angular/router';
import {AdminService} from './angular-services/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './dmfb-admin.component.html',
  styleUrls: ['./dmfb-admin.component.scss']
})
export class DmfbAdminComponent implements OnInit {

  constructor(
    public appService: AppService,
    public authService: AuthService,
    private router: Router,
    public adminService: AdminService,
  ) {
  }

  ngOnInit() {
    if (!this.authService.isLoggedIn) {
      this.router.navigate(['login']).then(() => {
        // window.location.reload();
      });
    }
    if (!(this.authService.getAuthUser() && this.authService.getAuthUser().userType === 'ADMIN')) {
      this.router.navigate(['shop']).then(() => {
        // window.location.reload();
      });
    }
    this.appService.pageTitle = 'Services';
    // this.chatService.postMessage({'key': 'hey'});
  }

  get logOutOrInButtonText() {
    return this.authService.isLoggedIn ? 'Logout' : 'Login';
  }

  logout() {
    this.authService.logout();
  }

}
