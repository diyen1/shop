import {Injectable} from '@angular/core';
import * as firebase from 'firebase/app';
import {AngularFireAuth} from 'angularfire2/auth';
import {ChatMessage} from '../chat-message.model';
import {AngularFireDatabase} from 'angularfire2/database';
import {Observable} from 'rxjs';
import {ShopUser} from '../../../model/shop-user';
import {AuthService} from '../../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  chatMessages: any;
  chatMessage: ChatMessage;
  private user: any;
  username: Observable<string>;
  initializedChatUserList = false;

  feed: any;

  chatUserList: any[] = [
    /*{
      active: true,
      email: 'ace@yahoo.com',
      fcm_token: '',
      fullNames: 'Diyen Ace',
      id: 'NHpxjZmVMFQYLMFAjY9POMFmQAv1',
      lastSeen: 'November 18, 2018 at 9:21:23 PM UTC+1',
      sign_in_type: '',
      uid: 'NHpxjZmVMFQYLMFAjY9POMFmQAv1',
    }*/
  ];

  private _currentChatUser: ShopUser;

  set currentChatUser(user) {
    this._currentChatUser = user;

    for (let i = 0; i < this.chatUserList.length; i++) {
      if (user.uid === this.chatUserList[i].uid) {
        return;
      }
    }

    this.chatUserList.unshift(user);
  }

  get currentChatUser(): ShopUser {
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

  sendMessage(msg: string) {
    if (this._currentChatUser != null) {
      const messageToSend: ChatMessage = new ChatMessage(msg, this._currentChatUser.uid, this.user.uid);
      this.chatMessages = this.getMessagesForUser(messageToSend.sender);
      this.chatMessages.push(messageToSend);
      this.chatMessages = this.getMessagesForUser(messageToSend.destination);
      this.chatMessages.push(messageToSend);
      console.log('send message', messageToSend);
    } else {
      console.log('failed to send message');
    }
  }

  getMessages(): any {
    // query to create our message feed binding

    let messages;
    const path = 'chats/' + this.user.uid;

    // messages = this.db.list(path, ref => ref.orderByKey());

    console.log(path);

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

    // we are about to reinitialize
    this.initializedChatUserList = false;

    for (let i = 0; i < this.chatUserList.length; i++) {
      tmpUserList.push(this.chatUserList[i].uid);
    }

    const userListListener = this.db.list(path, ref => ref).valueChanges();

    // Hacky solution
    userListListener.subscribe((chats: ChatMessage[]) => {

      if (!this.initializedChatUserList) {
        let currentUserId;

        for (let i = 0; i < chats.length; i++) {
          if (chats[i].sender === this.user.uid) {
            currentUserId = chats[i].destination;
          } else {
            currentUserId = chats[i].sender;
          }

          if (tmpUserList.indexOf(currentUserId) === -1) {
            tmpUserList.push(currentUserId);
          }
        }

        if (tmpUserList.length > 0) {
          // this.chatUserList = [];
          for (let i = tmpUserList.length - 1; i >= 0; i--) {

            const tmpUserId = tmpUserList[i];

            console.log('tmpUserId', tmpUserId);
            this.authService.getUserFromAuth(tmpUserId).subscribe((user: ShopUser) => {
              console.log('user', user);
              if (!this.userInChatUserList(tmpUserId)) {
                this.chatUserList.push(user);
              }
              if (i === tmpUserList.length - 1) {
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

        // Move user to the top of the list
        // this.chatUserList.remove(this.chatUserList[i]); this.chatUserList.unshift(this.chatUserList[i]);
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
}
