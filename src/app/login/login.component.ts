import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username = '';
  password = '';
  errorMessage = '';

  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }

  
  async login() {
    if(!(!!this.username && !!this.password)){
      this.errorMessage = "Please fill all fields"
      return
    }

    try {
      const result = await this.loginService.login({
        username: this.username,
        password: this.password
      });

      if(result){
        this.router.navigateByUrl('/home');
      } else {
        this.errorMessage = 'Invalid Login';
      }
    }catch (er) { // server error
      this.errorMessage = 'Login Failed';
    }
  }

}
