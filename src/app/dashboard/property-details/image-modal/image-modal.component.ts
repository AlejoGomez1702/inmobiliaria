import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.scss'],
})
export class ImageModalComponent implements OnInit 
{
  img: any;

  @ViewChild('slider', {read: ElementRef})slider: ElementRef;

  sliderOptions = {
    // zoom: true
    zoom: {
      maxRatio: 5
    }
  };

  constructor(
    private navParams: NavParams,
    private modalController: ModalController
  ) 
  { }

  ngOnInit() 
  {
    this.img = this.navParams.get('img');
  }


  zoom(zoomIn: boolean)
  {
    let zoom = this.slider.nativeElement.swiper.zoom;
    if(zoomIn)
    {
      zoom.in();
    }
    else{
      zoom.out();
    }
  }

  close()
  {
    this.modalController.dismiss();
  }

}
