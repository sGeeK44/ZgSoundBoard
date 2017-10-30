import { Router } from 'express'
import { IRoutes } from './base/IRoutes'
import { SoundController } from '../controllers/SoundController'
import { GoogleAuthentService } from '../services/GoogleAuthentService'
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// Use the GoogleStrategy within Passport.
//   Strategies in passport require a `verify` function, which accept
//   credentials (in this case, a token, tokenSecret, and Google profile), and
//   invoke a callback with a user object.
passport.use(new GoogleStrategy({
    clientID: "862875253512-ets86drnkdbcc8v6ho7478basm0cvap1.apps.googleusercontent.com",
    clientSecret: "973xoqTFuATd-PfhHUhpbRs1",
    callbackURL: "http://api.zgsoundboard.com/user"
  },
  function(accessToken, refreshToken, params, profile, done) {
    console.log('accessToken', accessToken);
    console.log('refreshToken', refreshToken);
    console.log('params', params);
    console.log('profile', profile);
    return done(null, profile);
  }
));
export class SoundRoutes implements IRoutes {

    private soundController = new SoundController();
    private authentService = new GoogleAuthentService;
    readonly prefix = "/sound";
    
    CreateRoutes(router: Router): void {
        const controller = this.soundController;
        router.post(this.prefix, this.authent,controller.Create);
        /*router.get(this.prefix, passport.authenticate('google', { scope: ['openid profile email'] }), function(req, res) {
            // Successful authentication, redirect to your app. 
            console.log('laaaaaaaaaaaaaaaaa');
        });*/
        router.get(this.prefix, this.authent, controller.GetAll)
        router.get(this.prefix+"/:id/file", controller.GetFile);
    }


    authent(req, res, next){
        GoogleAuthentService.Authent(req.query.id_token);
        next();
    }

}