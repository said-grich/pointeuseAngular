import {Employe} from "./parametrage/employe.model";

export class LoginLog {
  // @ts-ignore
    user_id:number;
  // @ts-ignore
    nom_user:string;
  // @ts-ignore
    time:string;
  // @ts-ignore
    dateoflog:string;
  // @ts-ignore
   employeDto:Employe =new Employe();
}
