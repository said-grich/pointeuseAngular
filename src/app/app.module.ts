import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {HeaderComponent} from './pages/header/header.component';
import {EmployeComponent} from './parametrage/employe/employe.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AppRoutingModule} from './app-routing.module';
import {RouterModule} from "@angular/router";
import {DashboardComponent} from './dashboard/dashboard.component';
import {ErrorComponent} from './error/error.component';
import {EmployeCreateComponent} from './parametrage/employe/employe-create/employe-create.component';
import {EmployeListComponent} from './parametrage/employe/employe-list/employe-list.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ParametrageComponent } from './parametrage/parametrage.component';
import { EntreprisesComponent } from './parametrage/entreprises/entreprises.component';
import { DepartementComponent } from './parametrage/departement/departement.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatSortable, MatSortModule} from '@angular/material/sort';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatToolbarModule} from "@angular/material/toolbar";
import {EntrepriseCreateComponent} from "./parametrage/entreprises/entreprise-createOrUpdate/entreprise-create.component";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import { ConfirmComponent } from './pages/confirm/confirm.component';
import { EntrepriseInfoComponent } from './parametrage/entreprises/entreprise-info/entreprise-info.component';
import {MatCardModule} from '@angular/material/card';
import { EntrepriseDepartementList } from './parametrage/entreprises/entreprise-info/departement-list/entreprise-departement-list';
import { EntrepiseDetailsComponent } from './parametrage/entreprises/entreprise-info/entrepise-details/entrepise-details.component';
import { DepartementCreateComponent } from './parametrage/departement/departement-create/departement-create.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { DepartementListComponent } from './parametrage/departement/departement-list/departement-list.component';
import { DepartementInfoComponent } from './parametrage/departement/departement-info/departement-info.component';
import { DepartementDetailsComponent } from './parametrage/departement/departement-info/departement-details/departement-details.component';
import { GroupesComponent } from './parametrage/groupes/groupes.component';
import { GroupeCreateComponent } from './parametrage/groupes/groupe-create/groupe-create.component';
import { GroupeListComponent } from './parametrage/groupes/groupe-list/groupe-list.component';
import { GroupeInfoComponent } from './parametrage/groupes/groupe-info/groupe-info.component';
import { GroupeDetailsComponent } from './parametrage/groupes/groupe-info/groupe-details/groupe-details.component';
import {MatSelectModule} from '@angular/material/select';
import { DepartementGroupeListComponent } from './parametrage/departement/departement-info/departement-groupe-list/departement-groupe-list.component';
import { ShiftComponent } from './parametrage/shift/shift.component';
import { ShiftCreateComponent } from './parametrage/shift/shift-create/shift-create.component';
import { ShiftInfoComponent } from './parametrage/shift/shift-info/shift-info.component';
import { ShiftListComponent } from './parametrage/shift/shift-list/shift-list.component';
import { FooterComponent } from './pages/footer/footer.component';
import {NgxMaterialTimepickerModule} from "ngx-material-timepicker";
import { AttendanceComponent } from './attendance/attendance.component';
import { AttendeceDayComponent } from './attendance/attendece-day/attendece-day.component';
import { MonthComponent } from './attendance/month/month.component';
import { SearchComponent } from './attendance/search/search.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import {NgxDaterangepickerMd} from "ngx-daterangepicker-material";
import { ListCollapseRowsComponent } from './attendance/list-collapse-rows/list-collapse-rows.component';
import {MatExpansionModule} from "@angular/material/expansion";
import { LoginLogComponent } from './attendance/login-log/login-log.component';
import { UserComponent } from './auth/user/user.component';
import { HomeComponent } from './auth/home/home.component';
import { ProfileComponent } from './auth/profile/profile.component';
import {EntrepriseListComponent} from "./parametrage/entreprises/entreprise-list/entreprise-list.component";
import {LoginComponent} from "./auth/login/login.component";
import {Interceptor1Interceptor} from "./service/interceptor1.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    EmployeComponent,
    DashboardComponent,
    ErrorComponent,
    EmployeCreateComponent,
    EmployeListComponent,
    ParametrageComponent,
    EntreprisesComponent,
    DepartementComponent,
    EntrepriseListComponent,
    EntrepriseCreateComponent,
    ConfirmComponent,
    EntrepriseInfoComponent,
    EntrepriseDepartementList,
    EntrepiseDetailsComponent,
    DepartementCreateComponent,
    DepartementListComponent,
    DepartementInfoComponent,
    DepartementDetailsComponent,
    GroupesComponent,
    GroupeCreateComponent,
    GroupeListComponent,
    GroupeInfoComponent,
    GroupeDetailsComponent,
    DepartementGroupeListComponent,
    ShiftComponent,
    ShiftCreateComponent,
    ShiftInfoComponent,
    ShiftListComponent,
    FooterComponent,
    AttendanceComponent,
    AttendeceDayComponent,
    MonthComponent,
    SearchComponent,
    ListCollapseRowsComponent,
    LoginLogComponent,
    UserComponent,
    HomeComponent,
    ProfileComponent,
    LoginComponent


  ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        FormsModule,
        RouterModule,
        NgbModule,
        BrowserModule,
        MatTableModule,
        MatSortModule,
        BrowserAnimationsModule,
        MatPaginatorModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatDialogModule,
        ReactiveFormsModule,
        MatToolbarModule,
        MatIconModule,
        MatDialogModule,
        MatSnackBarModule,
        MatCardModule,
        MatGridListModule,
        MatSelectModule,
        NgxMaterialTimepickerModule,
        NgMultiSelectDropDownModule.forRoot(),
        NgxDaterangepickerMd.forRoot(),
        MatExpansionModule,

    ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass:Interceptor1Interceptor,
      multi:true
    }
  ],
  bootstrap: [AppComponent],
  entryComponents:[EntrepriseCreateComponent,ConfirmComponent,EntrepriseInfoComponent,DepartementCreateComponent,DepartementInfoComponent
  ,GroupeCreateComponent,GroupeInfoComponent,EmployeCreateComponent]
})
export class AppModule {
}
