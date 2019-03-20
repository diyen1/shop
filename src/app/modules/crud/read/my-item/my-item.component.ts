import {Component, Input, OnInit} from '@angular/core';
import {ShopService} from '../../../../model/shop-service.model';
import {Router} from '@angular/router';
import {DmfbCrudService} from '../../services/dmfb-crud.service';
import {MdlSnackbarService} from '@angular-mdl/core';
import {DmfbUser} from '../../../../model/dmfb-user';

@Component({
  selector: 'app-my-item',
  templateUrl: './my-item.component.html',
  styleUrls: ['./my-item.component.scss'],
})
export class MyItemComponent implements OnInit {

  @Input() service: ShopService;
  @Input() user: DmfbUser;

  constructor(
    public router: Router,
    private crudService: DmfbCrudService,
    private mdlSnackbarService: MdlSnackbarService,
    ) { }

  ngOnInit() {
  }

  editItem() {
  }

  deleteItem() {
    if (confirm('Are you sure you wan to delete this service?')) {
      this.crudService.deleteItem('services', this.service.sid).subscribe((response) => {
        this.crudService.initializeItemsList('services', this.user);
        this.mdlSnackbarService.showSnackbar({
          message: 'Service successfully deleted',
        });
      }, (error) => {
        this.mdlSnackbarService.showSnackbar({
          message: error.message,
        });
      });
    }
  }
}
