import { Component, OnInit } from '@angular/core';
import {Groupe} from "../../modeles/parametrage/groupe.model";
import {GroupeService} from "../../service/parametrage/groupe.service";


@Component({
  selector: 'app-groupes',
  templateUrl: './groupes.component.html',
  styleUrls: ['./groupes.component.css']
})
export class GroupesComponent implements OnInit {

  constructor(private groupeService: GroupeService) { }

  ngOnInit(): void {
  }
  createGroupe(){
    return this.groupeService.createGroupe();
  }

  get listGroupe(){
    return this.groupeService.groupeList;
  }
}
