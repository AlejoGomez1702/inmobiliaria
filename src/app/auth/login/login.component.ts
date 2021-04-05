import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { Login } from 'src/app/shared/interfaces/Login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit 
{
  // public loginForm: any = {
  //   email: '',
  //   password: '',
  //   remenber_me: false
  // };

  public loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    remember_me: new FormControl(false, Validators.required)
  });

  constructor(
    private authService: AuthService
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
      },
      error => {
        console.log(error)
      }
    );

  }

}
