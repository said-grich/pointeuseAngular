import { Component, OnInit } from '@angular/core';
import {DepartementService} from "../../service/parametrage/departement.service";

@Component({
  selector: 'app-departement',
  templateUrl: './departement.component.html',
  styleUrls: ['./departement.component.css']
})
export class DepartementComponent implements OnInit {

  constructor(private departementService: DepartementService) { }

  ngOnInit(): void {
  }
  createDepartement(){
    return this.departementService.createDepartement();
  }

}
