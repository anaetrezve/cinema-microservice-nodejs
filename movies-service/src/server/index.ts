import { Server } from 'http';
import express, { Application, Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import movieAPI from '@api/movies';
import { Options } from '@src/models';

const start = (options: Options) =>
  new Promise((resolve, reject) => {
    if (!options.repo) {
      reject(new Error('The server must be started with a connected repository'));
    }

    if (!options.port) {
      reject(new Error('The server must be started with an avaliable port'));
    }

    const app: Application = express();
    app.use(morgan('dev'));
    app.use(helmet());
    app.use((err: any, req: Request, res: Response, next: NextFunction) => {
      reject(new Error('Something went wrong!, err: ' + err));
      res.status(500).send('Something went wrong!');
    });

    movieAPI(app, options);

    const server: Server = app.listen(options.port, () => resolve(server));
  });

export { start };
