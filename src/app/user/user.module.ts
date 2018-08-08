import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { CalendarModule } from 'angular-calendar';
import { DemoUtilsModule } from './dashboard/calendar-view/calendar/module';

import { CalendarViewComponent } from './dashboard/calendar-view/calendar-view.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login/login.component';
import { SignupComponent } from './signup/signup/signup.component';
import { ForgotpwdComponent } from './forgotpwd/forgotpwd.component';
import { PasswordchangeComponent } from './dashboard/passwordchange/passwordchange.component';
import { LoginpanelComponent } from './loginpanel/loginpanel.component';
// ngx components
import { ModalModule } from 'ngx-bootstrap';
import { BsDropdownModule } from 'ngx-bootstrap';
import { BsDatepickerModule } from 'ngx-bootstrap';
import { TimepickerModule } from 'ngx-bootstrap';
// services
import { AuthGuardGuard } from './auth-guard.guard';
import { LoginuserService} from './service/login/loginuser.service'
import {DatePipe} from '@angular/common';


@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    FormsModule,
    CalendarModule.forRoot(),
    DemoUtilsModule,
    BsDropdownModule.forRoot(),
    TimepickerModule.forRoot(),
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),
    RouterModule.forChild([
      {
        path: '',
        redirectTo: 'signin',
    },
    {
      path: 'signin',
      component: LoginpanelComponent,
      children: [{
        path: '',
        redirectTo: 'signin',
        pathMatch: 'full'
      },
      {
        path: 'signin',
        component: LoginComponent
      },
      {
        path: 'signup',
        component: SignupComponent
      },
      {
        path: 'forgot',
        component: ForgotpwdComponent
   }]
    },
    // {
    //   path: 'signup',
    //   component: SignupComponent

    // },
    // {
    //   path: 'forgot',
    //   component: ForgotpwdComponent

    // },
    {
      path: 'dash',
      
      component: DashboardComponent,
      children: [{
        path: '',
        redirectTo: 'calender',
        pathMatch: 'full'
      }, {
        path: 'calender',
        component: CalendarViewComponent
        },
        {
          path: 'forget',
          component: PasswordchangeComponent
          }]
    }
    ])
  ],
  declarations: [CalendarViewComponent, DashboardComponent, LoginComponent,
                 SignupComponent, ForgotpwdComponent, PasswordchangeComponent, LoginpanelComponent],
  providers: [ LoginuserService, AuthGuardGuard]
})
export class UserModule { }
