# Nodejs Typescript test

## Project installation

### Requirements
- NodeJS >= 8.7.0
- A C++ compiler (for bcrypt library), you can follow these requirements for each operating system: https://github.com/nodejs/node-gyp (omit npm package installation)
- Git

### Download project and install libraries
1. Open a terminal or cmd prompt, and move to a location where you want to download and install the project, example: cd home/projects
2. Clone the project by using the following command:
   git clone https://github.com/cesar2064/NodeJSTypescriptTest.git
3. Move to project root folder: cd NodeJSTypescriptTest
4. Install project libraries : npm i
5. Syncronize the database: npm run sync-database
6. Create a user for accessing the app: npm run create-user -- name:user1 password:password

### Start the server
Execute the following command: npm start, the server runs by default in port 3000, example: http://localhost:3000. See Available apis in Documentation part.

## Documentation

### Routes
- You can create a route by creating a typescript file in ./src/routes
- You must add the controller decorator to the class and extends AppClass abstract class:
```
@controller({
    path: '/auth', //the controller main path
    middleware: [] //the controller middleware
})
//AppClass class  app object injection
export class Auth extends AppClass { 
    ...more code
```
- You must add a route path by creating a method with their respective decorator:
```
@path({
    path: '/',
    middleware: [
        'BodyParser.json()', //Middleware is found by using the Middleware class name and evaluating the method part
        'AjvMiddleware.loginValidation()' //this method for example returns the middleware function,
        'AnotherClassName.method'// this method is the middleware function
    ],
    methods: ['post']
})
//req, res and next corresponding to express objects for routes.
async login(req, res, next) {
    ...more code
```
- You must add the route to ./dist/index.ts array:
```
export let routes = [
    require('./auth.route').Auth,
    require('./capitals.route').Capitals
]
```
- this array is parsed to express routes

### Models
- You can create a model by creating a typescript file in ./src/models
- You must add the model decorator, extends AppClass and implements ModelInterface to the class:
```
//recieves sequelize mode options objects
@model({
    tableName: 'users'
})
export default class UserModel extends AppClass implements ModelInterface 
```
- You can add sequelize model attributes by adding column decorator
```
@column
//the object of the property corresponds to sequelize model attribute object options
name = {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
}
```
- Also model has too functions available:
```
//Do here all sequelize model association
associate(model: any, models: any): void {}

//Do here all sequelize model methods, for example sequelize hooks
execute(model: any): void {}
```
- All classes are parsed to sequelize models and placed in the app object with their respective name this.app.models.ModelName

### Services
- You can create a service by creating a typescript file in ./src/services
- The class is a common typescript class:
```
//You should extend AppClass
export class CapitalService extends AppClass {
    ...more code
```
- All classes are instantiated and place in app object with their respective name this.app.services.ServiceName

### The app object
- The app object is created in the script ./src/app.ts
- This object is injected to services, middleware and models classes, when you extends the abstract AppClass class
- This has the following keys:
```
let app: App = {
    models: {}, //the app models which parsed to sequelize model instances
    services: {},//the app services instances
    sequelize: {}, // the sequelize instance
    middlewares: {}// the app middlewares Classes, they are instantiated in app routes classes parsing
};
```

### Available apis:
- **POST /auth** -> used for authenticate the user, it recieves a json body with two keys
```
{
    "name": "user1",
    "password":"123456"
}
```
This api is validated agains a json schema

- **GET /capitals/weather?countries=peru,panama,colombia** -> used for retrieving countries capitals, it recieves countries as a query param separated by commas. 
You should send the token via Authorization Header, 
```
Authorization:JWT eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXJJZCI6MX0sImlhdCI6MTUwOTE2NDQ3MywiZXhwIjoxNTA5MTc1MjczfQ.1EVwDyWKiJwu9LJbWezEiIBcFr6Ps35e79FisnbtPUE6ceDD4KnBKqeZR7nN8J4U5gOGu2lMzWEvyMshXMNKVw
```

You can see Examples of the api by using the following postman link : https://www.getpostman.com/collections/c676971654a011dff959

### Used npm Libraries
These libraries are used by the project, **you don't have to install them manually**.
- **ajv >= 5.3.0** -> json validation in requests
- **bcrypt >= 1.0.3** -> encrypts user passwords
- **bluebird >=3.5.1** -> handles asynchronous code
- **body-parser >= 1.18.2** -> parses json body in requests
- **config >=1.27.0** -> handles configuration files in the project
- **express >=4.16.2** -> Lib for handling node js server, requests and responses
- **jsonwebtoken >=8.1.0** -> Json web token enconding and unencoding
- **lodash >=4.17.4** -> Utilitary javascrit functions like json cloning and deep cloning
- **request-promise >= 4.2.2** -> Library for handling and fetching any external http request from server
- **sequelize >=4.17.0** -> Javascript ORM, using for handling models and sqlite queries in the project
- **sqlite3 >=3.1.13** -> Sqlite library for connecting and querying sqlite (used by sqlite)
- **typescript >=2.5.3** -> Handles and transpiles typescript language in the project

## Available npm commands:
- **npm run build** -> transpiles typescript code, it creates a new folder in the project named ./dist
- **npm run sync-database** -> syncronizes sqlite database structure.
- **npm run create-user** -> creates a user in the database and for the application, it recieves two params (name and password), example: npm run create-user -- name:user1 password:password
- **npm start** -> starts the server

## Project structure:
- **./config**: In this folder the config files are placed
- **./dist**: this folder contais the transpiled typescrit
- **./schemas**: contains the json schemas for requests validations
- **./scripts**: contains the npm scripts source
- **./src**: contains typescript source
    - **./src/abstract**: contains project abstract classes
    - **./src/decorators**: Typescript decorators helpers for routes and models
    - **./src/interfaces**: project interfaces
    - **./src/lib**: Utilitary libs for using in the project, like parsing class routes to express route functions, models to sequelize classes, etc.
    - **./src/middlewares**: Classes which handles requests before entering to the route, example: ajv library verifying json bodies, etc. Those clases are parsed to express middleware functions
    - **./src/models**: Classes which represents sequelize models.
    - **./src/routes**: Classes which represent express routes.
    - **./src/services**: Classes which contains data bussiness logic.
- **./app.ts**: This file creates the app object which contains the services, models, middleware and sequelize instance object.
- **./server.ts**: This script handles and start the express server.