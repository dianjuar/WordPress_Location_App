import { Component } from '@angular/core';
import { LanguagesService } from './languages.service';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent {
    private validURL: boolean;

    constructor(private languages: LanguagesService) { 
        this.validURL = true;
    }
}
