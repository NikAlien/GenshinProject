import { Component } from '@angular/core';
import { User } from './user';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
    user: User = {
      userId : -1,
      userName : "",
      userPassword: ""
    };
    title = "Log In";
    inputValue = "";
    errorMessage = "";
    loginSuccess = false;
    

    constructor( private router: Router,
      private logInService: LoginService) {
    }
    
    ngOnInit(): void {
      const user = document.getElementById("userLogo");
      if(user)
        user.style.display = "none"; 

      const chart = document.getElementById("pieChartLogo");
      if(chart)
        chart.style.display = "none"; 
    }

    getErrorMessage(): string {
      return this.errorMessage;
    }

    logIn(): void {
      if(this.user.userName != "" && this.user.userPassword != ""){
          this.logInService.login(this.user)
          .subscribe(response => {
            console.log(response);
            if(response.token == "Error") {
              this.errorMessage = "Fileds not correct";
              this.getErrorMessage();
            }
            else {
              this.errorMessage = "";
              this.loginSuccess = true;
              this.goToList();
            }
          });
      }
      else{
        this.errorMessage = "Fill in all login fields";
        this.getErrorMessage();
      }
    }

    goToList(): void {
     this.router.navigate(['/characterList'])
    }

}
