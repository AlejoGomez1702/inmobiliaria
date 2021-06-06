import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonInfiniteScroll, ModalController } from '@ionic/angular';
import { ClientService } from 'src/app/core/services/client.service';
import { PropertyService } from 'src/app/core/services/property.service';

@Component({
  selector: 'app-modal-select-client',
  templateUrl: './modal-select-client.component.html',
  styleUrls: ['./modal-select-client.component.scss'],
})
export class ModalSelectClientComponent implements OnInit 
{
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  public clients = [];
  public skip = 0;
  public maximumRecords = 100;
  public match = '';
  public Form = {
    busqueda:'',
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private modalController: ModalController,
    private clientService: ClientService,
    private propertyService: PropertyService
  ) 
  { 
    this.loadClients();
    // console.log(this.clients);

    // console.log(this.propertyService.selectedProperty);

    // this.clientService.getAllClients().subscribe(
    //   res => console.log(res)
    // );
  }

  ngOnInit() {}

  async closeModal() {
    const onClosedData: string = "Wrapped Up!";
    await this.modalController.dismiss(onClosedData);
  }

  loadClients(event?, match?)
  {
    const isForSale: boolean = this.propertyService.selectedProperty.for_sale == 'true';
    let clientId: number = 0;
    // para ventas el id de los clientes es: 1 => Comprador
    // Para los arriendos el id de los clientes es: 4 => Arrendatario
    isForSale ? clientId = 1 : clientId = 4;

    this.clientService.getAllClients(this.skip + '', match, clientId).subscribe(
      res => {
        console.log(res);
        if(match)
        {
          this.clients = res['clients'];   
          // console.log('rematch es: ' + this.rematch);  
        }
        else
        {
          this.clients = this.clients.concat(res['clients']);         
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
      this.loadClients(event, this.match); 
    }    
  }

  selectClient(client)
  {
    this.modalController.dismiss(client);
  }

  searchNew() {
    this.loadClients(null, this.Form.busqueda);
  }

  search(event)
  {
    this.clients = [];
    // this.skip = 0;
    this.match = event.detail.value;
    this.loadClients(null, this.match);
  }

  cancelSearch()
  {
    this.clients = [];
    this.match = '';
    this.skip = 0;
    this.loadClients();
  }

}
