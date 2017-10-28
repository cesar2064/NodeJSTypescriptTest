import { AppClass } from "../abstract/app-class";

export default interface App {
    models: any;
    services: { [key: string]: any };
    sequelize: any;
    middlewares: { [key: string]: new (app: App) => any };
}