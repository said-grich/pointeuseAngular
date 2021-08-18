import {Injectable} from '@angular/core';
import {Entreprise} from "../../modeles/parametrage/entreprise.model";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {MatTableDataSource} from "@angular/material/table";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import {EntrepriseCreateComponent} from "../../parametrage/entreprises/entreprise-createOrUpdate/entreprise-create.component";
import  * as _ from 'lodash'
import {NotificationServiceService} from "../notification-service.service";
import {EntrepriseInfoComponent} from "../../parametrage/entreprises/entreprise-info/entreprise-info.component";
import {Depatement} from "../../modeles/parametrage/depatement.model";
import {DepartementService} from "./departement.service";
import {TokenStorageService} from "../login/token-storage.service";
@Injectable({
  providedIn: 'root'
})
export class EntrepriseService {
// @ts-ignore
  private _entreprise: Entreprise;
  // @ts-ignore
  private _departementList: Array<Depatement>;
  private oldename!:string;
  // @ts-ignore
  private _entrepriseList: MatTableDataSource<Entreprise>;
  public _url: string = "http://localhost:8036/pointeuse/entreprise/";
  public _url1: string = "http://localhost:8036/pointeuse/departement/";
  // @ts-ignore
  public index:number;
  // @ts-ignore
  private _entreprises: Array<Entreprise>;
  // @ts-ignore
  private _listDepartement: Array<Depatement>;


  constructor(private http: HttpClient,private createModale:MatDialog,private infoModal:MatDialog
              ,private notificationService:NotificationServiceService, private  tokenService:TokenStorageService) {
  }
  public save(entreprise: Entreprise,oldname:string) {

    if(this.index>0){
      if (entreprise != null){
        this.http.put<number>(this._url+oldname, entreprise).subscribe(
          data=>{
            if(data==1){
            this.entrepriseList.data.push(this.entreprise);
            this.notificationService.showNotificationsucces(oldname+"  Updtated");
            this.refresh();
            }
          }
        )
      }
    }
    else {
    if (entreprise != null) {
      this.http.post<number>(this._url, entreprise).subscribe(
        data => {
          if (data == 1) {
            this.entrepriseList.data.push(this.entreprise);
            this.refresh();
            this.notificationService.showNotificationsucces(this.entreprise.name+" Saved");
          } else {
            console.log(data);
          }
        }
      );
    }
    }

  }
  createEntreprise(){
    this.index=-1;
    const dialogConfig:MatDialogConfig=new MatDialogConfig<any>();
    dialogConfig.disableClose=true;
    dialogConfig.panelClass="mat-modale";
    dialogConfig.width='70%';
    this.createModale.open(EntrepriseCreateComponent,dialogConfig);
  }
  entrepriseInfo(row : Entreprise) {
    const dialogConfig: MatDialogConfig = new MatDialogConfig<any>();
    dialogConfig.width = '80%';
    dialogConfig.panelClass='info-modale-style';
    this.infoModal.open(EntrepriseInfoComponent, dialogConfig);
    this.getentrepriseInfo(row);
    this.findByEntrepriseName(row.name);
    this.entreprise=row;
  }
  public findByEntrepriseName(entreprise: String){

    this.http.get<Array<Depatement>>('http://localhost:8036/pointeuse/departement/entreprise/'+ entreprise).subscribe(
      data=>{
        this.listDepartement = data;
        console.log(data);
      },error => {
        alert('OMG');
      }
    )
  }
  get listDepartement(): Array<Depatement> {
    if(this._listDepartement==null){
      this._listDepartement= new Array<Depatement>();
    }
    return this._listDepartement;
  }

  set listDepartement(value: Array<Depatement>) {
    this._listDepartement = value;
  }
  onSubmit() {
    this.entreprise.name = this.entrepriseCreateForm.value.name;
    this.entreprise.adress = this.entrepriseCreateForm.value.adress;
    this.entreprise.email = this.entrepriseCreateForm.value.email;
    this.entreprise.telephone_number = this.entrepriseCreateForm.value.telephone_number;
    this.entreprise.entreprise_id = this.entrepriseCreateForm.value.entreprise_id;
    this.save(this.entreprise,this.oldename);
    this.onClose();
  }
  onClose(){
this.entrepriseCreateForm.reset();
this.createModale.closeAll();
this.refresh();
  }
  refresh(){
    this.findAll().subscribe(
      data=>{
      this.entrepriseList.data=data;
      }
  )
  }
  entrepriseCreateForm: FormGroup = new FormGroup({
    $key: new FormControl(null),
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.email, Validators.required]),
    adress: new FormControl('', Validators.required),
    entreprise_id:new FormControl('', [Validators.required,Validators.minLength(4)]),
    telephone_number: new FormControl('', [Validators.required, Validators.minLength(10)]),
  });

  public findAll() {

    return this.http.get<Entreprise[]>(this._url);
  }
  public findAllDepartement() {
    return this.http.get<Depatement[]>(this._url1);
  }
  get entreprise(): Entreprise {
    if (this._entreprise == null) {
      this._entreprise = new Entreprise();
    }
    return this._entreprise;
  }

  set entreprise(value: Entreprise) {

    this._entreprise = value;
  }


  get entrepriseList(): MatTableDataSource<Entreprise> {
    if (this._entrepriseList == null) {
      this._entrepriseList = new MatTableDataSource<Entreprise>();
    }
    return this._entrepriseList;
  }

  set entrepriseList(value: MatTableDataSource<Entreprise>) {

    this._entrepriseList = value;
  }
  delete(row:Entreprise ,index:number){
    this.http.delete(this._url+"name/"+row.name).subscribe(
      data=>{
        if(data>0){
          this.entrepriseList.data.splice(index,1);
          this.refresh();
          this.notificationService.showNotificationError(row.name+' Deleted');
        }
      }
    )
  }
  onEdit(row:Entreprise,i:number){
    this.oldename=row.name;
    this.entrepriseCreateForm.patchValue(row);
    const dialogConfig:MatDialogConfig=new MatDialogConfig<any>();
    dialogConfig.disableClose=true;
    dialogConfig.width='60%';
    this.createModale.open(EntrepriseCreateComponent,dialogConfig);
    this.createOrUpdate(1);
  }
  createOrUpdate(i :number):string{
    this.index=i;
    if(i>0){
      return "Update Entreprise";
    }
    else {
      return  "Create Entreprise"
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
  // @ts-ignore
  private  row:Entreprise;
  getentrepriseInfo(row :Entreprise){
    this.row=row;
  }
  getrow(): Entreprise{
    return this.row;
  }
  private statu !: number;
  getStatu( i:number){
    this.statu=i;
  }

  get entreprises(): Array<Entreprise> {
    return this._entreprises;
  }

  set entreprises(value: Array<Entreprise>) {
    this._entreprises = value;
  }
}
