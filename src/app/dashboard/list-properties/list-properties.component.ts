import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonInfiniteScroll } from '@ionic/angular';
import { PropertyService } from 'src/app/core/services/property.service';

@Component({
  selector: 'app-list-properties',
  templateUrl: './list-properties.component.html',
  styleUrls: ['./list-properties.component.scss'],
})
export class ListPropertiesComponent implements OnInit 
{
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  public properties = [];
  public skip = 0;
  public maximumRecords = 100;
  public match = '';

  constructor(
    private propertyService: PropertyService,
    private router: Router
  ) 
  {
    this.loadProperties();
  }

  ngOnInit() 
  {    
  }

  loadProperties(event?, match?)
  {
    this.propertyService.getAllProperties(this.skip + '', match).subscribe(
      res => {
        console.log(res);
        if(match)
        {
          this.properties = res['properties'];   
          // console.log('rematch es: ' + this.rematch);  
        }
        else
        {
          this.properties = this.properties.concat(res['properties']);         
        }
        this.maximumRecords = res['total'];
        if(event)
        {
          event.target.complete();
        }
      }
    );
  }

  loadMore(event)
  {
    // console.log(event);
    this.skip += 10;
    if(this.skip >= this.maximumRecords)
    {
      event.target.disabled = true;   
    }
    else
    {
      this.loadProperties(event, this.match); 
    }    
  }

  search(event)
  {
    this.match = event.detail.value;
    this.loadProperties(null, this.match);
  }

  cancelSearch()
  {
    this.match = '';
    this.skip = 0;
    this.loadProperties();
  }

  // goToProperty(id: string)
  // {
  //   this.router.navigate(['properties']);
  // }


}
