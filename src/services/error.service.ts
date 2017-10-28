import { AppClass } from "../abstract/app-class";
import { AppError } from "../lib/AppError";

/*
 * This class handles bussiness logic related to user 
 */
export class ErrorService extends AppClass {

    invalidCredentials(): AppError {
        return new AppError(401, 'INV-CRE', 'User or password are incorrect');
    }
    invalidToken(): AppError {
        return new AppError(401, 'INV-JS-CRE', 'Invalid jwt token');
    }
    invalidJsonCredentialsRequest(errors: Array<any>): AppError {
        return new AppError(400, 'INV-JS-CRE', 'Invalid json credentials', errors);
    }
    invalidJsonCitiesWeatherRequest(errors: Array<any>): AppError {
        return new AppError(400, 'INV-JS-CIW', 'Invalid json for cities names', errors);
    }

}