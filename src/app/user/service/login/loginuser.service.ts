import { Injectable } from '@angular/core';
import { Router} from '@angular/router';
import { Http, Headers } from '@angular/http';
import { Response } from '@angular/http/src/static_response';

@Injectable()
export class LoginuserService {
  private isUserLoggedIn;
  private token;
  header;
  data;
  constructor() {
    // this.isUserLoggedIn = false;
    this.header = new Headers();
    this.header.append('x-access-token', this.getToken());

   }
    setUserLoggedIn(token) {
     this.isUserLoggedIn = true;
     this.token = token;
     sessionStorage.setItem('token', this.token);
    }
    setUserLoggedOut() {
     this.isUserLoggedIn = false;
     this.token = '';
     sessionStorage.removeItem('token');
    }
    getUserLoggedIn() {
      if(sessionStorage.token) {
       this.token = sessionStorage.token;
       this.isUserLoggedIn = true;
       return this.isUserLoggedIn;
      }
      else {
      this.isUserLoggedIn = false;
      return this.isUserLoggedIn;
      }
    }
    getToken(){
      if(sessionStorage.token){
      this.token = sessionStorage.token;
      this.isUserLoggedIn = true;
      return this.token;
      }
      else return this.isUserLoggedIn;
    }
}
