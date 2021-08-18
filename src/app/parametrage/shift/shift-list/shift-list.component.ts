import {Component, OnInit, ViewChild} from '@angular/core';
import {ShiftService} from "../../../service/parametrage/shift.service";
import {findAll} from "@angular/compiler-cli/ngcc/src/utils";
import {Shift} from "../../../modeles/parametrage/shift.model";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {ConfirmService} from "../../../service/confirm.service";

@Component({
  selector: 'app-shift-list',
  templateUrl: './shift-list.component.html',
  styleUrls: ['./shift-list.component.css']
})
export class ShiftListComponent implements OnInit {

  constructor(private  shiftService:ShiftService,private  confirmService:ConfirmService) { }
  columnsToDisplay = ["nom","entree","sortie","total","Action"];
// @ts-ignore
  @ViewChild(MatSort) sort:MatSort;
  // @ts-ignore
  @ViewChild(MatPaginator) paginator:MatPaginator;
  ngOnInit(): void {
    this.findAll();
  }
  findAll(){
     this.shiftService.findAll().subscribe(
      data=>{
        this.ShiftList.data=data;
        this.ShiftList.sort=this.sort;
        this.ShiftList.paginator=this.paginator;
      }
    );
  }
  get ShiftList(){
    return this.shiftService.shiftList;
  }
  getInfo(row:Shift){

  }
  OnEdit(row:Shift,index:number){
      return this.shiftService.onEdit(row,index);
  }
  delete(row:Shift,index:number){
    this.confirmService.openConfirmDialog('Est ce que vous voulez vraiment supprimer cet employe!?').afterClosed().subscribe(
      resultat=>{
        if (resultat){
          return this.shiftService.delete(row,index);
        }
      }
    );
  }
  filtring(event: Event) {
    let value: string = (event.target as HTMLInputElement).value;
    this.ShiftList.filter = value.trim().toLowerCase();
  }
}
