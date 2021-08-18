import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {ConfirmService} from "../../service/confirm.service";

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data:any,private confirmService:ConfirmService) { }

  ngOnInit(): void {
  }
  onCloseConfirm(){
    return this.confirmService.onCloseConfirm();
  }
}
