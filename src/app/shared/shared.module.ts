import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgCalendarModule } from 'ionic2-calendar';
import { HtmlToTextPipe } from './pipes/html-to-text.pipe';
import localeEs from '@angular/common/locales/es-CO';
registerLocaleData(localeEs);

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
  ], 
  providers: [
    { provide: LOCALE_ID, useValue: 'es-CO' }
  ]
})
export class SharedModule { }
