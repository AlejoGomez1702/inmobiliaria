import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PropertyService 
{
  public selectedProperty: any;

  constructor(
    private httpClient: HttpClient,
  ) { }

  public getAllProperties(skip: string, match?: string)
  {
    console.log('Match que llega: ', match);
    const body = {
      'skip': skip,
      'take': 10,
      'match': match ? match : ''
    };

    return this.httpClient.post(environment.apiUrl + 'properties', body);
  }

  public getPropertyById(id: string)
  {
    return this.httpClient.get(environment.apiUrl + 'properties/' + id);
  }

  public pruebas(page: number)
  {
    return this.httpClient.get('https://randomuser.me/api/?results=20&page=' + page);
  }

}
