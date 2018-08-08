import { Component } from '@angular/core';
import { LoginuserService} from '../service/login/loginuser.service';
import { Http, Headers } from '@angular/http';
import { Response } from '@angular/http/src/static_response';
import { Router} from '@angular/router';
import {LoaderService} from '../../service/loader.service';
import { OnInit } from '@angular/core';
@Component({
  selector: 'app-child',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
header;
task;
date = new Date();
data;
currentTime;
currentDate;
z;
dateString;
arrstore;
public now: Date = new Date();
  constructor(private loginService: LoginuserService, private http: Http, private router: Router, private ls: LoaderService) {
    setInterval(() => {
      this.now = new Date();
      this.dateString = this.now.toUTCString();
      this.dateString = this.dateString.split(',').slice(0, 1).join(' ')
      this.currentTime = this.now.toTimeString().split(' ').slice(0, 1).join(' ');
      this.currentDate = this.now.toDateString().split(' ').slice(1, 4).join(' ');
    }, 1);
    this.header = new Headers();
    this.header.append('x-access-token', this.loginService.getToken());
  }
  ngOnInit() {
    
  } 
  logout() {
    this.ls.display(true);
    this.http.get('/user/logout', { headers: this.header }).subscribe(data => {
    this.ls.display(false)  
    let response = data.json();
      this.data = response.data;
      this.loginService.setUserLoggedOut();
      this.router.navigate(['/user']);
      },
      err => {
        console.log('Error: ', err.json());
      })
  }
}
