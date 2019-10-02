import { Component, OnInit } from '@angular/core';
import { MyServiceService } from '../services/my-service.service';


@Component({
  selector: 'app-my-button',
  templateUrl: './my-button.component.html',
  styleUrls: ['./my-button.component.css']
})
export class MyButtonComponent implements OnInit {

  constructor(private myService:MyServiceService) { }

  ngOnInit() {
  	
  }

  onClick() :void
  {
  	this.param = this.myService.likeImage(this.param);
  	console.log(this.param);  
  }

  checkLike() : boolean
  {
  	return this.param===true;
  }

  param=false;

}
