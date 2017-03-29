import { Component, OnInit } from '@angular/core';
import { LanguagesService } from '../languages.service';


@Component({
    selector: 'app-localization',
    templateUrl: './localization.component.html',
    styleUrls: ['./localization.component.scss']
})
export class LocalizationComponent implements OnInit {
    /**
     * TPC -> Is a acronimus to be a reference to a plugin, theme or WP core.
     */

    /**
     * Url of the TPC to localizate
     */
    private url;

    /**
     * Interested language to translate.
     * At the end the user will be submit the translated strings on this language.
     */
    private language_destiny;

    /**
     * Langague to copy the strings
     */
    private language_base: Array<any>;

    constructor(private languages: LanguagesService) { }

    ngOnInit() {
        console.log(this.languages);
    }

}
