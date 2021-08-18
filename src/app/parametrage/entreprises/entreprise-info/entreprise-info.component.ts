import { Component, OnInit } from '@angular/core';
import {EntrepriseService} from "../../../service/parametrage/entreprise.service";
import {Entreprise} from "../../../modeles/parametrage/entreprise.model";
import {MatTableDataSource} from "@angular/material/table";
import {DepartementService} from "../../../service/parametrage/departement.service";
import {Router} from "@angular/router";
import {relative} from "@angular/compiler-cli/src/ngtsc/file_system";
import {Depatement} from "../../../modeles/parametrage/depatement.model";

@Component({
  selector: 'app-entreprise-info',
  templateUrl: './entreprise-info.component.html',
  styleUrls: ['./entreprise-info.component.css']
})
export class EntrepriseInfoComponent implements OnInit {

  constructor(private entrepriseService: EntrepriseService, private departementService: DepartementService,
              private  router:Router) { }
 public statu!: boolean;
 public name!: string;
  ngOnInit(): void {
    this.entrepriseService.findAll();

  }

  onClose(){
    return this.entrepriseService.onClose();
  }
  getStatu(i:boolean){
    this.statu=i;
    console.log(this.statu);
  }

  get entreprise(): Entreprise {
    return this.entrepriseService.entreprise;
  }
  getentrepriseInfo(){
    return this.entrepriseService.getrow();
  }



}
