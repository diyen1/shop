import {Injectable} from '@angular/core';
import * as firebase from 'firebase/app';
import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFireDatabase} from 'angularfire2/database';
import {Observable, of} from 'rxjs';
import {DmfbUser} from '../../../model/dmfb-user';
import {AuthService} from '../../auth/services/auth.service';
import {database} from 'firebase';
import {User} from '../../../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  chatMessages: any;
  private user: any;
  initializedChatUserList = false;
  feed: any;
  chatUserList: any[] = [];
  blockToDisplay = 'master'; // master or detail
  messageList;
  initializingMessages = true;

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
  }
}
