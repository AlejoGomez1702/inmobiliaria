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
      user_id: localStorage.getItem('user_id')
    };

    return this.httpClient.post(environment.apiUrl + 'tasks/all', data);
  }

  public createTask(task)
  {
    return this.httpClient.post(environment.apiUrl + 'tasks', task);
  }

}
