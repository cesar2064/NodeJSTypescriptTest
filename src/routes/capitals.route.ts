import { path, controller } from "../decorators/route";
import App from "../interfaces/app.interface";
import { AppClass } from "../abstract/app-class";

@controller({
    path: '/capitals',
    middleware: []
})
export class Capitals extends AppClass {

    @path({
        path: '/weather',
        middleware: [
            'TokenMiddleware.validate.bind(instance)',
            'BodyParser.json()',
            'AjvMiddleware.citiesWeatherValidation()'
        ],
        methods: ['get']
    })
    /**
     * Route for getting all capitals with weather.
     */
    async weather(req, res, next) {
        try {
            let result = await this.app.services.CapitalService.getCapitalsAndWeatherByCountryName(req.countries);
            next({ result, statusCode: 202 });
        } catch (e) {
            next(e);
        }
    }
}