import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService 
{

  constructor(
    private httpClient: HttpClient,
  ) { }

  public getAllTasks()
  {
    const data = {
      email: localStorage.getItem('user_email')
    };

    return this.httpClient.post(environment.apiUrl + 'tasks/all', data);
  }

  public createTask(task)
  {
    return this.httpClient.post(environment.apiUrl + 'tasks', task);
  }

}
