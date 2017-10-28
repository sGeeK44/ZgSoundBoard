import { Router } from "express";

import { IRoutes } from "./IRoutes"
import { UserRoutes } from './UserRoutes'

export class BaseRoutes implements IRoutes{
    readonly prefix = "/";
    
    public CreateRoutes(router: Router): void {
        new UserRoutes().CreateRoutes(router);
    }

    public static CreateRoutes(router: Router){
        new BaseRoutes().CreateRoutes(router);
    }
}