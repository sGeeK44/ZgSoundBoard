import { Router } from 'express'
import { IRoutes } from './base/IRoutes'
import { SoundController } from '../controllers/SoundController'

export class SoundRoutes implements IRoutes {

    private soundController = new SoundController();
    
    readonly prefix = "/sound";
    
    CreateRoutes(router: Router): void {
        const controller = this.soundController;
        router.post(this.prefix, controller.Create);
        router.get(this.prefix, controller.GetAll)
        router.get(this.prefix+"/:id/file", controller.GetFile);
        router.delete(this.prefix+"/:id", controller.Delete);
    }
}