import Utils from './lib/Utils';
import * as express from 'express';
import { routes } from "./routes/index";
import * as config from 'config';
import app from './app';

let server = express();

server.use(routes.map((item) => {
    return Utils.compileRoute(app, item);
}))

//handling errors and common responses
server.use((data, req, res, next) => {
    let responseData: any;
    if (data instanceof Error) {
        responseData = {
            statusCode: data['statusCode'] || 500,
            error: { message: data.message, errors: data['errors'], errorCode: data['errorCode'] }
        }
    } else {
        responseData = {
            statusCode: data.statusCode || 200,
            result: data.result
        };
    }
    res.status(responseData.statusCode)
    res.json(responseData);
})

server.listen(config.get('server.port'), () => {
    console.log('Example app listening on port 3000!');
});