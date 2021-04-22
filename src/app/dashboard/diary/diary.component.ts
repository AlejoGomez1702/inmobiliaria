import { Component, OnInit, ViewChild } from '@angular/core';
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

  public calendar = {
    mode: 'month',
    currentDate: new Date()
  }

  @ViewChild(CalendarComponent) myCal: CalendarComponent;

  constructor(
    private taskService: TaskService
  ) 
  { 
    this.taskService.getAllTasks().subscribe(
      res => console.log(res)
    );
  }

  ngOnInit() {}

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
                endTime: endTime,
                allDay: false
            });
        }
    }

    console.log(events);

    this.eventSource = events;
  }

  removeEvents()
  {
    this.eventSource = [];
  }



}
