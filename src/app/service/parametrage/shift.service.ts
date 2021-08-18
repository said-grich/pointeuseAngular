import {Injectable} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Shift} from "../../modeles/parametrage/shift.model";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {ShiftCreateComponent} from "../../parametrage/shift/shift-create/shift-create.component";
import { NgxMaterialTimepickerModule} from "ngx-material-timepicker";
import {NotificationServiceService} from "../notification-service.service";
import {TokenStorageService} from "../login/token-storage.service";

@Injectable({
  providedIn: 'root'
})
export class ShiftService {
  // @ts-ignore
  private _shiftList: MatTableDataSource<Shift>;
  public url: string = "http://localhost:8036/pionteuse/shift/";
  // @ts-ignore
  private _index: number;
  // @ts-ignore
  private _shift: Shift;
  // @ts-ignore
  private _pickerentree: NgxMaterialTimepickerModule;
  // @ts-ignore
  private _pickersortie: NgxMaterialTimepickerModule;
  private row!: Shift;
  private oldename!: string;

  constructor(private http: HttpClient, private createModale: MatDialog, private notificationService: NotificationServiceService , private tokenService:TokenStorageService) {
  }

  public findAll() {

    let token :any =this.tokenService.getToken();
    token = "Bearer "+token;
    let httpHeaders = new HttpHeaders({"Authorization":token})
    return this.http.get<Array<Shift>>(this.url,{headers:httpHeaders})
  };

  shiftCreateForm: FormGroup = new FormGroup({
    $key: new FormControl(null),
    nom: new FormControl('', Validators.required),
    entree: new FormControl('', Validators.required),
    sortie: new FormControl('', Validators.required),
  });

  createShift() {
    this._index = -1;
    const dialogConfig: MatDialogConfig = new MatDialogConfig<any>();
    dialogConfig.disableClose = true;
    dialogConfig.width = '70%';
    this.createModale.open(ShiftCreateComponent, dialogConfig);
  }

  saveOrupdate(i: number) {
    this.index = i;
    if (i > 0) {
      return "Update";
    } else {
      return "Save"

    }
  }

  public save(shift: Shift, oldname: string) {
    let token :any =this.tokenService.getToken();
    token = "Bearer "+token;
    let httpHeaders = new HttpHeaders({"Authorization":token})
    if (this.index > 0) {
      if (shift != null) {
        this.http.put<number>(this.url + oldname, shift ,{headers:httpHeaders}).subscribe(
          data => {
            this.shiftList.data.push(this._shift);
            this.notificationService.showNotificationsucces(oldname + "  Updtated");
            this.refresh();
          }
        );
      }
    } else {
      if (shift != null) {
        this.http.post<number>(this.url, shift,{headers:httpHeaders}).subscribe(
          data => {
            if (data == 1) {
              this.shiftList.data.push(this._shift);
              this.refresh();
              this.notificationService.showNotificationsucces(this.shift.nom + " Saved");
            } else {
              this.notificationService.showNotificationError(this.shift.nom + " Already exist");
            }
          }
        );
      }
    }
  }

  refresh() {
    this.findAll().subscribe(
      data => {
        // @ts-ignore
        this.shiftList.data = data;
      }
    )
  }

  onSubmit() {
    this.shift.nom = this.shiftCreateForm.controls['nom'].value;
    this.shift.heurDentree = this.conver12To24(this.shiftCreateForm.controls['entree'].value);
    this.shift.heurDsortie = this.conver12To24(this.shiftCreateForm.controls['sortie'].value);
    this.save(this.shift, this.oldename);
    this.onClose();
  }

  conver12To24(entree: string) {
    let test = entree.split(' ');
    if (test[1] == 'PM') {
      entree = this.toDate(test[0]);
    }
    return entree;
  }

  toDate(dStr: string) {
    var now = new Date();
    now.setHours(Number(dStr.substr(0, dStr.indexOf(":"))));
    now.setMinutes(Number(dStr.substr(dStr.indexOf(":") + 1)));
    now.setSeconds(0);


    let a: string = "" + now.getHours();
    if (a === "12") {
      a = "00";
    } else {
      let tmp: number = parseInt(a, 10) + 12;
      a = "" + tmp;
    }
    let b: string = "" + now.getMinutes();
    return a + ":" + b;
  }

  onClose() {
    this.shiftCreateForm.reset();
    this.createModale.closeAll();
    this.refresh();
  }

  onEdit(row: Shift, i: number) {
    this.oldename = row.nom;
    console.log(this.getformagain(row.heurDentree.toString()));
    this.shift = row;
    this.shiftCreateForm.patchValue({
      nom: row.nom,
      entree: this.getformagain(row.heurDentree.toString()),
      sortie: this.getformagain(row.heurDsortie.toString()),
    });
    const dialogConfig: MatDialogConfig = new MatDialogConfig<any>();
    dialogConfig.disableClose = true;
    dialogConfig.width = '60%';
    this.createModale.open(ShiftCreateComponent, dialogConfig);
    this.createOrUpdate(1);
  }
  getformagain(time:string){
    let s = time.split(':');
    let a =s[0];
    let b=s[1];
    console.log(s);
    let c= "";
    if(a >"12"|| a ==="00"){
      c=""+a+":"+b+" PM";
    }
    else {
      c=""+a+":"+b+" AM";
    }
    console.log(c);
    return c;
  }
  getshiftInfo(row: Shift) {
    this.row = row;
  }
  delete(row: Shift, index: number) {
    let token :any =this.tokenService.getToken();
    token = "Bearer "+token;
    let httpHeaders = new HttpHeaders({"Authorization":token})
    this.http.delete(this.url + "nom/" + row.nom,{headers:httpHeaders}).subscribe(
      data => {
        if (data > 0) {
          this.shiftList.data.splice(index, 1);
          this.refresh();
          this.notificationService.showNotificationError(row.nom + ' Deleted');
        }
      }
    )
  }
  createOrUpdate(i: number): string {
    this.index = i;
    if (i > 0) {
      return "Update Shift";
    } else {
      return "Create Shift"
    }
  }

  get shiftList(): MatTableDataSource<Shift> {
    if (this._shiftList == null) {
      this._shiftList = new MatTableDataSource<Shift>();
    }
    return this._shiftList;
  }

  set shiftList(value: MatTableDataSource<Shift>) {
    this._shiftList = value;
  }

  get index(): number {
    return this._index;
  }

  set index(value: number) {
    this._index = value;
  }


  get pickerentree(): NgxMaterialTimepickerModule {
    return this._pickerentree;
  }

  set pickerentree(value: NgxMaterialTimepickerModule) {
    this._pickerentree = value;
  }

  get pickersortie(): NgxMaterialTimepickerModule {
    return this._pickersortie;
  }

  set pickersortie(value: NgxMaterialTimepickerModule) {
    this._pickersortie = value;
  }

  get shift(): Shift {
    if (this._shift == null) {
      this._shift = new Shift();
    }
    return this._shift;
  }

  set shift(value: Shift) {
    this._shift = value;
  }
}
