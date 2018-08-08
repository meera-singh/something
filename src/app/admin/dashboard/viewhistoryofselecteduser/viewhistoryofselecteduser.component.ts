import { Component, OnInit } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { UserhService } from '../userh.service';
import {FilterPipe} from '../../../pipe/filter.pipe';
import { JSONToCSV } from '../viewall/jsontocsv';
import { PapaParseService } from 'ngx-papaparse';
import { forEach } from '@angular/router/src/utils/collection';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';
import * as moment from 'moment';
@Component({
  selector: 'app-viewhistoryofselecteduser',
  templateUrl: './viewhistoryofselecteduser.component.html',
  styleUrls: ['./viewhistoryofselecteduser.component.css']
})

export class ViewhistoryofselecteduserComponent implements OnInit {
alltaskofselecteduser;
date: moment.Moment;
minDate = new Date(2017, 5, 10);
maxDate = new Date(2024,7,9);
bsValue: Date = new Date();
bsRangeValue: any = [];
datex: moment.Moment;
datey: moment.Moment;
allassignedofselecteduser;

  constructor(private u: UserhService) {
  }
  datepickedright() {
    this.datex = moment(this.bsRangeValue[0])
    this.datey = moment(this.bsRangeValue[1])
    let startt= this.datex.clone().format('YYYY/MM/DD');
    let endt= this.datey.clone().format('YYYY/MM/DD');
    let dateB = moment(this.alltaskofselecteduser[0].date);
    let kx = [];
      kx.push({
        DATE: 'date',
        TIME: 'time',
        TASK: 'task'
      })
      for (let m =  0; m <= this.alltaskofselecteduser.length - 1; m++)  {
        for (let n = 0; n <= this.alltaskofselecteduser[m].details.length - 1; n++) {
          let dateB = moment(this.alltaskofselecteduser[m].date);
          
          let date = new Date(this.alltaskofselecteduser[m].date);
          let yr = date.getFullYear();
          let mth = date.getMonth()+1;
          let day = date.getDate();
          let shortDate = `${day}/${mth}/${yr}`

            if(dateB.isBetween(startt, endt) || dateB.isSame(startt) || dateB.isSame(endt)) {
              console.log(this.alltaskofselecteduser[m].details[n].time)
              kx.push({
                  DATE: shortDate,
                  TIME: '="'+this.alltaskofselecteduser[m].details[n].time+'"',
                  TASK: this.alltaskofselecteduser[m].details[n].task
              })
            }
        }
      }
//      console.log(kx)
          new Angular2Csv(kx, 'Range Csv');
  }
  recentcsv() {
    this.date = moment();
    let startt= this.date.clone().add(-6, 'days').format('YYYY/MM/DD');
    let endt= this.date.clone().add(1, 'days').format('YYYY/MM/DD');
    let kx = [];
      kx.push({
        DATE: 'date',
        TIME: 'time',
        TASK: 'task'
      })
      for (let m = 0; m <= this.alltaskofselecteduser.length - 1; m++) {
        for (let n = 0; n <= this.alltaskofselecteduser[m].details.length - 1; n++) {
          let dateB = moment(this.alltaskofselecteduser[m].date);
          let date = new Date(this.alltaskofselecteduser[m].date);
          let yr = date.getFullYear();
          let mth = date.getMonth()+1;
          let day = date.getDate();
          let shortDate = `${day}/${mth}/${yr}`
            // console.log(this.alltaskofselecteduser[m].details[n].time)
            
            if(dateB.isBetween(startt, endt)) {
              kx.push({
                DATE: shortDate,
                TIME: '="'+this.alltaskofselecteduser[m].details[n].time+'"',
                TASK: this.alltaskofselecteduser[m].details[n].task
              })
            }
        }
      }
      new Angular2Csv(kx, 'Recent csv');
    }
    ngOnInit() {
      this.date = moment();
      this.allassignedofselecteduser=this.u.m;
      this.alltaskofselecteduser = this.u.a;
    }



}
