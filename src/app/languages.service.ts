import { Injectable } from '@angular/core';
import { Language } from './data_structures/language';

import languagesJSON from './data_structures/dataBase/languages.json';

@Injectable()
export class LanguagesService {

	/**
	 * List of the supported languages
	 */
	private _languages: Array<Language>;

	/**
	 * Regular expression of a valid URL
	 */
	private _regexURL;

	/**
	 * Regular expression to validate if the language's PTC is supported
	 */
	private _regexPTCLanguage;

	/**
	 * Selected language by the user in slug
	 */
	private _selectedLanguage_slug: string;

	/**
	 * URL of the PTC
	 */
	private _URL;

	constructor() {
		// init the vector
		this._languages = new Array<Language>();

		// init regular expreson of valid URL
		this._regexURL = /((https?)(:\/\/))?(translate\.wordpress\.org\/projects\/)(wp-?(themes|plugins)?\/)(.*)(default\/?)/gi;

		// init _languages
		this._loadLanguages();

		// init regular expresion of valid language's PTC
		this._regexPTCLanguage = new RegExp(this._getRegExLanguages()+'(\/default)', 'gi');

		this._selectedLanguage_slug = undefined;
	}

	//---------getters ON
	/**
	 * _languages getter
	 */
	getLanguages(): Array<Language> {
		return this._languages;
	}

	getSelectedLanguage_slug(): string {
		return this._selectedLanguage_slug;
	}
	//---------getters OFF
	//---------setters ON
	/**
	 * _URL setter
	 * @param url URL of the PTC
	 */
	setURL(url: string){
		this._URL = url;

		this._setLanguageSelected_slug(url);
	}
	//---------setters OFF


	/**
	 * Given an URL verify if it structure is a valud URL
	 * @param URL url to verify if it is valid
	 */
	isURL_ValidRegEx(URL: string): boolean {
		return URL.match(this._regexURL) != null;
	}

	/**
	 * Validate if the language's PTC is supported
	 * @param URL url to verify if the language of the PTC in the url is supported
	 */
	isPTC_LanguageValid(URL: string): boolean {
		return URL.match(this._regexPTCLanguage) != null;
	}

	/**
	 * Get the related languages given a slug of a language
	 */
	getRelatedLanguages(): Array<Language> {
		return this._languages.filter( (lang: Language) => {
			return lang.slug.toLowerCase() == this._selectedLanguage_slug.toLowerCase()
		} 
		)[0].related;
	}

	/**
	 * Regular expresion that contains all the slugs created dinamically in string format
	 * 
	 * @return string
	 * @example (pt-br|pt|es|es_ve|...)
	 */
	_getRegExLanguages() {
		return '(' +
			this._languages.reduce((acum: string, current: Language, index) => {
				let pipe = index == this._languages.length - 1 ? '' : '|';
				return acum + current.slug.replace('_','-') + pipe;
			}, '')
			+ ')';
	}

	/**
	 * Load all languages.
	 * Read from a JSON and put it on the variable _languages
	 */
	private _loadLanguages() {

		this._languages = languagesJSON.map(langJSON => <Language>({
			name: langJSON.name,
			slug: langJSON.slug,
			native: langJSON.native,
			related: Array<Language>()
		})
		);
		this._loadRelatedLanguages();
	}

	/**
	 * _selectedLanguage_slug setter
	 */
	private _setLanguageSelected_slug(url: string){
		this._selectedLanguage_slug = this._regexPTCLanguage.exec(url)[1].replace('-','_');
		//this._selectedLanguage_slug = 'es_ve';

		console.log(this._selectedLanguage_slug);
	}

	/**
	 * Load the related array in Languages.
	 * Once the languages are loaded we can fill in the related array of each language. 
	 * This way is efficent because we use a reference of a language instead of a new element.
	 */
	private _loadRelatedLanguages() {
		this._languages.map(language => {

			// Get the parent slug of the current language
			let parentLangSlug = this._getParentLanguage(language.slug);

			language.related = this._languages.filter(l => ~l.slug.toLowerCase().indexOf(parentLangSlug) && l.slug != language.slug);
		});
	}

	/**
	 * Return the parent slug of the slug
	 * @param slug The slug of the language
	 * @example The parent slug of the slug "es_VE" is "es"
	 */
	private _getParentLanguage(slug: String) {
		return slug.split(/[-_]/g)[0];
	}


}