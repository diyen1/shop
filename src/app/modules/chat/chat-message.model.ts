/*export class ChatMessage {
  $key?: string;
  email?: string;
  userName?: string;
  message?: string;
  timeSent?: Date = new Date();
}*/

import {generateFirebaseId} from '../../functions/generate-firebase-id';
import {DateManipulations} from './date-manipulations';

export class ChatMessage {
  id?: string;
  destination?: string;
  sender?: string;
  message?: string;
  imageUrl?: string;
  timestamp = DateManipulations.getTimeStamp();
  type = 'text';


  constructor(message: string = '', destination: string = '', sender: string = '', type: string = 'text') {
    this.type = type;
    this.id = generateFirebaseId();
    this.destination = destination;
    this.sender = sender;
    this.message = message;
    this.timestamp = DateManipulations.getTimeStamp();
  }
}
