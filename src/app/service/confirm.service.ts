import { Injectable } from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ConfirmComponent} from "../pages/confirm/confirm.component";

@Injectable({
  providedIn: 'root'
})
export class ConfirmService {

  constructor(private confirm:MatDialog) { }
  openConfirmDialog(msg:string){
   return  this.confirm.open(ConfirmComponent,{
      width:'390px',
      disableClose:true,
      data:{
        message:msg
      }
    });
  }
  onCloseConfirm(){
    this.confirm.closeAll()
  }
}
