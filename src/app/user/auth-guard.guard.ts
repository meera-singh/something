import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {LoginuserService} from './service/login/loginuser.service';
import { Router } from '@angular/router'

@Injectable()
export class AuthGuardGuard implements CanActivate {
  constructor(private loginService: LoginuserService, private router: Router) { }
  canActivate( next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if(!this.loginService.getUserLoggedIn()) {
        this.router.navigate(['/']);
      }
      return this.loginService.getUserLoggedIn();
  }
}
