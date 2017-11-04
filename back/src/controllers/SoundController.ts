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
        if(error) res.send({"error": "error"});
        else {          
          let authenticatedUser = container.get<IUser>(identifiers.AuthenticatedUser);
          var result = Array<any>();
          dbResult.forEach(element => {
            result.push(
              {
                id: element.id,
                name: element.name,
                link: "http://api.zgsoundboard.com/sound/" + element.id + "/file",
                createdAt: element.createdAt,
                is_favorite: element.favorite_users.find(userId => userId.toString() == authenticatedUser.id) != undefined
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
          let authenticatedUser = container.get<IUser>(identifiers.AuthenticatedUser);
          const sound = req.body;
          var existing = result.favorite_users.find(userId => userId.toString() == authenticatedUser.id);
          if (sound.is_favorite && existing == undefined) {
            result.favorite_users.push(authenticatedUser);
          }
          if (!sound.is_favorite && existing != undefined) {
            var index = result.favorite_users.indexOf(existing, 0);            
            result.favorite_users.splice(index, 1);
          }
          result.save();
          console.log(req.body);
          console.log(result);
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