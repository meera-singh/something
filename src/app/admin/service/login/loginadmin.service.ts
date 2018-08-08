import { Injectable } from '@angular/core';
import { Router} from '@angular/router';
import { Http, Headers } from '@angular/http';
import { Response } from '@angular/http/src/static_response';

@Injectable()
export class  LoginadminService {
  private isAdminLoggedIn;
  private token;
  header;
  data;
  constructor() {
    // this.isAdminLoggedIn = false;
    this.header = new Headers();
    this.header.append('x-access-token', this.getToken());
   }
    setAdminLoggedIn(token) {
     this.isAdminLoggedIn = true;
     this.token = token;
     sessionStorage.setItem('token', this.token);
    }
    setAdminLoggedOut() {
     this.isAdminLoggedIn = false;
     this.token = '';
     sessionStorage.removeItem('token');
    }
    getAdminLoggedIn() {
      if(sessionStorage.token) {
       this.token = sessionStorage.token;
       this.isAdminLoggedIn = true;
       return this.isAdminLoggedIn;
      }
      else {
      this.isAdminLoggedIn = false;
      return this.isAdminLoggedIn;
      }
    }
    getToken(){
      if(sessionStorage.token){
      this.token = sessionStorage.token;
      this.isAdminLoggedIn = true;
      return this.token;
      }
      else return this.isAdminLoggedIn;
    }
}

