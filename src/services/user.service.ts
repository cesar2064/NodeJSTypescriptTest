import { AppClass } from "../abstract/app-class";
import * as config from 'config';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import * as BBPromise from 'bluebird';

/*
 * This class handles bussiness logic related to user 
 */
export class UserService extends AppClass {

    private readonly TOKEN_EXPIRESIN = config.get('authentication.jwt.expiresIn');

    private readonly TOKEN_ALGORITHM = config.get('authentication.jwt.algorithm');

    private readonly TOKEN_SECRET = config.get('authentication.jwt.secret');

    /**
     * Authenticates the user.
     * @param name  The user name
     * @param password The encrypted password
     * @returns the auth token in a promise
    */
    async login(name: string, password: string): Promise<string> {
        let userDB = await this.app.models.UserModel.findOne({ name });
        if (userDB) {
            if (await this.validPassword(password, userDB.password)) {
                return this.generateToken(userDB.id);
            }
        }
        throw this.app.services.ErrorService.invalidCredentials();
    }

    /**
     * Generates the authentication token for user.
     * @param userId  The user id in the database
     * @returns the auth token in a promise
    */
    generateToken(userId: number): Promise<string> {
        return new BBPromise((resolve, reject) => {
            jwt.sign(
                { data: { userId } },
                this.TOKEN_SECRET,
                {
                    expiresIn: this.TOKEN_EXPIRESIN,
                    algorithm: this.TOKEN_ALGORITHM
                },
                (err, token) => {
                    if (err) reject(err);
                    resolve(token);
                }
            );
        })
    }

    /**
     * Decodes the authentication token
     * @param token  The authentication token
     * @returns the user data in the token in a promise
    */
    decodeToken(token: string): Promise<{ userId: number }> {
        return new BBPromise((resolve, reject) => {
            jwt.verify(
                token,
                this.TOKEN_SECRET,
                { algorithms: [this.TOKEN_ALGORITHM] },
                (err, decoded) => {
                    if (err) reject(err);
                    resolve(decoded);
                }
            )
        });
    }

    /**
     * Creates the encrypted password string.
     * @param passwod  The user password
     * @returns a string promise which is the encrypted password
    */
    encryptPassword(password: string): Promise<string> {
        return bcrypt.hash(password, config.get('authentication.password.saltRounds'));
    }

    /**
     * Verifies password against encrypted password.
     * @param password  The user password
     * @param encryptPassword the encrypted stored user password
     * @returns a string promise with a boolean value, true if password is valid
    */
    validPassword(password: string, encryptedPassword: string): Promise<boolean> {
        return bcrypt.compare(password, encryptedPassword);
    }

}