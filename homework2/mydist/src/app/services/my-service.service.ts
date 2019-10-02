import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MyServiceService {

  constructor() { }

  likeImage(param:boolean):boolean
  {

  	if(param === true)
  		return false;
  	else
  		return true;
  }

}
