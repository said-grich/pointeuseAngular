import {Groupe} from "./groupe.model";
import {Shift} from "./shift.model";

export class Employe {
  // @ts-ignore
  public employe_Id: number;
  // @ts-ignore
  public nom: string;
  // @ts-ignore
  public email:string;
  // @ts-ignore
  public telephone:string;
  // @ts-ignore
  public adresse:string;
  // @ts-ignore
  public statu:number;
  // @ts-ignore
  public  cne:string;
  // @ts-ignore
  public   dateDeNissance:string;
  // @ts-ignore
  public  age:number;
  // @ts-ignore
  public   privilege:number;
  // @ts-ignore
  public shiftDto:Shift =new Shift();
  groupe :Groupe = new Groupe();
  get getgroupe(){
    return this.groupe;
  }
  set setgroupe(value: Groupe) {
    this.groupe = value;
  }
}

