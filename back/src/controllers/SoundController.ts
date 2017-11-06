import { NextFunction, Request, Response, Router } from "express";
var multiparty = require('multiparty');
var fs = require('fs');
import mongoose = require('mongoose');
import { SoundRepository } from '../repository/SoundRepository';
import { ISound } from '../interfaces/ISound';
import container from '../ioc/container';
import identifiers from '../ioc/identifiers';
import { IUser } from "../interfaces/IUser";

export class SoundController {
  
  public GetAll(req: Request, res: Response, next: NextFunction) {    
    try {
      var soundRepo = new SoundRepository();
      soundRepo.retrieve((error, dbResult) => {
        if(error) {
          res.send({"error": "error"});
        }
        else {          
          let authenticatedUser = container.getOrDefault<IUser>(identifiers.AuthenticatedUser);
          var result = Array<any>();
          dbResult.forEach(sound => {
            result.push(
              {
                id: sound.id,
                name: sound.name,
                link: "http://api.zgsoundboard.com/sound/" + sound.id + "/file",
                createdAt: sound.createdAt,
                is_favorite: sound.is_favorite(authenticatedUser)
              });
          });
          res.send(result);
        }
      });   
    }
    catch (e) {
        console.log(e);
        res.send({"error": "error in your request"});
    }
  }
  
  public GetFile(req: Request, res: Response, next: NextFunction) {
    try {      
      var soundRepo = new SoundRepository();
      soundRepo.findById(req.params.id, (error, result) => {
        if(error) res.send({"error": "error"});
        else {
          res.writeHead(200, {
            'Content-Type': 'audio/mpeg',
            'Content-Length': result.source.byteLength
          });
          res.write(result.source);
          res.end();
        }
      });   
    }
    catch (e) {
        console.log(e);
        res.send({"error": "error in your request"});
    }
  }
  
  public Update(req: Request, res: Response, next: NextFunction) {
    try {      
      var soundRepo = new SoundRepository();
      soundRepo.findById(req.params.id, (error, result) => {
        if(error) res.send({"error": "error"});
        else {          
          let authenticatedUser = container.getOrDefault<IUser>(identifiers.AuthenticatedUser);
          const sound = req.body;
          if (sound.is_favorite) {
            result.set_to_favorite(authenticatedUser);
          }
          else {
            result.unset_to_favorite(authenticatedUser);
          }
          res.writeHead(200);
          res.end();
        }
      });   
    }
    catch (e) {
        console.log(e);
        res.send({"error": "error in your request"});
    }
  }
  
  public Delete(req: Request, res: Response, next: NextFunction) {
    try {      
      var soundRepo = new SoundRepository();
      soundRepo.delete(req.params.id, (error, result) => {
        if(error) res.send({"error": "error"});
        else {
          res.writeHead(200);
          res.end();
        }
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
          createdAt: new Date(),
          source: fs.readFileSync(files.file[0].path)
        }
        var soundRepo = new SoundRepository();
        soundRepo.create(<ISound>data, (error, result) => {
          if(error) res.send({"result": "error"});
          else res.send(
          {
            "result": "success",
            "sound":
            {
              id: result.id,
              name: result.name,
              link: "http://api.zgsoundboard.com/sound/" + result.id + "/file",
              createdAt: result.createdAt
            }
          });
        })
      });
    }
    catch (e)  {
      console.log(e);
      res.send({"error": "error in your request"});
    }
  }
}