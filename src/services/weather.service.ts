import { AppClass } from "../abstract/app-class";
import * as request from 'request-promise';
import * as config from 'config';
import * as BBPromise from 'bluebird';

/**
 * This class handles everything related to weather
 */
export class WeatherService extends AppClass {

    private readonly WEATHER_APPID = config.get('api.weather.APPID');

    private readonly WEATHER_URL = config.get('api.weather.urls.weather');

    /**
     * Retrieves weathers according capital name and country code.
     * @param capitalData  The countries names
     * @returns the wheater response in a promise
    */
    getWeatherByCapitalAndCountryCode(capitalData: { capital: string, alpha3Code: string }): Promise<any> {
        return request.get(
            `${this.WEATHER_URL}?q=${capitalData.capital},${capitalData.alpha3Code}&APPID=${this.WEATHER_APPID}`
        );
    }
}