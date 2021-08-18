import {Employe} from "./parametrage/employe.model";
import {DatePipe} from "@angular/common";

export class SearchVo {
  // @ts-ignore
  public  firstDate: Date;
  // @ts-ignore
  public   lastDate: Date;
  public  employeDtoList: Array<Employe>=new Array<Employe>();
}
