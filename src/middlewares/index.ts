export let middlewares = [
    require('./body-parser').BodyParser,
    require('./ajv-middleware').AjvMiddleware,
    require('./token-middleware').TokenMiddleware
]