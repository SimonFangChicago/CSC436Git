import { Component, OnInit } from '@angular/core';

import { AuthServiceService } from  '../services/auth-service.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private  authService:  AuthServiceService) { }

  ngOnInit() {
  }

}
