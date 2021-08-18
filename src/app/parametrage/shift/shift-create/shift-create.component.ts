import { Component, OnInit } from '@angular/core';
import {ShiftService} from "../../../service/parametrage/shift.service";
import {NgxMaterialTimepicker24HoursFaceComponent} from "ngx-material-timepicker";

@Component({
  selector: 'app-shift-create',
  templateUrl: './shift-create.component.html',
  styleUrls: ['./shift-create.component.css']
})
export class ShiftCreateComponent implements OnInit {

  constructor(private  _shiftService:ShiftService) { }

  ngOnInit(): void {
  }
  onClose(){
    return this._shiftService.onClose();
  }
  test(){

  }
  test2(){
  return this._shiftService.saveOrupdate(this.index);
  }
  oneSubmit(){
return this._shiftService.onSubmit();
  }

  get shiftService(): ShiftService {
    return this._shiftService;
  }
  get peckerentree(){
    return this._shiftService.pickerentree;
  }

  get peckersortie() {
    return this._shiftService.pickersortie;
  }
  get index(){
    return this._shiftService.index;
  }
}
