import { Router } from 'express'
import { IRoutes } from './IRoutes'
import { UserController } from '../controllers/UserController'

export class UserRoutes implements IRoutes {

    private userController = new UserController();
    readonly prefix = "/user";
    
    CreateRoutes(router: Router): void {
        const controller = this.userController;
        router.post(this.prefix, controller.Create);
    }

}