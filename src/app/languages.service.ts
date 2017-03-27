import { Injectable } from '@angular/core';
import { Language } from './data_structures/language';

import languagesJSON from './data_structures/dataBase/languages.json';

@Injectable()
export class LanguagesService {

	/**
	 * List of the supported languages
	 */
	private languages: Array<Language>;

	constructor() {

		// init the vector
		this.languages = new Array<Language>();

		this._loadLanguages();

		console.log( this.languages );
	}

	getLanguages(){
		return this.languages;
	}

	/**
	 * Load all languages
	 */
	private _loadLanguages() {

		this.languages = languagesJSON.map(langJSON => <Language>({ name: langJSON.name, 
																	slug: langJSON.slug, 
																	native: langJSON.native,
																    related: Array<Language>()})
										  );
		this._loadRelatedLanguages();
	}

	/**
	 * Load the related array in Languages.
	 * Once the languages are loaded we can fill in the related array of each language. 
	 * This way is efficent because we use a reference of a language instead of a new element.
	 */
	private _loadRelatedLanguages(){
		this.languages.map( language => {
			
			// Get the parent slug of the current language
			let parentLangSlug = this._getParentLanguage( language.slug );

			language.related = this.languages.filter( l => ~l.slug.toLowerCase().indexOf(parentLangSlug) && l.slug != language.slug );
		});
	}

	/**
	 * Return the parent slug of the slug
	 * @param slug The slug of the language
	 * @example The parent slug of the slug "es_VE" is "es"
	 */
	private _getParentLanguage(slug: String){
		return slug.split(/[-_]/g)[0];
	}

	
}