import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { async } from '@angular/core/testing';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private global: GlobalService, private router: Router, private http: HttpClient){}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    
    if(localStorage.getItem('email') && localStorage.getItem('token')){
      return new Observable<boolean>(obs => {        
          let dataObj = {
            email: localStorage.getItem('email'),
            token: localStorage.getItem('token')
          };

          this.http.post(this.global.endereco+'/verify',dataObj).subscribe(
              data => {
                let response: any = data;
                  if (response.token) {
                      console.log('Sucess');
                      // They don't have a team, lets redirect
                      obs.next(true);
                  }
                  else {
                      console.log('fail');
                      obs.next(false);
                  }
              }
          );
      });
    }else{
      return false;
    }
}
  
}
