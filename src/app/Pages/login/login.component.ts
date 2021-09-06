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

    let dataObj = {
      login: login,
      senha: senha
      //imovel: this.activatedRoute.snapshot.params.id
    };

    this.http.post(this.global.endereco+'login.php',dataObj)
    .subscribe(data=> {
      //this.spinner.hide();
      if(data == "erro"){
        window.alert('Login ou senha incorretos');
      }else{
        let id: any = data;
        this.global.logar(id['id_usuario'], login, senha);
        //this.router.navigate([this.global.destino]);
        this.router.navigateByUrl('/inicio');
      }
    });
  };

}
