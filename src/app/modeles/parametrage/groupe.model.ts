import {Employe} from "./employe.model";
import {Depatement} from "./depatement.model";
import {Shift} from "./shift.model";

export class Groupe {

  // @ts-ignore
  public group_id : number ;
  public nom !: string;
  public departement !:Depatement;
  public employeList !: Array<Employe>;
  // @ts-ignore
  public shift : Shift = new Shift();
  get getshift(): Shift {
    if(this.shift==null){
      this.shift=new Shift();
    }
    return this.shift;
  }
  set getshift(value: Shift) {
    this.shift = value;
  }
  get departement1(): Depatement {
    if (this.departement == null )
      this.departement =new Depatement();
    return this.departement;
  }

  set departement1(value: Depatement) {
    this.departement = value;
  }
}
