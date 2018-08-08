import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { Http } from '@angular/http';
import {HttpModule} from '@angular/http';
import { Response } from '@angular/http/src/static_response';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  SignupError;
  name: string;
  email: string;
  password: string;
  constructor(private http: Http, private router: Router) {
    //console.log(this.name + ' ' + this.email + ' ' + this.password);
  }
  reg() {
      this.http.post('/user/registration',
          {
          email: this.email,
          name: this.name,
          password: this.password
          })
          .subscribe((res) => {
             // console.log('user signup done');
             // console.log(res);
              let response = res.json();
              //console.log(response.msg)
//              console.log( res.json());
          this.SignupError = response.msg;
          });

  }

  ngOnInit() {
  }

}
