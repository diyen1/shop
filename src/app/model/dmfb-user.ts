import {ChatMessage} from '../modules/chat/chat-message.model';

export class DmfbUser {
  id: string;
  active = false;
  userType = 'CUSTOMER';
  email = '';
  fcm_token = '';
  fullNames = '';
  lastSeen = 0;
  sign_in_type = '';
  uid = '';
  state = '';
  city = '';
  country = '';
  services = '';
  homePhone = '';
  mobilePhone = '';
  profileImage = '';
  lastChatMessage: ChatMessage = new ChatMessage();
  reported = false;

  constructor(active?: boolean, userType?: string, email?: string, fcm_token?: string, fullNames?: string, lastSeen?: number, sign_in_type?: string,
              uid?: string, city?: string, country?: string, homePhone?: string, mobilePhone?: string,
              profileImage?: string, lastChatMessage?: ChatMessage, reported?: boolean) {
    this.active = active;
    this.userType = userType;
    this.email = email;
    this.fcm_token = fcm_token;
    this.fullNames = fullNames;
    this.lastSeen = lastSeen;
    this.sign_in_type = sign_in_type;
    this.uid = uid;
    this.city = city;
    this.country = country;
    this.homePhone = homePhone;
    this.mobilePhone = mobilePhone;
    this.profileImage = profileImage;
    this.lastChatMessage = lastChatMessage;
    this.reported = reported;
  }

  public static defineUndefinedUserValues(data) {
    data.active = (data.active) ? data.active : false;
    data.city = (data.city) ? data.city : null;
    data.country = (data.country) ? data.country : null;
    // data.latestUpdateTimestamp = firestore.FieldValue.serverTimestamp();
    data.email = (data.email) ? data.email : null;
    data.fcm_token = (data.fcm_token) ? data.fcm_token : null;
    data.fullNames = (data.fullNames) ? data.fullNames : null;
    data.homePhone = (data.homePhone) ? data.homePhone : null;
    data.mobilePhone = (data.mobilePhone) ? data.mobilePhone : null;
    data.profileImage = (data.profileImage) ? data.profileImage : null;
    data.reported = (data.reported) ? data.reported : false;
    data.lastSeen = (data.lastSeen) ? data.lastSeen : null;
    data.sign_in_type = (data.sign_in_type) ? data.sign_in_type : null;
    data.uid = (data.uid) ? data.uid : null;
    data.userType = (data.userType) ? data.userType : 'CUSTOMER';
    return data;
  }
}
