import { Injectable } from '@angular/core';
import {Employe} from "../../modeles/parametrage/employe.model";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {NotificationServiceService} from "../notification-service.service";
import {EmployeCreateComponent} from "../../parametrage/employe/employe-create/employe-create.component";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Entreprise} from "../../modeles/parametrage/entreprise.model";
import {MatTableDataSource} from "@angular/material/table";
import {EntrepriseInfoComponent} from "../../parametrage/entreprises/entreprise-info/entreprise-info.component";
import {EntrepriseCreateComponent} from "../../parametrage/entreprises/entreprise-createOrUpdate/entreprise-create.component";
import {Groupe} from "../../modeles/parametrage/groupe.model";
import {Shift} from "../../modeles/parametrage/shift.model";
import {group} from "@angular/animations";
import {TokenStorageService} from "../login/token-storage.service";

@Injectable({
  providedIn: 'root'
})
export class EmployeService {

  public index!: number;
  public oldname!: string;
  public _employe!: Employe;
  public _employeList!: Array<Employe>;
  public _url: string = "http://localhost:8036/pointeuse/employe/";
  private _employes!:MatTableDataSource<Employe>;
  private _groupeList!: Array<Groupe>;
  private _url1: string = "http://localhost:8036/pointeuse/groupe/";


  constructor(public http: HttpClient,public createModale:MatDialog,public infoModal:MatDialog
    ,public notificationService:NotificationServiceService,private tokenService:TokenStorageService) { }



  get groupeList(): Array<Groupe> {
    if (this._groupeList==null){
      this._groupeList = new Array<Groupe>();
    }
    return this._groupeList;
  }

  set groupeList(value: Array<Groupe>) {
    this._groupeList = value;
  }
  get employes(): MatTableDataSource<Employe> {
    if (this._employes==null){
      this._employes = new MatTableDataSource<Employe>();
    }
    return this._employes;
  }

  set employes(value: MatTableDataSource<Employe>) {
    this._employes = value;
  }

  get employe(): Employe {
    if (this._employe==null){
      this._employe = new Employe();
    }
    return this._employe;
  }

  set employe(value: Employe) {
    this._employe = value;
  }

  get employeList(): Array<Employe> {
    if (this._employeList==null){
      this._employeList=new Array<Employe>();
    }
    return this._employeList;
  }

  set employeList(value: Array<Employe>) {
    this._employeList = value;
  }



  public save(employe: Employe,oldname:string) {
//

    if(this.index>0){
      if (employe != null){
        this.http.put<number>(this._url+oldname,employe).subscribe(
          data=>{
            this.employes.data.push(this.employe);
            this.notificationService.showNotificationsucces(oldname+"  Updtated");
            this.refresh();
          }
        );
      }
    }
    else {
      if (employe!= null) {
        this.http.post<number>(this._url, employe).subscribe(
          data => {
            if (data == 1) {
              this.employes.data.push(this.employe);
              this.refresh();
              this.notificationService.showNotificationsucces(this.employe.nom+" Saved");
            } else {
              console.log(data);
            }
          }
        );
      }
    }
  }


  createEmploye(){
    this.index=-1;
    const dialogConfig:MatDialogConfig=new MatDialogConfig<any>();
    dialogConfig.disableClose=true;
    dialogConfig.width='70%';
    this.createModale.open(EmployeCreateComponent,dialogConfig);
  }
  employeCreateForm: FormGroup = new FormGroup({
    $key: new FormControl(null),
    fullName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.email, Validators.required]),
    adresse: new FormControl('', Validators.required),
    groupe: new FormControl('', Validators.required),
    employe_Id:new FormControl('', [Validators.required,Validators.minLength(4)]),
    telephone: new FormControl('', [Validators.required, Validators.minLength(10),Validators.maxLength(10)]),
  });
  onClose(){
    this.employeCreateForm.reset();
    this.createModale.closeAll();
    this.refresh();
  }
  refresh() {
    this.findAll().subscribe(
      data => {
        this.employes.data = data;
      }
    )
  }
  createOrUpdate(i :number):string{
    this.index=i;
    if(i>0){
      return "Update Employe";
    }
    else {
      return  "Create Employe"
    }
  }
  saveOrupdate(i: number) {
    this.index = i;
    if (i > 0) {
      return "Update";
    } else {
      return "Save"

    }
  }
  onSubmit() {
    this.employe.employe_Id = this.employeCreateForm.value.employe_Id;
    this.employe.adresse = this.employeCreateForm.value.adresse;
    this.employe.nom=this.employeCreateForm.controls["fullName"].value;
    this.employe.email = this.employeCreateForm.controls['email'].value;
    this.employe.telephone = this.employeCreateForm.value.telephone;
    this.employe.setgroupe =new Groupe();
    this.employe.getgroupe.nom = this.employeCreateForm.value.groupe;
    this.save(this.employe,this.oldname);
    this.onClose();
  }
  public findAll() {
//
    return this.http.get<Array<Employe>>(this._url);
  }
  delete(row: Employe, index: number) {
//
    this.http.delete(this._url+"nom/" + row.nom,).subscribe(
      data=>{
        if (data>0){
          this.employes.data.splice(index,1);
          this.refresh();
          this.notificationService.showNotificationError(row.nom + 'a été supprimer avec succès');
        }
      }
    )
  }

  employeInfo(row: Employe) {
    const dialogConfig: MatDialogConfig = new MatDialogConfig<any>();
    dialogConfig.width = '80%';
    dialogConfig.panelClass='info-modale-style';
    this.infoModal.open(EntrepriseInfoComponent, dialogConfig);
    this.getemployeInfo(row);
  }
  private  row!:Employe;
  getemployeInfo(row :Employe){
    this.row=row;
  }
  getrow(): Employe{
    return this.row;
  }

  onEdit(row:Employe,i:number){
    this.oldname=row.nom;
    console.log(this.oldname);

    this.employeCreateForm.patchValue({
      fullName: row.nom,
      telephone:row.telephone,
      employe_Id:row.employe_Id,
      groupe:row.groupe!=null?row.groupe.nom:'select a group',
      adresse:row.adresse,
      email:row.email,
    });
    const dialogConfig:MatDialogConfig=new MatDialogConfig<any>();
    dialogConfig.disableClose=true;
    dialogConfig.width='60%';
    this.createModale.open(EmployeCreateComponent,dialogConfig);
    this.createOrUpdate(1);
  }
  public findAllGroupe(){
//
    return this.http.get<Array<Groupe>>(this._url1).subscribe(
      data=>{
        this.groupeList = data;
        console.log(this.groupeList=data);
      },error => {
        alert('Error');
      }
    );
  }
}
