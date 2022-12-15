import { Request, Response } from 'express';

class IndexController {

    public index(req: Request, res: Response) {
        res.json({text: 'API User, made for Fernando Alarcon'});
    }

}

export const indexController = new IndexController;