import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import {DmfbCrudService} from '../../crud/services/dmfb-crud.service';
import {AppService} from '../../../angular-services/app.service';
import {ShopService} from '../../../model/shop-service.model';
import {DmfbUser} from '../../../model/dmfb-user';
import {MdlDialogService, MdlSnackbarService} from '@angular-mdl/core';
import {firestore} from 'firebase';
import {DateCellComponent} from '../cells/date-cell/date-cell.component';
import {PriceCellComponent} from '../cells/price-cell/price-cell.component';
import {ImageCellComponent} from '../cells/image-cell/image-cell.component';
import {PrimaryCellComponent} from '../cells/primary-cell/primary-cell.component';
import {YesNoCellComponent} from '../cells/yes-no-cell/yes-no-cell.component';

@Component({
  selector: 'app-admin-shop',
  templateUrl: './admin-shop.component.html',
  styleUrls: ['./admin-shop.component.css']
})
export class AdminShopComponent implements OnInit {

  services: ShopService[] = [];
  loading = false;
  user: DmfbUser;
  // @Input() searchKey: string;
  collectionPath = 'services';
  noItemsError = 'There are currently no services available';

  settings = {
    columns: {
      // sid: {
      //   title: 'SID',
      //   width: '200px',
      //   editable: false,
      // },
      // imagesUrl: {
      //   title: 'ImagesUrl'
      // },
      mainPhotoUrl: {
        title: 'Main Photo',
        type: 'custom',
        width: '100px',
        sort: false,
        filter: false,
        renderComponent: ImageCellComponent,
        onComponentInitFunction(instance) {
          instance.save.subscribe(row => {
            //
          });
        },
      },
      service: {
        title: 'Service',
        type: 'custom',
        renderComponent: PrimaryCellComponent,
        onComponentInitFunction(instance) {
          instance.save.subscribe(row => {
            //
          });
        },
      },
      // description: {
      //   title: 'Description'
      // },
      price: {
        title: 'Price',
        type: 'custom',
        width: '180px',
        renderComponent: PriceCellComponent,
        onComponentInitFunction(instance) {
          instance.save.subscribe(row => {
            //
          });
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
      // latestUpdateTimestamp: {
      //   title: 'LatestUpdateTimestamp',
      //   width: '180px',
      //   editable: false,
      //   type: 'custom',
      //   renderComponent: PrimaryCellComponent,
      //   onComponentInitFunction(instance) {
      //     instance.save.subscribe(row => {
      //       //
      //     });
      //   },
      // },
      // time: {
      //   title: 'Time',
      //   width: '180px',
      //   editable: false,
      //   type: 'custom',
      //   renderComponent: PrimaryCellComponent,
      //   onComponentInitFunction(instance) {
      //     instance.save.subscribe(row => {
      //       //
      //     });
      //   },
      // },
      // uid: {
      //   title: 'UserId'
      // },
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
    },
    // pager: {
    //   perPage: 2,
    // }
  };

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
    console.log('init here');
    this.crudService.getAllItems(this.collectionPath).subscribe((items) => {
      console.log(items);
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
      const newData = ShopService.defineUndefinedShopValues(event.newData);

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
            message: 'Successfully delete service, ' + event.data.service,
          });
        });
      },
      (err: any) => {
        // console.log('declined');
      }
    );
  }


}
