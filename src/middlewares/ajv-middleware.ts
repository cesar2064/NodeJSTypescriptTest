import { AppClass } from "../abstract/app-class";
import * as Ajv from 'ajv';
import * as config from 'config';

const ajv = new Ajv();

export class AjvMiddleware extends AppClass {

    private schemasPath = config.get('ajv.schemas.path');

    /**
     * Validates the json body against an validator
     * @param validator the ajv compiled schema validator
     * @returns the middleware handler
     */
    private validateJsonBody(validator: any, handleError: (next: Function) => void): (req: any, res: any, next: Function) => any {
        return (req, res, next) => {
            let body = req.body;
            if (validator(body)) {
                next();
            } else {
                handleError(next);
            }
        }
    }

    /**
     * Validates the login json crendentials.
     * @returns the middleware handler
     */
    loginValidation(): (req: any, res: any, next: Function) => any {
        let validator = ajv.compile(require(`${this.schemasPath}/login-request.json`));
        return this.validateJsonBody(validator, (next) => {
            next(this.app.services.ErrorService.invalidJsonCredentialsRequest(validator.errors));
        });
    }

    /**
     * Validates the cities weather request.
     * @returns the middleware handler
     */
    citiesWeatherValidation(): (req: any, res: any, next: Function) => any {
        let validator = ajv.compile(require(`${this.schemasPath}/capitals-weather-request.json`));
        return (req, res, next) => {
            try {
                let countries = req.query.countries.split(',');
                if (validator(countries)) {
                    req.countries = countries;
                    next();
                } else {
                    throw this.app.services.ErrorService.invalidJsonCitiesWeatherRequest(validator.errors);
                }
            } catch (e) {
                next(e);
            }
        }
    }

}