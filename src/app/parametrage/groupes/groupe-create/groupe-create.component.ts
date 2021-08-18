import {Component, OnInit} from '@angular/core';
import {GroupeService} from "../../../service/parametrage/groupe.service";
import {EntrepriseService} from "../../../service/parametrage/entreprise.service";
import {Depatement} from "../../../modeles/parametrage/depatement.model";
import {MatTableDataSource} from "@angular/material/table";
import {Entreprise} from "../../../modeles/parametrage/entreprise.model";
import {Groupe} from "../../../modeles/parametrage/groupe.model";
import {Shift} from "../../../modeles/parametrage/shift.model";

@Component({
  selector: 'app-groupe-create',
  templateUrl: './groupe-create.component.html',
  styleUrls: ['./groupe-create.component.css']
})
export class GroupeCreateComponent implements OnInit {

  constructor(private _groupeService: GroupeService) {
  }

  ngOnInit(): void {
    this._groupeService.findAllDepartement();
    this._groupeService.findAllShifts();
  }

  onClose() {
    return this.groupeService.onClose();
  }

  oneSubmit() {
    return this._groupeService.onSubmit();
  }

  get groupeService(): GroupeService {
    return this._groupeService;
  }

  set groupeService(value: GroupeService) {
    this._groupeService = value;
  }

  test() {
    return this._groupeService.createOrUpdate(this.index);
  }

  test2() {
    return this._groupeService.saveOrupdate(this.index);
  }

  get index() {
    return this._groupeService.index;
  }

  get departementList(): Array<Depatement> {
    return this._groupeService.departementList;
  }

  isSelected($event: any) {

    this.groupe.departement1 = new Depatement();
    this.groupe.departement1 = $event.target.value;
  }

  isSelectedShift($event: any) {

    this.groupe.getshift = new Shift();
    this.groupe.getshift = $event.target.value;
  }

  get groupe(): Groupe {
    return this._groupeService.groupe;
  }

  get groupeList(): MatTableDataSource<Groupe> {
    return this._groupeService.groupeList;
  }

  get shiftlist() {
    return this._groupeService.shiftlist;
  }

}
