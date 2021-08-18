import {Depatement} from "./depatement.model";

export class Entreprise {
  public  name:string="";
  public  entreprise_id:number=0;
  public adress:string="";
  public  email:string="";
  public telephone_number :string="";
  public departementList: Array<Depatement>=[];
}
