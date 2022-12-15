import express, { Router } from 'express';

import userController from '../controllers/usersController';

class UsersRoutes {

    router: Router = Router();

    constructor() {
        this.config();
    }

    config() {
        this.router.get('/users', userController.list);
        this.router.get('/users/:id', userController.getOne);
        this.router.post('/users', userController.create);
        this.router.put('/users/:id', userController.update);
        this.router.delete('/users', userController.delete);
    }

}

export default new UsersRoutes().router;

