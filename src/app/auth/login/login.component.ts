import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../service/login/auth.service";
import {TokenStorageService} from "../../service/login/token-storage.service";
import {Router, RouterOutlet} from "@angular/router";
import {ParametrageService} from "../../service/parametrage.service";
import {NotificationServiceService} from "../../service/notification-service.service";

@Component({
  selector: 'app-register',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService,private router:Router ,private parametrageService:ParametrageService

  ,private notificationService:NotificationServiceService
  ) { }
  // @ts-ignore

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
      this.router.navigate(["/parametrage/dashboard"]);
    }
  }

  onSubmit(): void {
    const { username, password } = this.form;
    this.authService.login(username, password).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        this.router.navigate(['/']).then(
          value =>     window.location.reload()

      );
        this.errorMessage="login succes";
        this.notificationService.showNotificationsucces(this.errorMessage);
      },
      err => {
        this.errorMessage = err.error.message;
        this.errorMessage="login faild";
        this.notificationService.showNotificationError(this.errorMessage);
        console.warn(this.errorMessage);
        this.isLoginFailed = true;
      }
    );
  }

  reloadPage(): void {
    window.location.reload();
  }
}
