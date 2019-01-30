import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as firebase from 'firebase';
import firestore from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  ref = firebase.firestore().collection('users');

  constructor() {

  }

  getUsers(): Observable<any> {
    return new Observable((observer) => {
      this.ref.onSnapshot((querySnapshot) => {
        const services = [];
        querySnapshot.forEach((doc: any) => {
          const data = doc.data();
          services.push({
            active: data.active,
            email: data.email,
            fcm_token: data.fcm_token,
            fullNames: data.fullNames,
            lastSeen: data.lastSeen,
            sign_in_type: data.sign_in_type,
            city: data.city,
            country: data.country,
            homePhone: data.homePhone,
            mobilePhone: data.mobilePhone,
            profileImage: data.profileImage,
            uid: data.uid,
          });
        });
        observer.next(services);
      });
    });
  }

  getUser(id: string): Observable<any> {
    return new Observable((observer) => {
      this.ref.doc(id).get().then((doc: any) => {
        const data = doc.data();
        observer.next({
          active: data.active,
          email: data.email,
          fcm_token: data.fcm_token,
          fullNames: data.fullNames,
          lastSeen: data.lastSeen,
          sign_in_type: data.sign_in_type,
          city: data.city,
          country: data.country,
          homePhone: data.homePhone,
          mobilePhone: data.mobilePhone,
          profileImage: data.profileImage,
          uid: data.uid,
        });
      });
    });
  }

  postUser(data): Observable<any> {
    return new Observable((observer) => {
      this.ref.add(data).then((doc) => {
        observer.next({
          key: doc.id,
        });
      });
    });
  }

  updateUser(id: string, data): Observable<any> {
    return new Observable((observer) => {
      this.ref.doc(id).set(data).then(() => {
        observer.next();
      });
    });
  }

  deleteUser(id: string): Observable<{}> {
    return new Observable((observer) => {
      this.ref.doc(id).delete().then(() => {
        observer.next();
      });
    });
  }
}
