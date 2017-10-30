import { Router } from 'express'
import { IRoutes } from './base/IRoutes'
import { FavouriteSoundsController } from '../controllers/FavouriteSoundsController'

export class FavouriteSoundsRoutes implements IRoutes {

    private favouriteSoundsController = new FavouriteSoundsController();
    readonly prefix = "/favourite-sound";
    
    CreateRoutes(router: Router): void {
        const controller = this.favouriteSoundsController;
        router.post(this.prefix, controller.Create);
    }

}