import { Component, OnInit } from '@angular/core';
import { LanguagesService } from './languages.service';
import { Observable, Subject } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit{
    private _validURL: boolean;

    /**
     * URL of the PTC to localize
     */
    private _url: string;

    private _urlStream: Subject<string>;
    private _urlObserver: Observable<string>;

    constructor(private _languagesService: LanguagesService) { 
        this._validURL = false;
        this._url = '';

        this._urlStream = new Subject();

        this._urlObserver = this._urlStream
                                      // url introduced must have more than 20 caracters length
                                      .filter(text => text.length >= 20)
                                      // Only if the url changes
                                      .distinctUntilChanged()
                                      // Wait 400 miliseconds until the varaible is quiet to keep going
                                      .debounceTime(400)
                                      // Filter if is a valid URL structure
                                      .filter(text => {
                                          let isValid = this._languagesService.isURL_ValidRegEx(text);

                                          if(!isValid) console.log("invalid structure ->"+text);

                                          return isValid;
                                      })
                                      // Filter if the language choosen is supported
                                      .filter(text => {
                                          let isValid = this._languagesService.isPTC_LanguageValid(text);

                                          if(!isValid) console.log("invalid language ->"+text);

                                          return isValid;
                                      })
    }

    /**
     * Funtion to catch the onchange of the user
     * @param url URL introduced by the user
     */
    introducedURL(url){
        // Push the new value to the observable
        this._urlStream.next(url);
    }

    ngOnInit(){

        this._urlObserver.subscribe(url => { this._url = url; console.log("Correct -> " + url); },
                                    error => { console.log("error"); },
                                    () => { console.log("Finished"); } );
    }
    
}
