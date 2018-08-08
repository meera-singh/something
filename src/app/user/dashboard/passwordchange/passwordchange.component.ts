import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { Http, Headers } from '@angular/http';
import { LoginuserService } from '../../service/login/loginuser.service';
import { LoaderService } from '../../../service/loader.service';

@Component({
  selector: 'app-passwordchange',
  templateUrl: './passwordchange.component.html',
  styleUrls: ['./passwordchange.component.css']
})
export class PasswordchangeComponent implements OnInit {
  password;
  newpassword;
  header;
  constructor(private router: Router, private http: Http, private loginService:  LoginuserService, private ls: LoaderService ) { 
    this.header = new Headers();
    // this.ls.display(true);
      this.header.append('x-access-token', this.loginService.getToken());
    //  console.log(this.loginService.getToken());
  }
  changepassword = () => {
    this.http.post('/user/changePassword',

    { oldPassword: this.password,
      newPassword: this.newpassword
     },
    { headers: this.header}).subscribe((res) => {
      if(res.json().success) {
// console.log(res)
// console.log(res.json())
// console.log('-------------------')
// this.ls.display(false);
            this.router.navigate(['/user/dash/calender']);
      }
    });

// this.router.navigate(['/user/dash/calender']);    
}
  ngOnInit() {
  }

}
