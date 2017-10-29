import { NextFunction, Request, Response, Router } from "express";

import { IRoutes } from './base/IRoutes'

export class IndexRoutes implements IRoutes{
  readonly prefix = "/";

  public CreateRoutes(router: Router): void {
    router.get(this.prefix, (req: Request, res: Response, next: NextFunction) => {
      new IndexRoutes().index(req, res, next);
    });
  }
    
  private index(req: Request, res: Response, next: NextFunction) {
    res.json({ message: 'Api is alive!' });
  }
}