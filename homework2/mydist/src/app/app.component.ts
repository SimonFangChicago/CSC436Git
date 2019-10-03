import { Component } from '@angular/core';
import { MessagesService } from './services/messages.service';
import { Messages } from './models/Messages';
import { Message } from './models/Message';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mydist';

  messages:Array<Message>;

  constructor(private messageService:MessagesService) {}

  ngOnInit() {
  	this.messages = this.messageService.initMessages();
  	console.log(this.messages);
  }
}
