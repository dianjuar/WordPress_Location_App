import { Component, OnInit } from '@angular/core';
import { LanguagesService } from '../languages.service';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    private _isValidURL: boolean;

    /**
     * URL of the PTC to localize
     */
    private _url: string;

    private _urlStream: Subject<string>;
    private _urlObserver: Observable<string>;

    constructor(private _languagesService: LanguagesService) { 
        this._isValidURL = undefined;
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
                                      // validate HTTP 200
                                      .filter(text => {
                                          return true;
                                      });
    }

    /**
     * Funtion to catch the onchange of the user
     * @param url URL introduced by the user
     */
    introducedURL(url){
        // Push the new value to the observable
        this._isValidURL = false;
        this._urlStream.next(url);
    }

    ngOnInit(){
        this._urlObserver.subscribe(url => { 
            this._languagesService.setURL(url);

            this._url = url;
            this._isValidURL = true;
        },
        error => { console.log("error"); },
        () => { console.log("Finished"); } );
    }
}
