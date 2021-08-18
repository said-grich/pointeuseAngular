import {Entreprise} from "./entreprise.model";

export class Depatement {
  public nom: string ='';
  // @ts-ignore
  public departement_id: number;
  public locale: string = '';
  // @ts-ignore
  public entreprise :Entreprise;
  get entreprise1(): Entreprise {
    if (this.entreprise==null) {
      this.entreprise = new Entreprise();
    }
    return this.entreprise;
  }
  set entreprise1(value: Entreprise) {
    this.entreprise = value;
  }
}
