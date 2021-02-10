import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ApiService } from './services/api-service.service';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { QuestionnaireComponent } from './Questionnaire/questionnaire.component';

@NgModule({
  declarations: [
    AppComponent,
    QuestionnaireComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
