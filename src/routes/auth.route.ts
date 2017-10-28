import { path, controller } from "../decorators/route";
import App from "../interfaces/app.interface";
import { AppClass } from "../abstract/app-class";

@controller({
    path: '/auth',
    middleware: []
})
export class Auth extends AppClass {

    @path({
        path: '/',
        middleware: [
            'BodyParser.json()',
            'AjvMiddleware.loginValidation()'
        ],
        methods: ['post']
    })
    /**
    * Route for user authentication.
    */
    async login(req, res, next) {
        try {
            let token = await this.app.services.UserService.login(req.body.name, req.body.password);
            next({ result: { token }, statusCode: 202 });
        } catch (e) {
            next(e);
        }
    }
}