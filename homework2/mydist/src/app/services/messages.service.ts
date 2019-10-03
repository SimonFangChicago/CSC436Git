import { Injectable } from '@angular/core';
import { Messages } from '../models/Messages';
import { Message } from '../models/Message';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  StoredMessages: Messages;

  constructor() { this.StoredMessages = {messages:[]};}


  initMessages():Array<Message>{


	this.StoredMessages.messages.push({ userID: "2019001", timestamp: "201910011920",text:"This dog is so funny!" });
	this.StoredMessages.messages.push({ userID: "2019002", timestamp: "201910011943",text:"Yep!Hahahahahha!" });
	this.StoredMessages.messages.push({ userID: "2019003", timestamp: "201910012020",text:"I am still watching it!" });

	return this.StoredMessages.messages;

  }
}
