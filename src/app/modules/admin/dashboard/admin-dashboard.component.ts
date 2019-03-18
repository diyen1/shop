import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import {DmfbCrudService} from '../../crud/services/dmfb-crud.service';
import {AppService} from '../../../angular-services/app.service';
import {ShopService} from '../../../model/shop-service.model';
import {DmfbUser} from '../../../model/dmfb-user';
import {MdlDialogService, MdlSnackbarService} from '@angular-mdl/core';
import {firestore} from 'firebase';
import {DateCellComponent} from '../date-cell/date-cell.component';
import {PriceCellComponent} from '../price-cell/price-cell.component';

@Component({
  selector: 'app-admin-shop',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  services: ShopService[] = [];
  loading = false;
  user: DmfbUser;
  // @Input() searchKey: string;
  collectionPath = 'services';
  noItemsError = 'There are currently no services available';

  constructor(
    public crudService: DmfbCrudService,
    private appService: AppService,
    private mdlSnackbarService: MdlSnackbarService,
    private dialogService: MdlDialogService,
  ) {
  }

  ngOnInit() {
    this.appService.pageTitle = 'Shop';
    this.loading = true;
    this.crudService.getAllItems(this.collectionPath).subscribe((items) => {
      this.services = items;

      this.loading = false;
      // this.offset = this.services[this.services.length - 1].id;
    });
  }

  editConfirm(event) {
    console.log(event);

    /*
     * Update the server only when there is a change
     */
    if (!(
      event.data.service === event.newData.service &&
      event.data.price === event.newData.price
    )) {
      const newData = this.defineUndefinedShopValues(event.newData);

      if (newData.sid !== '') {
        this.crudService.updateItem(this.collectionPath, newData.sid, newData).subscribe(() => {
          event.confirm.resolve();
          this.mdlSnackbarService.showSnackbar({
            message: 'Successfully updated service, ' + newData.service,
          });
        });
      }
    }
  }

  deleteConfirm(event) {
    // console.log(event);

    const result = this.dialogService.confirm('Do you want to delete this service?', 'No', 'Yes');
    result.subscribe(() => {
        // console.log('confirmed');
        this.crudService.deleteItem(this.collectionPath, event.data.sid).subscribe(() => {
          event.confirm.resolve();
          this.mdlSnackbarService.showSnackbar({
            message: 'Successfully delete user, ' + event.data.service,
          });
        });
      },
      (err: any) => {
        // console.log('declined');
      }
    );
  }

  private defineUndefinedShopValues(data) {
    data.description = (data.description) ? data.description : null;
    data.imagesUrl = (data.imagesUrl) ? data.imagesUrl : null;
    data.latestUpdateTimestamp = firestore.FieldValue.serverTimestamp();
    data.mainPhotoUrl = (data.mainPhotoUrl) ? data.mainPhotoUrl : null;
    data.price = (data.price) ? data.price : null;
    data.service = (data.service) ? data.service : null;
    data.sid = (data.sid) ? data.sid : null;
    data.time = (data.time) ? data.time : null;
    data.uid = (data.uid) ? data.uid : null;
    return data;
  }
}
