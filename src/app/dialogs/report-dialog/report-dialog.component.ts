import {Component, HostListener, Inject, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MdlDialogReference, MdlSnackbarService} from '@angular-mdl/core';
import {DmfbUser} from '../../model/dmfb-user';
import {AppService} from '../../angular-services/app.service';
import {AuthService} from '../../modules/auth/services/auth.service';
import {ShopService} from '../../model/shop-service.model';
import {SERVICE} from '../../model/injection-service';

@Component({
  selector: 'app-report-dialog',
  templateUrl: './report-dialog.component.html',
  styleUrls: ['./report-dialog.component.scss']
})
export class ReportDialogComponent implements OnInit {

  user: DmfbUser = new DmfbUser();

  form: any;
  fields = [];
  service: ShopService;

  constructor(
    private fb: FormBuilder,
    private appService: AppService,
    private authService: AuthService,
    private router: Router,
    private mdlSnackbarService: MdlSnackbarService,
    private dialog: MdlDialogReference,
    @Inject(SERVICE) service: ShopService,
  ) {
    console.log('report dialog constructor', service);
    this.service = service;
  }

  ngOnInit() {
    this.user = this.authService.getAuthUser();
    if (!this.authService.isLoggedIn) {
      this.router.navigate(['login']);
    }

    this.fields = [
      {
        key: 'message',
        name: 'Message',
        type: 'text_area',
      },
    ];

    // register a listener if you want to be informed if the dialog is closed.
    this.dialog.onHide().subscribe( (res) => {
      console.log('hidden');
      if (res) {
        console.log('authenticated res', res);
      }
    });
  }

  reportService(data) {
    console.log('update data', this.dialog);
    this.dialog.hide();

    this.service.reported = true;

    console.log('update service', this.service);

    // data.active = true;
    // console.log('update user', data);
    // this.authService.setUserData(data).then(() => {
    //   this.router.navigate(['profile']).then(() => {
    //     this.mdlSnackbarService.showSnackbar({
    //       message: 'Successfully updated profile',
    //     });
    //   });
    // }).catch((error) => {
    //   this.mdlSnackbarService.showSnackbar({
    //     message: error.message,
    //   });
    // });
  }

  @HostListener('keydown.esc')
  public onEsc(): void {
    this.dialog.hide();
  }

}
