import { model, column } from "../decorators/model";
import App from "../interfaces/app.interface";
import DataTypes from "sequelize";
import ModelInterface from "../interfaces/model.interface";
import { AppClass } from "../abstract/app-class";

/**
 * This model handles the data for users in the application.
 */
@model({
    tableName: 'users'
})
export default class UserModel extends AppClass implements ModelInterface {

    @column
    name = {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
    @column
    password = {
        type: DataTypes.STRING,
        allowNull: false
    }

    associate(model: any, models: any): void {}

    execute(model: any): void {
        //encrypts user password before is saved in database
        model.beforeCreate('encrypPassword', async (user, options) => {
            let encrypted = await this.app.services.UserService.encryptPassword(user.password);
            user.password = encrypted;
        })
    }
}