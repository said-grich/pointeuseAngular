import { Component, OnInit } from '@angular/core';
import {DepartementService} from "../../../../service/parametrage/departement.service";

@Component({
  selector: 'app-departement-details',
  templateUrl: './departement-details.component.html',
  styleUrls: ['./departement-details.component.css']
})
export class DepartementDetailsComponent implements OnInit {

  constructor(private departementService: DepartementService) { }

  ngOnInit(): void {
  }

  getrow(){
    return  this.departementService.getrow();
  }

}
