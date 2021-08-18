import { Component, OnInit } from '@angular/core';
import {ParametrageService} from "../service/parametrage.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private parametrageService:ParametrageService) { }

  ngOnInit(): void {
   console.log(this.parametrageService.tokenexist());
   console.log(this.parametrageService.statu);
  }

}
