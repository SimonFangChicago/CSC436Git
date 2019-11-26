import { Component, OnInit } from '@angular/core';
import {BusniessCardModel} from '../model/busniess-card-model';
import {BusinessCardService} from '../services/business-card.service';
import { Router } from  "@angular/router";
import {
  Input,        // <-- added,
  HostBinding
} from '@angular/core';

@Component({
  selector: 'app-business-card',
  templateUrl: './business-card.component.html',
  styleUrls: ['./business-card.component.css']
})
export class BusinessCardComponent implements OnInit {

	@Input() cardInfo: BusniessCardModel;

  constructor(private cardsService: BusinessCardService,private router:Router) { }

  ngOnInit() {
  }

  edit(card)
  {
  	console.log(card);
  	this.cardsService.setTobeEditedCard(card);
    this.router.navigate(['newBusniessCards']);
  }

  delete(card)
  {
  	console.log(card);
  	this.cardsService.delete(card.id);
    this.router.navigate(['busniessCards']);
  }

}
