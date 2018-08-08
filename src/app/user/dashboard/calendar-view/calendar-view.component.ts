import { Component, ViewChild ,ChangeDetectionStrategy } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { Router} from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { OnInit} from '@angular/core';
import { colors } from '../calendar-view/calendar/colors';
import { Http, Headers } from '@angular/http';
import { Response } from '@angular/http/src/static_response';
import { LoginuserService } from '../../service/login/loginuser.service';
import { LoaderService } from '../../../service/loader.service';
import * as moment from 'moment';

import{addDays,subDays,startOfDay,endOfDay,getMonth,
  startOfMonth,
  startOfWeek,endOfMonth,endOfWeek,addMonths, subMonths, getDate, compareAsc} from 'date-fns';
import {RRule, Frequency} from 'rrule';
import { empty } from 'rxjs/Observer';

interface RecurringEvent {
  title: string;
  color: any;
  rrule?: {
    freq: RRule.Frequency;
    interval?:number;
    bymonth?: number;
    bymonthday?: number;
    byweekday?: RRule.Weekday[];
    dtstart?: Date;
    until?: Date;
  };}

  

@Component({
  selector: 'mwl-demo-component',
  changeDetection: ChangeDetectionStrategy.Default,
  templateUrl: 'calendar-view.component.html',
  styleUrls: ['./calendar-view.component.css']
})
export class CalendarViewComponent implements OnInit {
@ViewChild('lgModal')  modaledit;
@ViewChild('taskForm') taskForm;
@ViewChild('taskForm2') taskform2;
@ViewChild('lgModal2') modaledit2;
// public myId = 'testId';
 events: CalendarEvent[]=[];
 check:boolean;
recurringEvents: RecurringEvent[] = [];
  task=[];
  view = 'month';
  date=new Date(2018,3,10);
  viewDate: Date = new Date();
  taskname=[];
  clickedDate: Date;
  task1='';
  submit;
  Task;
  bsvalue8:Date=new Date();
  mytime2:string;
  minDate = new Date(2017, 5, 10);
  maxDate = new Date(2024, 9, 15);
  bsValue: Date = new Date();
  bsRangeValue: any = [new Date(2017, 7, 4), new Date(2017, 7, 20)];
  header;
  datareceivedfromtaskentry;
  taskentrytaskslength;
  taskentrytasksdetaillength;
  datareceivedfromtaskentry2;
  tasks;
  details;
  mytime: string = '';
  currentdatetasks= [];
  selectdatetasks;
  arrayoftaskobject;
  timeSlotsUsed = [];
  test;
  helpDate=new Date();
  
  option;
  constructor(private modalService: BsModalService ,private http: Http, private loginService:  LoginuserService, private ls: LoaderService) {
    this.header = new Headers();
  // this.ls.display(true);
    this.header.append('x-access-token', this.loginService.getToken());
    this.updateCalendarEvents();
  }
  

  postdata() {
    
    this.ls.display(true);
    //console.log(this.bsValue,this.mytime,this.submit);
  this.http.post('/user/taskEntry',
  
    { date: this.bsValue,
      time: this.mytime,
      task: this.submit
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
  postdata1() {
    console.log('gfyhguh-----')
    for(let l=0;l<this.taskname.length;l++){
      if(this.Task == this.taskname[l].id){
        if(this.taskname[l].startdate.getDate()<=this.helpDate.getDate() && this.helpDate.getDate()<=this.taskname[l].lastdate.getDate()){this.ls.display(true);
          //console.log(this.bsValue,this.mytime,this.submit);
          console.log('hhh')
        this.http.post('/user/logAssignedTask',
        
        {
          taskId:this.Task  },
          { headers: this.header    
          },).subscribe((res) => {
            console.log(res.json())
            if(res.json().success){
              
              this.ls.display(false)
              this.taskform2.reset();
              this.modaledit2.hide();
              window.location.reload();
            }else{
              
            }
          }
          );
          }else{
            alert("You cannot lock this assigned task")
          }
      }
    }
    
    
  }
  
  
  fun1(){
    let dateSelectedByUser = new Date(moment(this.bsValue).format('YYYY,MM,DD')).toISOString();
    this.http.get('/user/history', { headers: this.header }).subscribe(data=>{
      let response = data.json();
      if(response.data != null){
        this.arrayoftaskobject = response.data.tasks;
        let selectdatetasks = this.arrayoftaskobject.filter((item) => {
          return item.date === dateSelectedByUser;
        });
        this.timeSlotsUsed = selectdatetasks && selectdatetasks[0] && selectdatetasks[0].details.map((item)=>{
          return item.time;
        })
      }
    })
  }
  getdata1() {
    this.ls.display(true);
    this.http.get('/user/history', { headers: this.header }).subscribe(data=>{
    this.ls.display(false);
    let response = data.json();
      if(response.data != null){
        //console.log(response.data)
        this.arrayoftaskobject = response.data.tasks;
       
        let selectdatetasks = this.arrayoftaskobject.filter((item) => {
       //   console.log(this.clickedDate.toISOString())
         // console.log(item.date)
          return item.date === this.clickedDate.toISOString();
   
        });
     //   console.log(selectdatetasks)
        this.selectdatetasks = selectdatetasks && selectdatetasks[0];
       
    //    console.log(this.selectdatetasks)
      }
    })
  }
  dateChanged(){  
    
    let dateSelectedByUser = new Date(moment(this.bsValue).format('YYYY,MM,DD')).toISOString();
  //  if(dateSelectedByUser){
  //    this.ls.display(true)
  //  }
 // console.log(dateSelectedByUser)
    this.mytime = '';
    this.http.get('/user/history', { headers: this.header }).subscribe(data=>{
   // this.ls.display(false)  
    let response = data.json();
      if(response.data != null){
        this.arrayoftaskobject = response.data.tasks;
        let selectdatetasks = this.arrayoftaskobject.filter((item) => {
          return item.date === dateSelectedByUser;
        });
        this.timeSlotsUsed = selectdatetasks && selectdatetasks[0] && selectdatetasks[0].details.map((item)=>{
          return item.time;
        })
      }
    })
  }
  ngOnInit() {
    // this.http.get('/user/history', { headers: this.header }).subscribe(data=>{
    
    }
  updateCalendarEvents(){
    console.log('f-------------')
    this.ls.display(true);
    this.http.get('/user/aaa', { headers: this.header}).subscribe(data => {
    this.ls.display(false);      
      this.task = data.json().data;
      console.log(this.task)
      this.events = [];
      
       if(this.task){for(let i=0;i<this.task.length;i++){
 
         var date1=new Date(this.task[i].startDate);
        var date2=this.task[i].lastDate ?new Date(this.task[i].lastDate):new Date(2024,1,1);
         if(this.task[i].status==2){
           
           var ch=this.task[i].completion[0]?this.task[i].completion[0].completed:false
           if(ch!=true){
             
            this.recurringEvents=[];
          this.recurringEvents.push({
            title: this.task[i].details,
          color: colors.red,
          rrule: {
            freq: RRule.WEEKLY,
            byweekday: [RRule.FR,RRule.WE,RRule.MO,],
            dtstart:  date1,
            until:addDays((date2),1),
          }
          })}
         }

        if(this.task[i].status==3){
          var ch1=this.task[i].completion[0]?this.task[i].completion[0].completed: false;
          if(ch1!=true){
            
            this.recurringEvents.push({
            title: this.task[i].details,
          color: colors.yellow,
          rrule: {
            freq: RRule.DAILY,
            byweekday: [RRule.TU,RRule.TH,RRule.SA],
            dtstart:  date1,
            until:addDays((date2),1),
          }
          })}}

          if(this.task[i].status==1){
            var ch2=this.task[i].completion[0]?this.task[i].completion[0].completed:false
            if(ch2!=true){
              
              this.recurringEvents.push({
              title: this.task[i].details,
            color: colors.blue,
            rrule: {
              freq: RRule.DAILY,
              byweekday: [RRule.TU,RRule.TH,RRule.SA,RRule.MO,RRule.WE,RRule.FR],
              dtstart:   date1,
              until:addDays((date2),1)
            }
            })}
        }
        
      }}
      
  
      const startOfPeriod: any = {
        month: startOfMonth,
        week: startOfWeek,
        day: startOfDay
      };
  
      const endOfPeriod: any = {
        month: endOfMonth,
        week: endOfWeek,
        day: endOfDay
      };
       
      this.recurringEvents.forEach(event => {
        const rule: RRule = new RRule(
          Object.assign({},
          event.rrule, {
          
             
          })
        );
        rule.all().forEach(date => {
          this.events.push(
            Object.assign({}, event, {
              start: new Date(date)
            })
          );
        });
      });
      
      for(let r=0;r<this.task.length;r++){
        
        if(this.task[r].lastDate){
           if(this.task[r].lastDate<this.task[r].startDate){}
           else{
              var ch4= this.task[r].completion[0]?this.task[r].completion[0].completed:false
             if(ch4!=true){
              this.taskname.push({task:this.task[r].details,id:this.task[r]._id,startdate:new Date(this.task[r].startDate),lastdate:new Date(this.task[r].lastDate)});
             }else{}
           }  

         }else {
          var ch6= this.task[r].completion[0]?this.task[r].completion[0].completed:false
            if(ch6!=true){this.taskname.push({task:this.task[r].details,id:this.task[r]._id,startdate:new Date(this.task[r].startDate),lastdate:new Date(2024,1,1)});}else{}
           
          }
        
      }
      
      if(this.taskname.length!=0){
        this.check=true;
      }
      
     
     

    },
    err => {
     console.log('Error: ', err.json());
    });
    
  }
    
}
