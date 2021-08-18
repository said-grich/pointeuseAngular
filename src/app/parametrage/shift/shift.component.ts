import { Component, OnInit } from '@angular/core';
import {ShiftService} from "../../service/parametrage/shift.service";

@Component({
  selector: 'app-shift',
  templateUrl: './shift.component.html',
  styleUrls: ['./shift.component.css']
})
export class ShiftComponent implements OnInit {

  constructor(private  shiftService:ShiftService) { }

  ngOnInit(): void {
  }
  filtring(event: Event){
    let value: string=(event.target as HTMLInputElement).value;
    this.ShiftList.filter=value.trim().toLowerCase();
  }
  get ShiftList(){
    return this.shiftService.shiftList;
  }
  createshift(){
    return this.shiftService.createShift();
  }
}
