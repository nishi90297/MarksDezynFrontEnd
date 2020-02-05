import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot,UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem('currentUser')) {
        // logged in so return true
        console.log("here i am in canactivate method");
        console.log(localStorage.getItem('currentUser'))
        return true;
    }
    console.log(localStorage.getItem('currentUser'))
    console.log("here");   
    // not logged in so redirect to login page
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    return false;
}
}