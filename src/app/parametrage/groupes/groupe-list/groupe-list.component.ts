import {Component, OnInit, ViewChild} from '@angular/core';
import {GroupeService} from "../../../service/parametrage/groupe.service";
import {ConfirmService} from "../../../service/confirm.service";
import {MatSort, Sort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {Groupe} from "../../../modeles/parametrage/groupe.model";
import {DepartementService} from "../../../service/parametrage/departement.service";

@Component({
  selector: 'app-groupe-list',
  templateUrl: './groupe-list.component.html',
  styleUrls: ['./groupe-list.component.css']
})
export class GroupeListComponent implements OnInit {
  columnsToDisplay = ["#", "nom","departement","Action"];
  // @ts-ignore
  @ViewChild(MatSort) sort:MatSort;
  // @ts-ignore
  @ViewChild(MatPaginator) paginator:MatPaginator;

  constructor(private groupeService: GroupeService,private confirmService:ConfirmService,private depatrementService: DepartementService) { }
  filtring(event: Event){
    let value: string=(event.target as HTMLInputElement).value;
    this.listGroupe.filter=value.trim().toLowerCase();
  }
  ngOnInit(): void {
    this.groupeService.findAll().subscribe(
      data => {
        console.log(data);
        this.listGroupe.data=data;
        this.listGroupe.sort=this.sort;
        this.listGroupe.paginator=this.paginator;
      },
      error => {
        console.log(error);
      }
    );
    this.depatrementService.findAll().subscribe(
      data=>{
        this.groupeService.departementList = data;
      },error => {
        console.log(error);
      }
    )
  }
  ngAfterViewInit() {
  }

  sortData(sort: Sort) { this.listGroupe.sort = this.sort;}
  get listGroupe(){
    return this.groupeService.groupeList;
  }
  getInfo(row: Groupe){
    return this.groupeService.groupeInfo(row);
  }
  OnEdit(row:Groupe,i:number){
    return this.groupeService.onEdit(row,i);
  }
  delete(row:Groupe,index:number){
    this.confirmService.openConfirmDialog('Are you sure to delete !?').afterClosed().subscribe(
      res=>{
        if(res){
          return  this.groupeService.delete(row,index);
        }
      }
    );
  }

}
