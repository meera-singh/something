import { Component, OnInit,ViewChild,ChangeDetectionStrategy } from '@angular/core';
import { FilterPipe } from '../../pipe/filter.pipe';
import { Http, Headers } from '@angular/http';
import { Response } from '@angular/http/src/static_response';
import { Router} from '@angular/router';
import { LoginadminService} from '../service/login/loginadmin.service';
import { LoaderService } from '../../service/loader.service';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { Input } from '@angular/core/src/metadata/directives';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  option;
  header;
  currentTime;
  currentDate;
  submit='';
  user='';
  status='';
  public now: Date = new Date();
  @ViewChild('myModal') modaledit;
  @ViewChild('taskForm') taskForm;
  logindata;
  bsValue1: Date = new Date();
  bsValue?;

  dateString;
  constructor(private loginService: LoginadminService, private http: Http, private router: Router, private ls: LoaderService,private modalService: BsModalService) {
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
    this.http.post('/admin/taskDetails',
      { option: 'all' },
      { headers: this.header}).subscribe(data => {
      
       this.logindata = data.json().loginData;
      
     

    },
    err => {
     console.log('Error: ', err.json());
    })
 
  }
  logout() {
    this.ls.display(true)
    this.http.get(  '/admin/logout', { headers: this.header }).subscribe(data => {
    this.ls.display(false);
    const response = data.json();
      this.loginService.setAdminLoggedOut();
      this.router.navigate(['/admin']);
    },
      err => {
        console.log('Error: ', err.json());
      })
  }
 logtask(){
  this.ls.display(true);
  //console.log(this.bsValue,this.mytime,this.submit);
this.http.post('/admin/assign',
  { email: this.user,
    status: this.status,
    details: this.submit,
     lastDate:this.bsValue,
    startDate:this.bsValue1
   },
  { headers: this.header
  }).subscribe((res) => {
    
    if(res.json().success){
      this.ls.display(false)
      this.taskForm.reset();
      this.modaledit.hide();
    }
    
  });
 

 }
 
}
