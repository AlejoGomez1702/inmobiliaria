import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiaryComponent } from './diary/diary.component';
import { ListPropertiesComponent } from './list-properties/list-properties.component';
import { PropertyDetailsComponent } from './property-details/property-details.component';
import { RootComponent } from './root/root.component';

const routes: Routes = [
  {
    path: 'root',
    component: RootComponent
  },
  {
    path: 'diary',
    component: DiaryComponent
  },
  {
    path: 'properties',
    component: ListPropertiesComponent
  },
  {
    path: 'properties/:id',
    component: PropertyDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
