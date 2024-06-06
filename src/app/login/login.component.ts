import { Component } from '@angular/core';
import { User } from './user';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from '../services/login.service';

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
    

    constructor( private route: ActivatedRoute,
      private logInService: LoginService) {
    }
    
    ngOnInit(): void {
      const user = document.getElementById("userLogo");
      if(user)
        user.style.display = "none"; 

      const chart = document.getElementById("pieChartLogo");
      if(chart)
        chart.style.display = "none"; 

      const out = document.getElementById("logOutLogo");
      if(out)
        out.style.display = "none"; 
    }

    getErrorMessage(): string {
      return this.errorMessage;
    }

    logIn(): void {
      if(this.user.userName != "" && this.user.userPassword != ""){
          this.logInService.getUserID(this.user.userName, this.user.userPassword)
          .subscribe(id => {
            console.log(id);
            if(id == -1) {
              this.errorMessage = "Fileds not correct";
              this.getErrorMessage();
            }
            else {
              this.errorMessage = "";
              this.goToList(id);
            }
          });
      }
      else{
        this.errorMessage = "Fill in all login fields";
        this.getErrorMessage();
      }
    }

    goToList(id: number): void {
      window.location.replace('/characterList/user/' + id);
    }

}
