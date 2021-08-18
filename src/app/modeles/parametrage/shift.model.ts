import {Employe} from "./employe.model";
import {Groupe} from "./groupe.model";

export class Shift {
  // @ts-ignore
  public nom: string;
  // @ts-ignore
  public heurDentree: string;
  // @ts-ignore
  public heurDsortie: string;
  // @ts-ignore
  public totalHeur: string;
  // @ts-ignore
  private _employeDtoList: Array<Employe>;
  get employeDtoList(): Array<Employe> {
    if (this._employeDtoList == null) {
      this._employeDtoList = new Array<Employe>();
    }
    return this._employeDtoList;
  }

  set employeDtoList(value: Array<Employe>) {
    this._employeDtoList = value;
  }
}
