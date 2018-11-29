import { Component, OnInit } from '@angular/core';
import {DmfbUser} from '../model/dmfb-user';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {AppService} from '../angular-services/app.service';
import {UsersService} from '../modules/auth/services/users.service';
import {ChatService} from '../modules/chat/services/chat.service';

@Component({
  selector: 'app-seller-profile',
  templateUrl: './seller-profile.component.html',
  styleUrls: ['./seller-profile.component.scss']
})
export class SellerProfileComponent implements OnInit {

  user: DmfbUser = new DmfbUser();
  loading = false;
  shopUserId = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private usersService: UsersService,
    private appService: AppService,
    private router: Router,
    private chatService: ChatService,
  ) { }

  ngOnInit() {

    this.appService.pageTitle = 'Seller Profile';

    this.activatedRoute.params.subscribe(
      (params: Params) => {
        this.loading = true;
        this.shopUserId = params['id'];

        this.usersService.getUser(this.shopUserId).subscribe(
          (user: DmfbUser) => {
            this.user = user;
            console.log('this.user', this.user);
            this.appService.pageTitle = user.fullNames;
            this.loading = false;
          },
          () => {
            this.loading = false;
          });
      });
  }

  openChat() {

    this.chatService.currentChatUser = this.user;

    this.router.navigate(['/chat']);
  }

}
