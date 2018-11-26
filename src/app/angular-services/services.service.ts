import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import * as firebase from 'firebase';
import firestore from 'firebase/firestore';
import {ShopService} from '../model/shop-service.model';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  ref = firebase.firestore().collection('services');
  searchKey = '';
  services: ShopService[];
  loading = false;

  constructor() {
   this.initializeServicesList();
  }

  initializeServicesList() {
    this.getServices().subscribe((data: ShopService[]) => {
        console.log('success', data);
        this.services = data;
        this.loading = false;
      },
      (error) => {
        console.log('error', error);
        this.loading = false;
      });
  }

  getServices(): Observable<any> {

    this.loading = true;

    let ref: any = firebase.firestore().collection('services');

    console.log('searching ...', this.searchKey);

    if (this.searchKey && this.searchKey !== '') {
      ref = firebase.firestore().collection('services').where('service', '==', this.searchKey);
    }

    return new Observable((observer) => {
      ref.onSnapshot((querySnapshot) => {
        const services = [];
        querySnapshot.forEach((doc: any) => {
          const data = doc.data();
          services.push({
            id: doc.id,
            imageUrl: data.imageUrl,
            latestUpdateTimestamp: data.latestUpdateTimestamp,
            price: data.price,
            sid: data.sid,
            time: data.time,
            uid: data.uid,
            description: data.description,
            service: data.service,
            mainPhotoUrl: data.mainPhotoUrl,
          });
        });
        observer.next(services);
      });
    });
  }

  getService(id: string): Observable<any> {
    return new Observable((observer) => {
      this.ref.doc(id).get().then((doc: any) => {
        const data = doc.data();
        observer.next({
          id: doc.id,
          imageUrl: data.imageUrl,
          latestUpdateTimestamp: data.latestUpdateTimestamp,
          price: data.price,
          sid: data.sid,
          time: data.time,
          uid: data.uid,
          service: data.service,
          description: data.description,
          mainPhotoUrl: data.mainPhotoUrl,
        });
      });
    });
  }

  postService(data): Observable<any> {
    return new Observable((observer) => {
      this.ref.add(data).then((doc) => {
        observer.next(doc.id);
      });
    });
  }

  updateService(id: string, data): Observable<any> {
    return new Observable((observer) => {
      this.ref.doc(id).set(data).then(() => {
        observer.next();
      });
    });
  }

  deleteService(id: string): Observable<{}> {
    return new Observable((observer) => {
      this.ref.doc(id).delete().then(() => {
        observer.next();
      });
    });
  }
}
