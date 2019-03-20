import {Component, Input, OnInit} from '@angular/core';
import {DmfbCrudService} from '../../crud/services/dmfb-crud.service';
import {AppService} from '../../../angular-services/app.service';
import {ShopService} from '../../../model/shop-service.model';
import {DmfbUser} from '../../../model/dmfb-user';
import {User} from '../../../model/user.model';
import {UsersService} from '../../auth/services/users.service';
import {MdlDialogService, MdlSnackbarService} from '@angular-mdl/core';
import {YesNoCellComponent} from '../cells/yes-no-cell/yes-no-cell.component';

@Component({
  selector: 'app-admin-shop',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {

  lastItem = null;
  users: any[] = [];
  loading = false;
  isLastPage = false;
  user: DmfbUser;
  noItemsError = 'There are currently no users available';

  settings = {
    columns: {
      // uid: {
      //   title: 'UID',
      //   width: '250px',
      //   editable: false,
      // },
      fullNames: {
        title: 'Name',
      },
      email: {
        title: 'Email'
      },
      active: {
        title: 'Active',
        // valuePrepareFunction: (value) => {
        //   return value ? 'YES' : 'NO';
        // },
        width: '100px',
        class: 'center-all',
        sort: false,
        editor: {
          type: 'checkbox',
          // config: {
          //   true: 'Yes',
          //   false: 'No',
          // }
        },
        filter: {
          type: 'checkbox',
          config: {
            true: 'true',
            false: 'false',
          }
        },
        type: 'custom',
        renderComponent: YesNoCellComponent,
        onComponentInitFunction(instance) {
          instance.save.subscribe(row => {
            //
          });
        },
      },
      userType: {
        title: 'User Type',
        sort: false,
        valuePrepareFunction: (value) => {
          return value ? value : 'CUSTOMER';
        },
        width: '150px',
        editor: {
          type: 'list',
          config: {
            list: [
              { value: 'CUSTOMER', title: 'CUSTOMER' },
              { value: 'ADMIN', title: 'ADMIN' },
            ]
          }
        },
      },
      reported: {
        title: 'Reported',
        width: '100px',
        type: 'custom',
        sort: false,
        class: 'center-all',
        editor: {
          type: 'checkbox',
        },
        filter: {
          type: 'checkbox',
          config: {
            true: 'true',
            false: 'false',
          }
        },
        renderComponent: YesNoCellComponent,
        onComponentInitFunction(instance) {
          instance.save.subscribe(row => {
            //
          });
        },
      },
    },
    actions: {
      add: false,
      position: 'right',
    },
    edit: {
      confirmSave: true,
    },
    delete: {
      confirmDelete: true,
    }
  };

  constructor(
    private appService: AppService,
    private usersService: UsersService,
    private mdlSnackbarService: MdlSnackbarService,
    private dialogService: MdlDialogService,
  ) {
  }

  ngOnInit() {
    this.appService.pageTitle = 'Users';
    this.loading = true;
    this.usersService.getUsers().subscribe((items: any[]) => {
      this.users = items;
      this.loading = false;
    });
  }

  editConfirm(event) {
    // console.log(event);

    /*
     * Update the server only when there is a change
     */
    if (!(
      event.data.fullNames && event.newData.fullNames && event.data.fullNames === event.newData.fullNames &&
      event.data.email && event.newData.email && event.data.email === event.newData.email &&
      event.data.userType && event.newData.userType && event.data.userType === event.newData.userType &&
      event.data.active && event.newData.active && event.data.active === event.newData.active &&
      event.data.reported && event.newData.reported && event.data.reported === event.newData.reported
    )) {
      const newData = this.defineUndefinedUserValues(event.newData);

      if (newData.uid !== '') {
        this.usersService.updateUser(newData.uid, newData).subscribe(() => {
          // event.confirm.resolve();
          this.mdlSnackbarService.showSnackbar({
            message: 'Successfully updated user, ' + newData.fullNames,
          });
        });
      }
    }
  }

  deleteConfirm(event) {
    // console.log(event);
    const result = this.dialogService.confirm('Do you want to delete this service?', 'No', 'Yes');
    result.subscribe( () => {
        // console.log('confirmed');
        this.usersService.deleteUser(event.data.uid).subscribe(() => {
          // event.confirm.resolve();
          this.mdlSnackbarService.showSnackbar({
            message: 'Successfully delete user, ' + event.data.fullNames,
          });
        });
      },
      (err: any) => {
        // console.log('declined');
      }
    );
  }

  private defineUndefinedUserValues(data) {
    data.active = (data.active) ? data.active : false;
    data.city = (data.city) ? data.city : '';
    data.country = (data.country) ? data.country : '';
    data.email = (data.email) ? data.email : '';
    data.fcm_token = (data.fcm_token) ? data.fcm_token : '';
    data.fullNames = (data.fullNames) ? data.fullNames : '';
    data.homePhone = (data.homePhone) ? data.homePhone : '';
    data.lastSeen = (data.lastSeen) ? data.lastSeen : null;
    data.mobilePhone = (data.mobilePhone) ? data.mobilePhone : '';
    data.profileImage = (data.profileImage) ? data.profileImage : '';
    data.sign_in_type = (data.sign_in_type) ? data.sign_in_type : '';
    data.uid = (data.uid) ? data.uid : '';
    return data;
  }
}
