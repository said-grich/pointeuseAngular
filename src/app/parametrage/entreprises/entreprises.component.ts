import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {EntrepriseCreateComponent} from "./entreprise-createOrUpdate/entreprise-create.component";
import {EntrepriseService} from "../../service/parametrage/entreprise.service";
import {Entreprise} from "../../modeles/parametrage/entreprise.model";

@Component({
  selector: 'app-entreprises',
  templateUrl: './entreprises.component.html',
  styleUrls: ['./entreprises.component.css']
})
export class EntreprisesComponent implements OnInit {

  constructor(private  entrepriseService:EntrepriseService) { }

  ngOnInit(): void {
  }
  createEntreprise(){
    return this.entrepriseService.createEntreprise();
  }

}
