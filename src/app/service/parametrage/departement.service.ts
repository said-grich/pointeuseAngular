import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";

import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {NotificationServiceService} from "../notification-service.service";
import {MatTableDataSource} from "@angular/material/table";
import {Depatement} from "../../modeles/parametrage/depatement.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {DepartementCreateComponent} from "../../parametrage/departement/departement-create/departement-create.component";
import {DepartementInfoComponent} from "../../parametrage/departement/departement-info/departement-info.component";
import {Entreprise} from "../../modeles/parametrage/entreprise.model";
import {EntrepriseService} from "./entreprise.service";
import {Groupe} from "../../modeles/parametrage/groupe.model";
import {TokenStorageService} from "../login/token-storage.service";

@Injectable({
  providedIn: 'root'
})
export class DepartementService {
  // @ts-ignore
  private _departement: Depatement;
  // @ts-ignore
  private _departementList: MatTableDataSource<Depatement>
  // @ts-ignore
  private _listDepartement: Array<Depatement>
  private _url: string = "http://localhost:8036/pointeuse/departement/";
  private _url1: string = "http://localhost:8036/pointeuse/entreprise/";
  // @ts-ignore
  private _entreprise: Entreprise;
  // @ts-ignore
  private _entrepriseList: Array<Entreprise>;
  // @ts-ignore
  private _index: number;
  // @ts-ignore
  private oldename: string;
  // @ts-ignore
  private _groupeList: Array<Groupe>
  constructor(private http: HttpClient, private createModale: MatDialog, private infoModal: MatDialog
    , private notificationService: NotificationServiceService, private entrepriseService: EntrepriseService,private tokenService:TokenStorageService) {
  }


  public findAllEntreprise() {

    return this.http.get<Array<Entreprise>>(this._url1).subscribe(
      data => {
        // @ts-ignore
        this.entrepriseList = data;
        console.log(this.entrepriseList);
      }, error => {
        alert('error');
      }
    );
  }


  createOrUpdate(i: number): string {
    this.index = i;
    if (i > 0) {
      return "Update Departement";
    } else {
      return "Create Departement"
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

  delete(row: Depatement, index: number) {

    this.http.delete(this._url + "nom/" + row.nom).subscribe(
      data => {
        if (data > 0) {
          this.departementList.data.splice(index, 1);
          this.refresh();
          this.notificationService.showNotificationError(row.nom + ' Deleted');
        }
      }
    )
  }

  public save(oldname: string) {

    if (this.index > 0) {
      if (this.departement != null) {
        this.http.put<number>(this._url + oldname, this.departement).subscribe(
          data => {
            this.departementList.data.push(this.departement);
            this.notificationService.showNotificationsucces(oldname + "  Updtated");
            this.refresh();
          }
        );
      }
    } else {
      if (this.departement != null) {
        this.http.post<number>(this._url, this.departement).subscribe(
          data => {
            if (data == 1) {
              this.departementList.data.push(this.departement);
              this.refresh();
              this.notificationService.showNotificationsucces(this.departement.nom + " Saved");
            } else {
              console.log(data);
            }
          }
        );
      }
    }

  }

  createDepartement() {
    this.index = -1;
    const dialogConfig: MatDialogConfig = new MatDialogConfig<any>();
    dialogConfig.disableClose = true;
    dialogConfig.width = '70%';
    this.createModale.open(DepartementCreateComponent, dialogConfig);
  }

  departementCreateForm: FormGroup = new FormGroup({
    $key: new FormControl(null),
    nom: new FormControl('', Validators.required),
    entreprise: new FormControl('', Validators.required),
    Departement_id: new FormControl('', [Validators.required, Validators.minLength(4)]),
    locale: new FormControl('', Validators.required)
  });

  onClose() {
    this.departementCreateForm.reset();
    this.createModale.closeAll();
    this.refresh();
  }

  refresh() {
    this.findAll().subscribe(
      data => {
        this.departementList.data = data;
      }
    )
  }

  public findAll() {

    return this.http.get<Depatement[]>(this._url);
  }

  onSubmit() {
    this.departement.departement_id = this.departementCreateForm.controls["Departement_id"].value;
    this.departement.nom = this.departementCreateForm.controls["nom"].value;
    this.departement.entreprise1=new Entreprise();
    this.departement.entreprise1.name = this.departementCreateForm.controls["entreprise"].value;
    this.departement.locale = this.departementCreateForm.controls["locale"].value;
    this.save(this.oldename);
    this.onClose();
  }

  departementInfo(row: Depatement) {
    const dialogConfig: MatDialogConfig = new MatDialogConfig<any>();
    dialogConfig.width = '80%';
    dialogConfig.panelClass = 'info-modale-style';
    this.infoModal.open(DepartementInfoComponent, dialogConfig);
    this.getdepartementInfo(row);

    this.findByDepartementName(row.nom);
    this.departement = row;
  }

  onEdit(row: Depatement, i: number) {
    this.oldename = row.nom;
    console.log(row.entreprise);
    this.departement = row;
    this.departementCreateForm.patchValue({
      nom: row.nom,
      Departement_id: row.departement_id,
      entreprise: this.departement.entreprise.name,
      locale: row.locale
    });
    const dialogConfig: MatDialogConfig = new MatDialogConfig<any>();
    dialogConfig.disableClose = true;
    dialogConfig.width = '60%';
    this.createModale.open(DepartementCreateComponent, dialogConfig);
    this.createOrUpdate(1);

  }

  private statu !: number;

  getStatu(i: number) {
    this.statu = i;
  }

  // @ts-ignore
  private row: Depatement;

  getdepartementInfo(row: Depatement) {
    this.row = row;
  }

  getrow(): Depatement {
    return this.row;
  }

  get departement(): Depatement {
    if (this._departement == null) {
      this._departement = new Depatement();
    }
    return this._departement;
  }

  set departement(value: Depatement) {
    this._departement = value;
  }

  get departementList(): MatTableDataSource<Depatement> {
    if (this._departementList == null) {
      this._departementList = new MatTableDataSource<Depatement>();
    }
    return this._departementList;
  }

  set departementList(value: MatTableDataSource<Depatement>) {
    this._departementList = value;
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

  get entreprise(): Entreprise {
    if (this._entreprise == null) {
      this._entreprise = new Entreprise();
    }
    return this._entreprise;
  }

  get entrepriseList(): Array<Entreprise> {
    return this._entrepriseList;
  }

  set entrepriseList(value: Array<Entreprise>) {
    this._entrepriseList = value;
  }

  get listDepartement(): Array<Depatement> {
    if (this._listDepartement == null) {
      this._listDepartement = new Array<Depatement>();
    }
    return this._listDepartement;
  }

  set listDepartement(value: Array<Depatement>) {
    this._listDepartement = value;
  }

  get groupeList(): Array<Groupe> {
    if (this._groupeList == null) {
      this._groupeList = new Array<Groupe>();
    }
    return this._groupeList;
  }

  set groupeList(value: Array<Groupe>) {
    this._groupeList = value;
  }

  public findByDepartementName(departement: String) {

    this.http.get<Array<Groupe>>('http://localhost:8036/pointeuse/groupe/departement/' + departement).subscribe(
      data => {
        this.groupeList = data;
      }, error => {
        console.log(error);
      }
    );
  }

}
