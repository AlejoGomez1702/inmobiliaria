import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService 
{
  constructor(
    private httpClient: HttpClient,
  ) { }

  public getAllUsers(skip?: string, match?: string, idClient?: number)
  {
    // const body = {
    //   'skip': skip,
    //   'take': 10,
    //   'match': match ? match : '',
    //   'id_client_type': idClient
    // };

    // return this.httpClient.post(environment.apiUrl + 'properties', body);
    return this.httpClient.get(environment.apiUrl + 'users');
  }
}
