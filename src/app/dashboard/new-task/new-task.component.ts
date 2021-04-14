import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { UserService } from 'src/app/core/services/user.service';
import { ModalSelectClientComponent } from './modal-select-client/modal-select-client.component';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss'],
})
export class NewTaskComponent implements OnInit 
{
  public selectedClient = {};

  public taskForm = new FormGroup({
    management_type_id: new FormControl(4),
    clients: new FormControl([]),
    notify_clients: new FormControl(false, Validators.required),
    properties: new FormControl([this.activatedRoute.snapshot.paramMap.get('id')]),
    subject: new FormControl('', Validators.required),
    id_user: new FormControl(localStorage.getItem('user_email'), Validators.required), // encargado de la tarea.
    date: new FormControl('', Validators.required),
    management_status_id: new FormControl(1, Validators.required),
    description: new FormControl('', Validators.required)
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    public modalController: ModalController,
    private userService: UserService
  ) 
  { 
    this.userService.getAllUsers().subscribe(
      res => {
        console.log(res);
      }
    );
  }

  ngOnInit() {}

  async presentModalForSelectClient() {
    const modal = await this.modalController.create({
      component: ModalSelectClientComponent,
      swipeToClose: true
    });

    modal.onDidDismiss().then((data) => {
      console.log(data);
      this.selectedClient = data['data'];
      // this.taskForm.setValue({
      //   clients: new FormControl([data['data']], Validators.required)
      // });
    });

    return await modal.present();
  }

  createTask()
  {
    this.taskForm.setControl('clients', new FormControl([this.selectedClient['id_client']]));
    console.log(this.taskForm.value);

  }

}
