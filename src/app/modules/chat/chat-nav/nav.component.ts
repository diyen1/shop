import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {ChatService} from '../services/chat.service';

@Component({
  selector: 'app-chat-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class ChatNavComponent implements OnInit {

  @Input() transparent = false;
  @Input() back = null;
  @Input() title;

  constructor(
    public router: Router,
    public chatService: ChatService,
  ) {
  }

  ngOnInit() {
  }

  get userName(): string {
    return (this.chatService.currentChatUser) ? this.chatService.currentChatUser.fullNames : '';
  }

  get profileImage(): string {
    return (this.chatService.currentChatUser) ? this.chatService.currentChatUser.profileImage : '';
  }

  goBack() {
    if (this.back && this.back != null) {
      const mobileWidth = (window.screen.width);
      if (mobileWidth >= 992 || this.chatService.blockToDisplay === 'master') {
        this.chatService.blockToDisplay = 'master';
        this.router.navigate([this.back]).then(() => {
          window.location.reload();
        });
      } else {
        this.chatService.blockToDisplay = 'master';
      }
    }
  }

  goHome() {
    this.router.navigate(['shop']);
  }

  goCategories() {
    this.router.navigate(['categories']);
  }
}
