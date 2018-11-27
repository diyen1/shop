import {Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {ChatService} from '../services/chat.service';

@Component({
  selector: 'app-chat-feed',
  templateUrl: './chat-feed.component.html',
  styleUrls: ['./chat-feed.component.scss']
})
export class ChatFeedComponent implements OnInit, OnChanges {

  feed: any = [];
  currentMessageDate = '';
  @ViewChild('chatScroller') private myScrollContainer: ElementRef;

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

    let newIndex = -1;

    for (let i = 0; i < this.feed.length; i++) {
      if (this.feed[i].id === message.id) {
        newIndex = i;
      }
    }

    let date = this.feed[newIndex].timestamp;
    let dateArray = date.split('/');
    const heading = dateArray[0] + '/' + dateArray[1] + '/' + dateArray[2];

    if (newIndex > 0) {
      date = this.feed[newIndex - 1].timestamp;
      dateArray = date.split('/');
      const lastHeading = dateArray[0] + '/' + dateArray[1] + '/' + dateArray[2];

      if (lastHeading !== heading) {
        this.currentMessageDate = heading;
        this.scrollToBottom();
        return heading;
      } else {
        this.scrollToBottom();
        return '';
      }
    } else {
      this.scrollToBottom();
      return heading;
    }
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }

}
