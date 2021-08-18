import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Entreprise} from "../../../modeles/parametrage/entreprise.model";
import {EntrepriseService} from "../../../service/parametrage/entreprise.service";
import {MatToolbarModule} from '@angular/material/toolbar';

@Component({
  selector: 'app-entreprise-create',
  templateUrl: './entreprise-create.component.html',
  styleUrls: ['./entreprise-create.component.css']
})
export class EntrepriseCreateComponent implements OnInit {
  constructor(private  _entrepriseService:EntrepriseService) { }

  ngOnInit(): void {

  }
  oneSubmit(){
    return this._entrepriseService.onSubmit();
  }
onClose(){
    return this.entrepriseService.onClose();
}
  get entrepriseService(): EntrepriseService {
    return this._entrepriseService;
  }
  set entrepriseService(value: EntrepriseService) {
    this._entrepriseService = value;
  }
  test(){
    return this._entrepriseService.createOrUpdate(this.index);
  }
  test2(){
    return this._entrepriseService.saveOrupdate(this.index);
  }
  get index(){
    return this._entrepriseService.index;
  }
}
