import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {EntrepriseService} from "../../../service/parametrage/entreprise.service";
import {Entreprise} from "../../../modeles/parametrage/entreprise.model";
import {MatSort, Sort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {ConfirmService} from "../../../service/confirm.service";
import {DepartementService} from "../../../service/parametrage/departement.service";
@Component({
  selector: 'app-entreprise-list',
  templateUrl: './entreprise-list.component.html',
  styleUrls: ['./entreprise-list.component.css']
})
export class EntrepriseListComponent implements OnInit,AfterViewInit  {
  // @ts-ignore
  columnsToDisplay = ["#", "name","address","email","telephone_number","Action"];
  // @ts-ignore
  public name: String;
  // @ts-ignore
@ViewChild(MatSort) sort:MatSort;
// @ts-ignore
  @ViewChild(MatPaginator) paginator:MatPaginator;
  constructor(private entrepriseService: EntrepriseService,private confirmService:ConfirmService, private departementService: DepartementService){
  }
  ngOnInit(): void {
    this.entrepriseService.findAll().subscribe(
      data => {
        this.listEntreprise.data=data;
        this.listEntreprise.sort=this.sort;
        this.listEntreprise.paginator=this.paginator;
      },
      error => {
        console.log(error);
      }
    );
    this.departementService.findAll().subscribe(
      data=>{
        this.listDepartement.data = data;
      },
      error => {
        console.log(error);
      }
    );

  }

  ngAfterViewInit() {
  }
  filtring(event: Event){
    let value: string=(event.target as HTMLInputElement).value;
    this.listEntreprise.filter=value.trim().toLowerCase();
  }
  sortData(sort: Sort) { this.listEntreprise.sort = this.sort;}

  get listEntreprise(){
    return this.entrepriseService.entrepriseList;
  }
  get listDepartement(){
    return this.departementService.departementList;
  }
  getInfo(row: Entreprise){
    return this.entrepriseService.entrepriseInfo(row);
  }
  OnEdit(row:Entreprise,i:number){
    return this.entrepriseService.onEdit(row,i);
  }
  delete(row:Entreprise,index:number){
    this.confirmService.openConfirmDialog('Are you sure to delete !?').afterClosed().subscribe(
      res=>{
        if(res){
          return  this.entrepriseService.delete(row,index);

        }
      }
    );
  }
  getinfoOfrow(row: Entreprise){
    return this.entrepriseService.getentrepriseInfo(row);
  }
}


