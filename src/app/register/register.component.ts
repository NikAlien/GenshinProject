import { Component } from '@angular/core';
import { User } from '../login/user';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  user: User = {
    userId : -1,
    userName : "",
    userPassword: ""
  };
  title = "Register";
  inputValue = "";
  errorMessage = "";
  confirmPassword = "";
  

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

  register(): void {
    if(this.user.userName != "" && this.user.userPassword != "" && this.confirmPassword != ""){
      if(this.confirmPassword == this.user.userPassword){
        this.logInService.registerUser({userId : -1, userName : this.user.userName, userPassword : this.user.userPassword})
        .subscribe(id => {
          console.log(id);
          if(id == -1) {
            this.errorMessage = "User with the offered name already exists";
            this.getErrorMessage();
          }
          else {
            this.errorMessage = "";
            window.alert("Please log into your account :)");
            this.goToLogin();
          }
        });
      }
      else {
        this.errorMessage = "Passwords don't match";
        this.getErrorMessage();
      }
    }
    else{
      this.errorMessage = "Fill in all fields";
      this.getErrorMessage();
    }
  }

  goToLogin(): void {
    window.location.replace('http://localhost:4200/login');
  }

}
