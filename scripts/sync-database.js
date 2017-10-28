const app = require('../dist/app').default;

app.sequelize.sync({});