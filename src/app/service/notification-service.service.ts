import { Injectable } from '@angular/core';
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class NotificationServiceService {

  constructor(private snackbar:MatSnackBar) { }

  ngOnInit(): void {
  }
  showNotificationsucces(displayMsg:string){
    const snackSuccs:MatSnackBarConfig={
      panelClass:['alert-primary','alert-custom','alert','fade','shadow'],
      duration:3000,
      horizontalPosition:"right",
      verticalPosition:"bottom",
      }
    ;
    this.snackbar.open(displayMsg,'',snackSuccs);
  }

  showNotificationError(displayMsg: string) {
    const snackSuccs: MatSnackBarConfig = {
        panelClass:['style-error'],
        duration: 4000,
        horizontalPosition: "right",
        verticalPosition: "bottom"
      }
    ;

    this.snackbar.open(displayMsg, '', snackSuccs);
  }
}
