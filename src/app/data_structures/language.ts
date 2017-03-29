/**
 * Basic struture of a Language
 */
export interface Language{
    /**
     * Slug bame of the Language
     * 
     * @example ES_VE, EN_AS, EN_CA
     */
    slug: string;
    
    /**
     * The name of the language Spanish, English, German written on English.
     * See native attribute
     */
    name: string;

    /**
     * The name of the language written in the native langauge
     * 
     * @example The native name of Persian is فارسی
     * @example The native name of French is Français
     */
    native: string;

    /**
     * Array of related languages
     */
    related: Array<Language>
}
