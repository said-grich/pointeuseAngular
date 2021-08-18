import {Injectable} from '@angular/core';
import {TokenStorageService} from "./login/token-storage.service";

@Injectable({
  providedIn: 'root'
})
export class ParametrageService {
  private _statu: boolean = true;

  constructor(private tokenService: TokenStorageService) {
  }

  public tokenexist() {
    if (this.tokenService.getToken() == null) {
      this._statu = true;
    } else {
      this._statu = false;
    }
  }

  get statu(): boolean {
    return this._statu;
  }

  set statu(value: boolean) {
    this._statu = value;
  }
}
