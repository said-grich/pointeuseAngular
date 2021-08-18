import { Component, OnInit } from '@angular/core';
import {DepartementService} from "../../../service/parametrage/departement.service";
import {Depatement} from "../../../modeles/parametrage/depatement.model";
import {MatTableDataSource} from "@angular/material/table";
import {Entreprise} from "../../../modeles/parametrage/entreprise.model";

@Component({
  selector: 'app-departement-create',
  templateUrl: './departement-create.component.html',
  styleUrls: ['./departement-create.component.css']
})
export class DepartementCreateComponent implements OnInit {
  get departementService(): DepartementService {
    return this._departementService;
  }

  set departementService(value: DepartementService) {
    this._departementService = value;
  }

  constructor(private _departementService: DepartementService) { }

  ngOnInit(): void {
    this._departementService.findAllEntreprise();
  }


  onClose() {
    return this._departementService.onClose();
  }
  get index(){
    return this._departementService.index;
  }

  oneSubmit() {
      return this._departementService.onSubmit();
  }
  test(){
    return this._departementService.createOrUpdate(this.index);
  }
  test2(){
    return this._departementService.saveOrupdate(this.index);
  }
  get departement(): Depatement {
    return this._departementService.departement;
  }
  get departementList(): MatTableDataSource<Depatement> {
    return this._departementService.departementList;
  }
  get entreprise(): Entreprise {
    return this._departementService.entreprise;
  }
  get entrepriseList(): Array<Entreprise> {
    return this._departementService.entrepriseList;
  }
  isSelected($event: any) {
    // @ts-ignore
    this.departement.entreprise= new Depatement();
    this.departement.entreprise1=$event.target.value;
  }

}
