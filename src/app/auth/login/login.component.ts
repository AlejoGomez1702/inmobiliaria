import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { Login } from 'src/app/shared/interfaces/Login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit 
{
  public loginForm = new FormGroup({
    email: new FormControl('wilsonladino@vistainmobiliariasas.com', Validators.required),
    password: new FormControl('wilson2017', Validators.required),
    remember_me: new FormControl(false, Validators.required)
  });

  constructor(
    private authService: AuthService,
    private router: Router
  ) 
  { 
  }

  ngOnInit() {}

  login()
  {
    const loginData: Login = this.loginForm.value;
    this.authService.login(loginData).subscribe(
      response => {
        console.log(response)
        // user_email | user_id | token
        localStorage.setItem('user_email', response['user_email']);
        localStorage.setItem('user_id', response['user_id']);
        localStorage.setItem('token', response['access_token']);
        // this.authService.userEmail = loginData.email;
        this.router.navigate(['/dashboard/root']);
      },
      error => {
        console.log(error)
      }
    );
  }

}
