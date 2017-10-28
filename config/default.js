const uuidv5 = require('uuid/v5');
const uuidv4 = require('uuid/v4');
const path = require('path');

module.exports = {
    database: {
        name: 'testDB',
        options: {
            dialect: "sqlite",
            storage: './test.sqlite',
        }
    },
    server: {
        port: 3000
    },
    authentication: {
        jwt: {
            secret: uuidv5('test.app.com', uuidv4()),
            algorithm: 'HS512',
            expiresIn: '3h'
        },
        password: {
            saltRounds: 12
        }
    },
    ajv: {
        schemas: {
            path: path.resolve('./schemas')
        }
    },
    middleware: {
        bodyParser: {
            limit: '100kb'
        }
    },
    api: {
        countries: {
            urls: {
                getByName: 'https://restcountries.eu/rest/v2/name/'
            }
        },
        weather: {
            APPID: '0caab2f4d042b3253bd925021c73ca19',
            urls: {
                weather: 'http://api.openweathermap.org/data/2.5/weather'
            }
        }
    }
}