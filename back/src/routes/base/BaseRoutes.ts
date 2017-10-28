import { Router, Request, Response } from "express";

import { IRoutes } from "./IRoutes";
import { UserRoutes } from '../UserRoutes';
import { SoundRoutes } from '../SoundRoutes';
import { IndexRoutes } from '../IndexRoutes';

export class BaseRoutes{

    public static CreateRoutes(router: Router){
        new UserRoutes().CreateRoutes(router);
        new SoundRoutes().CreateRoutes(router);
    }

}