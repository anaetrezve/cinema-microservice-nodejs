class Repository {
  private db: any;
  public collection: any;

  constructor(database: any) {
    this.db = database;
    this.collection = this.db.collection('movies');
  }

  public getAllMovies(): Promise<any> {
    return new Promise((resolve, reject) => {
      const allMovies: any = [];
      const cursor = this.collection.find();
      const addMovie = (movie: any) => {
        allMovies.push(movie);
      };
      const sendMovies = (err: string) => {
        if (err) {
          reject(new Error('An error occured fetching all movies, err: ' + err));
        }
        resolve(allMovies);
      };
      cursor.forEach(addMovie, sendMovies);
    });
  }

  public getMoviesPremiers(): Promise<any> {
    return new Promise((resolve, reject) => {
      const movies: any = [];
      const currentDay = new Date();

      const query = {
        releaseYear: {
          $gt: currentDay.getFullYear() - 1,
          $lte: currentDay.getFullYear(),
        },
        releaseMonth: {
          $gte: currentDay.getMonth() + 1,
          $lte: currentDay.getMonth() + 2,
        },
        releaseDay: {
          $lte: currentDay.getDate(),
        },
      };

      const cursor = this.collection.find(query);
      const addMovie = (movie: any) => {
        movies.push(movie);
      };
      const sendMovies = (err: string) => {
        if (err) {
          reject(new Error('An error occured fetching all movies, err: ' + err));
        }
        resolve(movies);
      };
      cursor.forEach(addMovie, sendMovies);
    });
  }

  public getMovieById(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const projection = { _id: 0, id: 1, title: 1, format: 1 };
      const sendMovie = (err: any, movie: any): any => {
        if (err) {
          reject(new Error(`An error occured fetching a movie with id: ${id} err: ${err}`));
        }
        resolve(movie);
      };

      this.collection.findOne({ id }, projection, sendMovie);
    });
  }

  public disconnect(): any {
    this.db.close();
  }
}

export default Repository;
