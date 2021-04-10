import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { RootComponent } from './root/root.component';
import { CoreModule } from '../core/core.module';
import { DiaryComponent } from './diary/diary.component';
import { ListPropertiesComponent } from './list-properties/list-properties.component';
import { PropertyDetailsComponent } from './property-details/property-details.component';
import { ImageModalComponent } from './property-details/image-modal/image-modal.component';
import { NewTaskComponent } from './new-task/new-task.component';


@NgModule({
  declarations: [
    RootComponent,
    DiaryComponent,
    ListPropertiesComponent,
    PropertyDetailsComponent,
    ImageModalComponent,
    NewTaskComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    CoreModule
  ]
})
export class DashboardModule { }
