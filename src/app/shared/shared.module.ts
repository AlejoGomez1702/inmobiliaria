import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgCalendarModule } from 'ionic2-calendar';
import { HtmlToTextPipe } from './pipes/html-to-text.pipe';

@NgModule({
  declarations: [
    HtmlToTextPipe
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    NgCalendarModule,
    // IonicSelectableModule
  ],
  exports: [
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    NgCalendarModule,
    HtmlToTextPipe,
    // IonicSelectableModule
  ]
})
export class SharedModule { }
