import {Injectable} from '@angular/core';
import * as firebase from 'firebase/app';
import {AngularFireAuth} from 'angularfire2/auth';
import {ChatMessage} from '../chat-message.model';
import {AngularFireDatabase} from 'angularfire2/database';
import {Observable, of} from 'rxjs';
import {DmfbUser} from '../../../model/dmfb-user';
import {AuthService} from '../../auth/services/auth.service';
import {database} from 'firebase';
import {User} from '../../../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  chatMessages: any;
  private user: any;
  initializedChatUserList = false;
  feed: any;
  chatUserList: any[] = [];
  blockToDisplay = 'master'; // master or detail
  messageList;

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

  initializeTheDisplayBlock() {
    this.blockToDisplay = window.innerWidth >= 992 ? 'detail' : 'master';
  }

  getUser() {
    return this.user;
  }

  sendMessage(messageToSend: ChatMessage) {
    if (this._currentChatUser != null) {
      // const messageToSend: ChatMessage = new ChatMessage(msg, this._currentChatUser.uid, this.user.uid);
      this.chatMessages = this.getMessagesForUser(messageToSend.sender, messageToSend.destination);
      this.chatMessages.push(messageToSend).then((createdMessage) => {
        const newMessage = messageToSend;
        newMessage.id = createdMessage.key;
        const newPath = 'chat/' + messageToSend.sender + '/' + messageToSend.destination + '/' + createdMessage.key;
        this.db.database.ref(newPath).set(newMessage);
      });
      this.chatMessages = this.getMessagesForUser(messageToSend.destination, messageToSend.sender);
      this.chatMessages.push(messageToSend).then((createdMessage) => {
        const newMessage = messageToSend;
        newMessage.id = createdMessage.key;
        const newPath = 'chat/' + messageToSend.destination + '/' + messageToSend.sender + '/' + createdMessage.key;
        this.db.database.ref(newPath).set(newMessage);
      });
      console.log('send message', messageToSend);

      // last message
      let path = 'last-message/' + messageToSend.sender + '/' + messageToSend.destination;
      this.db.database.ref(path).set(messageToSend);
      path = 'last-message/' + messageToSend.destination + '/' + messageToSend.sender;
      this.db.database.ref(path).set(messageToSend);

      // Move user to the top of the list
      for (let i = 0; i < this.chatUserList.length; i++) {
        if (this.chatUserList[i].uid === messageToSend.destination) {
          /*delete this.chatUserList[i];
          this.chatUserList.unshift(this.chatUserList[i]);*/
          this.chatUserList[i].lastChatMessage = messageToSend;
          this.chatUserList.push(...this.chatUserList.splice(0, i));
          return;
        }
      }
    } else {
      console.log('failed to send message');
    }
  }

  deleteMessage(message: ChatMessage, isOwner = false) {
    if (this._currentChatUser != null) {

      let pathMiddle = message.sender + '/' + message.destination;

      if (!isOwner) {
        pathMiddle = message.destination + '/' + message.sender;
      }

      const path = 'chat/' + pathMiddle + '/' + message.id;

      this.db.object(path).remove().then((senderRes) => {
        // console.log('senderRes', senderRes);

        let lastMessage = null;

        // last message
        this.updateLastMessage(pathMiddle).subscribe((res) => {
          lastMessage = res;

          // Move user to the top of the list
          for (let i = 0; i < this.chatUserList.length; i++) {
            if (this.chatUserList[i].uid === lastMessage.destination) {
              /*delete this.chatUserList[i];
              this.chatUserList.unshift(this.chatUserList[i]);*/
              this.chatUserList[i].lastChatMessage = lastMessage;
              // this.chatUserList.push(...this.chatUserList.splice(0, i));
              this.sortUsers();
              break;
            }
          }
        });
      });
    } else {
      console.log('failed to send message');
    }
  }

  deleteChatList(user: DmfbUser) {
    if (this._currentChatUser != null) {

      const path = 'chat/' + this.user.uid + '/' + user.uid;

      console.log(path);

      this.db.list(path).remove().then((senderRes) => {
        // last message
        this.updateLastMessage(this._currentChatUser.uid + '/' + user.uid).subscribe((res) => {
          // Move user to the top of the list
          for (let i = 0; i < this.chatUserList.length; i++) {
            if (this.chatUserList[i].uid === user.uid) {
              this.chatUserList.splice(i, 1);
              this.sortUsers();
              break;
            }
          }

          this._currentChatUser = this.chatUserList[0];
          this.changeChat(this._currentChatUser.uid);
        });
      });
    } else {
      console.log('failed to send message');
    }
  }

  private updateLastMessage(pathEnd): Observable<any> {
    // messages = this.db.list(path, ref => ref.orderByChild('destination').equalTo(this._currentChatUser.uid));
    return new Observable((observer) => {
      this.db.list('chat/' + pathEnd, ref => ref).valueChanges().subscribe(
        (messages) => {
          if (messages.length > 0) {
            const lastMessage = messages[messages.length - 1];
            this.db.database.ref('last-message/' + pathEnd).set(lastMessage).then(() => {
              observer.next(lastMessage);
              observer.complete();
            });
          } else {
            this.db.database.ref('last-message/' + pathEnd).remove().then(() => {
              observer.next(null);
              observer.complete();
            });
          }
        },
        (error) => {

        });
    });

  }

  getMessages(): any {
    // query to create our message feed binding

    let messages;

    // messages = this.db.list(path, ref => ref.orderByKey());

    if (this._currentChatUser) {
      const path = 'chat/' + this.user.uid + '/' + this._currentChatUser.uid;
      // messages = this.db.list(path, ref => ref.orderByChild('destination').equalTo(this._currentChatUser.uid));
      messages = this.db.list(path, ref => ref);

      return messages;
    } else {
      alert('Big error');
    }

    return null;
  }

  getMessagesForUser(sender, destination): any {
    const path = 'chat/' + sender + '/' + destination;
    return this.db.list(path, ref => ref);
  }


  initializeChatUserList() {
    if (this.user && this.user != null && this.user.uid) {
      const path = 'chat/' + this.user.uid;
      const tmpUserList = [];
      const tmpLastMessageList = [];

      // we are about to reinitialize
      this.initializedChatUserList = false;

      for (let i = 0; i < this.chatUserList.length; i++) {
        tmpUserList.push(this.chatUserList[i].uid);
        tmpLastMessageList.push(new ChatMessage());
      }

      this.messageList = this.db.list(path, ref => ref);

      const userListListener = this.messageList.valueChanges();

      // Hacky solution
      userListListener.subscribe((chats: any) => {

        if (!this.initializedChatUserList) {

          let currentUserId;

          for (let i = chats.length - 1; i >= 0; i--) {
            const chat = Object.keys(chats[i]).map(function (key) {
              return [key, chats[i][key]];
            });

            const lastMessage = chat[chat.length - 1][1];

            if (lastMessage.sender === this.user.uid) {
              currentUserId = lastMessage.destination;
            } else {
              currentUserId = lastMessage.sender;
            }

            const tmpIndex = tmpUserList.indexOf(currentUserId);

            if (tmpIndex === -1) {
              tmpUserList.push(currentUserId);
              tmpLastMessageList.push(lastMessage);
            }
          }

          console.log('tmpUserList', tmpUserList);


          //
          // for (let i = chats.length - 1; i >= 0; i--) {
          //   if (chats[i].sender === this.user.uid) {
          //     currentUserId = chats[i].destination;
          //   } else {
          //     currentUserId = chats[i].sender;
          //   }
          //
          //   const tmpIndex = tmpUserList.indexOf(currentUserId);
          //
          //   if (tmpIndex === -1) {
          //     tmpUserList.push(currentUserId);
          //     tmpLastMessageList.push(chats[i]);
          //   }
          //   /*else {
          //     tmpLastMessageList[tmpIndex] = chats[i];
          //   }*/
          // }

          if (tmpUserList.length > 0) {
            // this.chatUserList = [];
            for (let i = 0; i < tmpUserList.length; i++) {

              const tmpUserId = tmpUserList[i];
              this.authService.getUserFromAuth(tmpUserId).subscribe((user: DmfbUser) => {
                if (!this.userInChatUserList(tmpUserId)) {
                  user.lastChatMessage = tmpLastMessageList[i];
                  this.chatUserList.push(user);
                }
                this.sortUsers();
                if (this.chatUserList.length > 0) {
                  // if (i === 0) {
                  // this._currentChatUser = user;
                  this._currentChatUser = this.chatUserList[0];
                  this.initializeTheDisplayBlock();
                  this.feed = this.getMessages().valueChanges();
                }
              });
            }
          }
          this.initializedChatUserList = true;
        }
      });
    }
  }

  private sortUsers() {
    this.chatUserList.sort((a, b) => (a.lastChatMessage && b.lastChatMessage)
      ? (a.lastChatMessage.timestamp < b.lastChatMessage.timestamp) ? 1
        : ((b.lastChatMessage.timestamp < a.lastChatMessage.timestamp) ? -1 : 0)
      : 1);
  }

  changeChat(chatUserId) {
    this.blockToDisplay = 'detail';
    for (let i = 0; i < this.chatUserList.length; i++) {
      if (this.chatUserList[i].uid === chatUserId) {
        this._currentChatUser = this.chatUserList[i];
        this.feed = this.getMessages().valueChanges();
        return;
      }
    }
    // const path = 'chat/' + chatUserId;
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
