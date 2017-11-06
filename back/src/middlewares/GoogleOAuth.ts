import { RequestHandler } from 'express';
import { UserRepository } from '../repository/UserRepository';
import { IUser } from '../interfaces/IUser';
import container from '../ioc/container';
import Identifiers from '../ioc/identifiers';
var request = require('request');

export function GoogleOAuth(req, res, next) {
    try
    {
        const GOOGLE_VERIFY_TOKEN_URL="https://www.googleapis.com/oauth2/v3/tokeninfo?";
        const id_token = req.headers.tokenid;

        // Configure the request
        var options = {
            url: GOOGLE_VERIFY_TOKEN_URL+'id_token='+id_token,
        }

        request.get(options, (error, response, body) => {
            if (!error && response.statusCode == 200) {
                const user_mail = JSON.parse(body).email;                
                const userRepository = new UserRepository();
                let user: IUser;
                userRepository.getOrCreateByMail(user_mail, function (err, user) {
                    if (err) {
                        console.log("Failed to get or create user authenticated: "+ err);
                    }
                    else {
                        console.log("User authenticated: "+ user);
                        container.bind<IUser>(Identifiers.AuthenticatedUser).toConstantValue(user);
                    }
                    next();
                });
            }
            else {
                console.log("Token google invalid. response:" + response.statusCode);
                next();
            }
        });
    }
    catch
    {
        console.log("Erreur lors de l'authentification.");
        next();
    }
}