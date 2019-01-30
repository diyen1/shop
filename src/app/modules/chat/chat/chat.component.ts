import {Component, OnInit} from '@angular/core';
import {AppService} from '../../../angular-services/app.service';
import {AuthService} from '../../auth/services/auth.service';
import {Router} from '@angular/router';
import {ChatService} from '../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  constructor(
    public appService: AppService,
    public authService: AuthService,
    private router: Router,
    public chatService: ChatService,
  ) {
  }

  ngOnInit() {
    if (!this.authService.isLoggedIn) {
      this.router.navigate(['login']).then(() => {
        window.location.reload();
      });
    }
    this.appService.pageTitle = 'Chat';
    // this.chatService.postMessage({'key': 'hey'});
  }

}
