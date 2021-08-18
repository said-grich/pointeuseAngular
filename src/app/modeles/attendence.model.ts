import {Employe} from "./parametrage/employe.model";
import {Moment} from "moment/moment";

export class Attendence {
  public  timeIn:string="";
  public  timeOut:string="";
  public  dateOflog:string="";
  // @ts-ignore
  public  totalheure:string;
  public employeDto:Employe=new Employe();
}
