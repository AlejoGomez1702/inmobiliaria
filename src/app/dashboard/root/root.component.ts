import { Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/core/services/task.service';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss'],
})
export class RootComponent implements OnInit 
{
  public countExpired = 0;
  public countInProgress = 0;
  public countCompleted = 0;

  constructor(
    private taskService: TaskService
  ) { }

  ngOnInit() 
  {
    this.loadTasks();
  }

  loadTasks()
  {
    this.taskService.getAllTasks().subscribe(
      res => {
        console.log(res);
        const expired = res['expired'];
        const in_progress = res['in_progress'];
        const completed = res['completed'];

        this.countExpired = expired.length;
        this.countInProgress = in_progress.length;
        this.countCompleted = completed.length;

      },
      error => console.log(error)
    );
  }

}
