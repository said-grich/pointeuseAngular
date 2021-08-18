// import { Injectable } from '@angular/core';
// import {Employe} from "../../modeles/parametrage/employe.model";
//
// @Injectable({
//   providedIn: 'root'
// })
// export class EmployeService {
//
//   // @ts-ignore
//   private _employe: Employe;
//   // @ts-ignore
//   private _employes: Array<Employe>;
//
//
//   get employe(): Employe {
//     if(this._employe == null){
//       this._employe = new Employe();
//     }
//     return this._employe;
//   }
//
//   set employe(value: Employe) {
//     this._employe = value;
//   }
//
//   get employes(): Array<Employe> {
//     if (this._employes == null){
//       this._employes = new Array<Employe>();
//     }
//     return this._employes;
//   }
//
//   set employes(value: Array<Employe>) {
//     this._employes = value;
//   }
//
//   constructor() { }
//
//   public save(){
//     if (this.employe.id==null){
//       this.employes.push(this.cloneEmploye(this.employe));
//       // @ts-ignore
//       this.employe=null;
//     }else {
//       alert('employe deja exist');
//     }
//   }
//
//   private cloneEmploye(employe: Employe) {
//     const myClone = new Employe();
//     myClone.id=employe.id;
//     //myClone.nom=employe.nom;
//     return myClone;
//   }
//
//   update(index: number, employe: Employe) {
//     this.employe=this.cloneEmploye(employe);
//
//   }
// }
