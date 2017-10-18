import { NextFunction, Request, Response, Router } from "express";
var multiparty = require('multiparty');
var fs = require('fs');
import { SoundRepository } from '../SoundRepository';
import { Sound } from '../Sound';
import { ISound } from '../ISound';

export class SoundRoute {

  public static Create(router: Router) {
    router.get("/sound", (req: Request, res: Response, next: NextFunction) => {
      new SoundRoute().GetAll(req, res, next);
    });
    router.post("/sound", (req: Request, res: Response, next: NextFunction) => {
      new SoundRoute().Create(req, res, next);        
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

  public Create(req: Request, res: Response, next: NextFunction) {
    try
    {
      var form = new multiparty.Form();      
      form.parse(req, function(err, fields, files) {
        var data = {
          name: fields.name,
          source: fs.readFileSync(files.null[0].path)
        }
        var soundRepo = new SoundRepository();
        soundRepo.create(<ISound>data, (error, result) => {
          if(error) res.send({"error": "error"});
          else res.send({"success": "success"});
        })
      });
    }
    catch (e)  {
      console.log(e);
      res.send({"error": "error in your request"});
    }
  }
}