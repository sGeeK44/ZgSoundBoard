import { NextFunction, Request, Response, Router } from "express";

import { IUser } from '../interfaces/IUser'
import { UserRepository } from '../repository/UserRepository'

export class UserController {
    
    public Create(request: Request, response: Response){
        try{
            let userRepo = new UserRepository();
            let user: IUser = <IUser>request.body;
            userRepo.create(user, (error, result) => {
                if(error) response.send({"error": "error"});
                else response.send({"success": "success"});
            })
        }
        catch(e){
            console.log(e);
            response.send({"error": "error in your request"});
        }
    }

    public GetAll(request: Request, response: Response){
        try {      
            var userRepo = new UserRepository();
            userRepo.retrieve((error, dbResult) => {
            if(error)response.send({"error": "error"});
            else {
                response.send(dbResult);
            }
            });   
        }
        catch (e) {
            console.log(e);
            response.send({"error": "error in your request"});
        }
    }
}