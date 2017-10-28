import { AppClass } from "../abstract/app-class";

export class TokenMiddleware extends AppClass {
    /**
     * Validates the token in the header.    
     * @returns a promise
     */
    async validate(req, res, next): Promise<void> {
        try {
            let authorization = req.headers['authorization'];
            if (authorization) {
                let token = authorization.replace('JWT ', '');
                await this.app.services.UserService.decodeToken(token);
                next();
            } else {
                throw this.app.services.ErrorService.invalidToken();
            }

        } catch (e) {
            next(e);
        }
    }
}