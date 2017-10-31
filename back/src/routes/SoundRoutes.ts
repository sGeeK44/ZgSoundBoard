import { Router } from 'express'
import { IRoutes } from './base/IRoutes'
import { SoundController } from '../controllers/SoundController'
import googleAuthentService from '../services/GoogleAuthentService'

export class SoundRoutes implements IRoutes {

    private soundController = new SoundController();
    
    readonly prefix = "/sound";
    
    CreateRoutes(router: Router): void {
        const controller = this.soundController;
        router.post(this.prefix, this.authent,controller.Create);
        router.get(this.prefix, this.authent, controller.GetAll)
        router.get(this.prefix+"/:id/file", controller.GetFile);
        router.delete(this.prefix+"/:id", controller.Delete);
    }


    authent(req, res, next){
        googleAuthentService.Authent(req.query.id_token);
        next();
    }

}