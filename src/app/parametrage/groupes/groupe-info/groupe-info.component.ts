import { Component, OnInit } from '@angular/core';
import {GroupeService} from "../../../service/parametrage/groupe.service";

@Component({
  selector: 'app-groupe-info',
  templateUrl: './groupe-info.component.html',
  styleUrls: ['./groupe-info.component.css']
})
export class GroupeInfoComponent implements OnInit {
  public statu!: boolean;

  constructor(private groupeService: GroupeService) { }

  ngOnInit(): void {
    this.groupeService.findAll();
    this.groupeService.findAllDepartement();
    this.groupeService.findAllShifts();
  }
  onClose(){
    return this.groupeService.onClose();
  }
  getStatu(i:boolean){
    this.statu=i;
    console.log(this.statu);
  }

}
