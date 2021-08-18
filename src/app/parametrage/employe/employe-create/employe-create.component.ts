import { Component, OnInit } from '@angular/core';
import {Employe} from "../../../modeles/parametrage/employe.model";
import {FormsModule, NgModel} from "@angular/forms";
import {EmployeService} from "../../../service/parametrage/employe.service";
import {Groupe} from "../../../modeles/parametrage/groupe.model";

@Component({
  selector: 'app-employe-create',
  templateUrl: './employe-create.component.html',
  styleUrls: ['./employe-create.component.css']
})
export class EmployeCreateComponent implements OnInit {

  constructor(private _employeService: EmployeService) { }

  ngOnInit(): void {
    this._employeService.findAllGroupe();
  }


  get employeService(): EmployeService {
    return this._employeService;
  }

  set employeService(value: EmployeService) {
    this._employeService = value;
  }

// save() {
  //   this._employeService.save();
  // }
  // get employe(): Employe {
  //   return this._employeService.employe;
  // }
  test() {
    return this._employeService.createOrUpdate(this.index);
  }
  test2(){
    return this._employeService.saveOrupdate(this.index);
  }
  get index(){
    return this._employeService.index;
  }

  onClose() {
    return this._employeService.onClose();
  }

  oneSubmit() {
    return this._employeService.onSubmit();
  }

  isSelected($event: any) {
    // @ts-ignore
    this.employe._groupe = new Employe();
    this.employe.setgroupe= $event.target.value;
  }
  get employe(): Employe{
    return this._employeService.employe;
  }
  get groupeList():Array<Groupe>{
    return this._employeService.groupeList;
  }
}
