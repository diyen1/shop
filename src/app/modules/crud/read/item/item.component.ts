import {Component, Input, OnInit} from '@angular/core';
import {ShopService} from '../../../../model/shop-service.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit {

  @Input() service: ShopService;

  constructor(public router: Router) { }

  ngOnInit() {
  }

}
