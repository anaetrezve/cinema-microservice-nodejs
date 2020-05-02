import status from 'http-status';
import { Application, Request, Response, NextFunction } from 'express';
import { Options } from '@src/models';

export default (app: Application, options: Options) => {
  const { repo } = options;

  app.get(
    '/movies',
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
        const movies = await repo.getAllMovies();
        res.status(status.OK).json(movies);
      } catch (err) {
        next(err);
      }
    }
  );

  app.get(
    '/movies/premiers',
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
        const premiers = await repo.getMoviePremiers();
        res.status(status.OK).json(premiers);
      } catch (err) {
        next(err);
      }
    }
  );

  app.get(
    '/movies/:id',
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
        const movie = await repo.getMovieById(req.params.id);
        res.status(status.OK).json(movie);
      } catch (err) {
        next(err);
      }
    }
  );
};
