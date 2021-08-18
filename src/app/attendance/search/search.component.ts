import {Component, OnInit} from '@angular/core';
import {IDropdownSettings} from 'ng-multiselect-dropdown';
import {EmployeService} from "../../service/parametrage/employe.service";
import {Employe} from "../../modeles/parametrage/employe.model";
import {Moment} from "moment";
import {SearchVo} from "../../modeles/search-vo.model";
import {HttpClient} from "@angular/common/http";
import {Attendence} from "../../modeles/attendence.model";
import {ChildeDatatabele} from "../../modeles/childe-datatabele.model";
import {Time} from "ngx-bootstrap/timepicker/timepicker.models";
import * as moment from "moment";


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  // @ts-ignore
  selected: { start: Moment; end: Moment; };
  private selectedEmploye=[];
  // @ts-ignore
  private _listAttendence:Array<Attendence>;

  // @ts-ignore
  private _searchvo:SearchVo;
  // @ts-ignore
  private _listEmployeAttendance:Array<ChildeDatatabele>;

  constructor(private employeService: EmployeService, private  http:HttpClient) {
  }
private url:string="http://localhost:8036/pointeuse/attendance/multi";
  dropdownList = [];
  List: Array<Employe> = new Array<Employe>();
  ListEmp: Array<Employe> = new Array<Employe>();
  selectedItems = [];
  dropdownSettings: IDropdownSettings = {
    singleSelection: false,
    idField: 'item_id',
    textField: 'item_text',
    selectAllText: 'Select All',
    unSelectAllText: 'UnSelect All',
    itemsShowLimit: 3,
    allowSearchFilter: true
  };
  columnsToDisplay = ['No.', 'Nom', 'Group', 'Shift', 'Statut'];
  // @ts-ignore
  expandedElement: ChildeDatatabele  ;

  ngOnInit() {
    this.employeService.findAll().subscribe(
      data => {
        let tmp: { item_id: number; item_text: string; }[] = [];
        data.forEach((value, index) => {
            tmp.push({item_id: index, item_text: value.nom});
            this.ListEmp=data;
          }
        );
        // @ts-ignore
        this.dropdownList = tmp;
      })

  }
  onItemSelect(item: any) {
    // @ts-ignore
    this.selectedEmploye.push(item);

  }

  onSelectAll(items: any) {
    this.selectedEmploye=items;
  }
  onDeselect(item:any){
    this.selectedEmploye.splice(item.item_text,1)
  }
  onSubmite(){
  this.selectedItems.forEach(value => {
   let employe :Employe =new  Employe();
   employe.nom=value['item_text'];
   this.List.push(employe);
  });
  this.searchvo.employeDtoList=this.List;
  let start:Date=this.selected.start.toDate();
  let end :Date=this.selected.end.toDate();
  if (this.selected.start==this.selected.end){
    this.searchvo.firstDate=start;
  } else {
    this.searchvo.firstDate=start;
    this.searchvo.lastDate=end;
  }
  this.http.post<Array<Attendence>>(this.url,this.searchvo).subscribe(
    data=>{
      this.searchvo= new  SearchVo();
      this.listAttendence=data;
      this.listEmployeAttendance= this.sortlistAttendence(data);
    }
  )

  }
  get searchvo(): SearchVo {
    if (this._searchvo==null){
      this._searchvo=new SearchVo();
    }
    return this._searchvo;
  }
  set searchvo(value: SearchVo) {
    this._searchvo = value;
  }

  get listAttendence(): Array<Attendence> {
    if (this._listAttendence ==null){
      this._listAttendence=new Array<Attendence>();
    }
    return this._listAttendence;
  }

  set listAttendence(value: Array<Attendence>) {
    this._listAttendence = value;
  }
  public sortlistAttendence(attendancelist:Array<Attendence>){
    let total:number=0;
   let listEmployeAttendance:Array<ChildeDatatabele> =new Array<ChildeDatatabele>();
   this.ListEmp.forEach(employ => {
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

  get listEmployeAttendance(): Array<ChildeDatatabele> {
    if (this._listEmployeAttendance ==null){
      this._listEmployeAttendance=new Array<ChildeDatatabele>();
    }
    return this._listEmployeAttendance;
  }

  set listEmployeAttendance(value: Array<ChildeDatatabele>) {
    this._listEmployeAttendance = value;
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
    return hours + ":" + minutes;
  }
}
