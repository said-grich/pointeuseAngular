import { Component, OnInit } from '@angular/core';
import {DepartementService} from "../../../service/parametrage/departement.service";
import {Router} from "@angular/router";
import {Entreprise} from "../../../modeles/parametrage/entreprise.model";
import {MatTableDataSource} from "@angular/material/table";
import {Depatement} from "../../../modeles/parametrage/depatement.model";

@Component({
  selector: 'app-departement-info',
  templateUrl: './departement-info.component.html',
  styleUrls: ['./departement-info.component.css']
})
export class DepartementInfoComponent implements OnInit {
  public statu!: boolean;

  constructor(private departementService: DepartementService, private router: Router) { }

  ngOnInit(): void {
    this.departementService.findAll();
    this.departementService.findAllEntreprise();

  }
  onClose(){
    return this.departementService.onClose();
  }
  getStatu(i:boolean){
    this.statu=i;
  }
  get departement(): Depatement {
    return this.departementService.departement;
  }
  getdepartementInfo(){
    return this.departementService.getrow();
  }

  get departementList(): MatTableDataSource<Depatement> {
    return this.departementService.departementList;
  }

}
