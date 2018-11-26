import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ChatService} from '../services/chat.service';

@Component({
  selector: 'app-chat-feed',
  templateUrl: './chat-feed.component.html',
  styleUrls: ['./chat-feed.component.css']
})
export class ChatFeedComponent implements OnInit, OnChanges {

  feed: any = [];
  currentMessageDate = '';

  constructor(public chatService: ChatService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  getDateHeading(message, index) {
    let shouldPushNewValue = true;

    for (let i = 0; i < this.feed.length; i++) {
      if (this.feed[i].id === message.id) {
        shouldPushNewValue = false;
      }
    }

    if (shouldPushNewValue) {
      this.feed.push(message);
    }

    let date = this.feed[index].timestamp;
    let dateArray = date.split('/');
    const heading = dateArray[0] + '/' + dateArray[1] + '/' + dateArray[2];

    if (index > 0) {
      date = this.feed[index - 1].timestamp;
      dateArray = date.split('/');
      const lastHeading = dateArray[0] + '/' + dateArray[1] + '/' + dateArray[2];

      if (lastHeading !== heading) {
        this.currentMessageDate = heading;
        return heading;
      } else {
        return '';
      }
    } else {
      return heading;
    }
  }

}
