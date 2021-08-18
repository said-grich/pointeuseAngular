import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EmployeComponent} from "./employe/employe.component";
import {LoginLogComponent} from "../attendance/login-log/login-log.component";
import {AttendanceComponent} from "../attendance/attendance.component";
import {EntreprisesComponent} from "./entreprises/entreprises.component";
import {DashboardComponent} from "../dashboard/dashboard.component";
import {DepartementComponent} from "./departement/departement.component";
import {GroupesComponent} from "./groupes/groupes.component";
import {ShiftComponent} from "./shift/shift.component";
import {ErrorComponent} from "../error/error.component";
import {APP_BASE_HREF} from "@angular/common";

const routes: Routes = [
  {path: 'employes', component: EmployeComponent},
  {path: 'login_log', component:LoginLogComponent },
  {path:'attendece',component:AttendanceComponent},
  {path: 'entreprise', component: EntreprisesComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'departement', component: DepartementComponent},
  {path: 'groupe', component: GroupesComponent},
  {path:'shift',component:ShiftComponent},
  {path: '', redirectTo: '/parametrage/dashboard', pathMatch: 'full'},
  {path: '**', component: ErrorComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ParametrageRoutingModule { }
