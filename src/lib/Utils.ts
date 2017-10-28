import * as express from 'express';
import App from '../interfaces/app.interface';
import ModelInterface from '../interfaces/model.interface';
import { AppClass } from '../abstract/app-class';
import * as config from 'config';
import * as path from 'path';

/*
 * Utilitary class only for project initialization purposes
*/
export default class Utils {
    static compileRoute(app, controllerClass: new (app: App) => AppClass): any {
        let controller = new controllerClass(app);
        let mainRouter = express.Router();
        let controllerOptions = controller.constructor['_options'];
        if (controllerOptions.middleware.length) {
            mainRouter.use(
                controllerOptions.path,
                this.compileMiddlewareStrings(app, controllerOptions.middleware)
            );
        }
        let subPaths = controller['_subPaths'];
        for (let i = subPaths.length; i--;) {
            let current = subPaths[i];
            let method = controller[current.method];
            let subRouter = express.Router();
            let httpMethods = current.options.methods;
            for (let i = httpMethods.length; i--;) {
                let routeMethod = subRouter[httpMethods[i]].bind(subRouter);
                routeMethod(
                    current.options.path,
                    this.compileMiddlewareStrings(app, current.options.middleware),
                    method.bind(controller)
                );
            }
            mainRouter.use(controllerOptions.path, subRouter);
        }

        return mainRouter;
    }

    static compileModels(app: App, models: Array<new (app: App) => ModelInterface>, sequelize: any): any {
        let modelInstances = [];
        let sequelizeModels = {};
        for (let i = models.length; i--;) {
            let ClassModel = models[i];
            let instanceModel = new ClassModel(app);
            modelInstances.push(instanceModel);
            let attributes = this.getModelAttributes(instanceModel);
            let sequelizeModel = sequelize.define(ClassModel.name, attributes, ClassModel['_options']);
            sequelizeModels[ClassModel.name] = sequelizeModel;
            instanceModel.execute(sequelizeModel);
        }

        for (let i = modelInstances.length; i--;) {
            let current = modelInstances[i];
            current.associate(sequelizeModels[current.constructor.name], sequelizeModels);
        }
        return sequelizeModels;
    }

    private static getModelAttributes(model: ModelInterface): any {
        let attributes = model.constructor.prototype['_attributes'];
        for (let i = attributes.length; i--;) {
            let attributeName = attributes[i];
            attributes[attributeName] = model[attributeName]
        }
        return attributes;
    }

    static compileServices(app: App, services: Array<new (app: App) => AppClass>): { [key: string]: AppClass } {
        let compiledServices = {};
        for (let i = services.length; i--;) {
            let current = services[i];
            compiledServices[current.name] = new current(app);
        }
        return compiledServices
    }

    static compileMiddlewareStrings(app: App, middlewareStrings: string[]): Array<() => any> {
        return middlewareStrings.map((string) => {
            let className = string.split('.')[0];
            let evalString = string.replace(/^[A-Za-z0-9]+\./, '')
            return new Function(
                'app',
                `
                 let instance = app.middlewares.${className};
                 return instance.${evalString}
                `
            )(app);
        });
    }

    static parseMiddlewares(app: App, middlewareCLasses: Array<new (app: App) => AppClass>): { [key: string]: new (app: App) => AppClass } {
        let parsedMiddlewares = {};
        for (let i = middlewareCLasses.length; i--;) {
            let current = middlewareCLasses[i];
            parsedMiddlewares[current.name] = new current(app);
        }
        return parsedMiddlewares;
    }
}