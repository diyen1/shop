import { Component, OnInit } from '@angular/core';
import {AppService} from '../angular-services/app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private appService: AppService) { }

  ngOnInit() {
    this.appService.pageTitle = 'Home';
  }

}
