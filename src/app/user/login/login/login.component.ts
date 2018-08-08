import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { LoginuserService } from '../../service/login/loginuser.service';
import { Http } from '@angular/http';
import { Response } from '@angular/http/src/static_response';
import { LoaderService } from '../../../service/loader.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string ;
  password: string ;
  loginError;

  constructor( private loginService: LoginuserService , private http: Http, private router: Router, private ls: LoaderService) { }

  login = () => {
    this.ls.display(true);
      this.http.post('/user/login', { email: this.email, password: this.password }).subscribe(a=>{
        this.ls.display(false);
        let response = a.json();
       // console.log( response)
        if(response.success) {
          this.loginService.setUserLoggedIn(response.token);
          this.router.navigate(['/user/dash']);
        } else {
          //console.log( response.msg);
        }
        this.loginError = response.msg;
      }, err => { console.log(err.json()) })
    }
    forgotpassword() {
   //   this.ls.display(true);
       this.router.navigate(['/user/signin/forgot']);
     this.http.post('/user/forgotPassword',
       { email: this.email,
        }).subscribe((res) => {
         if(res.json().success){
        //   this.ls.display(false)
         }
       });
     }
  ngOnInit() { }
  res() {
      this.email = '';
      this.password = '';
  }
}
