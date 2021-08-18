import { Component, OnInit } from '@angular/core';
import {GroupeService} from "../../../../service/parametrage/groupe.service";

@Component({
  selector: 'app-groupe-details',
  templateUrl: './groupe-details.component.html',
  styleUrls: ['./groupe-details.component.css']
})
export class GroupeDetailsComponent implements OnInit {

  constructor(private groupeService: GroupeService) { }

  ngOnInit(): void {
  }
  getrow(){
    return  this.groupeService.getrow();
  }


}
