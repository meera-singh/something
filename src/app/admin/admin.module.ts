import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginadminService } from './service/login/loginadmin.service';
import { AuthGuardGuard } from './auth-guard.guard';
import { HttpModule } from '@angular/http';
import { BsDropdownModule } from 'ngx-bootstrap';
import { ViewallComponent } from './dashboard/viewall/viewall.component';
import {FilterPipe} from '../pipe/filter.pipe';
import { ViewhistoryofselecteduserComponent } from './dashboard/viewhistoryofselecteduser/viewhistoryofselecteduser.component';
import { UserhService} from './dashboard/userh.service';
import { PapaParseModule } from 'ngx-papaparse';
import { CalendarModule } from 'angular-calendar';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { TimepickerModule } from 'ngx-bootstrap';

import { ModalModule } from 'ngx-bootstrap';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    ModalModule.forRoot(),
    PapaParseModule,
    BsDropdownModule.forRoot(),
    TimepickerModule.forRoot(),
    BsDatepickerModule.forRoot(),
    RouterModule.forChild([
      {
        path: '',
        redirectTo: 'signin',
    },
    {
      path: 'signin',
      component: LoginComponent
    },
    {
      path: 'dash',
      canActivate:[AuthGuardGuard],
      component: DashboardComponent,
      children: [{
        path: '',
        redirectTo: 'view',
        pathMatch: 'full'
      }, {
        path: 'view',
        component: ViewallComponent
      },
      {
        path: 'history',
        component: ViewhistoryofselecteduserComponent
      },
      
      
      
      
    ]
    }
    ])
  ],
  declarations: [LoginComponent, DashboardComponent, ViewallComponent, FilterPipe, ViewhistoryofselecteduserComponent],
  providers: [UserhService, LoginadminService, AuthGuardGuard]
})
export class AdminModule { }
