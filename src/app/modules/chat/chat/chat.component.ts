import { Component, OnInit } from '@angular/core';
import {AppService} from '../../../angular-services/app.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  constructor(public appService: AppService) { }

  ngOnInit() {
    this.appService.pageTitle = 'Chat';
    // this.chatService.postMessage({'key': 'hey'});
  }

}
