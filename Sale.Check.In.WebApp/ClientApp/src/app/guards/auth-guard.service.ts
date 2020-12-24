import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";



@Injectable()
export class AuthGuard implements CanActivate {

   constructor(private _router: Router,
    private jwtHelpter: JwtHelperService) {

   }

   canActivate() {
     const token = localStorage.getItem('jwt');

     if(token && !this.jwtHelpter.isTokenExpired(token)) {
       return true;
     }
     this._router.navigate(['']);
     return false;
   }
}
