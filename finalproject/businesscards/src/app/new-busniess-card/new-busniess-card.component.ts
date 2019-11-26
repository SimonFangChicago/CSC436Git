import { Component, OnInit } from '@angular/core';

import {BusinessCardService} from '../services/business-card.service';
import {BusniessCardModel} from '../model/busniess-card-model';
import { Router } from  "@angular/router";

@Component({
  selector: 'app-new-busniess-card',
  templateUrl: './new-busniess-card.component.html',
  styleUrls: ['./new-busniess-card.component.css']
})
export class NewBusniessCardComponent implements OnInit {

  constructor(private cardsService:BusinessCardService,private router:Router) { }

  private myCard:BusniessCardModel;

  ngOnInit() {
      this.myCard = this.cardsService.getTobeEditedCard();
  }

  addNew(userFirstName,userLastName, userEmail, userPhoneNumber,userAdditionalInfo){

    if(this.isNewCard())
    {

        var newCard = {
          firstName:userFirstName,
          lastName:userLastName,
          email: userEmail,
          phoneNumber: userPhoneNumber,
          additionalInfo: userAdditionalInfo
        }

        this.cardsService.add(newCard);
    }
    else{
        this.myCard.firstName = userFirstName;
        this.myCard.lastName = userLastName;
        this.myCard.email = userEmail;
        this.myCard.phoneNumber = userPhoneNumber;
        this.myCard.additionalInfo = userAdditionalInfo;

        this.cardsService.update(this.myCard.id,this.myCard);
    }

  	this.router.navigate(['busniessCards']);
  }

  isNewCard()
  {
      return this.myCard.firstName === '';
  }

}
