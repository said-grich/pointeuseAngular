import {Employe} from "./parametrage/employe.model";
import {Attendence} from "./attendence.model";
import {Time} from "ngx-bootstrap/timepicker/timepicker.models";
import {Moment} from "moment/moment";

export class ChildeDatatabele {
  employe:Employe=new Employe();
  attendenceList:Array<Attendence> =new Array<Attendence>();
  // @ts-ignore
  total:string;
}
