import {Component, Input, OnInit} from '@angular/core';
import {ChatMessage} from '../chat-message.model';
import {AngularFireDatabase} from 'angularfire2/database';
import {User} from '../../../model/user.model';
import {ChatService} from '../services/chat.service';
import {MdlSnackbarService} from '@angular-mdl/core';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  @Input() chatMessage: ChatMessage;
  user: User;

  constructor(
    private  db: AngularFireDatabase,
    private  chatService: ChatService,
    private  mdlSnackbarService: MdlSnackbarService,
  ) {
    this.user = this.chatService.getUser();
  }

  ngOnInit() {
  }

  get isOwnMessage() {
    return (this.user && this.chatMessage && this.user.uid === this.chatMessage.sender);
  }

  get isValidMessage() {
    return (this.user && this.chatMessage
      && (
        this.chatService.currentChatUser.uid === this.chatMessage.sender
        || this.chatService.currentChatUser.uid === this.chatMessage.destination
      ));
  }

  getFormattedTime(date) {
    const dateArray = date.split('/');
    return dateArray[3] + ':' + dateArray[4];
  }

  deleteMessage(isOwner) {
    if (confirm('Are you sure you wan to delete this message?')) {
      this.chatService.deleteMessage(this.chatMessage, isOwner);
      this.mdlSnackbarService.showSnackbar({
        message: 'Message successfully deleted',
      });
    }
  }
}
