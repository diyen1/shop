import {Component, Input, OnInit} from '@angular/core';
import {ChatService} from '../services/chat.service';
import {ShopUser} from '../../../model/shop-user';

@Component({
  selector: 'app-chat-user',
  templateUrl: './chat-user.component.html',
  styleUrls: ['./chat-user.component.scss']
})
export class ChatUserComponent implements OnInit {

  @Input() user: ShopUser;

  constructor(public chatService: ChatService) {
  }

  ngOnInit() {
  }

  get activeClass(): string {
    let classString = 'chat-user-wrapper';
    classString += this.userIsActive() ? ' active' : '';
    return classString;
  }

  userIsActive(): boolean {
    return !!(this.chatService.currentChatUser != null && this.user != null && this.chatService.currentChatUser.uid === this.user.uid);
  }
}
