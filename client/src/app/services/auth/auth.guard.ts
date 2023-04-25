import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthUserService } from 'src/app/core/components/auth/auth-user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthUserService, private router: Router) {}
  canActivate( next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
  let isLoggedIn = this.authService.isAuth();
      if (isLoggedIn) {
      return true;
        } else {
          this.router.navigate(['/sign-in']);
          return false;
        }
    
  }
  
}
