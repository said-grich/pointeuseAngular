import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {EmployeComponent} from "./parametrage/employe/employe.component";
import {APP_BASE_HREF} from '@angular/common';
import {LoginComponent} from "./auth/login/login.component";
import {ParametrageComponent} from "./parametrage/parametrage.component";



const routes: Routes = [
  {path:'' ,redirectTo:'/parametrage/dashboard',pathMatch:'full'}

];
@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot([
      {
        path:'parametrage',
        loadChildren: () => import('./parametrage/parametrage-routing.module').then(m => m.ParametrageRoutingModule),
      },
      {
      path: 'auth',
        loadChildren: () => import('./auth/auth-routing.module').then(m => m.AuthRoutingModule),}
    ]),
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: [{provide: APP_BASE_HREF, useValue: '/'}]
})
export class AppRoutingModule {
}
