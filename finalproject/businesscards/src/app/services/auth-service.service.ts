import { Injectable } from '@angular/core';

import { Router } from  "@angular/router";
import { auth } from  'firebase/app';
import { AngularFireAuth } from  "@angular/fire/auth";
import { User } from  'firebase';


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {


  user:  User;

  constructor(public  afAuth:  AngularFireAuth, public  router:  Router) { 
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.user = user;
        localStorage.setItem('user', JSON.stringify(this.user));
      } else {
        localStorage.setItem('user', null);
      }
    });
  }

  async  login(email:  string, password:  string) {

	try {
	    await  this.afAuth.auth.signInWithEmailAndPassword(email, password)
	    this.router.navigate(['busniessCards']);
	} catch (e) {
	    alert("Error!"  +  e.message);
	}
	}

	async logout(){
	    await this.afAuth.auth.signOut();
	    localStorage.removeItem('user');
	    this.router.navigate(['login']);
	}

  public isAuthenticated(): boolean {
    //console.log(localStorage.getItem('user'));
    return localStorage.getItem('user') !== 'null' && localStorage.getItem('user') !== null;
  }

}
