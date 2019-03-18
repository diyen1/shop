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
  loading = false;
  loadingMore = false;
  isLastPage = false;
  @Input() user: DmfbUser;
  // @Input() searchKey: string;
  @Input() collectionPath = 'items';
  @Input() noItemsError = 'There are currently no items available';

  constructor(public crudService: DmfbCrudService) {
  }

  ngOnInit() {
    this.loading = true;
    this.crudService.getItems(this.collectionPath, this.lastItem).subscribe((items) => {
      console.log(items);
      this.crudService.services = [...this.crudService.services, ...items.data];

      this.loading = false;
      this.isLastPage = items.isLastPage;
      this.lastItem = items.lastItem;
      // this.offset = this.services[this.services.length - 1].id;
    });
  }

  onScroll() {
    if (!this.loadingMore) {
      this.loadingMore = true;
      console.log('onScroll this.isLastPage', this.isLastPage);
      console.log('scroll this.lastItem', this.lastItem);
      if (!this.isLastPage) {
        // this.offset += this.crudService.PER_PAGE;
        this.crudService.getItems(this.collectionPath, this.lastItem).subscribe((items) => {
          console.log('items.data', items.data);
          this.crudService.services = [...this.crudService.services, ...items.data];
          this.loadingMore = false;
          this.isLastPage = items.isLastPage;
          this.lastItem = items.lastItem;
        });
      } else {
        this.loadingMore = false;
      }
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

}
