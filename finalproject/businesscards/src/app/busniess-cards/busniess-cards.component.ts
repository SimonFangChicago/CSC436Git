import { Component, OnInit } from '@angular/core';
import {BusniessCardModel} from '../model/busniess-card-model';
import {BusinessCardComponent} from '../business-card/business-card.component';

import {BusinessCardService} from '../services/business-card.service';


import {
  Input,        // <-- added,
  HostBinding
} from '@angular/core';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-busniess-cards',
  templateUrl: './busniess-cards.component.html',
  styleUrls: ['./busniess-cards.component.css']
})
export class BusniessCardsComponent implements OnInit {

	
  constructor(public cardsService: BusinessCardService) {
    
  }

  ngOnInit() {
  	
  }

}
