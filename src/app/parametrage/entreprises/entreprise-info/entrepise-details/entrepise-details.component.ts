import { Component, OnInit } from '@angular/core';
import {Entreprise} from "../../../../modeles/parametrage/entreprise.model";
import {EntrepriseService} from "../../../../service/parametrage/entreprise.service";

@Component({
  selector: 'app-entrepise-details',
  templateUrl: './entrepise-details.component.html',
  styleUrls: ['./entrepise-details.component.css']
})
export class EntrepiseDetailsComponent implements OnInit {
  constructor(private entrepriseService: EntrepriseService) { }

  ngOnInit(): void {
  }

  getrow(){
   return  this.entrepriseService.getrow();
  }

}
