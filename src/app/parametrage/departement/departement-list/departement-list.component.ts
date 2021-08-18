import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Depatement} from "../../../modeles/parametrage/depatement.model";
import {DepartementService} from "../../../service/parametrage/departement.service";
import {MatSort, Sort} from "@angular/material/sort";
import {ConfirmService} from "../../../service/confirm.service";
import {MatPaginator} from "@angular/material/paginator";
import {EntrepriseService} from "../../../service/parametrage/entreprise.service";

@Component({
  selector: 'app-departement-list',
  templateUrl: './departement-list.component.html',
  styleUrls: ['./departement-list.component.css']
})
export class DepartementListComponent implements OnInit {

  columnsToDisplay = ["#", "nom","locale","entreprise","Action"];
  // @ts-ignore
  @ViewChild(MatSort) sort:MatSort;
  // @ts-ignore
  @ViewChild(MatPaginator) paginator:MatPaginator;

  constructor(private departementService: DepartementService,private confirmService:ConfirmService,private entrepriseService: EntrepriseService) { }

  ngOnInit(): void {
    this.departementService.findAll().subscribe(
      data => {
        this.listDepartement.data=data;
        this.listDepartement.sort=this.sort;
        this.listDepartement.paginator=this.paginator;
      },
      error => {
        console.log(error);
      }
    );
    this.entrepriseService.findAll().subscribe(
      data =>{
        this.entrepriseService.entrepriseList.data = data;
      },error => {
        console.log(error);
      }
    );
  }
  ngAfterViewInit() {
  }
  get listDepartement(){
    return this.departementService.departementList;
  }

  filtring(event: Event){
    let value: string=(event.target as HTMLInputElement).value;
    this.listDepartement.filter=value.trim().toLowerCase();
  }
  sortData(sort: Sort) { this.listDepartement.sort = this.sort;}

  getInfo(row: Depatement){
    return this.departementService.departementInfo(row);
  }
  OnEdit(row:Depatement,i:number){
    return this.departementService.onEdit(row,i);
  }
  delete(row:Depatement,index:number){
    this.confirmService.openConfirmDialog('Are you sure to delete !?').afterClosed().subscribe(
      res=>{
        if(res){
          return  this.departementService.delete(row,index);

        }
      }
    );
  }
}
