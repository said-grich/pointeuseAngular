import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Attendence} from "../modeles/attendence.model";
import {ChildeDatatabele} from "../modeles/childe-datatabele.model";
import {Employe} from "../modeles/parametrage/employe.model";
import {EmployeService} from "./parametrage/employe.service";
import {TokenStorageService} from "./login/token-storage.service";

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  private _url:string="http://localhost:8036/pointeuse/attendance/";
  // @ts-ignore
  private _attendance:Attendence;
  // @ts-ignore
  private _listAttendance:Array<Attendence>;
  constructor(private  _http:HttpClient ,private  employservice:EmployeService,private  tokenService:TokenStorageService) { }
  // @ts-ignore
  private _listEmployeAttendance:Array<ChildeDatatabele>;
  // @ts-ignore
  private _listEmp:Array<Employe>;

public findAll(){

    this._http.get<Array<Attendence>>(this._url+"today/").subscribe(
      data=>{
        this.listAttendance=data;

      }
    )
}
public  getAttendanceMonth(){

  this.employservice.findAll().subscribe(
    data=>{
      this.listEmp=data;

    }
  );
    this.http.get<Array<Attendence>>(this._url).subscribe(
      data=>{


        this.listAttendance=data;
        this.listEmployeAttendance=this.sortlistAttendence(data);

      }
    )
}
  get listAttendance(): Array<Attendence> {
    if (this._listAttendance==null){
      this._listAttendance=new  Array<Attendence>();
    }
    return this._listAttendance;
  }

  set listAttendance(value: Array<Attendence>) {
    this._listAttendance = value;
  }

  get attendance(): Attendence {
    if (this._attendance==null){
      this._attendance=new  Attendence();
    }
    return this._attendance;
  }

  set attendance(value: Attendence) {
    this._attendance = value;
  }

  get http(): HttpClient {
    return this._http;
  }

  set http(value: HttpClient) {
    this._http = value;
  }
  public tominute(heur:string,minute:string) {
    let h=Number(heur);
    h=h*60;
    h+=Number(minute);

    return h;
  }
  public toheur(h:number) {

    let hours = Math.floor(h / 60);
    let minutes = h % 60;
    console.log(hours + ":" + minutes)
    return hours + ":" + minutes;
  }
  public sortlistAttendence(attendancelist:Array<Attendence>){
    let total:number=0;
    let listEmployeAttendance:Array<ChildeDatatabele> =new Array<ChildeDatatabele>();
    this.listEmp.forEach(employ => {
      let childAttendances:ChildeDatatabele=new ChildeDatatabele();
      let listAttendance:Array<Attendence>=new Array<Attendence>();
      attendancelist.forEach(attendance =>{
        if(attendance.employeDto.nom==employ.nom){
          listAttendance.push(attendance);
          if (attendance.totalheure!=null){
            let trimString= attendance.totalheure.split(":");
            total+=this.tominute(trimString[0],trimString[1]);
          }
        }
      } );
      childAttendances.employe=employ;
      childAttendances.attendenceList=listAttendance;
      childAttendances.total=this.toheur(total);
      total=0;
      listEmployeAttendance.push(childAttendances);

    })
    return listEmployeAttendance;
  }
    public  Today(){
      let token :any =this.tokenService.getToken();
      token = "Bearer "+token;
      let httpHeaders = new HttpHeaders({"Authorization":token})
    return   this.http.get<Array<Attendence>>("http://localhost:8036/pointeuse/attendance/today/");
    }

  get listEmployeAttendance(): Array<ChildeDatatabele> {
  if(this._listEmployeAttendance==null){
    this._listEmployeAttendance=new Array<ChildeDatatabele>();
  }
    return this._listEmployeAttendance;
  }

  set listEmployeAttendance(value: Array<ChildeDatatabele>) {
    this._listEmployeAttendance = value;
  }

  get listEmp(): Array<Employe> {
  if(this._listEmp==null){
    this._listEmp=new  Array<Employe>();
  }
    return this._listEmp;
  }

  set listEmp(value: Array<Employe>) {
    this._listEmp = value;
  }
}
