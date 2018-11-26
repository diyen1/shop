import {Component, Input, OnInit} from '@angular/core';
import {ShopService} from '../model/shop-service.model';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss'],
})
export class ServiceComponent implements OnInit {

  @Input() service: ShopService;

  constructor() { }

  ngOnInit() {
  }

}
