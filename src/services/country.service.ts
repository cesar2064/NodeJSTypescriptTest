import { AppClass } from "../abstract/app-class";
import * as request from 'request-promise';
import * as config from 'config';
import * as BBPromise from 'bluebird';

/**
 * This class handles everything related to countries
 */
export class CountryService extends AppClass {

    private readonly COUNTRY_GETBYNAMEURL = config.get('api.countries.urls.getByName');
    /**
     * Retrieves country data by using the name
     * @param countryName  The countries name
     * @returns the country data in a promise
    */
    getByName(countryName: String, fields: string[]): Promise<any> {
        let parsedFields = fields.join(';');
        return request.get(`${this.COUNTRY_GETBYNAMEURL}${countryName}?fields=${parsedFields}`);
    }
}