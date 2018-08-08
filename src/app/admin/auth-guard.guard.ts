import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { LoginadminService} from './service/login/loginadmin.service';
import { Router } from '@angular/router'

@Injectable()
export class AuthGuardGuard implements CanActivate {
  // loginservice here and loginservice in login.ts are sharing the same instance
  constructor(private loginService: LoginadminService, private router: Router) { }

  canActivate( next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if(!this.loginService.getAdminLoggedIn()) {
        this.router.navigate(['/']);
      }
  //    console.log('from authguard---' + this.loginService.getToken())
      return this.loginService.getAdminLoggedIn();
  }
}
