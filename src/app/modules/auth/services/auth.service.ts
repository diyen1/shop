import {Injectable, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AngularFireAuth} from 'angularfire2/auth';
import {AngularFireDatabase} from 'angularfire2/database';
import * as firebase from 'firebase/app';
import {Observable} from 'rxjs';
import {DmfbUser} from '../../../model/dmfb-user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _user: Observable<firebase.User>;
  private authState: any;
  userRef = firebase.firestore().collection('users');

  constructor(private afAuth: AngularFireAuth,
              private db: AngularFireDatabase,
              private router: Router,
  ) {

    this._user = this.afAuth.authState;
    this._user.subscribe((auth) => {
      if (auth !== undefined && auth !== null) {
        this.getUserFromAuth(auth.uid).subscribe((authUser) => {
          if (authUser !== undefined && authUser !== null) {
            this.authState = authUser;
            this.saveAuthUser();
          }
        });
      }
    });
  }

  getAuthUser(): any {
    return (this.authState && this.authState != null) ? this.authState : JSON.parse(localStorage.getItem('shop_auth_state'));
  }

  saveAuthUser(): void {
    localStorage.setItem('shop_auth_state', JSON.stringify(this.authState));
  }

  clearAuthUser(): void {
    this.authState = null;
    localStorage.removeItem('shop_auth_state');
  }

  /* isLoggedIn() {
     return (this.user != null);
   }*/

  get isLoggedIn() {
    return this.getAuthUser() != null;
  }

  get currentUserId(): string {
    const authUser = this.getAuthUser();
    return authUser !== null ? authUser.uid : '';
  }

  getUserFromAuth(authId) {
    /*const userId = auth.uid;
    const path = `/users/${userId}`;
    return this.db.object(path).valueChanges();*/

    const userRef = firebase.firestore().collection('users');

    return new Observable((observer) => {
      userRef.doc(authId).get().then((doc: any) => {
        const data = doc.data();
        if (data && data != null) {
          observer.next({
            id: doc.id,
            active: data.active,
            email: data.email,
            fcm_token: data.fcm_token,
            fullNames: data.fullNames,
            lastSeen: data.lastSeen,
            sign_in_type: data.sign_in_type,
            uid: data.uid,
            city: data.city,
            country: data.country,
            homePhone: data.homePhone,
            mobilePhone: data.mobilePhone,
            profileImage: data.profileImage,
          });
        } else {
          observer.error({'message': 'failed to fetch user' });
        }
        observer.complete();
      });
    });
  }

  getUserFromAuthEmail(authEmail, authUid) {
    /*const userId = auth.uid;
    const path = `/users/${userId}`;
    return this.db.object(path).valueChanges();*/

    const userRef = firebase.firestore().collection('users');

    return new Observable((observer) => {
      userRef.where('email', '==', authEmail).get().then((querySnapshot: any) => {
        if (querySnapshot.size > 0) {
          querySnapshot.forEach((doc: any) => {
            const data = doc.data();
            console.log('success', data);
            const user = {
              id: doc.id,
              active: data.active,
              email: data.email,
              fcm_token: data.fcm_token,
              fullNames: data.fullNames,
              lastSeen: data.lastSeen,
              sign_in_type: data.sign_in_type,
              uid: data.uid,
              city: data.city,
              country: data.country,
              homePhone: data.homePhone,
              mobilePhone: data.mobilePhone,
              profileImage: data.profileImage,
            };
            observer.next(user);
            observer.complete();
          });
        } else {
          console.log('failure');
          const user = new DmfbUser();
          user.email = authEmail;
          user.sign_in_type = 'google';
          user.uid = authUid;
          user.active = false;
          observer.next(user);
          observer.complete();
        }
      }).catch((error) => {
        const user = new DmfbUser();
        user.email = authEmail;
        user.sign_in_type = 'google';
        user.uid = authUid;
        user.active = false;
        observer.next(user);
        observer.complete();
      });
    });
  }

  login(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.setUpLoginAuth(user.user);
      });
  }

  loginFb() {
    return this.afAuth.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
      .then((user) => {
        this.setUpLoginAuth(user.user);
      });
  }

  loginGoogle() {
    return this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((user) => {
        this.setUpLoginAuth(user.user);
      });
  }

  setUpLoginAuth(user) {
    console.log('settng up user', user);
    this.getUserFromAuthEmail(user.email, user.uid).subscribe((authUser: DmfbUser) => {
      if (authUser !== undefined && authUser !== null) {
        this.authState = authUser;
        // this.setUserStatus('online');
        this.saveAuthUser();
        if (authUser.active) {
          this.router.navigate(['shop']).then(() => {
            window.location.reload();
          });
        } else {
          this.router.navigate(['profile']).then(() => {
            window.location.reload();
          });
        }
      }
    });
  }

  logout() {
    this.clearAuthUser();
    this.afAuth.auth.signOut();
    this.router.navigate(['login']);
  }

  signUp(data) {
    return this.afAuth.auth.createUserWithEmailAndPassword(data.email, data.password)
      .then((user) => {
        delete data.password;
        this.authState = user.user;
        const status = 'online';
        this.setUserData(data, status);
        this.saveAuthUser();
      }).catch(error => console.log(error));
  }

  setUserData(data, status?: string) {

    const currentUserId = this.currentUserId;

    data.active = true;
    data.id = currentUserId;
    data.uid = currentUserId;
    data.lastSeen = new Date();
    data.sign_in_type = '';

    this.authState = data;
    this.saveAuthUser();

    // save to firestore
    const newDocRef = firebase.firestore().collection('users').doc(currentUserId);
    newDocRef.set(data).then((newDoc) => {
    }).catch(error => console.log(error));

    // save to realtime db

    const path = `users/${currentUserId}`;

    return this.db.object(path).update(data)
      .catch(error => console.log(error));
  }

  setUserStatus(status: string): void {
    // const path = `users/${this.currentUserId}`;

    const data = {
      status: status
    };

    /*this.userRef.update(data).then((doc) => {
      console.log(doc.id);
    });

    this.db.object(path).update(data)
      .catch(error => console.log(error));*/

    this.userRef.doc(this.currentUserId).set(data).then((doc) => {
      console.log(doc);
    }).catch(error => console.log(error));
  }
}
