import { Component, OnInit } from '@angular/core';
import {AttendanceService} from "../../service/attendance.service";
import {Attendence} from "../../modeles/attendence.model";
import {ChildeDatatabele} from "../../modeles/childe-datatabele.model";
import {Employe} from "../../modeles/parametrage/employe.model";
import {EmployeService} from "../../service/parametrage/employe.service";

@Component({
  selector: 'app-month',
  templateUrl: './month.component.html',
  styleUrls: ['./month.component.css']
})
export class MonthComponent implements OnInit {

  constructor(private attendanceService:AttendanceService ,private  employeService:EmployeService) { }


  ngOnInit(): void {
    this.employeService.findAll();
    this.attendanceService.getAttendanceMonth();
    console.log (this.attendanceService.listEmployeAttendance);
  }
get attendanceMonth(){
    return this.attendanceService.listAttendance;
}
set attendanceMonth(value){
  this.attendanceService.listAttendance= value;
}

get listEmployeAttendance(){
    return this.attendanceService.listEmployeAttendance;
}

}
