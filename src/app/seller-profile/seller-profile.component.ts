import { Component, OnInit } from '@angular/core';
import {DmfbUser} from '../model/dmfb-user';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {AppService} from '../angular-services/app.service';
import {UsersService} from '../modules/auth/services/users.service';
import {ChatService} from '../modules/chat/services/chat.service';
import {MdlDialogService, MdlSnackbarService} from '@angular-mdl/core';
import {DmfbCrudService} from '../modules/crud/services/dmfb-crud.service';

@Component({
  selector: 'app-seller-profile',
  templateUrl: './seller-profile.component.html',
  styleUrls: ['./seller-profile.component.scss']
})
export class SellerProfileComponent implements OnInit {

  user: DmfbUser = new DmfbUser();
  loading = false;
  shopUserId = '';
  collectionPath = 'users';

  constructor(
    private activatedRoute: ActivatedRoute,
    private usersService: UsersService,
    private appService: AppService,
    private router: Router,
    private chatService: ChatService,
    private crudService: DmfbCrudService,
    private dialogService: MdlDialogService,
    private mdlSnackbarService: MdlSnackbarService,
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

  reportUser() {
    this.user.reported = true;

    const result = this.dialogService.confirm('Do you want to report this user?', 'No', 'Yes');
    result.subscribe(() => {
        console.log('confirmed');

        this.user = DmfbUser.defineUndefinedUserValues(this.user);

        this.crudService.updateItem(this.collectionPath, this.user.uid, this.user).subscribe(() => {
          this.mdlSnackbarService.showSnackbar({
            message: 'Successfully reported user, ' + this.user.fullNames,
          });
        });
      },
      (err: any) => {
        // console.log('declined');
      }
    );
  }

}
