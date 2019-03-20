import {firestore} from 'firebase';

export class ShopService {
  sid: string;
  imagesUrl: string[];
  description: string;
  latestUpdateTimestamp: any;
  mainPhotoUrl: string;
  price: string;
  time: any;
  uid: string;
  service: string;
  reported = false;

  public static defineUndefinedShopValues(data) {
    data.description = (data.description) ? data.description : null;
    data.imagesUrl = (data.imagesUrl) ? data.imagesUrl : null;
    data.latestUpdateTimestamp = firestore.FieldValue.serverTimestamp();
    data.mainPhotoUrl = (data.mainPhotoUrl) ? data.mainPhotoUrl : null;
    data.price = (data.price) ? data.price : null;
    data.service = (data.service) ? data.service : null;
    data.sid = (data.sid) ? data.sid : null;
    data.time = (data.time) ? data.time : null;
    data.uid = (data.uid) ? data.uid : null;
    return data;
  }

  public static isUserItem(service, user) {
    return !!(service.uid === user.uid);
  }
}
