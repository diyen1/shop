import { Component, OnInit } from '@angular/core';
import {ChatService} from '../services/chat.service';
import {ChatMessage} from '../chat-message.model';

@Component({
  selector: 'app-chat-form',
  templateUrl: './chat-form.component.html',
  styleUrls: ['./chat-form.component.scss']
})
export class ChatFormComponent implements OnInit {

  message: string;
  imageMessage: string;

  constructor(private chat: ChatService) { }

  ngOnInit() {
  }

  send() {
    let messageToSend: ChatMessage;
    if (this.imageMessage && this.imageMessage != null && this.imageMessage.trim() !== '') {
      messageToSend = new ChatMessage(this.imageMessage, this.chat.currentChatUser.uid, this.chat.getUser().uid, 'image');
      this.chat.sendMessage(messageToSend);
      this.clearFields();
    } else if (this.message && this.message != null && this.message.trim() !== '') {
      messageToSend = new ChatMessage(this.message, this.chat.currentChatUser.uid, this.chat.getUser().uid, 'text');
      this.chat.sendMessage(messageToSend);
      this.clearFields();
    }
  }

  handleSubmit(event) {
    if (event.keyCode === 13) {
      this.send();
    }
  }

  clearFields() {
    this.message = '';
    this.imageMessage = '';
  }

}
