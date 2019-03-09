import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AdminService} from '../angular-services/admin.service';

@Component({
  selector: 'app-admin-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class AdminNavComponent implements OnInit {

  @Input() transparent = false;
  @Input() back = null;
  @Input() title;

  constructor(
    public router: Router,
    public chatService: AdminService,
  ) {
  }

  ngOnInit() {
  }

  goBack() {
    if (this.back && this.back != null) {
      const mobileWidth = (window.screen.width);
      if (mobileWidth >= 992 || this.chatService.blockToDisplay === 'master') {
        this.chatService.blockToDisplay = 'master';
        this.router.navigate([this.back]).then(() => {
          window.location.reload();
        });
      } else {
        this.chatService.blockToDisplay = 'master';
      }
    }
  }

  goHome() {
    this.router.navigate(['shop']);
  }

  goCategories() {
    this.router.navigate(['categories']);
  }
}
