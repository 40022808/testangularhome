import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';


/* export const authGuard: CanActivateFn = (route, state) => {
  return true;
}; */

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) { }
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.isLoggedIn()) {
      console.log(true);
      return true;
    } else {
      const lang = route.params['lang'] || 'en'; 
    
      const targetUrl = state.url;
      this.router.navigate([lang, 'login'], { queryParams: { redirectUrl: targetUrl } });
      return false;
    }
  }
  
}