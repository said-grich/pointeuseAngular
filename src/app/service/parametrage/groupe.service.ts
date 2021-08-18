import { Injectable } from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {GroupeCreateComponent} from "../../parametrage/groupes/groupe-create/groupe-create.component";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {NotificationServiceService} from "../notification-service.service";
import {Groupe} from "../../modeles/parametrage/groupe.model";
import {MatTableDataSource} from "@angular/material/table";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {GroupeInfoComponent} from "../../parametrage/groupes/groupe-info/groupe-info.component";
import {EntrepriseCreateComponent} from "../../parametrage/entreprises/entreprise-createOrUpdate/entreprise-create.component";
import {Depatement} from "../../modeles/parametrage/depatement.model";
import {Shift} from "../../modeles/parametrage/shift.model";
import {TokenStorageService} from "../login/token-storage.service";

@Injectable({
  providedIn: 'root'
})
export class GroupeService {
  // @ts-ignore
  private _groupe: Groupe;
  // @ts-ignore
  private _oldename: string;
  // @ts-ignore
  private _shiftlist: Array<Shift>;
  // @ts-ignore
  private _groupeList: MatTableDataSource<Groupe>;
  // @ts-ignore
  private _departementList: Array<Depatement>;
  private _url: string =
    "http://localhost:8036/pointeuse/groupe/";
  private _url1: string = "http://localhost:8036/pointeuse/departement/";

  // @ts-ignore
  private _index: number;

  constructor(private http: HttpClient, private createModale: MatDialog, private infoModal: MatDialog
    , private notificationService: NotificationServiceService, private tokenService:TokenStorageService) {
  }

  public findAllDepartement() {
    return this.http.get<Array<Depatement>>(this._url1);
  }
public  findAllShifts(){
  let token :any =this.tokenService.getToken();
  token = "Bearer "+token;
  let httpHeaders = new HttpHeaders({"Authorization":token})
    return this.http.get<Array<Shift>>("http://localhost:8036/pionteuse/shift/",{headers:httpHeaders}).subscribe(
      data=>{
        this.shiftlist=data;
      }
    );
}
  groupeCreateForm: FormGroup = new FormGroup({
    $key: new FormControl(null),
    nom: new FormControl('', Validators.required),
    departement: new FormControl('', Validators.required),
    shift: new FormControl('',Validators.required),
    groupe_id: new FormControl('', [Validators.required, Validators.minLength(4)]),
  });

  public findAll() {
    return this.http.get<Groupe[]>(this._url);
  }
  createGroupe() {
    this._index = -1;
    const dialogConfig: MatDialogConfig = new MatDialogConfig<any>();
    dialogConfig.disableClose = true;
    dialogConfig.width = '70%';
    this.createModale.open(GroupeCreateComponent, dialogConfig);
  }
  groupeInfo(row: Groupe) {
    const dialogConfig: MatDialogConfig = new MatDialogConfig<any>();
    dialogConfig.width = '80%';
    dialogConfig.panelClass = 'info-modale-style';
    this.infoModal.open(GroupeInfoComponent, dialogConfig);
    this.getgroupeInfo(row);
  }

  saveOrupdate(i: number) {
    this.index = i;
    if (i > 0) {
      return "Update";
    } else {
      return "Save"

    }
  }

  onEdit(row: any, i: number) {
    this.oldename = row.nom;
    console.log(row);
    this.groupeCreateForm.patchValue({
      nom: row.nom,
      departement: row.departement.nom,
      groupe_id: row.group_id
    });
    const dialogConfig: MatDialogConfig = new MatDialogConfig<any>();
    dialogConfig.disableClose = true;
    dialogConfig.width = '60%';
    this.createModale.open(GroupeCreateComponent, dialogConfig);
    this.createOrUpdate(1);
  }

  createOrUpdate(i: number): string {
    this.index = i;
    if (i > 0) {
      return "Update Groupe";
    } else {
      return "Create Groupe"
    }
  }

  public save(groupe: Groupe, oldname: string) {

    if (this.index > 0) {
      if (groupe != null) {
        this.http.put<number>(this._url + oldname, groupe).subscribe(
          data => {
            this.groupeList.data.push(this.groupe);
            this.notificationService.showNotificationsucces(oldname + "  Updtated");
            this.refresh();
          }
        );
      }
    } else {
      if (groupe != null) {
        this.http.post<number>(this._url, groupe).subscribe(
          data => {
            if (data == 1) {
              this.groupeList.data.push(this.groupe);
              this.refresh();
              this.notificationService.showNotificationsucces(this.groupe.nom + " Saved");
            } else {
              this.notificationService.showNotificationError(this.groupe.nom + " Already exist");
            }
          }
        );
      }
    }
  }

  delete(row: Groupe, index: number) {

    this.http.delete(this._url + "nom/" + row.nom).subscribe(
      data => {
        if (data > 0) {
          this.groupeList.data.splice(index, 1);
          this.refresh();
          this.notificationService.showNotificationError(row.nom + ' Deleted');
        }
      }
    )
  }

  refresh() {
    this.findAll().subscribe(
      data => {
        // @ts-ignore
        this.groupeList.data = data;
      }
    )
  }

  onSubmit() {
    this.groupe.group_id = this.groupeCreateForm.controls['groupe_id'].value;
    this.groupe.nom = this.groupeCreateForm.controls['nom'].value;
    this.groupe.departement1.nom = this.groupeCreateForm.controls['departement'].value;
    this.groupe.getshift.nom=this.groupeCreateForm.controls['shift'].value;
    this.save(this.groupe, this.oldename);
    console.log(this.groupe);
    this.onClose();
  }

  onClose() {
    this.groupeCreateForm.reset();
    this.createModale.closeAll();
    this.refresh();
  }

  getgroupeInfo(row: Groupe) {
    this.row = row;
  }

  // @ts-ignore
  private row: Groupe;

  getrow(): Groupe {
    return this.row;
  }

  private statu !: number;

  getStatu(i: number) {
    this.statu = i;
  }

  get groupe(): Groupe {
    if (this._groupe == null) {
      this._groupe = new Groupe();
    }
    return this._groupe;
  }

  set groupe(value: Groupe) {
    this._groupe = value;
  }

  get oldename(): string {
    return this._oldename;
  }

  set oldename(value: string) {
    this._oldename = value;
  }

  get groupeList(): MatTableDataSource<Groupe> {
    if (this._groupeList == null) {
      this._groupeList = new MatTableDataSource<Groupe>();
    }
    return this._groupeList;
  }

  set groupeList(value: MatTableDataSource<Groupe>) {
    this._groupeList = value;
  }

  get url(): string {
    return this._url;
  }

  set url(value: string) {
    this._url = value;
  }

  get index(): number {
    return this._index;
  }

  set index(value: number) {
    this._index = value;
  }

  get departementList(): Array<Depatement> {
    if (this._departementList == null) {
      this._departementList = new Array<Depatement>();
    }
    return this._departementList;
  }

  set departementList(value: Array<Depatement>) {
    this._departementList = value;
  }


  get shiftlist(): Array<Shift> {
    if(this._shiftlist==null){
      this._shiftlist=new Array<Shift>();
    }
    return this._shiftlist;
  }

  set shiftlist(value: Array<Shift>) {
    this._shiftlist = value;
  }
}
