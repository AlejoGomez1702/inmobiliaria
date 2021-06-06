import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CalendarComponent } from 'ionic2-calendar';
import { TaskService } from 'src/app/core/services/task.service';

@Component({
  selector: 'app-diary',
  templateUrl: './diary.component.html',
  styleUrls: ['./diary.component.scss'],
})
export class DiaryComponent implements OnInit 
{
  public eventSource: any[] = [];
  public viewTitle: string = '';
  public consulta: string = '';

  public calendar = {
    mode: 'month',
    currentDate: new Date()
  }

  @ViewChild(CalendarComponent) myCal: CalendarComponent;

  constructor(
    private taskService: TaskService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) 
  { 
    
  }

  ngOnInit() 
  {
    this.consulta = this.activeRoute.snapshot.paramMap.get('status'); //Variable que se envía para hacer la consulta en back
    this.loadTasks();
    // myStyleSheet.replaceSync('h1 { color: green; }');
  }

  loadTasks()
  {
    this.taskService.getAllTasks().subscribe(
      res => {
        console.log(res);
        const expired = res['expired'];
        const in_progress = res['in_progress'];
        const completed = res['completed'];

        for (const task of expired) 
        {
          task.startTime = this.convertDate(task.startTime);
          task.time = this.convertTime(task.startTime);
          task.endTime = this.convertDate(task.endTime);          
        }

        for (const task of in_progress) 
        {
          task.startTime = this.convertDate(task.startTime);
          task.time = this.convertTime(task.startTime);
          task.endTime = this.convertDate(task.endTime);          
        }

        for (const task of completed) 
        {
          task.startTime = this.convertDate(task.startTime);
          task.time = this.convertTime(task.startTime);
          task.endTime = this.convertDate(task.endTime);          
        }

        let events = [];

        events.push(...expired);
        events.push(...in_progress);
        events.push(...completed);

        this.eventSource = events;

        // this.countExpired = expired.length;
        // this.countInProgress = in_progress.length;
        // this.countCompleted = completed.length;
        console.log(this.eventSource);

      },
      error => console.log(error)
    );
  }

  convertTime(date)
  {
    return date.toLocaleTimeString('es-CO');
  }

  convertDate(date)
  {
    // console.log("datos sin convertir: " + date);
    const convertDate = new Date(date);
    // console.log("despues: " + convertDate);
    const result = new Date(Date.UTC(
      convertDate.getUTCFullYear(), 
      convertDate.getUTCMonth(), 
      convertDate.getUTCDay(),
      convertDate.getUTCHours(),
      convertDate.getUTCMinutes()
    ));

    return result;
  }

  next()
  {
    this.myCal.slideNext();
  }

  back()
  {
    this.myCal.slidePrev();
  }

  onViewTitleChanged(title)
  {
    this.viewTitle = title;
  }

  createRandomEvents() {
    console.log('randoms');
    let events = [];
    for (let i = 0; i < 50; i += 1) {
        let date = new Date();
        let eventType = Math.floor(Math.random() * 2);
        let startDay = Math.floor(Math.random() * 90) - 45;
        let endDay = Math.floor(Math.random() * 2) + startDay;
        let startTime;
        let endTime;
        if (eventType === 0) {
            startTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + startDay));
            if (endDay === startDay) {
                endDay += 1;
            }
            endTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + endDay));
            events.push({
                title: 'All Day - ' + i,
                startTime: startTime,
                endTime: endTime,
                allDay: true
            });
        } else {
            let startMinute = Math.floor(Math.random() * 24 * 60);
            let endMinute = Math.floor(Math.random() * 180) + startMinute;
            startTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + startDay, 0, date.getMinutes() + startMinute);
            endTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + endDay, 0, date.getMinutes() + endMinute);
            events.push({
                title: 'Event - ' + i,
                startTime: startTime,
                time: startTime.toLocaleTimeString('es-CO'),
                endTime: endTime,
                allDay: false
            });
        }
    }

    // console.log(events);

    this.eventSource = events;
    console.log(events);
  }

  removeEvents()
  {
    this.eventSource = [];
  }

  mostrar(event)
  {
    console.log(event);
  }

  selectEvent(event)
  {
    console.log(event);
    this.router.navigate([`dashboard/tasks/complete/${event.management_id}`]);
  }


}
