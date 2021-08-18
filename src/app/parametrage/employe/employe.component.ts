import { Component, OnInit } from '@angular/core';
import {Employe} from "../../modeles/parametrage/employe.model";
import {HttpClient} from "@angular/common/http";
import {EmployeService} from "../../service/parametrage/employe.service";

@Component({
  selector: 'app-employe',
  templateUrl: './employe.component.html',
  styleUrls: ['./employe.component.css']
})
export class EmployeComponent implements OnInit {

  private _employesList: Array<Employe> = [];
  constructor(private employeService:EmployeService) { }

  ngOnInit(): void {
    // this.findAll();
  }
  createEmploye(){
    return this.employeService.createEmploye();
  }

  // public  findAll(){
  //   this.http.get<Array<Employe>>("http://localhost:8039/").subscribe(
  //     data=>{
  //       this.employesList=data;
  //       console.log(this.employesList);
  //     }
  //   );
  // }
  // get employesList(): Array<Employe> {
  //   if (this._employesList==null){
  //     this._employesList=new Array<Employe>();
  //   }
  //   return this._employesList;
  // }
  //
  // set employesList(value: Array<Employe>) {
  //   this._employesList = value;
  // }
  //
  // get http(): HttpClient {
  //   return this._http;
  // }
  //
  // set http(value: HttpClient) {
  //   this._http = value;
  // }
}
