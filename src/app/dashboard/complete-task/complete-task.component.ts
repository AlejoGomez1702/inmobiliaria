import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
// import { PhotoService } from 'src/app/core/services/photo.service';
// import { SignaturePad } from 'angular2-signaturepad/angular2-signaturepad';
import { Plugins, CameraResultType, CameraSource, CameraPhoto } from '@capacitor/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { SignaturePad } from 'angular2-signaturepad';
import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';

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

  private signatureImage: any;
  public photo: SafeResourceUrl;
  private takedPhoto: CameraPhoto;

  constructor(
    private sanitalizer: DomSanitizer
    // public photoService: PhotoService
  ) 
  { 
  }

  ngAfterViewInit(): void {
    // this.signaturePad is now available
    this.signaturePad.set('minWidth', 5); // set szimek/signature_pad options at runtime
    this.signaturePad.clear(); // invoke functions from szimek/signature_pad API
  }

  ngOnInit() {}

  async takePhoto() 
  {
    const image = await Plugins.Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera
    });

    this.photo = this.sanitalizer.bypassSecurityTrustResourceUrl(image && (image.dataUrl));
    this.takedPhoto = image;

    console.log(image);
  }

  drawComplete() {
    // will be notified of szimek/signature_pad's onEnd event
    console.log(this.signaturePad.toDataURL());
    this.signatureImage = this.signaturePad.toDataURL();

  }

  drawStart() {
    // will be notified of szimek/signature_pad's onBegin event
    console.log('begin drawing');
  }

  finishTask()
  {
    const doc = new jsPDF();

    const date = new Date();
    const dateStr =
          ("00" + (date.getMonth() + 1)).slice(-2) + "/" +
          ("00" + date.getDate()).slice(-2) + "/" +
          date.getFullYear() + " " +
          ("00" + date.getHours()).slice(-2) + ":" +
          ("00" + date.getMinutes()).slice(-2) + ":" +
          ("00" + date.getSeconds()).slice(-2);

    doc.setFontSize(11);
    doc.text(dateStr, 10, 10);

    doc.addImage(this.takedPhoto.dataUrl, this.takedPhoto.format, 10, 20, 100, 100);

    doc.setFontSize(14);    
    doc.text('Detalles de la visita:', 10, 130);
    doc.setFontSize(12);
    doc.text(this.taskForm.controls['description'].value, 10, 140);
    doc.setFontSize(16);
    doc.text('Firma:', 10, 180);
    doc.addImage(this.signatureImage, 'PNG', 10, 190, (500/10), (200/10));

    doc.save(`${dateStr}.pdf`);

    // this.taskForm.setControl('clients', new FormControl([this.selectedClient['id_client']]));
    // const task = this.taskForm.value;
    // this.taskService.createTask(task).subscribe(
    //   res => console.log(res)
    // );


    // console.log(task);

  }

}
