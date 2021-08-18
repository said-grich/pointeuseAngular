import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Employe} from "../../modeles/parametrage/employe.model";
import {EmployeService} from "../../service/parametrage/employe.service";
import {ConfirmService} from "../../service/confirm.service";
import {MatSort, Sort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {LoginLog} from "../../modeles/login-log.model";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-login-log',
  templateUrl: './login-log.component.html',
  styleUrls: ['./login-log.component.css']
})
export class LoginLogComponent implements OnInit {

  constructor(private  http:HttpClient) { }
  // @ts-ignore
  private _listLoginlog: MatTableDataSource<LoginLog>;
  displayedColumns: string[] = ['employe_Id', 'fullName', 'groupe', 'shift','statut'];


  ngOnInit(): void {
    this.http.get<LoginLog[]>("http://localhost:8036/pointeuse/Login_Log/").subscribe(
      data=>{
        this.listLoginlog.data=data
        console.log(data);
      }
    )
  }
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  ngAfterViewInit() {
  }

  filtring(event: Event) {
    let value: string = (event.target as HTMLInputElement).value;
    this.listLoginlog.filter= value.trim().toLowerCase();
  }

  sortData(sort: Sort) {
    this.listLoginlog.sort = this.sort;
  }


  get listLoginlog(): MatTableDataSource<LoginLog> {
    if (this._listLoginlog==null){
  this._listLoginlog=new MatTableDataSource<LoginLog>();
    }
    return this._listLoginlog;
  }

  set listLoginlog(value: MatTableDataSource<LoginLog>) {
    this._listLoginlog = value;
  }
}
