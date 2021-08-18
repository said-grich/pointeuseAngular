import { Component, OnInit } from '@angular/core';
import {AttendanceService} from "../../service/attendance.service";
import {HttpClient} from "@angular/common/http";
import {Attendence} from "../../modeles/attendence.model";

@Component({
  selector: 'app-attendece-day',
  templateUrl: './attendece-day.component.html',
  styleUrls: ['./attendece-day.component.css']
})
export class AttendeceDayComponent implements OnInit {

  constructor(private attendanceSerivce:AttendanceService,private  http:HttpClient) { }
// @ts-ignore
  private _attendenceList:Array<Attendance>;
  ngOnInit(): void {
   this.attendanceSerivce.Today().subscribe(
       data=> {
         this.attendenceList = data
       }
   )
  }
  get attendenceList(): Array<Attendence> {
    if (this._attendenceList==null){
      this._attendenceList=new Array<Attendence>();
    }
    return this._attendenceList;
  }

  set attendenceList(value: Array<Attendence>) {
    this._attendenceList = value;
  }
}
