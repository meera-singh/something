import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { Http } from '@angular/http';
import { LoaderService } from '../../service/loader.service';
@Component({
  selector: 'app-forgotpwd',
  templateUrl: './forgotpwd.component.html',
  styleUrls: ['./forgotpwd.component.css']
})
export class ForgotpwdComponent implements OnInit {
email;
  constructor(private router: Router, private http: Http, private ls: LoaderService) { }

  forgotpassword() {
     this.ls.display(true);
      this.router.navigate(['/user/signin']);
      //console.log(this.bsValue,this.mytime,this.submit);
    this.http.post('/user/forgotPassword',
      { email: this.email,
       }).subscribe((res) => {
        if(res.json().success){
        //  console.log(res)
          this.ls.display(false)
        }
      });
    }
    ngOnInit() {
  }

}
