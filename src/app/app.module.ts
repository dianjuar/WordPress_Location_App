import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';

import { LanguagesService } from './languages.service';

import { AppComponent } from './app.component';
import { LocalizationComponent } from './localization/localization.component';

import 'hammerjs';
import { HomeComponent } from './home/home.component';

import { AppRoutingModule } from './app-routing.module'


@NgModule({
    declarations: [
        AppComponent,
        LocalizationComponent,
        HomeComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        MaterialModule.forRoot(),
        AppRoutingModule
    ],
    providers: [LanguagesService],
    bootstrap: [AppComponent]
})
export class AppModule { }
