import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Response } from '@angular/http/src/static_response';
import { LoginadminService } from '../../service/login/loginadmin.service';
import { FilterPipe } from '../../../pipe/filter.pipe';
import { UserhService } from '../userh.service';
import { Router } from '@angular/router';
import { LoaderService } from '../../../service/loader.service';
import { JSONToCSV } from './jsontocsv';
import { PapaParseService } from 'ngx-papaparse';

@Component({
  selector: 'app-viewall',
  templateUrl: './viewall.component.html',
  styleUrls: ['./viewall.component.css']
})

export class ViewallComponent implements OnInit {
  option;
  logindata;
  header;
  taskdata;
  alltaskofselecteduser;
  allassignedofselecteduser;
  constructor(private papa: PapaParseService, private http: Http, private loginService: LoginadminService, private u: UserhService, private router: Router, private ls: LoaderService) {
    this.header = new Headers();
    this.header.append('x-access-token', this.loginService.getToken());
  }

  ngOnInit() {
    this.http.post('/admin/taskDetails',
      { option: 'all' },
      { headers: this.header }).subscribe(data => {
        // this.ls.display(false)
        // console.log(data.json().loginData)
        this.logindata = data.json().loginData;
        //  console.log(data.json())
        // let csvone = this.papa.unparse(data.json().loginData[7].time);

        // let csvone = this.papa.unparse(this.logindata);

        // console.log('Unparsed: ', csvone);
        //let xx = new JSONToCSV();
        //       xx.Convert(this.logindata, 'second');
        //xx.JSONToCSVConvertor(data.json, 'second', 'second')

      },
      err => {
        console.log('Error: ', err.json());
      })
  }




  public open(event, item) {
    this.ls.display(true);
    this.http.post('/admin/taskDetails',
      { option: 'all' },
      { headers: this.header }).subscribe(data => {
        this.ls.display(false);
        this.taskdata = data.json().taskData;

        for (let t = 0; t < this.taskdata.length; t++) {
          if (item.email === this.taskdata[t].email) {
            this.alltaskofselecteduser = this.taskdata[t].tasks;
            this.allassignedofselecteduser = this.taskdata[t].assignedTask
            this.u.a = this.alltaskofselecteduser;
            this.u.m = this.allassignedofselecteduser;
            this.router.navigate(['/admin/dash/history']);
          }
        }
      },
      err => {
        console.log('Error: ', err.json());
      })

    //    alert('Open ' + item.email);
    //console.log(event)
  }
}
