import { Router, Request, Response } from "express";

import { IRoutes } from "./IRoutes";
import { UserRoutes } from '../UserRoutes';
import { SoundRoutes } from '../SoundRoutes';
import { FavouriteSoundsRoutes } from '../FavouriteSoundsRoutes'
import { IndexRoutes } from '../IndexRoutes';

export class BaseRoutes{

    public static CreateRoutes(router: Router){
        new FavouriteSoundsRoutes().CreateRoutes(router);
        new UserRoutes().CreateRoutes(router);
        new SoundRoutes().CreateRoutes(router);
        new IndexRoutes().CreateRoutes(router);
    }
}