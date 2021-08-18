import { Component, OnInit } from '@angular/core';
import {Groupe} from "../../../../modeles/parametrage/groupe.model";
import {DepartementService} from "../../../../service/parametrage/departement.service";
import {GroupeService} from "../../../../service/parametrage/groupe.service";

@Component({
  selector: 'app-departement-groupe-list',
  templateUrl: './departement-groupe-list.component.html',
  styleUrls: ['./departement-groupe-list.component.css']
})
export class DepartementGroupeListComponent implements OnInit {

  constructor(private departementService: DepartementService) { }

  ngOnInit(): void {
  }
  get listGroupe(): Array<Groupe>{
    return this.departementService.groupeList;
  }

}
