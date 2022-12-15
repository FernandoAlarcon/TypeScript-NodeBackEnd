import bodyParser from 'body-parser';
import express, { Application, Express, RequestHandler } from 'express';
import morgan from 'morgan';
import cors from 'cors';

import indexRoutes from './routes/indexRoutes';
import usersRoutes from './routes/usersRoutes';

class Server {

    public app: Application;
    
    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    config(): void {
        this.app.set('port', process.env.PORT || 8080);

        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(bodyParser.json() as RequestHandler);
        this.app.use(bodyParser.urlencoded({ extended: true }) as RequestHandler);
    }

    routes(): void {
        this.app.use('/', indexRoutes);
        this.app.use('/api', usersRoutes);
    }

    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'));
        });
    }

}

const server = new Server();
server.start();