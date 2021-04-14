import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, ModalController } from '@ionic/angular';
import { PropertyService } from 'src/app/core/services/property.service';
import { ImageModalComponent } from './image-modal/image-modal.component';

@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.scss'],
})
export class PropertyDetailsComponent implements OnInit 
{
  public displayFeatures = {
    internalFeatures: false,
    externalFeatures: false,
    description: false,
    observations: false
  };

  private property = {};

  public images: string[];

  public sliderOptions = {
    zoom: false,
    slidesPerView: 1,
    centeredSlides: true,
    spaceBetween: 25
  };

  constructor(
    private propertyService: PropertyService,
    private modalController: ModalController,
    private activatedRoute: ActivatedRoute,
    public loadingController: LoadingController
  ) 
  {
    this.images = [];
    this.getProperty(); 
    this.presentLoading();
  }

  ngOnInit() {}

  getProperty()
  {
    const propertyId = this.activatedRoute.snapshot.paramMap.get('id');
    this.propertyService.getPropertyById(propertyId).subscribe(
      res => {
        console.log(res);
        this.property = res;
        this.propertyService.selectedProperty = res;
        const galleriesArray = res['galleries'];
        const galleries = galleriesArray[0];
        delete galleries.id;
        
        var resultArray = Object.keys(galleries).map(function(personNamedIndex){
          let person = galleries[personNamedIndex];
          // do something with person
          return person;
        });

        this.images = resultArray.map(img => {
          return img.url;
        });

        // console.log(this.images);
      }
    );
  }


  /**
   * Abre la imagen con opciones de zoom.
   */
   openPreview(img)
   {
     this.modalController.create({
       component: ImageModalComponent,
       componentProps: {
         img: img
       }
     }).then((modal) => {
       modal.present();
     });
   }

   async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Cargando...',
      duration: 2000
    });
    await loading.present();

    // const { role, data } = await loading.onDidDismiss();
    // console.log('Loading dismissed!');
  }

}
