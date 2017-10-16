import { NextFunction, Request, Response, Router } from "express";
import { soundRepository } from '../SoundRepository';
import { Sound } from '../Sound';

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
    new soundRepository().GetAll(function (err, sounds) {
      if (err) {
          console.error(err);
          res.status(500).send('Something wrong!');
      }
      else {
          console.log(sounds);
          res.json(sounds);
      }
    });
  }

  public Create(req: Request, res: Response, next: NextFunction) {
    console.log('body:' + req.body);
    console.log('file:' + req.body.file);
    console.log('files:' + req.files);
    console.log('params:' + req.params);
    console.log('query:' + req.query);
    
    let data = new Sound();
    data.name = req.body.name;
    data.source = req.file.buffer;
    new soundRepository(data).save().then(result => {
        res.json({ message: 'Sound inserted' });   
      }).catch(_ => res.status(500).send('Something wrong!'));
  }
}