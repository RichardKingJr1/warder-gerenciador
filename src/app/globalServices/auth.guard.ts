import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { GlobalService } from './global.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private global: GlobalService, private router: Router, private http: HttpClient){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if(!this.global.logado){
        if(localStorage.getItem('email') && localStorage.getItem('senha')){
          let dataObj = {
            email: localStorage.getItem('email'),
            senha: localStorage.getItem('senha')
          };
    
          let email: any = localStorage.getItem('email');
          let senha: any = localStorage.getItem('senha');
    
          if(this.burcar(dataObj, email, senha) == true){
            return true;
          }else{
            return false;
          }

        }else{
          this.router.navigate(['/login']);
          return false;
        };
      }else{
        return true;
      };
  };

  burcar(dataObj: any, email: any, senha: any): any{
    this.http.post(this.global.endereco+'login.php',dataObj)
    .subscribe(data=> {
      //this.spinner.hide();
      if(data == "erro"){
        this.router.navigate(['/login']);
        return false;
      }else{
        let id: any = data;
        this.global.logar(id['id_usuario'], email, senha);
        this.router.navigate(['/inicio']);
        return true;
      };
    }, error =>{
      return false;
    }, () =>{
      return false;
    });
  }
  
}
