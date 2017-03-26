import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';

import { LanguagesService } from './languages.service';

import { AppComponent } from './app.component';
import { LocalizationComponent } from './localization/localization.component';

@NgModule({
  declarations: [
    AppComponent,
    LocalizationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot()
  ],
  providers: [LanguagesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
