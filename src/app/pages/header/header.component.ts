import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from "../../service/login/token-storage.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
 username :string="";
 logo: string="";
  constructor(private _tokenservice:TokenStorageService, private router:Router) { }

  ngOnInit(): void {
    if(this.tokenservice.getToken()){
      this.username=  this._tokenservice.getUser().username;
      this.logo=  this.username[0].toUpperCase();
    }
  }

  public logout(){
    this._tokenservice.signOut();
    this.router.navigate(['/auth/login']);

  }


  get tokenservice(): TokenStorageService {
    return this._tokenservice;
  }


}
