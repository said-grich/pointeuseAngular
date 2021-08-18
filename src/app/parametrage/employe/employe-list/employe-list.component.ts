import {Component, OnInit, ViewChild} from '@angular/core';
import {EmployeService} from "../../../service/parametrage/employe.service";
import {ConfirmService} from "../../../service/confirm.service";
import {MatSort, Sort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {Employe} from "../../../modeles/parametrage/employe.model";
@Component({
  selector: 'app-employe-list',
  templateUrl: './employe-list.component.html',
  styleUrls: ['./employe-list.component.css']
})
export class EmployeListComponent implements OnInit {
  listUtilisateurs: Employe[] = [];
  displayedColumns: string[] = ['employe_Id', 'fullName', 'groupe', 'shift', 'adresse', 'Email', 'telephone', 'statut', 'action'];

  constructor(private employeService: EmployeService, private confirmService: ConfirmService) {
  }

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.employeService.findAll().subscribe(
      data => {
        this.listEmploye.data = data;
        this.listEmploye.sort = this.sort;
        this.listEmploye.paginator = this.paginator;
        console.log(data);
      }
    );
  }

  ngAfterViewInit() {
  }

  filtring(event: Event) {
    let value: string = (event.target as HTMLInputElement).value;
    this.listEmploye.filter = value.trim().toLowerCase();
  }

  sortData(sort: Sort) {
    this.listEmploye.sort = this.sort;
  }

  get listEmploye() {
    return this.employeService.employes;
  }

  getInfo(row: Employe) {
   // return this.employeService.employeInfo(row);
    console.log(row.statu);
  }

  OnEdit(row: Employe, i: number) {
    return this.employeService.onEdit(row, i);
  }

  delete(row: Employe, index: number) {
    this.confirmService.openConfirmDialog('Est ce que vous voulez vraiment supprimer cet employe!?').afterClosed().subscribe(
      resultat => {
        if (resultat) {
          return this.employeService.delete(row, index);
        }
      }
    );
  }
}

