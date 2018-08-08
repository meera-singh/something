import { Component, OnInit} from '@angular/core';
import { Router} from '@angular/router';
import { LoginadminService} from '..//service/login/loginadmin.service';
import { Http } from '@angular/http';
import { Response } from '@angular/http/src/static_response';
import { LoaderService } from '../../service/loader.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string ;
  password: string ;
  loginError;
  
  constructor(private loginService: LoginadminService, private http: Http, private router: Router, private ls: LoaderService) {}
    login = () => { this.ls.display(true);
      this.http.post('/admin/login', { email: this.email, password: this.password }).subscribe(a=>{
        this.ls.display(false);
      let response = a.json();
this.loginError=response.msg;
      if(response.status) {
        this.loginService.setAdminLoggedIn(response.token);
        this.router.navigate(['/admin/dash']);
      } else {
          console.log(response.msg);
        }
        }, err => {console.log(err.json()) })
    }
  ngOnInit() {}
  
}
