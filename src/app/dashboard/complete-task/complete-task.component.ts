import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PhotoService } from 'src/app/core/services/photo.service';
// import { SignaturePad } from 'angular2-signaturepad/angular2-signaturepad';
import { SignaturePad } from 'angular2-signaturepad';

@Component({
  selector: 'app-complete-task',
  templateUrl: './complete-task.component.html',
  styleUrls: ['./complete-task.component.scss'],
})
export class CompleteTaskComponent implements OnInit, AfterViewInit
{

  @ViewChild(SignaturePad) signaturePad: SignaturePad;

  private signaturePadOptions: Object = { // passed through to szimek/signature_pad constructor
    'minWidth': 5,
    'canvasWidth': 500,
    'canvasHeight': 200
  };

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

  ngAfterViewInit(): void {
    // this.signaturePad is now available
    this.signaturePad.set('minWidth', 5); // set szimek/signature_pad options at runtime
    this.signaturePad.clear(); // invoke functions from szimek/signature_pad API
  }

  ngOnInit() {}

  addPhoto() {
    this.photoService.addNewToGallery();
  }

  drawComplete() {
    // will be notified of szimek/signature_pad's onEnd event
    console.log(this.signaturePad.toDataURL());
  }

  drawStart() {
    // will be notified of szimek/signature_pad's onBegin event
    console.log('begin drawing');
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
