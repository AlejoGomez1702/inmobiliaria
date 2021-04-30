import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of as observableOf } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate 
{
  constructor(
    private authService: AuthService,
    private router: Router
  ){}

  canActivate(): Observable<boolean> 
  {
      if(!this.authService.isAuth())
      {
        this.router.navigate(["/auth/login"]);
        return observableOf(false);
      }

    return observableOf(true);
  }
  
}
