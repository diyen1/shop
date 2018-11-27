import {ChatMessage} from '../modules/chat/chat-message.model';

export class ShopUser {
  active = false;
  email = '';
  fcm_token = '';
  fullNames = '';
  lastSeen = 0;
  sign_in_type = '';
  uid = '';
  city = '';
  country = '';
  homePhone = '';
  mobilePhone = '';
  profileImage = '';
  lastChatMessage: ChatMessage = new ChatMessage();

  constructor(active?: boolean, email?: string, fcm_token?: string, fullNames?: string, lastSeen?: number, sign_in_type?: string,
              uid?: string, city?: string, country?: string, homePhone?: string, mobilePhone?: string,
              profileImage?: string, lastChatMessage?: ChatMessage) {
    this.active = active;
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
  }
}
