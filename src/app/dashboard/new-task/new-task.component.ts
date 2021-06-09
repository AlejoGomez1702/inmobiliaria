import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { UserService } from 'src/app/core/services/user.service';
import { ModalSelectClientComponent } from './modal-select-client/modal-select-client.component';
import { TaskService } from 'src/app/core/services/task.service';

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
    id_user: new FormControl(localStorage.getItem('user_id'), Validators.required), // encargado de la tarea.
    date: new FormControl('', Validators.required),
    management_status_id: new FormControl(1, Validators.required),
    description: new FormControl('', Validators.required)
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    public modalController: ModalController,
    private userService: UserService,
    private taskService: TaskService,
    public alertController: AlertController,
    private router: Router
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
    const task = this.taskForm.value;

    console.log("Esta es la tarea que estoy enviando al backend: ");
    console.log(task);
    
    this.taskService.createTask(task).subscribe(
      res =>{
        console.log(res)
        this.presentAlertConfirm()
    
    },rej=>{
      console.log(rej)
     this.presentAlertError()
    });


    
    console.log(task);
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Cita Agendada!',
      message: 'Correctamente',
      buttons: [
        {
          text: 'Aceptar',
          cssClass: 'secondary',
          handler: (blah) => {
            this.router.navigate(['/dashboard/diary/all'])
          }
        }
      ]
    });

    await alert.present();
  }

  async presentAlertError() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Error Agendando Cita!',
      message: 'Intentelo Nuevamente',
      buttons: [
        {
          text: 'Aceptar',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }
      ]
    });

    await alert.present();
  }

}
