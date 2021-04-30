import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from 'src/app/shared/interfaces/Login';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService 
{
  public userEmail: string = '';

  constructor(
    private httpClient: HttpClient,
  ) { }

  public login(loginData: Login)
  {
    return this.httpClient.post(environment.apiUrl + 'auth/login', loginData);
  }

  public isAuth(): boolean
  {
    const email = localStorage.getItem('user_email');
    const userId = localStorage.getItem('user_id');
    const token = localStorage.getItem('token');

    return (email !== null && userId !== null && token !== null);
  }
}
