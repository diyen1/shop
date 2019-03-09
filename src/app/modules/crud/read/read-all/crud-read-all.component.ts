import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ShopService} from '../../../../model/shop-service.model';
import {DmfbUser} from '../../../../model/dmfb-user';
import {DmfbCrudService} from '../../services/dmfb-crud.service';

@Component({
  selector: 'app-crud-read-all',
  templateUrl: './crud-read-all.component.html',
  styleUrls: ['./crud-read-all.component.scss']
})
export class CrudReadAllComponent implements OnInit, OnChanges {

  lastItem = null;
  services: ShopService[] = [];
  loading = false;
  isLastPage = false;
  @Input() user: DmfbUser;
  // @Input() searchKey: string;
  @Input() collectionPath = 'items';
  @Input() noItemsError = 'There are currently no items available';

  constructor(public crudService: DmfbCrudService) {
  }

  ngOnInit() {
    this.loading = true;
    console.log('init');
    this.crudService.getItems(this.collectionPath, this.lastItem).subscribe((items) => {
      console.log(items);
      this.services = [...this.services, ...items.data];

      // const formatter = new Intl.NumberFormat('en-US', {
      //   style: 'currency',
      //   currency: 'USD',
      // });
      //
      // for (let i = 0; i < this.services.length; i++) {
      //   this.services[i].latestUpdateTimestamp = new Date(this.services[i].latestUpdateTimestamp.seconds).toLocaleString();
      //   this.services[i].time = new Date(this.services[i].time.seconds).toLocaleString();
      //   this.services[i].price = '<div class="mdl-textfield--align-right">' + formatter.format(+this.services[i].price) + '</div>';
      // }

      this.loading = false;
      this.isLastPage = items.isLastPage;
      this.lastItem = items.lastItem;
      // this.offset = this.services[this.services.length - 1].id;
    });
  }

  onScroll() {
    this.loading = true;
    console.log('onScroll this.isLastPage', this.isLastPage);
    console.log('scrool this.lastItem', this.lastItem);
    if (!this.isLastPage) {
      // this.offset += this.crudService.PER_PAGE;
      this.crudService.getItems(this.collectionPath, this.lastItem).subscribe((items) => {
        this.services = [...this.services, ...items.data];
        this.loading = false;
        this.isLastPage = items.isLastPage;
        this.lastItem = items.lastItem;
      });
    } else {
      this.loading = false;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

}
