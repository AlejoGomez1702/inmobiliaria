import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PhotoService } from 'src/app/core/services/photo.service';

@Component({
  selector: 'app-complete-task',
  templateUrl: './complete-task.component.html',
  styleUrls: ['./complete-task.component.scss'],
})
export class CompleteTaskComponent implements OnInit 
{
  public taskForm = new FormGroup({
    management_type_id: new FormControl(4),
    clients: new FormControl([]),
    notify_clients: new FormControl(false, Validators.required),
    // properties: new FormControl([this.activatedRoute.snapshot.paramMap.get('id')]),
    subject: new FormControl('', Validators.required),
    id_user: new FormControl(localStorage.getItem('user_email'), Validators.required), // encargado de la tarea.
    date: new FormControl('', Validators.required),
    management_status_id: new FormControl(1, Validators.required),
    description: new FormControl('', Validators.required)
  });

  constructor(
    public photoService: PhotoService
  ) { }

  ngOnInit() {}

  addPhoto() {
    this.photoService.addNewToGallery();
  }

  finishTask()
  {
    // this.taskForm.setControl('clients', new FormControl([this.selectedClient['id_client']]));
    // const task = this.taskForm.value;
    // this.taskService.createTask(task).subscribe(
    //   res => console.log(res)
    // );


    // console.log(task);

  }

}
