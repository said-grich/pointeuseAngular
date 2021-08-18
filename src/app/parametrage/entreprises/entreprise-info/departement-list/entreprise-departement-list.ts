import { Component, OnInit } from '@angular/core';
import {EntrepriseService} from "../../../../service/parametrage/entreprise.service";
import {DepartementService} from "../../../../service/parametrage/departement.service";
import {Depatement} from "../../../../modeles/parametrage/depatement.model";
import {Entreprise} from "../../../../modeles/parametrage/entreprise.model";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-entreprise-departement-list',
  templateUrl: './entreprise-departement-list.html',
  styleUrls: ['./entreprise-departement-list.css']
})
export class EntrepriseDepartementList implements OnInit {
// @ts-ignore
  public name:string;
  constructor(private entrepriseService: EntrepriseService,private departementService:DepartementService,private http:HttpClient) { }

  ngOnInit(): void {
  }
  get listDepartement(): Array<Depatement> {
    return this.entrepriseService.listDepartement;
  }

  set listDepartement(value: Array<Depatement>) {
    this.departementService.listDepartement = value;
  }

  // get departementList(): Array<Depatement> {
  //   return this.departementService.listDepartement;
  // }
  // set departementList(value: Array<Depatement>) {
  //   this.departementService.listDepartement = value;
  // }
  // set entreprise(value: Entreprise) {
  //   this.entrepriseService.entreprise = value;
  // }


}
