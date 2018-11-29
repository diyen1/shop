import {Injectable} from '@angular/core';
import * as firebase from 'firebase/app';
import {AngularFireAuth} from 'angularfire2/auth';
import {ChatMessage} from '../chat-message.model';
import {AngularFireDatabase} from 'angularfire2/database';
import {Observable} from 'rxjs';
import {DmfbUser} from '../../../model/dmfb-user';
import {AuthService} from '../../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  chatMessages: any;
  private user: any;
  initializedChatUserList = false;
  feed: any;
  chatUserList: any[] = [];

  private _currentChatUser: DmfbUser;

  set currentChatUser(user) {
    this._currentChatUser = user;

    for (let i = 0; i < this.chatUserList.length; i++) {
      if (user.uid === this.chatUserList[i].uid) {
        return;
      }
    }

    this.chatUserList.unshift(user);
  }

  get currentChatUser(): DmfbUser {
    return this._currentChatUser;
  }

  constructor(
    private  db: AngularFireDatabase,
    private  authService: AuthService,
  ) {
    this.user = this.authService.getAuthUser();
    /*this.afAuth.authState.subscribe(auth => {
      if (auth !== undefined && auth !== null) {
        this.getUserFromAuth(auth).subscribe((a: any) => {
          // this.username = a.displayName;
          this.user = a;
        });
      }
    });*/
  }

  getUser() {
    return this.user;
  }

  sendMessage(messageToSend: ChatMessage) {
    if (this._currentChatUser != null) {
      // const messageToSend: ChatMessage = new ChatMessage(msg, this._currentChatUser.uid, this.user.uid);
      this.chatMessages = this.getMessagesForUser(messageToSend.sender);
      this.chatMessages.push(messageToSend);
      this.chatMessages = this.getMessagesForUser(messageToSend.destination);
      this.chatMessages.push(messageToSend);
      console.log('send message', messageToSend);

      // Move user to the top of the list
      for (let i = 0; i < this.chatUserList.length; i++) {
        if (this.chatUserList[i].uid === messageToSend.destination) {
          /*delete this.chatUserList[i];
          this.chatUserList.unshift(this.chatUserList[i]);*/
          this.chatUserList[i].lastChatMessage = messageToSend;
          console.log('this.chatUserList', this.chatUserList);
          this.chatUserList.push(...this.chatUserList.splice(0, i));
          return;
        }
      }
    } else {
      console.log('failed to send message');
    }
  }

  getMessages(): any {
    // query to create our message feed binding

    let messages;
    const path = 'chats/' + this.user.uid;

    // messages = this.db.list(path, ref => ref.orderByKey());

    if (this._currentChatUser) {
      // messages = this.db.list(path, ref => ref.orderByChild('destination').equalTo(this._currentChatUser.uid));
      messages = this.db.list(path, ref => ref);
    } else {
      messages = this.db.list(path, ref => ref.orderByChild('destination').equalTo('none'));
    }
    return messages;
  }

  getMessagesForUser(userId): any {
    const path = 'chats/' + userId;
    return this.db.list(path, ref => ref);
  }


  initializeChatUserList() {

    const path = 'chats/' + this.user.uid;
    const tmpUserList = [];
    const tmpLastMessageList = [];

    // we are about to reinitialize
    this.initializedChatUserList = false;

    for (let i = 0; i < this.chatUserList.length; i++) {
      tmpUserList.push(this.chatUserList[i].uid);
      tmpLastMessageList.push(new ChatMessage());
    }

    const userListListener = this.db.list(path, ref => ref).valueChanges();

    // Hacky solution
    userListListener.subscribe((chats: ChatMessage[]) => {

      if (!this.initializedChatUserList) {
        let currentUserId;

        for (let i = chats.length - 1; i >= 0; i--) {
          if (chats[i].sender === this.user.uid) {
            currentUserId = chats[i].destination;
          } else {
            currentUserId = chats[i].sender;
          }

          const tmpIndex = tmpUserList.indexOf(currentUserId);

          if (tmpIndex === -1) {
            tmpUserList.push(currentUserId);
            tmpLastMessageList.push(chats[i]);
          }
          /*else {
            tmpLastMessageList[tmpIndex] = chats[i];
          }*/
        }

        if (tmpUserList.length > 0) {
          // this.chatUserList = [];
          for (let i = 0; i < tmpUserList.length; i++) {

            const tmpUserId = tmpUserList[i];
            this.authService.getUserFromAuth(tmpUserId).subscribe((user: DmfbUser) => {
              if (!this.userInChatUserList(tmpUserId)) {
                user.lastChatMessage = tmpLastMessageList[i];
                this.chatUserList.push(user);
              }
              if (i === 0) {
                this._currentChatUser = user;
                this.feed = this.getMessages().valueChanges();
              }
            });
          }
        }
        this.initializedChatUserList = true;
      }
    });
  }

  changeChat(chatUserId) {

    for (let i = 0; i < this.chatUserList.length; i++) {
      if (this.chatUserList[i].uid === chatUserId) {
        this._currentChatUser = this.chatUserList[i];
        return;
      }
    }
    const path = 'chats/' + chatUserId;
    this.feed = this.getMessages().valueChanges();
  }

  userInChatUserList(userId) {
    for (let i = 0; i < this.chatUserList.length; i++) {
      if (this.chatUserList[i].uid === userId) {
        return true;
      }
    }
    return false;
  }

  isValidMessage(chatMessage) {
    return (this.user && chatMessage
      && (
        this.currentChatUser.uid === chatMessage.sender
        || this.currentChatUser.uid === chatMessage.destination
      ));
  }
}
