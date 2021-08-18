import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from "./service/login/token-storage.service";
import {Router} from "@angular/router";
import {ParametrageService} from "./service/parametrage.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements  OnInit{
  title = 'Pointeuse';
  // @ts-ignore
  statu:boolean;

  constructor(private  _tokenService : TokenStorageService , private _router:Router , private parametrageService:ParametrageService, ) {
    this._router.events.subscribe(
value => {
  // @ts-ignore
  if (value.url ==='/auth/login'){
    this.statu=true;
  }
  else {
    this.statu=false;
  }
  }
    )

  }
  ngOnInit(): void {
    if (this._tokenService.getToken()==null){
    this._router.navigate(['/auth/login']);
    }

  }

  get router(): Router {
    return this._router;
  }


  get tokenService(): TokenStorageService {
    return this._tokenService;
  }

  set tokenService(value: TokenStorageService) {
    this._tokenService = value;
  }
}
