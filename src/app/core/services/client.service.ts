import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientService 
{

  constructor(
    private httpClient: HttpClient,
  ) { }

  public getAllClients(skip?: string, match?: string)
  {
    // const body = {
    //   'skip': skip,
    //   'take': 10,
    //   'match': match ? match : ''
    // };

    // return this.httpClient.post(environment.apiUrl + 'properties', body);
    return this.httpClient.get(environment.apiUrl + 'clients');
  }
}
