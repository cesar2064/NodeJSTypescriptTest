import { AppClass } from "../abstract/app-class";
import * as request from 'request-promise';
import * as config from 'config';
import * as BBPromise from 'bluebird';

/**
 * This class handles everything related to capitals
 */
export class CapitalService extends AppClass {

    /**
     * Retrieves countries data by using the name of each one.
     * @param countriesNames  The countries names
     * @returns the countries data in a promise
    */
    getCapitalsAndWeatherByCountryName(countriesNames: String[]): Promise<{ country: string, capital: string, weather: any }> {
        let countryFields = ['name', 'capital', 'alpha3Code'];
        //parallel api calls
        return BBPromise.map(countriesNames, async (countryName) => {
            let countryResponse = await this.app.services.CountryService.getByName(countryName, countryFields);
            let parsedCountryResponse = JSON.parse(countryResponse)[0]
            let weatherResponse = await this.app.services.WeatherService.getWeatherByCapitalAndCountryCode(parsedCountryResponse);
            let parsedWeatherResponse = JSON.parse(weatherResponse);
            return {
                country: parsedCountryResponse.name,
                capital: parsedCountryResponse.capital,
                weather: parsedWeatherResponse.weather
            };
        });
    }
}