import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from  '../services/auth-service.service';
import {BusinessCardService} from '../services/business-card.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private  authService:  AuthServiceService, private cardsService: BusinessCardService) { }

  ngOnInit() {
  }

}
