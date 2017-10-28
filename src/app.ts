import { models } from "./models/index";
import { services } from "./services/index";
import { middlewares } from "./middlewares/index";
import App from "./interfaces/app.interface";
import Sequelize from "sequelize";
import * as config from 'config';
import Utils from './lib/Utils';

let app: App = {
    models: {},
    services: {},
    sequelize: {},
    middlewares: {}
};

app.sequelize = new Sequelize(config.get('database.name'), null, null, config.get('database.options'));

app.models = Utils.compileModels(app, models, app.sequelize);

app.services = Utils.compileServices(app, services);

app.middlewares = Utils.parseMiddlewares(app, middlewares);

export default app;