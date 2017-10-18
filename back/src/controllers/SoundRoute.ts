import { NextFunction, Request, Response, Router } from "express";
import { SoundRepository } from '../SoundRepository';
import { Sound } from '../Sound';

export class SoundRoute {

  public static Create(router: Router) {
    router.get("/sound", (req: Request, res: Response, next: NextFunction) => {
      new SoundRoute().GetAll(req, res, next);
    });
    router.post("/sound", (req: Request, res: Response, next: NextFunction) => {
      //new SoundRoute().Create(req, res, next);        
    });
  }
  
  public GetAll(req: Request, res: Response, next: NextFunction) {    
    try {      
      var soundRepo = new SoundRepository();
      soundRepo.retrieve((error, result) => {
        if(error) res.send({"error": "error"});
        else res.send(result);
      });   
    }
    catch (e) {
        console.log(e);
        res.send({"error": "error in your request"});
    }
  }
}