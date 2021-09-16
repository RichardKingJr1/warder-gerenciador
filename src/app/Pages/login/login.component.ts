import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/globalServices/global.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private global: GlobalService, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
  }

  logar(login: string, senha: string){
    //this.spinner.show();
    console.log(login+senha);

    let dataObj = {
      email: login,
      senha: senha
      //imovel: this.activatedRoute.snapshot.params.id
    };

    this.http.post(this.global.endereco+'/login',dataObj).subscribe(data => {
      let response: any = data;
      //this.spinner.hide();
      console.log(response);
      if(!response.token){
        window.alert('Login ou senha incorretos');
      }else{
        //this.global.logar(response['token'], login, senha);
        this.global.logar(response['token'], login);
        this.router.navigateByUrl('/inicio');
      }
    });
  };

}
