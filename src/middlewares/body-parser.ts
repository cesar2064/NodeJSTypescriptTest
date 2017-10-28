import { AppClass } from "../abstract/app-class";
import * as bodyParser from 'body-parser';
import * as config from 'config';
import * as lodash from 'lodash';

export class BodyParser extends AppClass {
    /**
     * parses body sended in request as json.
     * @param options  body parser json options
     * @returns the bodyparser json middleware function
     */
    json(options: any = {}): (...any) => any {
        let defaultConfig = lodash.clone(config.get('middleware.bodyParser'));
        Object.assign(defaultConfig, options);
        return bodyParser.json(defaultConfig);
    }
}