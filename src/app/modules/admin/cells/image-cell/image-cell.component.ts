import {Component, EventEmitter, Input, OnInit, Output, SecurityContext} from '@angular/core';
import {DmfbCrudService} from '../../../crud/services/dmfb-crud.service';
import {MdlSnackbarService} from '@angular-mdl/core';
import {ShopService} from '../../../../model/shop-service.model';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-image-cell',
  templateUrl: './image-cell.component.html',
  styleUrls: ['./image-cell.component.scss']
})
export class ImageCellComponent implements OnInit {

  @Input() value: any;
  @Input() rowData: any;
  componentValue: any;
  // formattedDate = '';
  collectionPath = 'services';

  @Output() save: EventEmitter<any> = new EventEmitter();

  constructor(
    public crudService: DmfbCrudService,
    private mdlSnackbarService: MdlSnackbarService,
    public domSanitizer: DomSanitizer,
  ) {
  }

  ngOnInit() {
    if (!this.value || this.value == null) {
      this.value = '';
    }

    this.componentValue = (this.value !== '')
      ? this.domSanitizer.sanitize(SecurityContext.STYLE, 'url(' + this.value + ')')
      : this.domSanitizer.sanitize(SecurityContext.STYLE, 'none');
    //
    // const formatter = new Intl.NumberFormat('en-US', {
    //   style: 'currency',
    //   currency: 'USD',
    // });
    //
    //
    // //   this.services[i].price = '<div class="mdl-textfield--align-right">' + formatter.format(+this.services[i].price) + '</div>';
    //
    // if (this.value && this.value.seconds) {
    //   this.formattedDate = new Date(this.value.seconds).toLocaleString();
    //   if (this.formattedDate === 'Invalid Date') {
    //     this.formattedDate = '';
    //   }
    // }
  }

  getValueType() {
    return typeof(this.componentValue).toLowerCase();
  }

  removeImage() {

    console.log('this.rowData', this.rowData);

    const context = this;

    context.rowData.mainPhotoUrl = '';
    context.value = '';
    context.componentValue = context.domSanitizer.sanitize(SecurityContext.STYLE, 'none');

    this.rowData.mainPhotoUrl = '';
    console.log('newData', this.rowData);

    this.rowData = ShopService.defineUndefinedShopValues(this.rowData);

    if (this.rowData.sid !== '') {
      console.log('this.collectionPath', this.collectionPath);
      console.log('this.rowData.sid', this.rowData.sid);
      console.log('this.rowData', this.rowData);
      this.crudService.updateItem(this.collectionPath, this.rowData.sid, this.rowData).subscribe((res) => {
        console.log('res', res);
        context.mdlSnackbarService.showSnackbar({
          message: 'Successfully removed image',
        });
      });
    }
  }
}
