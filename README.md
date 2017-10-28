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

### Start the server
Execute the following command: npm start

## Documentation

### Used npm Libraries
These libraries are used by the project, **you don't have to install them manually**.
- **ajv >= 5.3.0** -> json validation
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

##  